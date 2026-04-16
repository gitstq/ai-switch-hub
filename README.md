# 🚀 AI Switch Hub

<div align="center">

![AI Switch Hub](https://img.shields.io/badge/AI%20Switch%20Hub-v1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-informational?style=for-the-badge)

**A Unified Management Platform for AI Coding CLI Tools**

Manage **Claude Code**, **Codex**, **Gemini CLI**, **OpenCode**, and **OpenClaw** from a single desktop application.

[English](#english) | [简体中文](#简体中文) | [繁體中文](#繁體中文) | [日本語](#日本語)

</div>

---

<a name="english"></a>
## 🇺🇸 English

### 🎉 Project Introduction

AI Switch Hub is a cross-platform desktop application designed to simplify the management of multiple AI coding CLI tools. Instead of manually editing JSON, TOML, or .env configuration files for each tool, you get a unified visual interface to manage providers, switch between them instantly, and keep everything in sync.

### ✨ Core Features

- **🔄 One App, Five CLI Tools** — Manage Claude Code, Codex, Gemini CLI, OpenCode, and OpenClaw from a single interface
- **📦 50+ Provider Presets** — Pre-configured provider templates for AWS Bedrock, NVIDIA NIM, and community relay services
- **🔌 Unified MCP Management** — Manage MCP servers across all tools with bidirectional sync
- **🎯 Skills Management** — Install and sync skills across multiple AI coding tools
- **📊 Session History** — Browse, search, and restore conversation history from all your AI tools
- **🌙 Dark/Light/System Theme** — Choose your preferred appearance
- **☁️ Cloud Sync** — Sync your configuration across devices via Dropbox, iCloud, or WebDAV

### 🚀 Quick Start

#### Prerequisites
- Windows 10+, macOS 12+, or Linux (Ubuntu 22.04+)
- No additional dependencies required

#### Installation

**Windows:**
```bash
# Download the MSI installer from Releases
# Or use portable version
```

**macOS:**
```bash
# Homebrew (recommended)
brew tap gitstq/ai-switch-hub
brew install --cask ai-switch-hub

# Or download DMG from Releases
```

**Linux:**
```bash
# Download .deb, .rpm, or AppImage from Releases
sudo dpkg -i ai-switch-hub_1.0.0_amd64.deb
```

#### First Run

1. Launch AI Switch Hub
2. Click "Add Provider" to configure your first AI tool
3. Enter your API key and endpoint
4. Click "Activate" to switch to the new provider
5. Restart your terminal or CLI tool to apply changes

### 📖 Detailed Usage Guide

#### Provider Management

- **Add Provider**: Click "Add Provider" → Choose a preset or create custom configuration
- **Switch Provider**: Select a provider → Click "Activate"
- **Edit Provider**: Click the edit icon to modify settings
- **Delete Provider**: Click the trash icon (active provider cannot be deleted)

#### MCP Server Management

1. Navigate to "MCP Servers" page
2. Click "Add MCP Server"
3. Enter server name, command, and arguments
4. Select which tools should use this server
5. Toggle server on/off as needed

#### Skills Management

1. Navigate to "Skills" page
2. Install skills from GitHub repositories or local files
3. Enable/disable skills per tool
4. Skills are automatically synced to configured tools

### 💡 Design Philosophy

AI Switch Hub follows a "minimal intrusion" design principle:
- Your existing CLI tools work independently
- Configuration changes are written to standard config files
- Even if you uninstall AI Switch Hub, your tools continue to work
- SQLite database provides reliable, atomic storage

### 📦 Build & Deploy

```bash
# Install dependencies
pnpm install

# Development mode
pnpm tauri:dev

# Production build
pnpm tauri:build
```

### 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<a name="简体中文"></a>
## 🇨🇳 简体中文

### 🎉 项目介绍

AI Switch Hub 是一款跨平台桌面应用，专为简化多个 AI 编程 CLI 工具的管理而设计。无需手动编辑每个工具的 JSON、TOML 或 .env 配置文件，您可以在统一的可视化界面中管理 Provider、即时切换，并保持一切同步。

### ✨ 核心特性

- **🔄 一个应用，五个 CLI 工具** — 统一管理 Claude Code、Codex、Gemini CLI、OpenCode 和 OpenClaw
- **📦 50+ Provider 预设** — 预配置的 AWS Bedrock、NVIDIA NIM 和社区中继服务模板
- **🔌 统一 MCP 管理** — 跨所有工具管理 MCP 服务器，双向同步
- **🎯 Skills 管理** — 安装并在多个 AI 编程工具间同步技能
- **📊 会话历史** — 浏览、搜索和恢复所有 AI 工具的对话历史
- **🌙 深色/浅色/跟随系统主题** — 选择您喜欢的外观
- **☁️ 云同步** — 通过 Dropbox、iCloud 或 WebDAV 在设备间同步配置

### 🚀 快速开始

#### 系统要求
- Windows 10 或更高版本 / macOS 12 或更高版本 / Linux (Ubuntu 22.04+)
- 无需额外依赖

#### 安装方式

**Windows:**
```bash
# 从 Releases 下载 MSI 安装包
# 或使用便携版
```

**macOS:**
```bash
# Homebrew（推荐）
brew tap gitstq/ai-switch-hub
brew install --cask ai-switch-hub

# 或从 Releases 下载 DMG
```

**Linux:**
```bash
# 从 Releases 下载 .deb、.rpm 或 AppImage
sudo dpkg -i ai-switch-hub_1.0.0_amd64.deb
```

### 📖 详细使用指南

#### Provider 管理

- **添加 Provider**：点击"添加 Provider" → 选择预设或创建自定义配置
- **切换 Provider**：选择 Provider → 点击"激活"
- **编辑 Provider**：点击编辑图标修改设置
- **删除 Provider**：点击删除图标（当前激活的 Provider 无法删除）

#### MCP 服务器管理

1. 进入"MCP 服务器"页面
2. 点击"添加 MCP 服务器"
3. 输入服务器名称、命令和参数
4. 选择应该使用此服务器的工具
5. 按需开关服务器

### 💡 设计理念

AI Switch Hub 遵循"最小侵入"设计原则：
- 您现有的 CLI 工具独立运行
- 配置更改写入标准配置文件
- 即使卸载 AI Switch Hub，您的工具仍可正常工作
- SQLite 数据库提供可靠的原子存储

### 🤝 参与贡献

欢迎贡献！请阅读我们的[贡献指南](CONTRIBUTING.md)了解详情。

### 📄 开源协议

本项目采用 MIT 协议开源 - 详情请查看 [LICENSE](LICENSE) 文件。

---

<a name="繁體中文"></a>
## 🇹🇼 繁體中文

### 🎉 專案介紹

AI Switch Hub 是一款跨平台桌面應用程式，專為簡化多個 AI 程式設計 CLI 工具的管理而設計。無需手動編輯每個工具的 JSON、TOML 或 .env 設定檔，您可以在統一的視覺化介面中管理 Provider、即時切換，並保持一切同步。

### ✨ 核心功能

- **🔄 一個應用程式，五個 CLI 工具** — 統一管理 Claude Code、Codex、Gemini CLI、OpenCode 和 OpenClaw
- **📦 50+ Provider 預設** — 預先設定的 AWS Bedrock、NVIDIA NIM 和社群中繼服務範本
- **🔌 統一 MCP 管理** — 跨所有工具管理 MCP 伺服器，雙向同步
- **🎯 Skills 管理** — 安裝並在多個 AI 程式設計工具間同步技能
- **📊 工作階段歷史** — 瀏覽、搜尋和還原所有 AI 工具的對話歷史
- **🌙 深色/淺色/跟隨系統佈景主題** — 選擇您喜歡的外觀
- **☁️ 雲端同步** — 透過 Dropbox、iCloud 或 WebDAV 在裝置間同步設定

### 🚀 快速開始

請參考簡體中文部分的安裝說明。

### 📄 授權條款

本專案採用 MIT 授權條款 - 詳情請查看 [LICENSE](LICENSE) 檔案。

---

<a name="日本語"></a>
## 🇯🇵 日本語

### 🎉 プロジェクト紹介

AI Switch Hub は、複数の AI コーディング CLI ツールの管理を簡素化するために設計されたクロスプラットフォームデスクトップアプリケーションです。各ツールの JSON、TOML、.env 設定ファイルを手動で編集する代わりに、統一されたビジュアルインターフェースでプロバイダーを管理し、即座に切り替え、すべてを同期させることができます。

### ✨ 主な機能

- **🔄 1つのアプリで5つのCLIツール** — Claude Code、Codex、Gemini CLI、OpenCode、OpenClawを1つのインターフェースで管理
- **📦 50以上のプロバイダープリセット** — AWS Bedrock、NVIDIA NIM、コミュニティリレーサービスの事前設定テンプレート
- **🔌 統合MCP管理** — すべてのツール間でMCPサーバーを管理し、双方向同期
- **🎯 スキル管理** — 複数のAIコーディングツール間でスキルをインストール・同期
- **📊 セッション履歴** — すべてのAIツールの会話履歴を閲覧、検索、復元
- **🌙 ダーク/ライト/システムテーマ** — お好みの外観を選択
- **☁️ クラウド同期** — Dropbox、iCloud、WebDAV経由でデバイス間で設定を同期

### 🚀 クイックスタート

インストール手順については、簡体字中国語のセクションを参照してください。

### 📄 ライセンス

このプロジェクトは MIT ライセンスの下でライセンスされています - 詳細は [LICENSE](LICENSE) ファイルを参照してください。

---

## 📊 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | TailwindCSS 3.4 |
| State | Zustand + TanStack Query |
| Desktop | Tauri 2.x (Rust) |
| Database | SQLite |
| Icons | Lucide React |

## 📈 Roadmap

- [ ] Real-time usage statistics and cost tracking
- [ ] Team collaboration features
- [ ] Local proxy mode with hot-switching
- [ ] Auto-failover and circuit breaker
- [ ] Plugin system for extensions

---

<div align="center">

**Made with ❤️ by [gitstq](https://github.com/gitstq)**

[⬆ Back to Top](#-ai-switch-hub)

</div>
