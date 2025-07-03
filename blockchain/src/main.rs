use mkt4u_blockchain::{
    SolanaClient, BlockchainConfig,
    campaigns::{CampaignManager, CampaignData},
    analytics::{AnalyticsManager, AnalyticsData},
    rewards::{RewardsManager, RewardProgram, RewardType, RewardCriteria},
};
use serde::{Deserialize, Serialize};
use std::env;
use tokio;

#[derive(Debug, Serialize, Deserialize)]
struct ApiResponse<T> {
    success: bool,
    data: Option<T>,
    error: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
struct CreateCampaignRequest {
    id: String,
    title: String,
    creator: String,
    target_amount: u64,
    duration_days: u32,
    metadata_uri: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct AnalyticsRequest {
    campaign_id: String,
    views: u64,
    clicks: u64,
    conversions: u64,
    total_spent: u64,
}

async fn handle_create_campaign(
    campaign_manager: &CampaignManager,
    request: CreateCampaignRequest,
) -> ApiResponse<String> {
    let start_time = chrono::Utc::now().timestamp();
    let end_time = start_time + (request.duration_days as i64 * 86400);

    let campaign_data = CampaignData {
        id: request.id,
        title: request.title,
        creator: request.creator,
        target_amount: request.target_amount,
        current_amount: 0,
        start_time,
        end_time,
        is_active: true,
        metadata_uri: request.metadata_uri,
    };

    match campaign_manager.create_campaign(&campaign_data).await {
        Ok(campaign_id) => ApiResponse {
            success: true,
            data: Some(campaign_id),
            error: None,
        },
        Err(e) => ApiResponse {
            success: false,
            data: None,
            error: Some(e.to_string()),
        },
    }
}

async fn handle_record_analytics(
    analytics_manager: &AnalyticsManager,
    request: AnalyticsRequest,
) -> ApiResponse<String> {
    let analytics_data = AnalyticsData {
        campaign_id: request.campaign_id,
        timestamp: chrono::Utc::now().timestamp(),
        metrics: mkt4u_blockchain::campaigns::CampaignMetrics {
            views: request.views,
            clicks: request.clicks,
            conversions: request.conversions,
            total_spent: request.total_spent,
            roi: if request.total_spent > 0 {
                (request.conversions as f64 * 100.0) / (request.total_spent as f64 / 1_000_000.0)
            } else {
                0.0
            },
        },
        engagement_rate: if request.views > 0 {
            request.clicks as f64 / request.views as f64
        } else {
            0.0
        },
        cost_per_click: if request.clicks > 0 {
            request.total_spent as f64 / request.clicks as f64
        } else {
            0.0
        },
        cost_per_conversion: if request.conversions > 0 {
            request.total_spent as f64 / request.conversions as f64
        } else {
            0.0
        },
    };

    match analytics_manager.record_analytics(&analytics_data).await {
        Ok(signature) => ApiResponse {
            success: true,
            data: Some(signature),
            error: None,
        },
        Err(e) => ApiResponse {
            success: false,
            data: None,
            error: Some(e.to_string()),
        },
    }
}

async fn initialize_blockchain_service() -> Result<(CampaignManager, AnalyticsManager, RewardsManager), Box<dyn std::error::Error>> {
    // Load environment variables
    dotenv::dotenv().ok();
    
    // Initialize logging
    env_logger::init();
    
    log::info!("Initializing blockchain service...");
    
    // Create Solana client from environment
    let client = SolanaClient::from_env()?;
    
    // Test connection
    let program_id = client.get_program_id()?;
    log::info!("Connected to Solana network with program ID: {}", program_id);
    
    // Initialize managers
    let campaign_manager = CampaignManager::new(client.clone());
    let analytics_manager = AnalyticsManager::new(client.clone());
    let rewards_manager = RewardsManager::new(client);
    
    log::info!("Blockchain service initialized successfully");
    
    Ok((campaign_manager, analytics_manager, rewards_manager))
}

async fn create_sample_reward_program(rewards_manager: &RewardsManager) -> Result<String, Box<dyn std::error::Error>> {
    let reward_program = RewardProgram {
        id: "engagement-rewards-2025".to_string(),
        name: "2025 Engagement Rewards".to_string(),
        description: "Earn SOL rewards for successful marketing campaigns".to_string(),
        reward_type: RewardType::SOL { amount: 100_000 }, // 0.1 SOL
        total_pool: 10_000_000, // 10 SOL
        remaining_pool: 10_000_000,
        start_time: chrono::Utc::now().timestamp(),
        end_time: chrono::Utc::now().timestamp() + (365 * 24 * 60 * 60), // 1 year
        criteria: RewardCriteria {
            min_engagement: 1000,
            min_conversions: 50,
            min_spend: 1_000_000, // 1 SOL
            requires_verification: true,
        },
        is_active: true,
    };

    let program_id = rewards_manager.create_reward_program(&reward_program).await?;
    log::info!("Created sample reward program: {}", program_id);
    Ok(program_id)
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize the blockchain service
    let (campaign_manager, analytics_manager, rewards_manager) = initialize_blockchain_service().await?;
    
    // Create a sample reward program
    if env::var("CREATE_SAMPLE_PROGRAM").unwrap_or_default() == "true" {
        let _ = create_sample_reward_program(&rewards_manager).await;
    }
    
    // Example usage - create a campaign
    if env::var("RUN_EXAMPLES").unwrap_or_default() == "true" {
        log::info!("Running example operations...");
        
        let create_request = CreateCampaignRequest {
            id: "example-campaign-001".to_string(),
            title: "MKT4U Launch Campaign".to_string(),
            creator: "mkt4u-platform".to_string(),
            target_amount: 5_000_000, // 5 SOL
            duration_days: 30,
            metadata_uri: "https://mkt4u.com/campaign/metadata/001".to_string(),
        };
        
        let campaign_result = handle_create_campaign(&campaign_manager, create_request).await;
        println!("Campaign creation result: {:?}", campaign_result);
        
        if let Some(campaign_id) = campaign_result.data {
            // Record some analytics
            let analytics_request = AnalyticsRequest {
                campaign_id: campaign_id.clone(),
                views: 10000,
                clicks: 500,
                conversions: 25,
                total_spent: 2_000_000, // 2 SOL
            };
            
            let analytics_result = handle_record_analytics(&analytics_manager, analytics_request).await;
            println!("Analytics recording result: {:?}", analytics_result);
            
            // Get performance insights
            let insights = analytics_manager.generate_insights(&[campaign_id]).await?;
            println!("Campaign insights: {:?}", insights);
        }
    }
    
    log::info!("Blockchain service is ready for API calls");
    
    // In a real implementation, this would start an HTTP server
    // For now, just keep the service running
    println!("Blockchain service is running. Press Ctrl+C to stop.");
    
    // Keep the service alive
    loop {
        tokio::time::sleep(tokio::time::Duration::from_secs(60)).await;
        log::debug!("Blockchain service heartbeat");
    }
}
