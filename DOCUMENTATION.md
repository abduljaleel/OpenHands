# OpenHands Documentation Hub

## Introduction

Welcome to the OpenHands documentation hub. This document serves as a central entry point for all documentation related to the OpenHands project. OpenHands is an AI-powered software development agent platform designed to automate coding tasks, enabling developers to interact with Large Language Models (LLMs) to modify code, run commands, browse the web, and call APIs within a secure, sandboxed environment.

## Architecture Overview

OpenHands follows an event-driven architecture with several key components:

### Core Components

- **Agent System**: Generates actions based on state and observations
  - Agent: Processes tasks and generates actions
  - AgentController: Orchestrates agent execution and manages state
  - State: Represents the current state of the agent's task
  
- **Runtime Environment**: Executes actions and returns observations
  - Runtime: Interface for executing actions in isolated environments
  - Sandbox: Runs commands in isolated environments (typically Docker containers)
  - ActionExecutor: Executes actions received via HTTP endpoints

- **Server Components**: Manages communication with clients
  - Session: Manages WebSocket connections with clients
  - AgentSession: Handles agent lifecycle within a session
  - ConversationManager: Manages multiple client conversations

- **Frontend**: Provides user interface for interaction
  - React-based web interface using Remix SPA Mode
  - WebSocket communication with the backend
  - Redux for state management

### Event-Driven Architecture

The system uses an event-driven architecture where components communicate through an EventStream. This allows for loose coupling between components and facilitates asynchronous communication.

For a more detailed explanation of the architecture, see the [Architecture Overview](docs/modules/usage/architecture/overview.md).

## Component Descriptions

### Agent System

The Agent System is responsible for processing tasks and generating actions. It consists of:

- **Agent**: The core entity that processes tasks and generates actions
- **AgentController**: Orchestrates agent execution, manages state, and handles events
- **State**: Represents the current state of the agent's task

For more details, see the [Agent System Documentation](docs/modules/usage/architecture/agents.md).

### Runtime Environment

The Runtime Environment executes actions and returns observations. It includes:

- **Runtime**: Interface for executing actions in isolated environments
- **Sandbox**: Runs commands in isolated environments (typically Docker containers)
- **ActionExecutor**: Executes actions received via HTTP endpoints

For more details, see the [Runtime Environment Documentation](docs/modules/usage/architecture/runtime.md).

### Server Components

The Server Components manage communication with clients. They include:

- **Session**: Manages WebSocket connections with clients
- **AgentSession**: Handles agent lifecycle within a session
- **ConversationManager**: Manages multiple client conversations

For more details, see the [Server Components Documentation](docs/modules/usage/architecture/server.md).

### Frontend

The Frontend provides the user interface for interaction. It includes:

- **React Components**: UI elements for user interaction
- **WebSocket Client**: Communication with the backend
- **State Management**: Redux for managing application state

For more details, see the [Frontend Documentation](docs/modules/usage/architecture/frontend.md).

## Development Workflow

### Getting Started

To get started with OpenHands development:

1. **Setup Development Environment**: Follow the [Development Guide](Development.md) to set up your local environment
2. **Understand the Architecture**: Review the [Architecture Overview](docs/modules/usage/architecture/overview.md)
3. **Explore Key Components**: Familiarize yourself with the core components

For a more detailed onboarding guide, see the [Developer Onboarding Guide](docs/modules/usage/development/onboarding.md).

### Contribution Process

To contribute to OpenHands:

1. **Find or Create an Issue**: Check existing issues or create a new one
2. **Fork and Clone the Repository**: Fork the repository on GitHub and clone it locally
3. **Create a Branch**: Create a branch for your changes
4. **Make Changes**: Follow the code style guidelines and ensure all tests pass
5. **Submit a Pull Request**: Submit your changes for review

For more details, see the [Contribution Workflow Guide](docs/modules/usage/development/contribution-workflow.md).

### Feature Development

When developing new features:

1. **Understand Requirements**: Clearly define the requirements for the feature
2. **Design the Solution**: Design a solution that integrates with the existing architecture
3. **Implement the Feature**: Implement the feature following best practices
4. **Test the Feature**: Write tests to ensure the feature works as expected
5. **Document the Feature**: Document the feature for users and developers

For more details, see the [Feature Development Guide](docs/modules/usage/development/feature-development.md).

## Documentation Structure

The OpenHands documentation is organized into the following sections:

### User Documentation

- [About OpenHands](docs/modules/usage/about.md): Overview of the project
- [Configuration Options](docs/modules/usage/configuration-options.md): Configuration options for OpenHands
- [Troubleshooting](docs/modules/usage/troubleshooting/troubleshooting.md): Solutions for common issues

