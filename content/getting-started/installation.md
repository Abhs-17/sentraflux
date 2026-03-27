# Installation

## Comprehensive Installation Guide

This guide covers all installation methods and configuration options for the DevOps tool. Choose the method that best fits your environment and requirements.

## System Requirements

### Minimum Requirements
- **CPU**: 2 cores
- **Memory**: 4GB RAM
- **Storage**: 10GB free space
- **Network**: Internet connection for initial setup

### Recommended Requirements
- **CPU**: 4+ cores
- **Memory**: 8GB+ RAM
- **Storage**: 20GB+ free space
- **Network**: Stable internet connection

### Supported Operating Systems
- **Linux**: Ubuntu 18.04+, CentOS 7+, Debian 9+
- **macOS**: 10.15+ (Catalina and later)
- **Windows**: Windows 10/11 (Build 19041+)

## Installation Methods

### Method 1: Binary Installation (Production Recommended)

#### Step 1: Download the Correct Binary

```bash
# Detect your system architecture
ARCH=$(uname -m)
OS=$(uname -s | tr '[:upper:]' '[:lower:]')

# Download the appropriate binary
curl -L "https://releases.devops-tool.com/latest/${OS}/${ARCH}/devops-tool" -o devops-tool
chmod +x devops-tool
```

#### Step 2: Move to System Path

```bash
# For system-wide installation
sudo mv devops-tool /usr/local/bin/

# Or for user-only installation
mkdir -p ~/bin
mv devops-tool ~/bin/
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

#### Step 3: Verify Installation

```bash
devops-tool --version
devops-tool --help
```

### Method 2: Package Manager Installation

#### npm (Node.js Ecosystem)

```bash
# Install from npm registry
npm install -g @devops-tool/cli

# Or using yarn
yarn global add @devops-tool/cli

# Verify installation
devops-tool --version
```

#### pip (Python Ecosystem)

```bash
# Install from PyPI
pip install devops-tool

# Or using pipx for isolated installation
pipx install devops-tool

# Verify installation
devops-tool --version
```

#### Homebrew (macOS)

```bash
# Add our tap
brew tap devops-tool/tap

# Install the tool
brew install devops-tool

# Verify installation
devops-tool --version
```

#### Chocolatey (Windows)

```powershell
# Install from Chocolatey gallery
choco install devops-tool

# Verify installation
devops-tool --version
```

### Method 3: Container Installation

#### Docker

```bash
# Pull the official image
docker pull devops-tool/cli:latest

# Create an alias for easier usage
echo 'alias devops-tool="docker run -it --rm -v $(pwd):/workspace -v /var/run/docker.sock:/var/run/docker.sock devops-tool/cli:latest"' >> ~/.bashrc
source ~/.bashrc

# Test the installation
devops-tool --version
```

#### Kubernetes

```yaml
# devops-tool-namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: devops-tool
---
# devops-tool-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-tool
  namespace: devops-tool
spec:
  replicas: 1
  selector:
    matchLabels:
      app: devops-tool
  template:
    metadata:
      labels:
        app: devops-tool
    spec:
      containers:
      - name: devops-tool
        image: devops-tool/cli:latest
        command: ["sleep", "infinity"]
        volumeMounts:
        - name: workspace
          mountPath: /workspace
      volumes:
      - name: workspace
        emptyDir: {}
```

```bash
# Apply the configuration
kubectl apply -f devops-tool-namespace.yaml
kubectl apply -f devops-tool-deployment.yaml

# Access the tool
kubectl exec -n devops-tool deployment/devops-tool -- devops-tool --version
```

## Configuration

### Environment Variables

Create a `.env` file in your project root:

```bash
# Core configuration
DEVOPS_TOOL_HOME=/path/to/devops-tool/home
DEVOPS_TOOL_CONFIG_FILE=/path/to/config.yml
DEVOPS_TOOL_LOG_LEVEL=info

# Network configuration
DEVOPS_TOOL_PORT=3000
DEVOPS_TOOL_HOST=0.0.0.0
DEVOPS_TOOL_SSL_CERT=/path/to/cert.pem
DEVOPS_TOOL_SSL_KEY=/path/to/key.pem

