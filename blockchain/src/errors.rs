use thiserror::Error;

#[derive(Error, Debug)]
pub enum BlockchainError {
    #[error("RPC error: {0}")]
    RpcError(String),

    #[error("Transaction error: {0}")]
    TransactionError(String),

    #[error("Invalid keypair: {0}")]
    InvalidKeypair(String),

    #[error("Invalid public key: {0}")]
    InvalidPubkey(String),

    #[error("Serialization error: {0}")]
    SerializationError(String),

    #[error("Program error: {0}")]
    ProgramError(String),

    #[error("Account not found: {0}")]
    AccountNotFound(String),

    #[error("Insufficient funds")]
    InsufficientFunds,

    #[error("Network error: {0}")]
    NetworkError(String),
}

pub type Result<T> = std::result::Result<T, BlockchainError>;
