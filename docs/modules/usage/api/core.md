# Core API Reference

This document provides a comprehensive reference for the core APIs in OpenHands.

## AgentController

The `AgentController` is the central orchestrator that manages agent execution, state, and event handling.

### Class Definition

```python
class AgentController:
    def __init__(
        self,
        agent: Agent,
        runtime: Runtime,
        event_stream: EventStream,
        security_analyzer: Optional[SecurityAnalyzer] = None,
    ):
        self.agent = agent
        self.runtime = runtime
        self.event_stream = event_stream
        self.security_analyzer = security_analyzer
        self.state = AgentState()
        self.running = False
        self.paused = False
```

### Key Methods

#### start

```python
async def start(self, task: str) -> None:
    """
    Start the agent controller with the given task.
    
    Args:
        task: The task to be performed by the agent.
    """
```

Initializes the agent with the given task and starts the main execution loop.

#### stop

```python
async def stop(self) -> None:
    """
    Stop the agent controller.
    """
```

Stops the agent controller and cleans up resources.

#### pause

```python
async def pause(self) -> None:
    """
    Pause the agent controller.
    """
```

Pauses the agent controller, temporarily halting execution.

#### resume

```python
async def resume(self) -> None:
    """
    Resume the agent controller.
    """
```

Resumes the agent controller after it has been paused.

#### process_event

```python
async def process_event(self, event: Event) -> None:
    """
    Process an event from the event stream.
    
    Args:
        event: The event to process.
    """
```

Processes an event from the event stream, updating the state and taking appropriate action.

### Usage Example

```python
from openhands.controller.agent_controller import AgentController
from openhands.controller.agent import Agent
from openhands.runtime.base import Runtime
from openhands.events.stream import EventStream

# Create an agent, runtime, and event stream
agent = Agent()
runtime = Runtime()
event_stream = EventStream()

# Create an agent controller
controller = AgentController(agent, runtime, event_stream)

# Start the agent controller with a task
await controller.start("Write a Python script that calculates the Fibonacci sequence")

# Pause the agent controller
await controller.pause()

# Resume the agent controller
await controller.resume()

# Stop the agent controller
await controller.stop()
```

## Agent

The `Agent` is responsible for processing tasks and generating actions based on the current state.

### Class Definition

```python
class Agent:
    def __init__(self):
        pass
```

### Key Methods

#### process_task

```python
async def process_task(self, task: str, state: AgentState) -> None:
    """
    Process a task and update the state.
    
    Args:
        task: The task to process.
        state: The current state of the agent.
    """
```

Processes a task and updates the state with the task information.

#### process_observation

```python
async def process_observation(self, observation: Observation, state: AgentState) -> None:
    """
    Process an observation and update the state.
    
    Args:
        observation: The observation to process.
        state: The current state of the agent.
    """
```

Processes an observation and updates the state with the observation information.

#### generate_action

```python
async def generate_action(self, state: AgentState) -> Action:
    """
    Generate an action based on the current state.
    
    Args:
        state: The current state of the agent.
        
    Returns:
        An action to be executed by the runtime.
    """
```

Generates an action based on the current state.

### Usage Example

```python
from openhands.controller.agent import Agent
from openhands.core.schema.agent import AgentState
from openhands.events.event import Observation, Action

# Create an agent
agent = Agent()

# Create a state
state = AgentState()

# Process a task
await agent.process_task("Write a Python script that calculates the Fibonacci sequence", state)

# Generate an action
action = await agent.generate_action(state)

# Process an observation
observation = Observation(content="Fibonacci sequence calculated")
await agent.process_observation(observation, state)
```

## EventStream

The `EventStream` is a central component that manages the flow of events between different parts of the application.

### Class Definition

```python
class EventStream:
    def __init__(self):
        self.subscribers = {}
        self.queues = {}
```

### Key Methods

#### subscribe

```python
async def subscribe(self, subscriber_id: EventStreamSubscriber) -> None:
    """
    Subscribe to the event stream.
    
    Args:
        subscriber_id: The ID of the subscriber.
    """
```

Subscribes to the event stream, allowing the subscriber to receive events.

#### publish

```python
async def publish(self, event: Event, publisher_id: EventStreamSubscriber = None) -> None:
    """
    Publish an event to the event stream.
    
    Args:
        event: The event to publish.
        publisher_id: The ID of the publisher.
    """
```

Publishes an event to the event stream, making it available to all subscribers except the publisher.

#### get

```python
async def get(self, subscriber_id: EventStreamSubscriber) -> Event:
    """
    Get the next event for a subscriber.
    
    Args:
        subscriber_id: The ID of the subscriber.
        
    Returns:
        The next event for the subscriber.
    """
```

Gets the next event for a subscriber.

### Usage Example

