use anyhow::Result;
use serde::{Deserialize, Serialize};
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    commitment_config::CommitmentConfig,
    pubkey::Pubkey,
    signature::{Keypair, Signature},
    transaction::Transaction,
};
use std::str::FromStr;

pub mod campaigns;
pub mod analytics;
pub mod rewards;
pub mod errors;

use crate::errors::BlockchainError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BlockchainConfig {
    pub rpc_url: String,
    pub network: String,
    pub program_id: String,
    pub payer_keypair: Option<String>,
}

impl Default for BlockchainConfig {
    fn default() -> Self {
        Self {
            rpc_url: "https://api.mainnet-beta.solana.com".to_string(),
            network: "mainnet-beta".to_string(),
            program_id: "11111111111111111111111111111111".to_string(),
            payer_keypair: None,
        }
    }
}

pub struct SolanaClient {
    client: RpcClient,
    config: BlockchainConfig,
    payer: Option<Keypair>,
}

impl SolanaClient {
    pub fn new(config: BlockchainConfig) -> Result<Self> {
        let client = RpcClient::new_with_commitment(
            config.rpc_url.clone(),
            CommitmentConfig::confirmed(),
        );

        let payer = if let Some(keypair_str) = &config.payer_keypair {
            Some(Self::keypair_from_string(keypair_str)?)
        } else {
            None
        };

        Ok(Self {
            client,
            config,
            payer,
        })
    }

    pub fn from_env() -> Result<Self> {
        dotenv::dotenv().ok();
        
        let config = BlockchainConfig {
            rpc_url: std::env::var("SOLANA_RPC_URL")
                .unwrap_or_else(|_| "https://api.mainnet-beta.solana.com".to_string()),
            network: std::env::var("SOLANA_NETWORK")
                .unwrap_or_else(|_| "mainnet-beta".to_string()),
            program_id: std::env::var("SOLANA_PROGRAM_ID")
                .unwrap_or_else(|_| "11111111111111111111111111111111".to_string()),
            payer_keypair: std::env::var("SOLANA_PRIVATE_KEY").ok(),
        };

        Self::new(config)
    }

    fn keypair_from_string(keypair_str: &str) -> Result<Keypair> {
        let bytes = bs58::decode(keypair_str)
            .into_vec()
            .map_err(|e| BlockchainError::InvalidKeypair(e.to_string()))?;
        
        if bytes.len() != 64 {
            return Err(BlockchainError::InvalidKeypair("Invalid keypair length".to_string()).into());
        }

        Ok(Keypair::from_bytes(&bytes)
            .map_err(|e| BlockchainError::InvalidKeypair(e.to_string()))?)
    }

    pub fn get_program_id(&self) -> Result<Pubkey> {
        Pubkey::from_str(&self.config.program_id)
            .map_err(|e| BlockchainError::InvalidPubkey(e.to_string()).into())
    }

    pub async fn get_balance(&self, pubkey: &Pubkey) -> Result<u64> {
        self.client
            .get_balance(pubkey)
            .map_err(|e| BlockchainError::RpcError(e.to_string()).into())
    }

    pub async fn send_transaction(&self, transaction: &Transaction) -> Result<Signature> {
        self.client
            .send_and_confirm_transaction(transaction)
            .map_err(|e| BlockchainError::TransactionError(e.to_string()).into())
    }

    pub fn get_client(&self) -> &RpcClient {
        &self.client
    }

    pub fn get_payer(&self) -> Option<&Keypair> {
        self.payer.as_ref()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_config_creation() {
        let config = BlockchainConfig::default();
        assert_eq!(config.network, "mainnet-beta");
        assert_eq!(config.rpc_url, "https://api.mainnet-beta.solana.com");
    }

    #[tokio::test]
    async fn test_client_creation() {
        let config = BlockchainConfig::default();
        let client = SolanaClient::new(config);
        assert!(client.is_ok());
    }
}