### Developer Documentation

- [Architecture](docs/modules/usage/architecture/overview.md): System architecture and component interactions
- [Development Guides](docs/modules/usage/development/onboarding.md): Guides for developers
- [API Documentation](docs/modules/usage/api/overview.md): API references for key interfaces

### Component Documentation

- [Agent System](docs/modules/usage/architecture/agents.md): Agent implementation and behavior
- [Runtime Environment](docs/modules/usage/architecture/runtime.md): Runtime implementation and execution
- [Server Components](docs/modules/usage/architecture/server.md): Server implementation and communication
- [Frontend](docs/modules/usage/architecture/frontend.md): Frontend implementation and user interface

## Additional Resources

- [GitHub Repository](https://github.com/All-Hands-AI/OpenHands): Source code repository
- [Issue Tracker](https://github.com/All-Hands-AI/OpenHands/issues): Report issues and request features
- [Discussions](https://github.com/All-Hands-AI/OpenHands/discussions): Community discussions

## Documentation Index

### By Topic

#### Architecture
- [Architecture Overview](docs/modules/usage/architecture/overview.md): System architecture and component interactions
- [Event System](docs/modules/usage/architecture/events.md): Event-driven communication between components
- [Runtime Environment](docs/modules/usage/architecture/runtime.md): Execution environment for agent actions

#### Development
- [Developer Onboarding Guide](docs/modules/usage/development/onboarding.md): Getting started with OpenHands development
- [Contribution Workflow](docs/modules/usage/development/contribution-workflow.md): Process for contributing to OpenHands
- [Feature Development Guide](docs/modules/usage/development/feature-development.md): Best practices for developing new features
- [Debugging Guide](docs/modules/usage/how-to/debugging.md): Debugging OpenHands components

#### Usage
- [About OpenHands](docs/modules/usage/about.md): Overview of the project
- [Configuration Options](docs/modules/usage/configuration-options.md): Configuration options for OpenHands
- [Troubleshooting](docs/modules/usage/troubleshooting/troubleshooting.md): Solutions for common issues

### By Component

#### Agent System
- [Agent System](docs/modules/usage/architecture/agents.md): Agent implementation and behavior
- [Agent Controller](docs/modules/usage/architecture/agents.md#agentcontroller): Orchestration of agent execution

#### Runtime Environment
- [Runtime Environment](docs/modules/usage/architecture/runtime.md): Runtime implementation and execution
- [Docker Runtime](docs/modules/usage/architecture/runtime.md#docker-runtime): Local execution using Docker containers
- [Remote Runtime](docs/modules/usage/architecture/runtime.md#remote-runtime): Execution in a remote environment

#### Server Components
- [Server Components](docs/modules/usage/architecture/server.md): Server implementation and communication
- [WebSocket API](docs/modules/usage/architecture/server.md#api-schema): API for client-server communication

#### Frontend
- [Frontend](docs/modules/usage/architecture/frontend.md): Frontend implementation and user interface
- [WebSocket Client](docs/modules/usage/architecture/frontend.md#websocket-client): Client-side communication with the server

### By User Role

#### New Contributors
- [Developer Onboarding Guide](docs/modules/usage/development/onboarding.md): Getting started with OpenHands development
- [Architecture Overview](docs/modules/usage/architecture/overview.md): System architecture and component interactions
- [Repository Structure](docs/modules/usage/development/onboarding.md#repository-structure): Organization of the codebase

#### Component Developers
- [Agent System](docs/modules/usage/architecture/agents.md): Agent implementation and behavior
- [Runtime Environment](docs/modules/usage/architecture/runtime.md): Runtime implementation and execution
- [Server Components](docs/modules/usage/architecture/server.md): Server implementation and communication
- [Frontend](docs/modules/usage/architecture/frontend.md): Frontend implementation and user interface

#### Feature Developers
- [Feature Development Guide](docs/modules/usage/development/feature-development.md): Best practices for developing new features
- [Event System](docs/modules/usage/architecture/events.md): Event-driven communication between components
- [Component Interactions](docs/modules/usage/architecture/overview.md#component-interactions): How components interact with each other

#### Maintainers
- [Contribution Workflow](docs/modules/usage/development/contribution-workflow.md): Process for contributing to OpenHands
- [Pull Request Guidelines](docs/modules/usage/development/contribution-workflow.md#pull-request-guidelines): Guidelines for reviewing pull requests
- [Release Process](docs/modules/usage/development/contribution-workflow.md#release-process): Process for releasing new versions

## Glossary

For a comprehensive glossary of codebase-specific terms, see the [Glossary](docs/modules/usage/glossary.md).
