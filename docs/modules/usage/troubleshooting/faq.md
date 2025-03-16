# Frequently Asked Questions

This document provides answers to frequently asked questions about OpenHands.

## General Questions

### What is OpenHands?

OpenHands is an AI-powered software development agent platform designed to automate coding tasks. It enables developers to interact with Large Language Models (LLMs) to modify code, run commands, browse the web, and call APIs within a secure, sandboxed environment.

### How does OpenHands differ from other AI coding assistants?

OpenHands differentiates itself through:

1. **Full System Access**: Unlike chat-based assistants, OpenHands can execute commands, modify files, and interact with the web.
2. **Sandboxed Environment**: All operations occur in a secure, isolated environment.
3. **Event-Driven Architecture**: The modular, event-driven design allows for extensibility and customization.
4. **Multi-Agent System**: Specialized agents can be delegated for specific tasks.
5. **Open Source**: The entire system is open source and can be modified and extended.

### What can I use OpenHands for?

OpenHands can be used for:

- Developing code with AI assistance in multiple languages
- Debugging existing codebases
- Automating repetitive coding tasks
- Browsing web content and calling APIs for research
- Processing and transforming code repositories
- Automating GitHub issue resolution with AI

### Is OpenHands free to use?

Yes, OpenHands is open source and free to use. However, you will need to provide your own API keys for the language models you want to use.

## Installation and Setup

### What are the system requirements for OpenHands?

OpenHands requires:

- Linux, macOS, or Windows with WSL
- Docker
- Python 3.12
- Node.js 20.x or later
- Poetry 1.8 or later

### How do I install OpenHands?

To install OpenHands:

1. Clone the repository:
   ```bash
   git clone https://github.com/All-Hands-AI/OpenHands.git
   cd OpenHands
   ```

2. Build the application:
   ```bash
   make build
   ```

3. Configure the language model:
   ```bash
   make setup-config
   ```

4. Run the application:
   ```bash
   make run
   ```

### Which language models does OpenHands support?

OpenHands supports a wide range of language models through the LiteLLM library, including:

- OpenAI (GPT-3.5, GPT-4)
- Anthropic (Claude, Claude 2, Claude 3)
- Google (Gemini, PaLM)
- Azure OpenAI
- Groq (LLaMA, Mixtral)
- OpenRouter (Various models)

### How do I configure OpenHands to use my preferred language model?

Edit the `config.toml` file to specify your preferred language model and API key:

```toml
[llm]
model = "claude-3-5-sonnet-20241022"
api_key = "your-api-key"
```

Alternatively, set environment variables:

```bash
export LLM_MODEL=claude-3-5-sonnet-20241022
export LLM_API_KEY=your-api-key
```

## Usage

### How do I start a new task in OpenHands?

To start a new task:

1. Launch the application:
   ```bash
   make run
   ```

2. Open the web interface at http://localhost:3001

3. Enter your task description in the input field and press Enter.

### Can I use OpenHands from the command line?

Yes, you can use OpenHands from the command line using the WebSocket API:

```bash
websocat ws://127.0.0.1:3000/ws
{"action": "start", "args": {"task": "write a bash script that prints hello"}}
```

### How do I interact with the agent during a task?

You can interact with the agent by:

1. Sending messages through the chat interface
2. Providing feedback on the agent's actions
3. Uploading files for the agent to use
4. Modifying the task description

### Can OpenHands access the internet?

Yes, OpenHands can access the internet through its browsing capabilities. The agent can:

1. Visit websites
2. Extract information from web pages
3. Interact with web forms
4. Call APIs

### How do I share files with the agent?

You can share files with the agent by:

1. Uploading files through the web interface
2. Placing files in the workspace directory
3. Providing URLs to files that the agent can download

## Troubleshooting

### The agent is not responding. What should I do?

If the agent is not responding:

1. Check the logs for error messages:
   ```bash
   tail -f logs/openhands.log
   ```

2. Verify that the language model API is accessible:
   ```bash
   # Test the API connection
   ```

3. Restart the application:
   ```bash
   make stop
   make run
   ```

### The agent is generating incorrect actions. How can I fix this?

If the agent is generating incorrect actions:

1. Provide more detailed instructions
2. Break down the task into smaller steps
3. Try a different language model
4. Adjust the temperature setting in the configuration

### How do I resolve Docker-related issues?

For Docker-related issues:

1. Ensure Docker is running:
   ```bash
   docker ps
   ```

2. Check Docker logs:
   ```bash
   docker logs <container_id>
   ```

3. Rebuild the Docker image:
   ```bash
   make build
   ```

4. Clean Docker cache:
   ```bash
   docker system prune -a
   ```

### The frontend is not loading. What should I check?

If the frontend is not loading:

1. Check if the server is running:
   ```bash
   ps aux | grep "uvicorn"
   ```

2. Verify that the frontend is built:
   ```bash
   ls -la frontend/dist
   ```

3. Check browser console for errors
4. Rebuild the frontend:
   ```bash
   cd frontend
   npm run build
   ```

## Development and Customization

### How do I contribute to OpenHands?

To contribute to OpenHands:

1. Fork the repository on GitHub
2. Create a branch for your changes
3. Make your changes and commit them
4. Submit a pull request
5. Follow the [Contribution Workflow](../development/contribution-workflow.md)

### How do I create a custom agent?

To create a custom agent:

1. Create a new Python file in the `agenthub` directory
2. Implement the `Agent` interface
3. Register your agent in the agent factory
4. Use your custom agent by specifying its class name in the configuration