# Database configuration
DEVOPS_TOOL_DB_URL=postgresql://user:pass@localhost/devops_tool
DEVOPS_TOOL_REDIS_URL=redis://localhost:6379

# Cloud provider configuration
DEVOPS_TOOL_AWS_REGION=us-west-2
DEVOPS_TOOL_AWS_ACCESS_KEY_ID=your-access-key
DEVOPS_TOOL_AWS_SECRET_ACCESS_KEY=your-secret-key

# Optional: Google Cloud
DEVOPS_TOOL_GCP_PROJECT_ID=your-project-id
DEVOPS_TOOL_GCP_SERVICE_ACCOUNT_KEY=/path/to/service-account.json
```

### Configuration File

Create `config.yml`:

```yaml
# Basic configuration
version: "1.0"
name: "my-devops-project"

# Server settings
server:
  port: 3000
  host: "0.0.0.0"
  ssl:
    enabled: false
    cert_file: ""
    key_file: ""

# Database settings
database:
  type: "postgresql"
  host: "localhost"
  port: 5432
  name: "devops_tool"
  user: "devops_user"
  password: "secure_password"

# Cache settings
cache:
  type: "redis"
  host: "localhost"
  port: 6379
  db: 0

# Pipeline settings
pipelines:
  default_timeout: 3600
  max_concurrent: 5
  workspace: "/tmp/devops-workspace"

# Logging settings
logging:
  level: "info"
  format: "json"
  file: "/var/log/devops-tool.log"

# Integration settings
integrations:
  github:
    enabled: true
    token: "${GITHUB_TOKEN}"
  slack:
    enabled: true
    webhook_url: "${SLACK_WEBHOOK_URL}"
  email:
    enabled: true
    smtp_host: "smtp.gmail.com"
    smtp_port: 587
    username: "${EMAIL_USERNAME}"
    password: "${EMAIL_PASSWORD}"
```

## Verification

### Health Check

```bash
# Check if the tool is running
devops-tool status

# Detailed system information
devops-tool info

# Test all integrations
devops-tool test-integrations
```

### Run Diagnostics

```bash
# Full diagnostic check
devops-tool doctor

# Check specific components
devops-tool doctor --component database
devops-tool doctor --component network
devops-tool doctor --component storage
```

## Post-Installation Setup

### Initialize Your First Project

```bash
# Create a new project
mkdir my-project
cd my-project

# Initialize with default template
devops-tool init

# Or with specific template
devops-tool init --template microservice
```

### Configure Authentication

```bash
# Set up API tokens
devops-tool auth setup

# Add SSH keys for Git operations
devops-tool auth ssh-key add

# Configure cloud provider credentials
devops-tool auth aws configure
devops-tool auth gcloud configure
```

### Set Up Monitoring

```bash
# Enable built-in monitoring
devops-tool monitoring enable

# Configure alerting
devops-tool alerts configure

# Set up log aggregation
devops-tool logs configure
```

## Troubleshooting Installation Issues

### Common Problems

#### Permission Denied Errors
```bash
# Fix binary permissions
sudo chmod +x /usr/local/bin/devops-tool

# Or install in user directory
mkdir -p ~/.local/bin
mv devops-tool ~/.local/bin/
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```

#### Port Already in Use
```bash
# Find process using the port
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
devops-tool dev --port 3001
```

#### Network Connectivity Issues
```bash
# Test connectivity
curl -I https://releases.devops-tool.com

# Use proxy if needed
export HTTPS_PROXY=http://proxy.company.com:8080
devops-tool install
```

#### Database Connection Errors
```bash
# Test database connection
devops-tool db test

# Reset database
devops-tool db reset

# Migrate database
devops-tool db migrate
```

### Getting Help

```bash
# Get help for any command
devops-tool <command> --help

# Enable verbose logging
devops-tool --verbose <command>

# Check logs
devops-tool logs --tail 100
```

---

**🎉 Installation Complete!** You're ready to start using the DevOps tool. Continue to [Core Concepts](#core-concepts) to understand the architecture.
