# Debugging Guide

This guide provides strategies and techniques for debugging issues in OpenHands.

## General Debugging Approach

When encountering issues in OpenHands, follow this general approach:

1. **Identify the Problem**
   - Clearly define what is not working as expected
   - Gather error messages and logs
   - Determine which component is affected

2. **Isolate the Issue**
   - Narrow down the scope of the problem
   - Determine if the issue is reproducible
   - Identify the conditions under which the issue occurs

3. **Gather Information**
   - Check logs for error messages
   - Review configuration settings
   - Examine environment variables
   - Check system resources (CPU, memory, disk space)

4. **Test Hypotheses**
   - Form hypotheses about the cause of the issue
   - Test each hypothesis systematically
   - Eliminate possibilities one by one

5. **Apply Fixes**
   - Implement the solution
   - Test to ensure the issue is resolved
   - Document the solution for future reference

## Enabling Debug Logging

OpenHands uses Python's logging module for logging. To enable debug logging:

### Environment Variable

Set the `OPENHANDS_LOG_LEVEL` environment variable:

```bash
export OPENHANDS_LOG_LEVEL=DEBUG
```

### Configuration File

Update the `config.toml` file:

```toml
[logging]
level = "DEBUG"
```

### Component-Specific Logging

For more targeted debugging, you can enable logging for specific components:

```toml
[logging]
level = "INFO"
component_levels = { "openhands.runtime" = "DEBUG", "openhands.llm" = "DEBUG" }
```

## Debugging Tools

### Log Analysis

OpenHands logs are stored in the `logs/` directory. Use these commands to analyze logs:

```bash
# View the last 100 lines of the log file
tail -n 100 logs/openhands.log

# Follow the log file in real-time
tail -f logs/openhands.log

# Search for specific error messages
grep "ERROR" logs/openhands.log

# Search for a specific component
grep "runtime" logs/openhands.log
```

### Interactive Debugging

For interactive debugging, you can use Python's built-in debugger (pdb) or IPython's enhanced debugger (ipdb):

1. Install ipdb:
   ```bash
   pip install ipdb
   ```

2. Add breakpoints in the code:
   ```python
   import ipdb; ipdb.set_trace()
   ```

3. Run the application and it will stop at the breakpoint.

### Docker Debugging

For debugging Docker containers:

```bash
# View container logs
docker logs <container_id>

# Follow container logs
docker logs -f <container_id>

# Inspect container details
docker inspect <container_id>

# Execute a command in a running container
docker exec -it <container_id> /bin/bash
```

### Network Debugging

For debugging network issues:

```bash
# Check if a port is in use
sudo lsof -i :<port_number>

# Test network connectivity
ping <host>

# Trace network route
traceroute <host>

# Monitor network traffic
sudo tcpdump -i <interface> port <port_number>
```

## Component-Specific Debugging

### Agent Debugging

To debug agent issues:

1. Enable verbose agent logging:
   ```bash
   export OPENHANDS_LOG_LEVEL=DEBUG
   export AGENT_DEBUG=1
   ```

2. Check agent state:
   ```python
   # In code
   print(f"Agent state: {agent.state}")
   ```

3. Monitor agent actions and observations:
   ```bash
   # In logs
   grep "action:" logs/openhands.log
   grep "observation:" logs/openhands.log
   ```

### Runtime Debugging

To debug runtime issues:

1. Enable verbose runtime logging:
   ```bash
   export OPENHANDS_LOG_LEVEL=DEBUG
   export RUNTIME_DEBUG=1
   ```

2. Check runtime environment:
   ```bash
   # For Docker runtime
   docker exec -it <container_id> env
   ```

3. Test runtime actions directly:
   ```python
   # In code
   observation = await runtime.run("ls -la")
   print(f"Observation: {observation}")
   ```

### LLM Debugging

To debug LLM issues:

1. Enable verbose LLM logging:
   ```bash
   export OPENHANDS_LOG_LEVEL=DEBUG
   export LLM_DEBUG=1
   ```

2. Check LLM configuration:
   ```python
   # In code
   print(f"LLM config: {llm.config}")
   ```

3. Test LLM directly:
   ```python
   # In code
   response = await llm.completion("Test prompt")
   print(f"Response: {response}")
   ```

### Server Debugging

To debug server issues:

1. Enable verbose server logging:
   ```bash
   export OPENHANDS_LOG_LEVEL=DEBUG
   export SERVER_DEBUG=1
   ```

