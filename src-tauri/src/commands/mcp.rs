use crate::database::Database;
use crate::models::{MCPServer, AITool};
use tauri::State;
use anyhow::Result;

fn tools_to_string(tools: &[AITool]) -> String {
    tools
        .iter()
        .map(|t| match t {
            AITool::ClaudeCode => "claude-code",
            AITool::Codex => "codex",
            AITool::GeminiCli => "gemini-cli",
            AITool::OpenCode => "opencode",
            AITool::OpenClaw => "openclaw",
        })
        .collect::<Vec<_>>()
        .join(",")
}

fn string_to_tools(s: String) -> Vec<AITool> {
    s.split(',')
        .filter_map(|t| match t.trim() {
            "claude-code" => Some(AITool::ClaudeCode),
            "codex" => Some(AITool::Codex),
            "gemini-cli" => Some(AITool::GeminiCli),
            "opencode" => Some(AITool::OpenCode),
            "openclaw" => Some(AITool::OpenClaw),
            _ => None,
        })
        .collect()
}

#[tauri::command]
pub async fn get_mcp_servers(db: State<'_, Database>) -> Result<Vec<MCPServer>, String> {
    let conn = db.conn.lock().await;
    let mut stmt = conn
        .prepare(
            "SELECT id, name, command, args, env, tools, is_active, created_at, updated_at 
             FROM mcp_servers ORDER BY created_at DESC"
        )
        .map_err(|e| e.to_string())?;
    
    let servers = stmt
        .query_map([], |row| {
            let tools_str: String = row.get(5).unwrap_or_default();
            Ok(MCPServer {
                id: row.get(0)?,
                name: row.get(1)?,
                command: row.get(2)?,
                args: row.get::<_, String>(3)
                    .ok()
                    .map(|s| s.split(',').map(|s| s.to_string()).collect())
                    .unwrap_or_default(),
                env: row.get::<_, String>(4)
                    .ok()
                    .and_then(|s| serde_json::from_str(&s).ok())
                    .unwrap_or_default(),
                tools: string_to_tools(tools_str),
                is_active: row.get::<_, i32>(6)? == 1,
                created_at: row.get(7)?,
                updated_at: row.get(8)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;
    
    Ok(servers)
}

#[tauri::command]
pub async fn add_mcp_server(db: State<'_, Database>, server: MCPServer) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute(
        "INSERT INTO mcp_servers (id, name, command, args, env, tools, is_active, created_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
        [
            &server.id,
            &server.name,
            &server.command,
            &server.args.join(","),
            &serde_json::to_string(&server.env).unwrap_or_default(),
            &tools_to_string(&server.tools),
            &if server.is_active { "1" } else { "0" }.to_string(),
            &server.created_at.to_rfc3339(),
            &server.updated_at.to_rfc3339(),
        ],
    )
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn update_mcp_server(db: State<'_, Database>, id: String, server: MCPServer) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute(
        "UPDATE mcp_servers SET name = ?1, command = ?2, args = ?3, env = ?4, tools = ?5, is_active = ?6, updated_at = ?7
         WHERE id = ?8",
        [
            &server.name,
            &server.command,
            &server.args.join(","),
            &serde_json::to_string(&server.env).unwrap_or_default(),
            &tools_to_string(&server.tools),
            &if server.is_active { "1" } else { "0" }.to_string(),
            &chrono::Utc::now().to_rfc3339(),
            &id,
        ],
    )
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn delete_mcp_server(db: State<'_, Database>, id: String) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute("DELETE FROM mcp_servers WHERE id = ?1", [&id])
        .map_err(|e| e.to_string())?;
    
    Ok(())
}
