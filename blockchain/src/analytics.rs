use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

use crate::{SolanaClient, campaigns::CampaignMetrics};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnalyticsData {
    pub campaign_id: String,
    pub timestamp: i64,
    pub metrics: CampaignMetrics,
    pub engagement_rate: f64,
    pub cost_per_click: f64,
    pub cost_per_conversion: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PerformanceReport {
    pub period_start: i64,
    pub period_end: i64,
    pub total_campaigns: u32,
    pub total_spend: u64,
    pub total_conversions: u64,
    pub average_roi: f64,
    pub top_performing_campaigns: Vec<String>,
}

pub struct AnalyticsManager {
    client: SolanaClient,
}

impl AnalyticsManager {
    pub fn new(client: SolanaClient) -> Self {
        Self { client }
    }

    /// Record analytics data on-chain
    pub async fn record_analytics(&self, data: &AnalyticsData) -> Result<String> {
        // In a real implementation, this would create a transaction to store
        // analytics data on-chain in a compressed format
        
        log::info!("Recording analytics for campaign: {}", data.campaign_id);
        
        // Simulate on-chain storage
        let analytics_hash = self.compute_analytics_hash(data)?;
        
        // Here you would create and send a transaction to store the analytics
        // For now, we'll return a mock transaction signature
        Ok(format!("analytics_{}", analytics_hash))
    }

    /// Aggregate analytics for a time period
    pub async fn aggregate_analytics(
        &self,
        campaign_ids: &[String],
        start_time: i64,
        end_time: i64,
    ) -> Result<PerformanceReport> {
        log::info!("Aggregating analytics for {} campaigns", campaign_ids.len());
        
        let mut total_spend = 0u64;
        let mut total_conversions = 0u64;
        let mut roi_sum = 0.0;
        let mut campaign_performance = HashMap::new();

        // In a real implementation, this would query on-chain data
        for campaign_id in campaign_ids {
            let metrics = self.get_campaign_metrics(campaign_id).await?;
            
            total_spend += metrics.total_spent;
            total_conversions += metrics.conversions;
            roi_sum += metrics.roi;
            
            campaign_performance.insert(campaign_id.clone(), metrics.roi);
        }

        // Find top performing campaigns
        let mut performance_vec: Vec<_> = campaign_performance.into_iter().collect();
        performance_vec.sort_by(|a, b| b.1.partial_cmp(&a.1).unwrap());
        let top_performing_campaigns: Vec<String> = performance_vec
            .into_iter()
            .take(5)
            .map(|(id, _)| id)
            .collect();

        let average_roi = if campaign_ids.is_empty() { 0.0 } else { roi_sum / campaign_ids.len() as f64 };

        Ok(PerformanceReport {
            period_start: start_time,
            period_end: end_time,
            total_campaigns: campaign_ids.len() as u32,
            total_spend,
            total_conversions,
            average_roi,
            top_performing_campaigns,
        })
    }

    /// Get real-time metrics for a campaign
    pub async fn get_campaign_metrics(&self, campaign_id: &str) -> Result<CampaignMetrics> {
        log::info!("Fetching metrics for campaign: {}", campaign_id);
        
        // In a real implementation, this would query the campaign account on-chain
        // For now, return mock data
        Ok(CampaignMetrics {
            views: 1500,
            clicks: 150,
            conversions: 15,
            total_spent: 500000, // 0.5 SOL in lamports
            roi: 2.5,
        })
    }

    /// Compute performance predictions using on-chain data
    pub async fn predict_performance(
        &self,
        campaign_id: &str,
        days_ahead: u32,
    ) -> Result<CampaignMetrics> {
        log::info!("Predicting performance for campaign: {} over {} days", campaign_id, days_ahead);
        
        let current_metrics = self.get_campaign_metrics(campaign_id).await?;
        
        // Simple linear prediction (in reality, you'd use more sophisticated models)
        let daily_growth_rate = 1.05; // 5% daily growth
        let growth_factor = daily_growth_rate.powi(days_ahead as i32);
        
        Ok(CampaignMetrics {
            views: (current_metrics.views as f64 * growth_factor) as u64,
            clicks: (current_metrics.clicks as f64 * growth_factor) as u64,
            conversions: (current_metrics.conversions as f64 * growth_factor) as u64,
            total_spent: (current_metrics.total_spent as f64 * growth_factor) as u64,
            roi: current_metrics.roi * growth_factor.sqrt(), // ROI grows slower
        })
    }

    /// Generate insights from campaign performance
    pub async fn generate_insights(&self, campaign_ids: &[String]) -> Result<Vec<String>> {
        let mut insights = Vec::new();
        
        for campaign_id in campaign_ids {
            let metrics = self.get_campaign_metrics(campaign_id).await?;
            
            // Generate insights based on metrics
            if metrics.roi > 3.0 {
                insights.push(format!("Campaign {} has excellent ROI of {:.2}x", campaign_id, metrics.roi));
            } else if metrics.roi < 1.0 {
                insights.push(format!("Campaign {} needs optimization - ROI below 1.0x", campaign_id));
            }
            
            let ctr = metrics.clicks as f64 / metrics.views as f64;
            if ctr > 0.05 {
                insights.push(format!("Campaign {} has high engagement (CTR: {:.2}%)", campaign_id, ctr * 100.0));
            } else if ctr < 0.01 {
                insights.push(format!("Campaign {} may need better targeting (low CTR)", campaign_id));
            }
            
            let conversion_rate = metrics.conversions as f64 / metrics.clicks as f64;
            if conversion_rate > 0.15 {
                insights.push(format!("Campaign {} has excellent conversion rate", campaign_id));
            }
        }
        
        Ok(insights)
    }

    fn compute_analytics_hash(&self, data: &AnalyticsData) -> Result<String> {
        use sha2::{Sha256, Digest};
        
        let data_bytes = serde_json::to_vec(data)?;
        let mut hasher = Sha256::new();
        hasher.update(&data_bytes);
        let result = hasher.finalize();
        
        Ok(format!("{:x}", result))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::{BlockchainConfig, campaigns::CampaignMetrics};

    #[tokio::test]
    async fn test_analytics_recording() {
        let config = BlockchainConfig::default();
        let client = SolanaClient::new(config).unwrap();
        let analytics_manager = AnalyticsManager::new(client);

        let analytics_data = AnalyticsData {
            campaign_id: "test-campaign".to_string(),
            timestamp: chrono::Utc::now().timestamp(),
            metrics: CampaignMetrics {
                views: 1000,
                clicks: 50,
                conversions: 5,
                total_spent: 100000,
                roi: 2.0,
            },
            engagement_rate: 0.05,
            cost_per_click: 2000.0,
            cost_per_conversion: 20000.0,
        };

        let result = analytics_manager.record_analytics(&analytics_data).await;
        assert!(result.is_ok());
    }

    #[tokio::test]
    async fn test_performance_prediction() {
        let config = BlockchainConfig::default();
        let client = SolanaClient::new(config).unwrap();
        let analytics_manager = AnalyticsManager::new(client);

        let prediction = analytics_manager.predict_performance("test-campaign", 7).await;
        assert!(prediction.is_ok());
        
        let predicted_metrics = prediction.unwrap();
        assert!(predicted_metrics.views > 0);
        assert!(predicted_metrics.roi > 0.0);
    }
}