2. Check server status:
   ```bash
   ps aux | grep "uvicorn"
   ```

3. Test server endpoints directly:
   ```bash
   curl -X GET http://localhost:3000/api/health
   ```

### Frontend Debugging

To debug frontend issues:

1. Enable verbose frontend logging:
   ```bash
   # In browser console
   localStorage.setItem('debug', 'openhands:*');
   ```

2. Check browser console for errors:
   ```
   # Open browser developer tools (F12) and check console
   ```

3. Test API endpoints directly:
   ```bash
   curl -X GET http://localhost:3000/api/health
   ```

## Debugging Common Scenarios

### Debugging Agent Not Responding

If the agent is not responding:

1. Check if the agent is running:
   ```bash
   ps aux | grep "agent"
   ```

2. Check agent logs for errors:
   ```bash
   grep "ERROR" logs/openhands.log
   ```

3. Check LLM connectivity:
   ```bash
   # Test LLM API
   curl -X POST https://api.anthropic.com/v1/complete \
     -H "x-api-key: $LLM_API_KEY" \
     -H "content-type: application/json" \
     -d '{"prompt": "Hello", "model": "claude-3-5-sonnet-20241022", "max_tokens_to_sample": 10}'
   ```

4. Restart the agent:
   ```bash
   # Send a stop event to the agent
   # Then start a new task
   ```

### Debugging Runtime Execution Failures

If runtime execution is failing:

1. Check if the runtime is running:
   ```bash
   ps aux | grep "runtime"
   ```

2. Check runtime logs for errors:
   ```bash
   grep "ERROR" logs/openhands.log
   ```

3. Check Docker container status:
   ```bash
   docker ps -a
   ```

4. Restart the runtime:
   ```bash
   # For Docker runtime
   docker restart <container_id>
   ```

### Debugging WebSocket Connection Issues

If WebSocket connections are failing:

1. Check if the server is running:
   ```bash
   ps aux | grep "uvicorn"
   ```

2. Check server logs for errors:
   ```bash
   grep "ERROR" logs/openhands.log
   ```

3. Test WebSocket connection directly:
   ```bash
   # Using websocat
   websocat ws://localhost:3000/ws
   ```

4. Restart the server:
   ```bash
   # Kill the server process
   kill <pid>
   
   # Start the server again
   uvicorn openhands.server.listen:app --reload --port 3000
   ```

## Advanced Debugging Techniques

### Memory Profiling

To profile memory usage:

1. Install memory_profiler:
   ```bash
   pip install memory_profiler
   ```

2. Profile memory usage:
   ```python
   from memory_profiler import profile

   @profile
   def my_function():
       # Function code
       pass
   ```

3. Run the application with profiling:
   ```bash
   python -m memory_profiler my_script.py
   ```

### CPU Profiling

To profile CPU usage:

1. Install cProfile:
   ```bash
   # Built into Python
   ```

2. Profile CPU usage:
   ```bash
   python -m cProfile -o profile.out my_script.py
   ```

3. Analyze the profile:
   ```bash
   python -m pstats profile.out
   ```

### Remote Debugging

For remote debugging:

1. Install debugpy:
   ```bash
   pip install debugpy
   ```

2. Add remote debugging code:
   ```python
   import debugpy
   debugpy.listen(("0.0.0.0", 5678))
   debugpy.wait_for_client()
   ```

3. Connect to the remote debugger using VS Code or PyCharm.

## Debugging Best Practices

1. **Start Simple**
   - Begin with the simplest possible test case
   - Eliminate variables one by one

2. **Use Version Control**
   - Use git to track changes
   - Create branches for debugging
   - Revert to known good states if needed

3. **Document Everything**
   - Keep notes on what you've tried
   - Document the solution when found
   - Share knowledge with the team

4. **Isolate Components**
   - Test components in isolation
   - Use mock objects for dependencies
   - Simplify the environment

5. **Take Breaks**
   - Step away from difficult problems
   - Fresh perspective often leads to solutions
   - Collaborate with others

## Getting Help

If you continue to experience issues after trying these debugging techniques, please:

1. Check the [GitHub Issues](https://github.com/All-Hands-AI/OpenHands/issues) for similar problems and solutions
2. Join the [Community Chat](https://discord.gg/all-hands-ai) for real-time help
3. Create a new issue with detailed information about your problem, including:
   - Error messages
   - System information
   - Steps to reproduce
   - Logs and configuration files (with sensitive information removed)
