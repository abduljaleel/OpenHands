# OpenHands Architecture Overview

OpenHands follows an event-driven architecture with several key components working together to provide AI-powered software development capabilities.

## System Architecture Diagram

![OpenHands System Architecture](../../static/img/system_architecture_overview.md)

The diagram above illustrates the key components of the OpenHands architecture and their relationships. The system follows an event-driven architecture with the EventStream serving as the central communication bus between components.

## Key Components

### Agent System
The Agent System is responsible for processing tasks and generating actions. It consists of:

- **Agent**: The core entity that processes tasks and generates actions based on state and observations
- **AgentController**: Orchestrates agent execution, manages state, and handles events
- **State**: Represents the current state of the agent's task

The Agent System uses Large Language Models (LLMs) to understand user tasks, generate code, and make decisions about what actions to take.

### Runtime Environment
The Runtime Environment executes actions and returns observations. It includes:

- **Runtime**: Interface for executing actions in isolated environments
- **Sandbox**: Runs commands in isolated environments (typically Docker containers)
- **ActionExecutor**: Executes actions received via HTTP endpoints

The Runtime Environment provides a secure, isolated environment for executing code and commands, ensuring that the agent's actions don't affect the host system.

### Server Components
The Server Components manage communication with clients. They include:

- **Session**: Manages WebSocket connections with clients
- **AgentSession**: Handles agent lifecycle within a session
- **ConversationManager**: Manages multiple client conversations

The Server Components provide a WebSocket-based API for clients to interact with the agent system.

### Frontend
The Frontend provides the user interface for interaction. It includes:

- **React Components**: UI elements for user interaction
- **WebSocket Client**: Communication with the backend
- **State Management**: Redux for managing application state

The Frontend provides a user-friendly interface for interacting with the agent system, allowing users to input tasks, view agent actions, and see results.

## Event-Driven Architecture

The EventStream serves as the backbone for all communication in OpenHands, facilitating message passing between components. This event-driven architecture allows for loose coupling between components and facilitates asynchronous communication.

### Event Flow

1. **User Input**: The user inputs a task through the Frontend
2. **Task Processing**: The Server receives the task and creates an AgentSession
3. **Agent Execution**: The AgentController initializes the Agent and starts processing the task
4. **Action Generation**: The Agent generates actions based on the task and current state
5. **Action Execution**: The Runtime executes the actions and returns observations
6. **Observation Processing**: The Agent processes the observations and updates its state
7. **Result Presentation**: The Frontend displays the results to the user

### Event Types

- **Action Events**: Represent actions to be executed by the Runtime
- **Observation Events**: Represent observations from the Runtime
- **Control Events**: Represent control signals for the Agent and Runtime
- **Status Events**: Represent status updates from the Agent and Runtime

## Component Interactions

### Agent and Runtime Interaction
The Agent generates actions that are sent to the Runtime for execution. The Runtime executes these actions and returns observations to the Agent. This interaction is mediated by the EventStream, which ensures that events are delivered to the appropriate components.

### Server and Frontend Interaction
The Server provides a WebSocket API for the Frontend to interact with the Agent System. The Frontend sends user input to the Server and receives updates about the Agent's actions and observations. This interaction is also mediated by the EventStream, which ensures that events are delivered to the appropriate components.

### Agent and Controller Interaction
The AgentController manages the lifecycle of the Agent, initializing it with the user's task and handling events from the Agent. The Agent generates actions and sends them to the AgentController, which forwards them to the Runtime for execution. The AgentController also receives observations from the Runtime and forwards them to the Agent for processing.

## Deployment Architecture

OpenHands can be deployed in various configurations:

- **Local Development**: All components run locally on the developer's machine
- **Docker Deployment**: Components run in Docker containers, providing isolation and portability
- **Remote Runtime**: The Runtime runs on a remote server, allowing for more powerful execution environments

The deployment architecture is flexible and can be adapted to different use cases and requirements.

## Security Considerations

OpenHands includes several security features:

- **Sandboxed Execution**: Actions are executed in isolated environments to prevent affecting the host system
- **Permission Controls**: The Runtime can be configured with different permission levels for different actions
- **Security Analysis**: Actions can be analyzed for security risks before execution

These security features ensure that the agent's actions are safe and don't pose a risk to the user's system.

## Extensibility

OpenHands is designed to be extensible, allowing for the addition of new components and features:

- **Plugin System**: The Runtime includes a plugin system for adding new capabilities
- **Agent Implementations**: New agent implementations can be added to support different use cases
- **Runtime Implementations**: New runtime implementations can be added to support different execution environments

This extensibility allows OpenHands to adapt to new requirements and use cases over time.