```python
from openhands.events.stream import EventStream, EventStreamSubscriber
from openhands.events.event import Event

# Create an event stream
event_stream = EventStream()

# Subscribe to the event stream
await event_stream.subscribe(EventStreamSubscriber.AGENT_CONTROLLER)
await event_stream.subscribe(EventStreamSubscriber.RUNTIME)

# Publish an event
event = Event(event_type="test")
await event_stream.publish(event, EventStreamSubscriber.AGENT_CONTROLLER)

# Get the next event for a subscriber
event = await event_stream.get(EventStreamSubscriber.RUNTIME)
```

## Runtime

The `Runtime` is responsible for executing actions and returning observations.

### Class Definition

```python
class Runtime:
    def __init__(self, config: Dict[str, Any] = None, event_stream: EventStream = None):
        self.config = config or {}
        self.event_stream = event_stream
```

### Key Methods

#### ainit

```python
async def ainit(self) -> None:
    """
    Initialize the runtime asynchronously.
    """
```

Initializes the runtime asynchronously, setting up environment variables and plugins.

#### execute

```python
async def execute(self, action: Action) -> Observation:
    """
    Execute an action and return an observation.
    
    Args:
        action: The action to execute.
        
    Returns:
        An observation of the result of the action.
    """
```

Executes an action and returns an observation.

#### run

```python
async def run(self, command: str) -> Observation:
    """
    Run a command and return an observation.
    
    Args:
        command: The command to run.
        
    Returns:
        An observation of the result of the command.
    """
```

Runs a command and returns an observation.

#### read

```python
async def read(self, path: str) -> Observation:
    """
    Read a file and return an observation.
    
    Args:
        path: The path of the file to read.
        
    Returns:
        An observation of the file contents.
    """
```

Reads a file and returns an observation.

#### write

```python
async def write(self, path: str, content: str) -> Observation:
    """
    Write to a file and return an observation.
    
    Args:
        path: The path of the file to write.
        content: The content to write to the file.
        
    Returns:
        An observation of the result of the write operation.
    """
```

Writes to a file and returns an observation.

#### browse

```python
async def browse(self, url: str) -> Observation:
    """
    Browse a URL and return an observation.
    
    Args:
        url: The URL to browse.
        
    Returns:
        An observation of the HTML content of the URL.
    """
```

Browses a URL and returns an observation.

### Usage Example

```python
from openhands.runtime.base import Runtime
from openhands.events.stream import EventStream
from openhands.events.event import Action, Observation

# Create an event stream
event_stream = EventStream()

# Create a runtime
runtime = Runtime(event_stream=event_stream)

# Initialize the runtime
await runtime.ainit()

# Run a command
observation = await runtime.run("ls -la")

# Read a file
observation = await runtime.read("/path/to/file.txt")

# Write to a file
observation = await runtime.write("/path/to/file.txt", "Hello, world!")

# Browse a URL
observation = await runtime.browse("https://example.com")
```

## LLM

The `LLM` class provides a unified interface for interacting with language models.

### Class Definition

```python
class LLM:
    def __init__(self, config: LLMConfig = None):
        self.config = config or LLMConfig()
```

### Key Methods

#### completion

```python
async def completion(self, prompt: str, **kwargs) -> str:
    """
    Generate a completion for the given prompt.
    
    Args:
        prompt: The prompt to generate a completion for.
        **kwargs: Additional arguments to pass to the underlying model.
        
    Returns:
        The generated completion.
    """
```

Generates a completion for the given prompt.

#### chat_completion

```python
async def chat_completion(self, messages: List[Message], **kwargs) -> str:
    """
    Generate a chat completion for the given messages.
    
    Args:
        messages: The messages to generate a completion for.
        **kwargs: Additional arguments to pass to the underlying model.
        
    Returns:
        The generated completion.
    """
```

Generates a chat completion for the given messages.

### Usage Example

```python
from openhands.llm.llm import LLM
from openhands.core.config.llm_config import LLMConfig
from openhands.core.message import Message

# Create an LLM configuration
config = LLMConfig(model="claude-3-5-sonnet-20241022", api_key="your-api-key")

# Create an LLM
llm = LLM(config)

# Generate a completion
completion = await llm.completion("Write a Python function to calculate the Fibonacci sequence.")

# Generate a chat completion
messages = [
    Message(role="system", content="You are a helpful assistant."),
    Message(role="user", content="Write a Python function to calculate the Fibonacci sequence."),
]
completion = await llm.chat_completion(messages)
```

## Related Components

- [Agent System](../architecture/agents.md): Detailed documentation on the agent system
- [Event System](../architecture/events.md): Detailed documentation on the event system
- [Runtime Environment](../architecture/runtime.md): Detailed documentation on the runtime environment
- [LLM Integration](../llms/llms.md): Detailed documentation on LLM integration
