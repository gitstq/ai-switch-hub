# Contributing to AI Switch Hub

Thank you for your interest in contributing to AI Switch Hub! This document provides guidelines and instructions for contributing.

## 🌟 Ways to Contribute

- **Bug Reports**: Submit issues for bugs you encounter
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit pull requests for bug fixes or new features
- **Documentation**: Help improve our documentation
- **Translations**: Add or improve translations

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+
- Rust 1.70+ (with rustup)
- Platform-specific build tools:
  - **Windows**: Microsoft Visual Studio C++ Build Tools
  - **macOS**: Xcode Command Line Tools
  - **Linux**: build-essential, libgtk-3-dev, libwebkit2gtk-4.0-dev

### Getting Started

```bash
# Clone the repository
git clone https://github.com/gitstq/ai-switch-hub.git
cd ai-switch-hub

# Install dependencies
pnpm install

# Start development server
pnpm tauri:dev
```

### Project Structure

```
ai-switch-hub/
├── src/                    # Frontend React code
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── stores/            # Zustand state management
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── src-tauri/             # Rust backend code
│   ├── src/
│   │   ├── commands/      # Tauri command handlers
│   │   ├── database/      # SQLite operations
│   │   ├── models/        # Data models
│   │   └── services/      # Business logic
│   └── tauri.conf.json    # Tauri configuration
└── package.json
```

## 📝 Code Style

### TypeScript/React

- Use functional components with hooks
- Follow ESLint rules (run `pnpm lint`)
- Format with Prettier (run `pnpm format`)
- Use TypeScript strict mode

### Rust

- Follow standard Rust formatting (`cargo fmt`)
- Pass clippy checks (`cargo clippy`)
- Document public functions

## 🔄 Pull Request Process

1. **Fork & Branch**: Fork the repo and create a feature branch
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make Changes**: Implement your changes with clear commits
   ```bash
   git commit -m "feat: add new feature"
   ```

3. **Test**: Ensure your changes work correctly
   ```bash
   pnpm build
   pnpm tauri:build
   ```

4. **Push & PR**: Push your branch and open a Pull Request
   ```bash
   git push origin feature/my-feature
   ```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: How to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: OS, version, relevant software versions
6. **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests, please describe:

1. **Problem**: What problem does this solve?
2. **Solution**: Your proposed solution
3. **Alternatives**: Other solutions you considered
4. **Impact**: Who would benefit from this feature?

## 📋 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the community

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AI Switch Hub! 🚀
