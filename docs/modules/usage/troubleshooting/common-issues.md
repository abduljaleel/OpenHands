# Common Issues and Solutions

This guide provides solutions for common issues encountered when using OpenHands.

## Installation Issues

### Docker Installation Fails

**Symptoms:**
- Error messages during `make build`
- Docker container fails to start
- Permission denied errors

**Solutions:**
1. Ensure Docker is installed and running:
   ```bash
   docker --version
   docker ps
   ```

2. Check for permission issues:
   ```bash
   sudo usermod -aG docker $USER
   # Log out and log back in
   ```

3. Verify Docker daemon is running:
   ```bash
   sudo systemctl start docker
   ```

4. Clean Docker cache and rebuild:
   ```bash
   docker system prune -a
   make build
   ```

### Poetry Installation Fails

**Symptoms:**
- Error messages during Poetry installation
- Dependency resolution errors
- Python version compatibility issues

**Solutions:**
1. Ensure you have Python 3.12 installed:
   ```bash
   python --version
   ```

2. Install or upgrade Poetry:
   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

3. Clear Poetry cache:
   ```bash
   poetry cache clear --all pypi
   ```

4. Try installing with verbose output:
   ```bash
   poetry install -v
   ```

## Runtime Issues

### Docker Runtime Fails to Start

**Symptoms:**
- Error messages when starting the application
- Docker container exits immediately
- Network connection errors

**Solutions:**
1. Check Docker logs:
   ```bash
   docker logs <container_id>
   ```

2. Verify Docker network settings:
   ```bash
   docker network ls
   ```

3. Ensure ports are not in use:
   ```bash
   sudo lsof -i :<port_number>
   ```

4. Rebuild the Docker image:
   ```bash
   make build
   ```

### Remote Runtime Connection Issues

**Symptoms:**
- Timeout errors when connecting to remote runtime
- Authentication failures
- Network connectivity issues

**Solutions:**
1. Check network connectivity:
   ```bash
   ping <remote_host>
   ```

2. Verify credentials:
   ```bash
   # Check your configuration file
   cat config.toml
   ```

3. Ensure the remote server is running:
   ```bash
   # Contact your administrator or check the server status
   ```

4. Try with verbose logging:
   ```bash
   # Set environment variable
   export OPENHANDS_LOG_LEVEL=DEBUG
   ```

## LLM Integration Issues

### API Key Authentication Failures

**Symptoms:**
- Error messages about invalid API keys
- Authentication failures
- Permission denied errors

**Solutions:**
1. Verify API key is set correctly:
   ```bash
   # Check environment variable
   echo $LLM_API_KEY
   
   # Check configuration file
   cat config.toml
   ```

2. Ensure API key has not expired:
   ```bash
   # Check with your LLM provider
   ```

3. Verify API key has correct permissions:
   ```bash
   # Check with your LLM provider
   ```

4. Try with a different API key:
   ```bash
   # Set environment variable
   export LLM_API_KEY=<new_api_key>
   ```

### LLM Request Failures

**Symptoms:**
- Timeout errors when making LLM requests
- Rate limit exceeded errors
- Model not found errors

**Solutions:**
1. Check network connectivity:
   ```bash
   ping <llm_provider_host>
   ```

2. Verify model name is correct:
   ```bash
   # Check configuration file
   cat config.toml
   ```

3. Check for rate limiting:
   ```bash
   # Wait a few minutes and try again
   ```

4. Try with a different model:
   ```bash
   # Set environment variable
   export LLM_MODEL=<different_model>
   ```

## Server Issues

### WebSocket Connection Failures

**Symptoms:**
- WebSocket connection errors
- Connection refused errors
- Timeout errors

**Solutions:**
1. Check server logs:
   ```bash
   # Check server logs
   tail -f logs/server.log
   ```

2. Verify server is running:
   ```bash
   ps aux | grep "uvicorn"
   ```

3. Check port availability:
   ```bash
   sudo lsof -i :3000
   ```

4. Restart the server:
   ```bash
   # Kill the server process
   kill <pid>
   
   # Start the server again
   uvicorn openhands.server.listen:app --reload --port 3000
   ```

### Server Crashes

**Symptoms:**
- Server process exits unexpectedly
- Error messages in server logs
- Unhandled exceptions

**Solutions:**
1. Check server logs:
   ```bash
   # Check server logs
   tail -f logs/server.log
   ```

2. Increase log verbosity:
   ```bash
   # Set environment variable
   export OPENHANDS_LOG_LEVEL=DEBUG
   ```

3. Check for memory issues:
   ```bash
   # Check memory usage
   free -h
   ```

4. Restart the server with more resources:
   ```bash
   # Start the server with more memory
   OPENHANDS_MEMORY_LIMIT=8G uvicorn openhands.server.listen:app --reload --port 3000
   ```

## Frontend Issues

### Frontend Build Failures

**Symptoms:**
- Error messages during frontend build
- Missing dependencies
- Compilation errors

**Solutions:**
1. Check Node.js version:
   ```bash
   node --version
   ```

2. Install or update dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

4. Try with verbose output:
   ```bash
   npm run build --verbose
   ```

### Frontend Runtime Errors

**Symptoms:**
- JavaScript errors in browser console
- Blank or partially loaded pages
- UI elements not functioning correctly

