# CodeForge — Full-Stack Universal Compiler

A **native** compiler IDE — runs code directly on your machine with **zero limits**.

## ✅ What Works (No Limits!)

| Feature | Status |
|---|---|
| File I/O (read/write files) | ✅ Full support |
| Network requests (HTTP, sockets) | ✅ Full support |
| Install packages (pip, npm, gem) | ✅ Built-in installer |
| No time limit | ✅ Configurable (default: unlimited) |
| No memory cap | ✅ Uses your machine's RAM |
| GUI programs | ⚠️ Terminal output only (no windows) |
| 25+ languages | ✅ Full support |

---

## 🚀 Quick Start

### Step 1 — Install Node.js
Download from https://nodejs.org (LTS version recommended)

### Step 2 — Start the Backend Server

```bash
cd backend
npm install
npm start
```

You should see:
```
╔══════════════════════════════════════╗
║   CodeForge Server running!          ║
║   http://localhost:5000             ║
╚══════════════════════════════════════╝
```

### Step 3 — Open the App

Open your browser and go to:
```
http://localhost:5000
```

That's it! The server also serves the frontend automatically.

---

## 📁 Project Structure

```
codeforge-full/
├── backend/
│   ├── server.js         ← Node.js server (runs your code)
│   ├── package.json      ← Dependencies
│   └── package-lock.json
├── frontend/
│   ├── index.html        ← Main UI
│   ├── css/
│   │   └── style.css     ← All styles
│   └── js/
│       ├── snippets.js   ← Code snippets per language
│       └── app.js        ← Frontend logic
└── README.md
```

---

## 🔧 Install Language Runtimes

The compiler needs the language runtimes installed on your PC.

### Windows
```powershell
# Python
winget install Python.Python.3

# Node.js
winget install OpenJS.NodeJS

# Java
winget install Microsoft.OpenJDK.21

# GCC (C/C++) — via MSYS2
winget install MSYS2.MSYS2
# Then in MSYS2: pacman -S mingw-w64-x86_64-gcc

# Go
winget install GoLang.Go

# Rust
winget install Rustlang.Rustup

# Ruby
winget install RubyInstallerTeam.Ruby
```

### macOS
```bash
# Install Homebrew first: https://brew.sh
brew install python node go rust ruby php lua r

# Java
brew install --cask temurin

# C/C++ (comes with Xcode CLI tools)
xcode-select --install
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y python3 python3-pip nodejs npm \
  default-jdk g++ gcc golang rustc ruby php \
  lua5.3 r-base perl bash sqlite3 \
  ghc mono-complete kotlin elixir groovy
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` | Run code |
| `Tab` | Insert 2 spaces |
| `■ Stop` button | Kill running process |

---

## 🌐 API Endpoints

The backend exposes these REST endpoints:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/run` | Execute code |
| POST | `/api/kill` | Stop a running process |
| GET  | `/api/check` | Check installed runtimes |
| GET  | `/api/languages` | List supported languages |
| POST | `/api/install` | Install packages |

### Run Code Example
```json
POST /api/run
{
  "language": "python3",
  "code": "print('Hello!')",
  "stdin": "",
  "timeout": 0
}
```

`timeout: 0` = no time limit. Set to seconds for a limit (e.g. `timeout: 30`).

---

## 🎨 Customization

- **5 accent colors** — Purple, Cyan, Pink, Green, Amber (navbar dots)
- **Dark/Light mode** — 🌙 button in navbar
- **Font size** — toolbar dropdown
- **Timeout** — toolbar dropdown (default: unlimited)
- **Drag resizer** — drag the center bar to resize panels

---

## 📦 Install Python Packages In-App

Click **📦 Install Pkg** in the toolbar:
- Select `pip` and enter package names like `numpy pandas matplotlib`
- The server will run `pip3 install` and stream output live

Or install directly in your code:
```python
import subprocess, sys
subprocess.check_call([sys.executable, "-m", "pip", "install", "requests"])
import requests
```

---

## 🛡 Security Note

This server runs code **directly on your machine** with no sandboxing. Only run it locally or on a trusted private network. Do not expose port 5000 to the internet.

For a public deployment, add Docker sandboxing (each job runs in an isolated container).
