use crate::database::Database;
use crate::models::{Provider, AITool};
use tauri::State;
use anyhow::Result;

#[tauri::command]
pub async fn get_providers(db: State<'_, Database>) -> Result<Vec<Provider>, String> {
    let conn = db.conn.lock().await;
    let mut stmt = conn
        .prepare(
            "SELECT id, name, tool, api_key, base_url, model, is_active, created_at, updated_at, metadata 
             FROM providers ORDER BY created_at DESC"
        )
        .map_err(|e| e.to_string())?;
    
    let providers = stmt
        .query_map([], |row| {
            Ok(Provider {
                id: row.get(0)?,
                name: row.get(1)?,
                tool: match row.get::<_, String>(2)?.as_str() {
                    "claude-code" => AITool::ClaudeCode,
                    "codex" => AITool::Codex,
                    "gemini-cli" => AITool::GeminiCli,
                    "opencode" => AITool::OpenCode,
                    "openclaw" => AITool::OpenClaw,
                    _ => AITool::ClaudeCode,
                },
                api_key: row.get(3)?,
                base_url: row.get(4)?,
                model: row.get(5)?,
                is_active: row.get::<_, i32>(6)? == 1,
                created_at: row.get(7)?,
                updated_at: row.get(8)?,
                metadata: row.get(9)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;
    
    Ok(providers)
}

#[tauri::command]
pub async fn add_provider(db: State<'_, Database>, provider: Provider) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute(
        "INSERT INTO providers (id, name, tool, api_key, base_url, model, is_active, created_at, updated_at, metadata)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
        [
            &provider.id,
            &provider.name,
            &match provider.tool {
                AITool::ClaudeCode => "claude-code".to_string(),
                AITool::Codex => "codex".to_string(),
                AITool::GeminiCli => "gemini-cli".to_string(),
                AITool::OpenCode => "opencode".to_string(),
                AITool::OpenClaw => "openclaw".to_string(),
            },
            &provider.api_key.unwrap_or_default(),
            &provider.base_url.unwrap_or_default(),
            &provider.model.unwrap_or_default(),
            &if provider.is_active { "1" } else { "0" }.to_string(),
            &provider.created_at.to_rfc3339(),
            &provider.updated_at.to_rfc3339(),
            &provider.metadata.map(|v| v.to_string()).unwrap_or_default(),
        ],
    )
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn update_provider(db: State<'_, Database>, id: String, provider: Provider) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute(
        "UPDATE providers SET name = ?1, tool = ?2, api_key = ?3, base_url = ?4, model = ?5, is_active = ?6, updated_at = ?7, metadata = ?8
         WHERE id = ?9",
        [
            &provider.name,
            &match provider.tool {
                AITool::ClaudeCode => "claude-code".to_string(),
                AITool::Codex => "codex".to_string(),
                AITool::GeminiCli => "gemini-cli".to_string(),
                AITool::OpenCode => "opencode".to_string(),
                AITool::OpenClaw => "openclaw".to_string(),
            },
            &provider.api_key.unwrap_or_default(),
            &provider.base_url.unwrap_or_default(),
            &provider.model.unwrap_or_default(),
            &if provider.is_active { "1" } else { "0" }.to_string(),
            &chrono::Utc::now().to_rfc3339(),
            &provider.metadata.map(|v| v.to_string()).unwrap_or_default(),
            &id,
        ],
    )
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn delete_provider(db: State<'_, Database>, id: String) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute("DELETE FROM providers WHERE id = ?1", [&id])
        .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn set_active_provider(db: State<'_, Database>, id: String) -> Result<(), String> {
    let conn = db.conn.lock().await;
    
    // First, deactivate all providers
    conn.execute("UPDATE providers SET is_active = 0", [])
        .map_err(|e| e.to_string())?;
    
    // Then activate the selected provider
    conn.execute("UPDATE providers SET is_active = 1 WHERE id = ?1", [&id])
        .map_err(|e| e.to_string())?;
    
    Ok(())
}
