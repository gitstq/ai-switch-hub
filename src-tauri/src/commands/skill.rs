use crate::database::Database;
use crate::models::{Skill, SkillSource, AITool};
use tauri::State;

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

fn string_to_source(s: &str) -> SkillSource {
    match s {
        "github" => SkillSource::GitHub,
        "local" => SkillSource::Local,
        "registry" => SkillSource::Registry,
        _ => SkillSource::GitHub,
    }
}

#[tauri::command]
pub async fn get_skills(db: State<'_, Database>) -> Result<Vec<Skill>, String> {
    let conn = db.conn.lock().await;
    let mut stmt = conn
        .prepare(
            "SELECT id, name, description, source, source_url, version, tools, is_active, installed_at, updated_at 
             FROM skills ORDER BY installed_at DESC"
        )
        .map_err(|e| e.to_string())?;
    
    let skills = stmt
        .query_map([], |row| {
            let tools_str: String = row.get(6).unwrap_or_default();
            let source_str: String = row.get(3).unwrap_or_default();
            Ok(Skill {
                id: row.get(0)?,
                name: row.get(1)?,
                description: row.get(2)?,
                source: string_to_source(&source_str),
                source_url: row.get(4)?,
                version: row.get(5)?,
                tools: string_to_tools(tools_str),
                is_active: row.get::<_, i32>(7)? == 1,
                installed_at: row.get(8)?,
                updated_at: row.get(9)?,
            })
        })
        .map_err(|e| e.to_string())?
        .collect::<Result<Vec<_>, _>>()
        .map_err(|e| e.to_string())?;
    
    Ok(skills)
}

#[tauri::command]
pub async fn add_skill(db: State<'_, Database>, skill: Skill) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute(
        "INSERT INTO skills (id, name, description, source, source_url, version, tools, is_active, installed_at, updated_at)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
        [
            &skill.id,
            &skill.name,
            &skill.description,
            &match skill.source {
                SkillSource::GitHub => "github".to_string(),
                SkillSource::Local => "local".to_string(),
                SkillSource::Registry => "registry".to_string(),
            },
            &skill.source_url.unwrap_or_default(),
            &skill.version,
            &tools_to_string(&skill.tools),
            &if skill.is_active { "1" } else { "0" }.to_string(),
            &skill.installed_at.to_rfc3339(),
            &skill.updated_at.to_rfc3339(),
        ],
    )
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn update_skill(db: State<'_, Database>, id: String, skill: Skill) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute(
        "UPDATE skills SET name = ?1, description = ?2, source = ?3, source_url = ?4, version = ?5, tools = ?6, is_active = ?7, updated_at = ?8
         WHERE id = ?9",
        [
            &skill.name,
            &skill.description,
            &match skill.source {
                SkillSource::GitHub => "github".to_string(),
                SkillSource::Local => "local".to_string(),
                SkillSource::Registry => "registry".to_string(),
            },
            &skill.source_url.unwrap_or_default(),
            &skill.version,
            &tools_to_string(&skill.tools),
            &if skill.is_active { "1" } else { "0" }.to_string(),
            &chrono::Utc::now().to_rfc3339(),
            &id,
        ],
    )
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[tauri::command]
pub async fn delete_skill(db: State<'_, Database>, id: String) -> Result<(), String> {
    let conn = db.conn.lock().await;
    conn.execute("DELETE FROM skills WHERE id = ?1", [&id])
        .map_err(|e| e.to_string())?;
    
    Ok(())
}