**Solutions:**
1. Check browser console for errors:
   ```
   # Open browser developer tools (F12) and check console
   ```

2. Clear browser cache:
   ```
   # In Chrome: Settings > Privacy and security > Clear browsing data
   ```

3. Try a different browser:
   ```
   # Firefox, Safari, Edge, etc.
   ```

4. Rebuild the frontend:
   ```bash
   cd frontend
   npm run build
   ```

## Agent Issues

### Agent Not Responding

**Symptoms:**
- Agent does not generate actions
- Timeout errors
- Stuck in processing state

**Solutions:**
1. Check agent logs:
   ```bash
   # Check agent logs
   tail -f logs/agent.log
   ```

2. Verify LLM connectivity:
   ```bash
   # Check LLM provider status
   ```

3. Restart the agent:
   ```bash
   # Send a stop event to the agent
   # Then start a new task
   ```

4. Try with a different agent implementation:
   ```bash
   # Set environment variable
   export AGENT_CLS=monologue_agent
   ```

### Agent Generating Incorrect Actions

**Symptoms:**
- Agent generates actions that do not make sense
- Actions fail to execute
- Task not progressing as expected

**Solutions:**
1. Check agent logs:
   ```bash
   # Check agent logs
   tail -f logs/agent.log
   ```

2. Try with a more detailed task description:
   ```
   # Provide more context and clearer instructions
   ```

3. Try with a different model:
   ```bash
   # Set environment variable
   export LLM_MODEL=<different_model>
   ```

4. Adjust model parameters:
   ```bash
   # Set environment variable
   export LLM_TEMPERATURE=0.2
   ```

## File System Issues

### Permission Denied Errors

**Symptoms:**
- Error messages about permission denied
- File operations fail
- Access denied errors

**Solutions:**
1. Check file permissions:
   ```bash
   ls -la <file_or_directory>
   ```

2. Change file permissions:
   ```bash
   chmod 644 <file>
   chmod 755 <directory>
   ```

3. Check ownership:
   ```bash
   chown <user>:<group> <file_or_directory>
   ```

4. Run with elevated privileges (if appropriate):
   ```bash
   sudo make run
   ```

### File Not Found Errors

**Symptoms:**
- Error messages about file not found
- File operations fail
- Path does not exist errors

**Solutions:**
1. Check file existence:
   ```bash
   ls -la <file_or_directory>
   ```

2. Check current working directory:
   ```bash
   pwd
   ```

3. Create missing directories:
   ```bash
   mkdir -p <directory_path>
   ```

4. Check for typos in file paths:
   ```bash
   # Double-check file paths in configuration files
   ```

## Browser Integration Issues

### Browser Automation Failures

**Symptoms:**
- Browser actions fail to execute
- Timeout errors
- Element not found errors

**Solutions:**
1. Check browser logs:
   ```bash
   # Check browser logs
   tail -f logs/browser.log
   ```

2. Verify browser installation:
   ```bash
   # Check if browser is installed
   which chromium-browser
   ```

3. Try with a different browser:
   ```bash
   # Set environment variable
   export BROWSER=firefox
   ```

4. Increase timeouts:
   ```bash
   # Set environment variable
   export BROWSER_TIMEOUT=30000
   ```

### Browser Rendering Issues

**Symptoms:**
- Pages not rendering correctly
- Missing elements
- JavaScript errors

**Solutions:**
1. Check browser console for errors:
   ```
   # Open browser developer tools (F12) and check console
   ```

2. Try with JavaScript disabled:
   ```
   # Disable JavaScript in browser settings
   ```

3. Try with a different browser:
   ```
   # Firefox, Safari, Edge, etc.
   ```

4. Update browser to latest version:
   ```bash
   # Update browser
   ```

## Configuration Issues

### Configuration File Not Found

**Symptoms:**
- Error messages about missing configuration
- Default values being used
- Unexpected behavior

**Solutions:**
1. Check configuration file existence:
   ```bash
   ls -la config.toml
   ```

2. Create configuration file from template:
   ```bash
   cp config.template.toml config.toml
   ```

3. Check configuration file path:
   ```bash
   # Set environment variable
   export OPENHANDS_CONFIG_PATH=/path/to/config.toml
   ```

4. Run with verbose logging:
   ```bash
   # Set environment variable
   export OPENHANDS_LOG_LEVEL=DEBUG
   ```

### Invalid Configuration Values

**Symptoms:**
- Error messages about invalid configuration
- Configuration validation failures
- Unexpected behavior

**Solutions:**
1. Check configuration file format:
   ```bash
   # Validate TOML syntax
   ```

2. Verify required fields are present:
   ```bash
   # Check against template
   diff config.template.toml config.toml
   ```

3. Check for typos in configuration values:
   ```bash
   # Double-check configuration values
   ```

4. Reset to default configuration:
   ```bash
   cp config.template.toml config.toml
   ```

## Getting Help

If you continue to experience issues after trying these solutions, please:

1. Check the [GitHub Issues](https://github.com/All-Hands-AI/OpenHands/issues) for similar problems and solutions
2. Join the [Community Chat](https://discord.gg/all-hands-ai) for real-time help
3. Create a new issue with detailed information about your problem, including:
   - Error messages
   - System information
   - Steps to reproduce
   - Logs and configuration files (with sensitive information removed)
