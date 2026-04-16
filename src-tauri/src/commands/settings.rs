use crate::database::Database;
use crate::models::AppSettings;
use tauri::State;
use serde_json;

#[tauri::command]
pub async fn get_settings(db: State<'_, Database>) -> Result<AppSettings, String> {
    let conn = db.conn.lock().await;
    
    let theme: String = conn
        .query_row("SELECT value FROM settings WHERE key = 'theme'", [], |row| row.get(0))
        .unwrap_or_else(|_| "system".to_string());
    
    let language: String = conn
        .query_row("SELECT value FROM settings WHERE key = 'language'", [], |row| row.get(0))
        .unwrap_or_else(|_| "en".to_string());
    
    let auto_launch: bool = conn
        .query_row("SELECT value FROM settings WHERE key = 'auto_launch'", [], |row| {
            let v: String = row.get(0)?;
            Ok(v == "true")
        })
        .unwrap_or(false);
    
    let minimize_to_tray: bool = conn
        .query_row("SELECT value FROM settings WHERE key = 'minimize_to_tray'", [], |row| {
            let v: String = row.get(0)?;
            Ok(v == "true")
        })
        .unwrap_or(true);
    
    let cloud_sync: bool = conn
        .query_row("SELECT value FROM settings WHERE key = 'cloud_sync'", [], |row| {
            let v: String = row.get(0)?;
            Ok(v == "true")
        })
        .unwrap_or(false);
    
    let sync_provider: Option<String> = conn
        .query_row("SELECT value FROM settings WHERE key = 'sync_provider'", [], |row| row.get(0))
        .ok();
    
    Ok(AppSettings {
        theme,
        language,
        auto_launch,
        minimize_to_tray,
        cloud_sync,
        sync_provider,
        custom_sync_path: None,
    })
}

#[tauri::command]
pub async fn update_settings(db: State<'_, Database>, settings: AppSettings) -> Result<(), String> {
    let conn = db.conn.lock().await;
    
    // Upsert each setting
    let settings_map = vec![
        ("theme", settings.theme.as_str()),
        ("language", settings.language.as_str()),
        ("auto_launch", if settings.auto_launch { "true" } else { "false" }),
        ("minimize_to_tray", if settings.minimize_to_tray { "true" } else { "false" }),
        ("cloud_sync", if settings.cloud_sync { "true" } else { "false" }),
    ];
    
    for (key, value) in settings_map {
        conn.execute(
            "INSERT OR REPLACE INTO settings (key, value) VALUES (?1, ?2)",
            [key, value],
        )
        .map_err(|e| e.to_string())?;
    }
    
    if let Some(provider) = settings.sync_provider {
        conn.execute(
            "INSERT OR REPLACE INTO settings (key, value) VALUES ('sync_provider', ?1)",
            [&provider],
        )
        .map_err(|e| e.to_string())?;
    }
    
    Ok(())
}
