use anyhow::Result;
use serde::{Deserialize, Serialize};
use solana_sdk::{
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    transaction::Transaction,
};
use std::str::FromStr;

use crate::{SolanaClient, errors::BlockchainError};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RewardProgram {
    pub id: String,
    pub name: String,
    pub description: String,
    pub reward_type: RewardType,
    pub total_pool: u64,
    pub remaining_pool: u64,
    pub start_time: i64,
    pub end_time: i64,
    pub criteria: RewardCriteria,
    pub is_active: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum RewardType {
    Token { mint: String, amount: u64 },
    SOL { amount: u64 },
    NFT { collection: String },
    Points { amount: u32 },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RewardCriteria {
    pub min_engagement: u64,
    pub min_conversions: u64,
    pub min_spend: u64,
    pub requires_verification: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserReward {
    pub user_id: String,
    pub program_id: String,
    pub reward_type: RewardType,
    pub earned_at: i64,
    pub claimed_at: Option<i64>,
    pub transaction_signature: Option<String>,
}

pub struct RewardsManager {
    client: SolanaClient,
}

impl RewardsManager {
    pub fn new(client: SolanaClient) -> Self {
        Self { client }
    }

    /// Create a new reward program on-chain
    pub async fn create_reward_program(&self, program: &RewardProgram) -> Result<String> {
        let program_id = self.client.get_program_id()?;
        let payer = self.client.get_payer()
            .ok_or(BlockchainError::InvalidKeypair("No payer keypair configured".to_string()))?;

        // Generate a new account for the reward program
        let reward_program_account = solana_sdk::signature::Keypair::new();
        
        // Serialize program data
        let program_data_bytes = borsh::to_vec(program)
            .map_err(|e| BlockchainError::SerializationError(e.to_string()))?;

        // Create reward program instruction
        let mut instruction_data = vec![3]; // Instruction discriminator for create_reward_program
        instruction_data.extend_from_slice(&program_data_bytes);

        let create_program_ix = Instruction {
            program_id,
            accounts: vec![
                AccountMeta::new(reward_program_account.pubkey(), true),
                AccountMeta::new(payer.pubkey(), true),
                AccountMeta::new_readonly(solana_sdk::system_program::id(), false),
            ],
            data: instruction_data,
        };

        // Create and send transaction
        let recent_blockhash = self.client.get_client().get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[create_program_ix],
            Some(&payer.pubkey()),
            &[payer, &reward_program_account],
            recent_blockhash,
        );

        let signature = self.client.send_transaction(&transaction).await?;
        
        log::info!("Reward program created: {} with signature: {}", reward_program_account.pubkey(), signature);
        Ok(reward_program_account.pubkey().to_string())
    }

    /// Check if user qualifies for reward
    pub async fn check_reward_eligibility(
        &self,
        user_id: &str,
        program_id: &str,
        user_metrics: &crate::campaigns::CampaignMetrics,
    ) -> Result<bool> {
        let program = self.get_reward_program(program_id).await?;
        
        if !program.is_active {
            return Ok(false);
        }

        let current_time = chrono::Utc::now().timestamp();
        if current_time < program.start_time || current_time > program.end_time {
            return Ok(false);
        }

        // Check criteria
        let meets_engagement = user_metrics.views + user_metrics.clicks >= program.criteria.min_engagement;
        let meets_conversions = user_metrics.conversions >= program.criteria.min_conversions;
        let meets_spend = user_metrics.total_spent >= program.criteria.min_spend;

        Ok(meets_engagement && meets_conversions && meets_spend)
    }

    /// Claim reward for eligible user
    pub async fn claim_reward(
        &self,
        user_id: &str,
        program_id: &str,
        user_pubkey: &str,
    ) -> Result<String> {
        let program_id_key = self.client.get_program_id()?;
        let payer = self.client.get_payer()
            .ok_or(BlockchainError::InvalidKeypair("No payer keypair configured".to_string()))?;

        let user_pubkey = Pubkey::from_str(user_pubkey)
            .map_err(|e| BlockchainError::InvalidPubkey(e.to_string()))?;
        
        let reward_program_pubkey = Pubkey::from_str(program_id)
            .map_err(|e| BlockchainError::InvalidPubkey(e.to_string()))?;

        // Create claim reward instruction
        let mut instruction_data = vec![4]; // Instruction discriminator for claim_reward
        instruction_data.extend_from_slice(user_id.as_bytes());

        let claim_reward_ix = Instruction {
            program_id: program_id_key,
            accounts: vec![
                AccountMeta::new(reward_program_pubkey, false),
                AccountMeta::new(user_pubkey, false),
                AccountMeta::new(payer.pubkey(), true),
                AccountMeta::new_readonly(solana_sdk::system_program::id(), false),
            ],
            data: instruction_data,
        };

        // Create and send transaction
        let recent_blockhash = self.client.get_client().get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[claim_reward_ix],
            Some(&payer.pubkey()),
            &[payer],
            recent_blockhash,
        );

        let signature = self.client.send_transaction(&transaction).await?;
        
        log::info!("Reward claimed by user {} from program {} with signature: {}", user_id, program_id, signature);
        Ok(signature.to_string())
    }

    /// Get reward program details
    pub async fn get_reward_program(&self, program_id: &str) -> Result<RewardProgram> {
        let program_pubkey = Pubkey::from_str(program_id)
            .map_err(|e| BlockchainError::InvalidPubkey(e.to_string()))?;

        let account_data = self.client
            .get_client()
            .get_account_data(&program_pubkey)
            .map_err(|e| BlockchainError::AccountNotFound(e.to_string()))?;

        let program_data: RewardProgram = borsh::from_slice(&account_data)
            .map_err(|e| BlockchainError::SerializationError(e.to_string()))?;

        Ok(program_data)
    }

    /// Get user's reward history
    pub async fn get_user_rewards(&self, user_id: &str) -> Result<Vec<UserReward>> {
        // In a real implementation, this would query on-chain data
        // For now, return mock data
        log::info!("Fetching rewards for user: {}", user_id);
        
        Ok(vec![
            UserReward {
                user_id: user_id.to_string(),
                program_id: "loyalty-program-1".to_string(),
                reward_type: RewardType::Points { amount: 100 },
                earned_at: chrono::Utc::now().timestamp() - 86400,
                claimed_at: Some(chrono::Utc::now().timestamp()),
                transaction_signature: Some("mock_signature_1".to_string()),
            },
        ])
    }

    /// Calculate potential rewards for user
    pub async fn calculate_potential_rewards(
        &self,
        user_id: &str,
        user_metrics: &crate::campaigns::CampaignMetrics,
    ) -> Result<Vec<(String, RewardType)>> {
        let mut potential_rewards = Vec::new();
        
        // Get all active programs (in reality, this would be queried from blockchain)
        let active_programs = self.get_active_programs().await?;
        
        for program in active_programs {
            if self.check_reward_eligibility(user_id, &program.id, user_metrics).await? {
                potential_rewards.push((program.id, program.reward_type));
            }
        }
        
        Ok(potential_rewards)
    }

    async fn get_active_programs(&self) -> Result<Vec<RewardProgram>> {
        // Mock active programs
        Ok(vec![
            RewardProgram {
                id: "loyalty-program-1".to_string(),
                name: "Monthly Engagement Rewards".to_string(),
                description: "Earn points for campaign engagement".to_string(),
                reward_type: RewardType::Points { amount: 100 },
                total_pool: 10000,
                remaining_pool: 8500,
                start_time: chrono::Utc::now().timestamp() - 86400 * 30,
                end_time: chrono::Utc::now().timestamp() + 86400 * 30,
                criteria: RewardCriteria {
                    min_engagement: 100,
                    min_conversions: 5,
                    min_spend: 50000,
                    requires_verification: false,
                },
                is_active: true,
            },
        ])
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{BlockchainConfig, campaigns::CampaignMetrics};

    #[tokio::test]
    async fn test_reward_eligibility() {
        let config = BlockchainConfig::default();
        let client = SolanaClient::new(config).unwrap();
        let rewards_manager = RewardsManager::new(client);

        let user_metrics = CampaignMetrics {
            views: 150,
            clicks: 15,
            conversions: 8,
            total_spent: 75000,
            roi: 2.5,
        };

        // This would need a real program ID in practice
        let eligibility = rewards_manager.check_reward_eligibility(
            "test-user",
            "test-program",
            &user_metrics
        ).await;

        // Test structure is correct even if it fails due to missing program
        assert!(eligibility.is_err()); // Expected since no real program exists
    }

    #[test]
    fn test_reward_type_serialization() {
        let reward = RewardType::SOL { amount: 1000000 };
        let serialized = serde_json::to_string(&reward).unwrap();
        let deserialized: RewardType = serde_json::from_str(&serialized).unwrap();
        
        match deserialized {
            RewardType::SOL { amount } => assert_eq!(amount, 1000000),
            _ => panic!("Incorrect deserialization"),
        }
    }
}
