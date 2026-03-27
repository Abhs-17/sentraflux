# Quick Start

## Get Up and Running in 5 Minutes

This guide will help you get the DevOps tool running with minimal configuration. Perfect for testing, development, or quick evaluations.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 16+** or **Python 3.8+** installed
- **Git** for version control
- **Docker** (optional, for containerized deployment)
- **Command line/terminal access**

## Option 1: Binary Installation (Recommended)

### Step 1: Download the Binary

```bash
# For macOS
curl -L https://releases.devops-tool.com/latest/darwin/amd64/devops-tool -o devops-tool
chmod +x devops-tool

# For Linux
curl -L https://releases.devops-tool.com/latest/linux/amd64/devops-tool -o devops-tool
chmod +x devops-tool

# For Windows
curl -L https://releases.devops-tool.com/latest/windows/amd64/devops-tool.exe -o devops-tool.exe
```

### Step 2: Initialize Your Project

```bash
# Create a new project directory
mkdir my-devops-project
cd my-devops-project

# Initialize the project
./devops-tool init

# Follow the interactive prompts
```

### Step 3: Run Your First Pipeline

```bash
# Start the development server
./devops-tool dev

# In another terminal, run a sample pipeline
./devops-tool pipeline run --sample
```

## Option 2: Package Manager Installation

### Using npm (Node.js)

```bash
# Install globally
npm install -g @devops-tool/cli

# Initialize project
devops-tool init

# Run development server
devops-tool dev
```

### Using pip (Python)

```bash
# Install globally
pip install devops-tool

# Initialize project
devops-tool init

# Run development server
devops-tool dev
```

## Option 3: Docker Installation

```bash
# Pull the latest image
docker pull devops-tool/cli:latest

# Run the tool
docker run -it --rm -v $(pwd):/workspace devops-tool/cli:latest init

# For persistent usage
alias devops-tool="docker run -it --rm -v $(pwd):/workspace devops-tool/cli:latest"
```

## What Happens Next?

After initialization, you'll see:

```
🎉 Project initialized successfully!

📁 Project Structure:
├── .devops/
│   ├── config.yml          # Main configuration
│   ├── pipelines/          # Pipeline definitions
│   └── environments/       # Environment configs
├── src/                   # Your application code
└── README.md              # Project documentation

🚀 Next Steps:
1. Review .devops/config.yml
2. Check the sample pipelines in .devops/pipelines/
3. Run: devops-tool pipeline list
4. Deploy with: devops-tool deploy --env staging
```

## Verify Your Installation

```bash
# Check the tool version
devops-tool --version

# List available commands
devops-tool --help

# Test connectivity
devops-tool status
```

## Common Quick Start Commands

```bash
# Start development mode
devops-tool dev

# Run a specific pipeline
devops-tool pipeline run <pipeline-name>

# Deploy to staging
devops-tool deploy --env staging

# View logs
devops-tool logs --follow

# Check system status
devops-tool status
```

## Next Steps

🎯 **You're now ready to explore!**

1. **Configure your first pipeline** - Check the [Installation](#installation) guide for detailed setup
2. **Understand the architecture** - Read [Core Concepts](#core-concepts)
3. **Follow tutorials** - Visit the [Tutorials](#tutorials) section
4. **Integrate with your tools** - See the [API Reference](#api-reference)

## Troubleshooting Quick Start Issues

### Port Already in Use
```bash
# Kill existing processes
lsof -ti:3000 | xargs kill -9

# Or use a different port
devops-tool dev --port 3001
```

### Permission Denied
```bash
# Make the binary executable
chmod +x devops-tool

# Or use sudo (not recommended)
sudo ./devops-tool init
```

### Network Issues
```bash
# Use a different registry
devops-tool config set registry https://mirror.devops-tool.com

# Or use offline mode
devops-tool init --offline
```

---

**🎉 Congratulations!** You have successfully set up the DevOps tool. Continue to the [Installation](#installation) guide for detailed configuration options.
