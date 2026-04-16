use crate::database::Database;
use crate::models::Session;
use tauri::State;

#[tauri::command]
pub async fn get_sessions(db: State<'_, Database>) -> Result<Vec<Session>, String> {
    // For now, return mock data
    // In a real implementation, this would query session history from various AI CLI tools
    let sessions = vec![
        Session {
            id: "1".to_string(),
            tool: crate::models::AITool::ClaudeCode,
            title: Some("Refactor authentication module".to_string()),
            created_at: chrono::Utc::now() - chrono::Duration::minutes(30),
            updated_at: chrono::Utc::now() - chrono::Duration::minutes(15),
            message_count: 24,
            preview: Some("I need to refactor the authentication module to use JWT tokens...".to_string()),
        },
        Session {
            id: "2".to_string(),
            tool: crate::models::AITool::Codex,
            title: Some("Build REST API endpoints".to_string()),
            created_at: chrono::Utc::now() - chrono::Duration::hours(2),
            updated_at: chrono::Utc::now() - chrono::Duration::hours(1),
            message_count: 18,
            preview: Some("Create CRUD endpoints for the user management system...".to_string()),
        },
    ];
    
    Ok(sessions)
}
