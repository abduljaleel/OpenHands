# Feature Development Guide

This guide outlines best practices for developing new features in OpenHands.

## Feature Development Process

1. **Understand Requirements**
   - Clearly define the requirements for the feature
   - Identify the problem the feature solves
   - Determine the scope of the feature
   - Consider edge cases and potential issues

2. **Design the Solution**
   - Design a solution that integrates with the existing architecture
   - Consider the impact on existing components
   - Plan the implementation approach
   - Create a technical design document if needed

3. **Implement the Feature**
   - Follow the [Code Style Guidelines](/modules/usage/development/code-style)
   - Implement the feature in small, incremental steps
   - Write clean, maintainable code
   - Use appropriate design patterns

4. **Test the Feature**
   - Write unit tests for the feature
   - Write integration tests for interactions with other components
   - Manually test the feature
   - Ensure all tests pass

5. **Document the Feature**
   - Update user documentation
   - Update developer documentation
   - Add inline code comments where necessary
   - Create examples of how to use the feature

6. **Submit for Review**
   - Follow the [Contribution Workflow](/modules/usage/development/contribution-workflow)
   - Address feedback from reviewers
   - Iterate on the implementation as needed

## Best Practices

### Architecture Integration

When developing new features, ensure they integrate well with the existing architecture:

- **Event-Driven Architecture**: Use the EventStream for communication between components
- **Component Separation**: Maintain clear boundaries between components
- **Interface Consistency**: Follow existing interface patterns
- **Dependency Management**: Minimize dependencies between components

### Code Quality

Maintain high code quality standards:

- **Clean Code**: Write clean, readable code
- **SOLID Principles**: Follow SOLID principles
- **DRY (Don't Repeat Yourself)**: Avoid code duplication
- **KISS (Keep It Simple, Stupid)**: Keep implementations simple
- **Error Handling**: Implement robust error handling

### Testing

Ensure thorough testing of new features:

- **Unit Tests**: Test individual components in isolation
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test the feature from a user perspective
- **Edge Cases**: Test edge cases and error conditions
- **Performance Tests**: Test performance implications if relevant

### Documentation

Document new features thoroughly:

- **User Documentation**: Update user-facing documentation
- **Developer Documentation**: Update developer-facing documentation
- **Code Comments**: Add inline comments for complex logic
- **Examples**: Provide examples of how to use the feature
- **API Documentation**: Document public APIs

## Component-Specific Guidelines

### Agent System

When developing features for the Agent System:

- **Agent Interface**: Follow the existing Agent interface
- **State Management**: Use the AgentState for state management
- **Event Handling**: Use the EventStream for communication
- **LLM Integration**: Use the LLM abstraction for model interactions

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

### Runtime Environment

When developing features for the Runtime Environment:

- **Runtime Interface**: Follow the existing Runtime interface
- **Sandboxed Execution**: Ensure actions are executed in a sandboxed environment
- **Plugin System**: Use the plugin system for extensibility
- **Security Considerations**: Consider security implications

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

### Server Components

When developing features for the Server Components:

- **API Consistency**: Maintain consistent API patterns
- **WebSocket Communication**: Use WebSockets for real-time communication
- **Error Handling**: Implement robust error handling
- **Security Considerations**: Consider security implications

Example:
```python
from fastapi import WebSocket
from openhands.server.session.session import Session

async def handle_websocket(websocket: WebSocket):
    session = Session(websocket)
    await session.connect()
    
    try:
        while True:
            message = await websocket.receive_json()
            await session.handle_message(message)
    except Exception as e:
        await session.send_error(str(e))
        await session.disconnect()
```

### Frontend

When developing features for the Frontend:

- **Component Structure**: Follow the existing component structure
- **State Management**: Use Redux for global state management
- **WebSocket Communication**: Use the WebSocket client for communication
- **UI Consistency**: Maintain consistent UI patterns

Example:
```typescript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWebSocket } from '../context/ws-client-provider';
import { startTask } from '../slices/taskSlice';

const TaskForm: React.FC = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const dispatch = useDispatch();
  const { send } = useWebSocket();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(startTask(taskDescription));
    send({ action: 'start', args: { task: taskDescription } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Enter a task description"
      />
      <button type="submit">Start Task</button>
    </form>
  );
};
```

## Feature Types

### Core Features

Core features are fundamental to the operation of OpenHands:

- **Agent Capabilities**: Features that enhance agent capabilities
- **Runtime Capabilities**: Features that enhance runtime capabilities
- **Server Capabilities**: Features that enhance server capabilities
- **Frontend Capabilities**: Features that enhance frontend capabilities

### Plugin Features

Plugin features extend the functionality of OpenHands through the plugin system:

- **Agent Skills**: Skills that enhance agent capabilities
- **Runtime Plugins**: Plugins that enhance runtime capabilities
- **UI Plugins**: Plugins that enhance frontend capabilities

### Integration Features

Integration features connect OpenHands with external systems:

- **LLM Integrations**: Integrations with language models
- **Tool Integrations**: Integrations with external tools
- **API Integrations**: Integrations with external APIs

## Feature Lifecycle

1. **Proposal**: Propose the feature through an issue or discussion
2. **Design**: Design the feature and create a technical design document
3. **Implementation**: Implement the feature
4. **Testing**: Test the feature thoroughly
5. **Documentation**: Document the feature
6. **Review**: Submit the feature for review
7. **Iteration**: Iterate on the feature based on feedback
8. **Merge**: Merge the feature into the main codebase
9. **Release**: Release the feature in a new version
10. **Maintenance**: Maintain the feature over time

## Getting Help

If you need help with feature development:

- Check the [Documentation](https://docs.all-hands.dev/)
- Ask questions in the [GitHub Discussions](https://github.com/All-Hands-AI/OpenHands/discussions)
- Join the community chat channels
