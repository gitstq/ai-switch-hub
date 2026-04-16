use std::sync::Arc;
use tokio::sync::Mutex;
use tauri::AppHandle;
use rusqlite::Connection;
use std::path::PathBuf;
use anyhow::Result;

pub struct Database {
    pub conn: Arc<Mutex<Connection>>,
}

impl Database {
    pub fn new(conn: Connection) -> Self {
        Self {
            conn: Arc::new(Mutex::new(conn)),
        }
    }
}

pub fn get_db_path(app: &AppHandle) -> Result<PathBuf> {
    let app_data_dir = app.path().app_data_dir()?;
    std::fs::create_dir_all(&app_data_dir)?;
    Ok(app_data_dir.join("ai-switch-hub.db"))
}

pub async fn init_db(app: &AppHandle) -> Result<()> {
    let db_path = get_db_path(app)?;
    let conn = Connection::open(&db_path)?;
    
    // Create tables
    conn.execute_batch(
        r#"
        CREATE TABLE IF NOT EXISTS providers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            tool TEXT NOT NULL,
            api_key TEXT,
            base_url TEXT,
            model TEXT,
            is_active INTEGER DEFAULT 0,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            metadata TEXT
        );
        
        CREATE TABLE IF NOT EXISTS mcp_servers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            command TEXT NOT NULL,
            args TEXT,
            env TEXT,
            tools TEXT,
            is_active INTEGER DEFAULT 1,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS skills (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            source TEXT NOT NULL,
            source_url TEXT,
            version TEXT,
            tools TEXT,
            is_active INTEGER DEFAULT 1,
            installed_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );
        
        CREATE INDEX IF NOT EXISTS idx_providers_tool ON providers(tool);
        CREATE INDEX IF NOT EXISTS idx_providers_active ON providers(is_active);
        CREATE INDEX IF NOT EXISTS idx_mcp_active ON mcp_servers(is_active);
        CREATE INDEX IF NOT EXISTS idx_skills_active ON skills(is_active);
        "#,
    )?;
    
    // Store database in app state
    let db = Database::new(conn);
    app.manage(db);
    
    Ok(())
}
