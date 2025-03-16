# API Overview

This section provides comprehensive documentation for the OpenHands API, covering core components, runtime environments, and LLM integration.

## Core Components

The [Core API](./core.md) documentation covers the central components of the OpenHands system:

- **AgentController**: The orchestrator that manages agent execution, state, and event handling
- **Agent**: The interface for processing tasks and generating actions
- **EventStream**: The central component for event flow management
- **Runtime**: The interface for executing actions and returning observations
- **LLM**: The unified interface for language model interaction

## Runtime Environments

The [Runtime API](./runtime.md) documentation covers the runtime environments that execute agent actions:

- **DockerRuntime**: Executes actions in a Docker container
- **RemoteRuntime**: Executes actions in a remote environment
- **ActionExecutor**: Executes actions received via HTTP endpoints
- **BashSession**: Manages tmux sessions for command execution
- **BrowserEnv**: Provides a browser environment for web interactions

## LLM Integration

The [LLM API](./llm.md) documentation covers the language model integration:

- **LLM**: The base class for language model interaction
- **AsyncLLM**: Adds asynchronous completion capabilities
- **StreamingLLM**: Enables streaming completions
- **LLMConfig**: Configuration for language model settings
- **Message**: Format for communication with language models

## API Usage Examples

Each API documentation page includes detailed usage examples that demonstrate how to use the components in your code. These examples cover common use cases and provide a starting point for integrating OpenHands into your applications.

## Related Documentation

- [Architecture Overview](../architecture/overview.md): High-level overview of the OpenHands architecture
- [Agent System](../architecture/agents.md): Detailed documentation on the agent system
- [Event System](../architecture/events.md): Detailed documentation on the event system
- [Runtime Environment](../architecture/runtime.md): Detailed documentation on the runtime environment
- [Server Components](../architecture/server.md): Detailed documentation on the server components
