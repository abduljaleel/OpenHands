# Agent System

The Agent System is a core component of OpenHands, responsible for processing tasks and generating actions based on state and observations.

## Overview

The Agent System consists of several key components:

- **Agent**: The core entity that processes tasks and generates actions
- **AgentController**: Orchestrates agent execution, manages state, and handles events
- **State**: Represents the current state of the agent's task

The Agent System uses Large Language Models (LLMs) to understand user tasks, generate code, and make decisions about what actions to take.

## Architecture

```
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|  AgentController |<--->|      Agent       |<--->|       LLM        |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
        |                        |
        |                        |
        v                        v
+------------------+     +------------------+
|                  |     |                  |
|   EventStream    |     |      State       |
|                  |     |                  |
+------------------+     +------------------+
```

## Key Components

### Agent

The Agent is the core entity that processes tasks and generates actions. It uses a Large Language Model (LLM) to understand user tasks, generate code, and make decisions about what actions to take.

#### Agent Interface

```python
class Agent(ABC):
    @abstractmethod
    async def process_task(self, task: str, state: AgentState) -> None:
        """Process a task and update the state."""
        pass

    @abstractmethod
    async def process_observation(self, observation: Observation, state: AgentState) -> None:
        """Process an observation and update the state."""
        pass

    @abstractmethod
    async def generate_action(self, state: AgentState) -> Action:
        """Generate an action based on the current state."""
        pass
```

#### Agent Implementations

OpenHands includes several agent implementations:

- **CodeActAgent**: Uses a unified code action space paradigm
- **MonologueAgent**: Simple agent that generates responses without external tools
- **PlannerAgent**: Agent focused on task planning and decomposition
- **MicroAgent**: Small specialized agent designed for specific tasks

### AgentController

The AgentController orchestrates agent execution, manages state, and handles events. It is responsible for:

- Initializing the agent with the user's task
- Managing the agent's lifecycle
- Handling events from the agent and runtime
- Coordinating the execution of actions

#### AgentController Interface

```python
class AgentController:
    def __init__(self, agent: Agent, runtime: Runtime, event_stream: EventStream):
        self.agent = agent
        self.runtime = runtime
        self.event_stream = event_stream
        self.state = AgentState()

    async def start(self, task: str) -> None:
        """Start processing a task."""
        await self.agent.process_task(task, self.state)
        await self.run()

    async def run(self) -> None:
        """Run the agent until it completes the task."""
        while not self.state.is_finished:
            action = await self.agent.generate_action(self.state)
            await self.event_stream.publish(action)
            observation = await self.runtime.execute(action)
            await self.event_stream.publish(observation)
            await self.agent.process_observation(observation, self.state)
```

### State

The State represents the current state of the agent's task. It includes:

- The task description
- The agent's current status
- The history of actions and observations
- Any additional context needed by the agent

#### State Interface

```python
class AgentState:
    def __init__(self):
        self.task = ""
        self.status = AgentStatus.IDLE
        self.history = []
        self.context = {}

    @property
    def is_finished(self) -> bool:
        """Check if the agent has finished the task."""
        return self.status == AgentStatus.FINISHED
```

## Event Flow

The Agent System follows an event-driven architecture, with events flowing between components:

1. **Task Initialization**: The AgentController initializes the agent with a task
2. **Action Generation**: The agent generates an action based on the task and current state
3. **Action Execution**: The action is published to the EventStream and executed by the Runtime
4. **Observation Processing**: The observation from the Runtime is published to the EventStream and processed by the agent
5. **State Update**: The agent updates its state based on the observation
6. **Repeat**: Steps 2-5 are repeated until the task is completed

## Agent Delegation

OpenHands supports agent delegation, allowing agents to delegate subtasks to specialized agents:

```python
class AgentDelegateAction(Action):
    def __init__(self, subtask: str, agent_type: str):
        self.subtask = subtask
        self.agent_type = agent_type
```

When an agent encounters a subtask that can be better handled by a specialized agent, it can generate an AgentDelegateAction to delegate the subtask to the appropriate agent.

## Usage Examples

### Creating a Custom Agent

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

### Using the AgentController

```python
from openhands.controller.agent_controller import AgentController
from openhands.runtime.base import Runtime
from openhands.events.stream import EventStream
from custom_agent import CustomAgent

# Create the components
agent = CustomAgent()
runtime = Runtime()
event_stream = EventStream()

# Create the controller
controller = AgentController(agent, runtime, event_stream)

# Start processing a task
await controller.start("Write a Python function to calculate the Fibonacci sequence")
```

## Best Practices

- **Stateless Agents**: Design agents to be stateless, with all state managed by the AgentState
- **Event-Driven Architecture**: Use the EventStream for communication between components
- **Modular Design**: Design agents to be modular, with clear interfaces between components
- **Error Handling**: Implement robust error handling to handle unexpected situations
- **Testing**: Write tests for agents to ensure they behave as expected

## Related Components

- [Event System](./events.md): The event system used for communication between components
- [Runtime Environment](./runtime.md): The runtime environment that executes actions
- [Server Components](./server.md): The server components that manage communication with clients