Example:

```python
from openhands.controller.agent import Agent
from openhands.core.schema.agent import AgentState
from openhands.events.event import Action, Observation

class CustomAgent(Agent):
    async def process_task(self, task: str, state: AgentState) -> None:
        state.task = task
        state.status = AgentStatus.RUNNING

    async def process_observation(self, observation: Observation, state: AgentState) -> None:
        state.history.append(observation)
        # Process the observation and update the state

    async def generate_action(self, state: AgentState) -> Action:
        # Generate an action based on the current state
        return Action()
```

### How do I add a new runtime environment?

To add a new runtime environment:

1. Create a new Python file in the `openhands/runtime/impl` directory
2. Implement the `Runtime` interface
3. Register your runtime in the runtime factory
4. Use your custom runtime by specifying its class name in the configuration

Example:

```python
from openhands.runtime.base import Runtime
from openhands.events.event import Action, Observation

class CustomRuntime(Runtime):
    async def ainit(self) -> None:
        # Initialize the runtime
        pass

    async def execute(self, action: Action) -> Observation:
        # Execute the action and return an observation
        return Observation()

    async def cleanup(self) -> None:
        # Clean up resources
        pass
```

### How do I customize the frontend?

To customize the frontend:

1. Navigate to the `frontend` directory
2. Modify the React components in `src/components`
3. Update the styles in `src/styles`
4. Build the frontend:
   ```bash
   npm run build
   ```

## Security

### Is OpenHands secure?

OpenHands is designed with security in mind:

1. All agent actions are executed in a sandboxed environment (Docker container)
2. File system access is restricted to the workspace directory
3. Network access can be controlled through configuration
4. API keys and sensitive information are stored securely

### Can OpenHands access my local files?

By default, OpenHands can only access files within the designated workspace directory. This directory is mounted into the Docker container where the agent runs.

### How does OpenHands handle API keys and credentials?

OpenHands handles API keys and credentials through:

1. Environment variables
2. Configuration files
3. Secure storage in the database (if using the SaaS mode)

API keys are never exposed to the frontend or included in logs.

### Can I restrict what the agent can do?

Yes, you can restrict the agent's capabilities through the sandbox configuration:

```toml
[sandbox]
allow_network = true
allow_file_write = true
allow_command_execution = true
allowed_commands = ["git", "python", "npm"]
```

## Performance and Scaling

### How can I improve the performance of OpenHands?

To improve performance:

1. Use a faster language model
2. Optimize the configuration settings
3. Increase the resources allocated to Docker
4. Use a remote runtime for resource-intensive tasks

### Can OpenHands handle large codebases?

Yes, OpenHands can handle large codebases, but performance may vary depending on:

1. The size and complexity of the codebase
2. The capabilities of the language model
3. The resources available to the runtime environment

For very large codebases, consider:
- Using a more powerful language model
- Increasing the resources allocated to Docker
- Breaking down tasks into smaller, more manageable pieces

### How do I scale OpenHands for multiple users?

For multi-user deployments:

1. Use the SaaS mode with authentication
2. Deploy multiple instances of OpenHands
3. Use a load balancer to distribute requests
4. Consider using a distributed runtime environment

## Integration

### Can OpenHands integrate with my existing tools?

Yes, OpenHands can integrate with various tools:

1. **Version Control**: Git integration is built-in
2. **IDEs**: Can be used alongside your existing IDE
3. **CI/CD**: Can be integrated into CI/CD pipelines
4. **Issue Trackers**: GitHub issue integration is available

### How do I integrate OpenHands with GitHub?

To integrate with GitHub:

1. Configure GitHub authentication:
   ```toml
   [github]
   token = "your-github-token"
   ```

2. Use the GitHub issue resolver:
   ```bash
   python -m openhands.resolver.resolve_issue --repo owner/repo --issue 123
   ```

### Can OpenHands work with private repositories?

Yes, OpenHands can work with private repositories. You need to:

1. Configure GitHub authentication with a token that has access to the private repository
2. Clone the repository within the OpenHands workspace

### How do I integrate OpenHands with my CI/CD pipeline?

To integrate with CI/CD:

1. Create a Docker image with OpenHands installed
2. Configure the CI/CD pipeline to use the image
3. Use the OpenHands API to automate tasks
4. Store results in the CI/CD environment

## Support and Community

### Where can I get help with OpenHands?

You can get help with OpenHands from:

1. [GitHub Issues](https://github.com/All-Hands-AI/OpenHands/issues)
2. [Community Chat](https://discord.gg/all-hands-ai)
3. [Documentation](https://docs.all-hands.dev/)

### How do I report a bug?

To report a bug:

1. Check if the bug has already been reported in the [GitHub Issues](https://github.com/All-Hands-AI/OpenHands/issues)
2. If not, create a new issue with:
   - A clear description of the bug
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - System information
   - Logs and configuration files (with sensitive information removed)

### How do I request a feature?

To request a feature:

1. Check if the feature has already been requested in the [GitHub Issues](https://github.com/All-Hands-AI/OpenHands/issues)
2. If not, create a new issue with:
   - A clear description of the feature
   - Use cases for the feature
   - Any relevant examples or mockups

### How do I stay updated on OpenHands development?

To stay updated:

1. Watch the [GitHub repository](https://github.com/All-Hands-AI/OpenHands)
2. Join the [Community Chat](https://discord.gg/all-hands-ai)
3. Follow the project on social media
4. Subscribe to the newsletter (if available)
