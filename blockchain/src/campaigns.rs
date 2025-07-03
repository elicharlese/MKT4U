use anyhow::Result;
use serde::{Deserialize, Serialize};
use solana_sdk::{
    instruction::{AccountMeta, Instruction},
    pubkey::Pubkey,
    system_instruction,
    transaction::Transaction,
};
use std::str::FromStr;
use borsh::{BorshSerialize, BorshDeserialize};

use crate::{SolanaClient, errors::BlockchainError};

#[derive(Debug, Clone, Serialize, Deserialize, BorshSerialize, BorshDeserialize)]
pub struct CampaignData {
    pub id: String,
    pub title: String,
    pub creator: String,
    pub target_amount: u64,
    pub current_amount: u64,
    pub start_time: i64,
    pub end_time: i64,
    pub is_active: bool,
    pub metadata_uri: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, BorshSerialize, BorshDeserialize)]
pub struct CampaignMetrics {
    pub views: u64,
    pub clicks: u64,
    pub conversions: u64,
    pub total_spent: u64,
    pub roi: f64,
}

pub struct CampaignManager {
    client: SolanaClient,
}

impl CampaignManager {
    pub fn new(client: SolanaClient) -> Self {
        Self { client }
    }

    /// Create a new campaign on-chain
    pub async fn create_campaign(
        &self,
        campaign_data: &CampaignData,
    ) -> Result<String> {
        let program_id = self.client.get_program_id()?;
        let payer = self.client.get_payer()
            .ok_or(BlockchainError::InvalidKeypair("No payer keypair configured".to_string()))?;

        // Generate a new account for the campaign
        let campaign_account = solana_sdk::signature::Keypair::new();
        
        // Calculate account size
        let account_size = std::mem::size_of::<CampaignData>() + 128; // Extra space for metadata
        let rent_exemption = self.client
            .get_client()
            .get_minimum_balance_for_rent_exemption(account_size)?;

        // Create account instruction
        let create_account_ix = system_instruction::create_account(
            &payer.pubkey(),
            &campaign_account.pubkey(),
            rent_exemption,
            account_size as u64,
            &program_id,
        );

        // Serialize campaign data
        let campaign_data_bytes = borsh::to_vec(campaign_data)
            .map_err(|e| BlockchainError::SerializationError(e.to_string()))?;

        // Create campaign instruction
        let mut instruction_data = vec![0]; // Instruction discriminator for create_campaign
        instruction_data.extend_from_slice(&campaign_data_bytes);

        let create_campaign_ix = Instruction {
            program_id,
            accounts: vec![
                AccountMeta::new(campaign_account.pubkey(), true),
                AccountMeta::new(payer.pubkey(), true),
                AccountMeta::new_readonly(solana_sdk::system_program::id(), false),
            ],
            data: instruction_data,
        };

        // Create and send transaction
        let recent_blockhash = self.client.get_client().get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[create_account_ix, create_campaign_ix],
            Some(&payer.pubkey()),
            &[payer, &campaign_account],
            recent_blockhash,
        );

        let signature = self.client.send_transaction(&transaction).await?;
        
        log::info!("Campaign created: {} with signature: {}", campaign_account.pubkey(), signature);
        Ok(campaign_account.pubkey().to_string())
    }

    /// Update campaign metrics on-chain
    pub async fn update_metrics(
        &self,
        campaign_pubkey: &str,
        metrics: &CampaignMetrics,
    ) -> Result<String> {
        let program_id = self.client.get_program_id()?;
        let payer = self.client.get_payer()
            .ok_or(BlockchainError::InvalidKeypair("No payer keypair configured".to_string()))?;

        let campaign_account = Pubkey::from_str(campaign_pubkey)
            .map_err(|e| BlockchainError::InvalidPubkey(e.to_string()))?;

        // Serialize metrics data
        let metrics_data_bytes = borsh::to_vec(metrics)
            .map_err(|e| BlockchainError::SerializationError(e.to_string()))?;

        // Create update metrics instruction
        let mut instruction_data = vec![1]; // Instruction discriminator for update_metrics
        instruction_data.extend_from_slice(&metrics_data_bytes);

        let update_metrics_ix = Instruction {
            program_id,
            accounts: vec![
                AccountMeta::new(campaign_account, false),
                AccountMeta::new(payer.pubkey(), true),
            ],
            data: instruction_data,
        };

        // Create and send transaction
        let recent_blockhash = self.client.get_client().get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[update_metrics_ix],
            Some(&payer.pubkey()),
            &[payer],
            recent_blockhash,
        );

        let signature = self.client.send_transaction(&transaction).await?;
        
        log::info!("Campaign metrics updated for: {} with signature: {}", campaign_pubkey, signature);
        Ok(signature.to_string())
    }

    /// Get campaign data from blockchain
    pub async fn get_campaign(&self, campaign_pubkey: &str) -> Result<CampaignData> {
        let campaign_account = Pubkey::from_str(campaign_pubkey)
            .map_err(|e| BlockchainError::InvalidPubkey(e.to_string()))?;

        let account_data = self.client
            .get_client()
            .get_account_data(&campaign_account)
            .map_err(|e| BlockchainError::AccountNotFound(e.to_string()))?;

        let campaign_data: CampaignData = borsh::from_slice(&account_data)
            .map_err(|e| BlockchainError::SerializationError(e.to_string()))?;

        Ok(campaign_data)
    }

    /// Close campaign and withdraw funds
    pub async fn close_campaign(&self, campaign_pubkey: &str) -> Result<String> {
        let program_id = self.client.get_program_id()?;
        let payer = self.client.get_payer()
            .ok_or(BlockchainError::InvalidKeypair("No payer keypair configured".to_string()))?;

        let campaign_account = Pubkey::from_str(campaign_pubkey)
            .map_err(|e| BlockchainError::InvalidPubkey(e.to_string()))?;

        // Create close campaign instruction
        let instruction_data = vec![2]; // Instruction discriminator for close_campaign

        let close_campaign_ix = Instruction {
            program_id,
            accounts: vec![
                AccountMeta::new(campaign_account, false),
                AccountMeta::new(payer.pubkey(), true),
                AccountMeta::new_readonly(solana_sdk::system_program::id(), false),
            ],
            data: instruction_data,
        };

        // Create and send transaction
        let recent_blockhash = self.client.get_client().get_latest_blockhash()?;
        let transaction = Transaction::new_signed_with_payer(
            &[close_campaign_ix],
            Some(&payer.pubkey()),
            &[payer],
            recent_blockhash,
        );

        let signature = self.client.send_transaction(&transaction).await?;
        
        log::info!("Campaign closed: {} with signature: {}", campaign_pubkey, signature);
        Ok(signature.to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::BlockchainConfig;

    #[tokio::test]
    async fn test_campaign_creation() {
        let config = BlockchainConfig::default();
        let client = SolanaClient::new(config).unwrap();
        let campaign_manager = CampaignManager::new(client);

        let campaign_data = CampaignData {
            id: "test-campaign-1".to_string(),
            title: "Test Campaign".to_string(),
            creator: "test-creator".to_string(),
            target_amount: 1000000, // 1 SOL in lamports
            current_amount: 0,
            start_time: chrono::Utc::now().timestamp(),
            end_time: chrono::Utc::now().timestamp() + 86400 * 30, // 30 days
            is_active: true,
            metadata_uri: "https://example.com/metadata".to_string(),
        };

        // Note: This test will fail without a valid keypair and network connection
        // It's here to show the structure
        let result = campaign_manager.create_campaign(&campaign_data).await;
        // assert!(result.is_ok()); // Uncomment when testing with real network
    }
}
