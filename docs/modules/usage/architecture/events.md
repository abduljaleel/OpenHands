# Event System

The Event System is a core component of OpenHands, providing a communication mechanism between different parts of the application.

## Overview

The Event System follows a publish-subscribe pattern, allowing components to publish events and subscribe to events from other components. This decoupled architecture enables flexible communication between the agent, runtime, and server components.

## Key Components

### EventStream

The `EventStream` is the central component of the Event System, responsible for managing the flow of events between components.

```python
class EventStream:
    def __init__(self):
        self.subscribers = {}
        self.queues = {}

    async def subscribe(self, subscriber_id: EventStreamSubscriber) -> None:
        """Subscribe to the event stream."""
        self.subscribers[subscriber_id] = asyncio.Queue()
        self.queues[subscriber_id] = self.subscribers[subscriber_id]

    async def publish(self, event: Event, publisher_id: EventStreamSubscriber = None) -> None:
        """Publish an event to the event stream."""
        for subscriber_id, queue in self.subscribers.items():
            if subscriber_id != publisher_id:
                await queue.put(event)

    async def get(self, subscriber_id: EventStreamSubscriber) -> Event:
        """Get the next event for a subscriber."""
        if subscriber_id not in self.subscribers:
            raise ValueError(f"Subscriber {subscriber_id} not found")
        return await self.subscribers[subscriber_id].get()
```

### Event

The `Event` class is the base class for all events in the system. It includes metadata such as the event type, timestamp, and source.

```python
class Event:
    def __init__(self, event_type: str, source: str = None):
        self.event_type = event_type
        self.source = source
        self.timestamp = datetime.now().isoformat()
```

### EventStreamSubscriber

The `EventStreamSubscriber` enum defines the types of subscribers that can subscribe to the event stream.

```python
class EventStreamSubscriber(Enum):
    AGENT_CONTROLLER = "agent_controller"
    RUNTIME = "runtime"
    SERVER = "server"
```

## Event Types

OpenHands defines several types of events:

### Action Events

Action events represent actions to be executed by the Runtime.

- **CmdRunAction**: Execute a command in the runtime
- **FileReadAction**: Read a file from the filesystem
- **FileWriteAction**: Write to a file in the filesystem
- **BrowseAction**: Browse a URL
- **AgentDelegateAction**: Delegate a subtask to another agent

### Observation Events

Observation events represent observations from the Runtime.

- **CmdRunObservation**: Result of executing a command
- **FileReadObservation**: Content of a file
- **FileWriteObservation**: Result of writing to a file
- **BrowseObservation**: HTML content of a URL

### Control Events

Control events represent control signals for the Agent and Runtime.

- **StartEvent**: Start processing a task
- **StopEvent**: Stop processing a task
- **PauseEvent**: Pause processing a task
- **ResumeEvent**: Resume processing a task

### Status Events

Status events represent status updates from the Agent and Runtime.

- **AgentStatusEvent**: Status update from the Agent
- **RuntimeStatusEvent**: Status update from the Runtime

## Event Flow

The event flow in OpenHands follows this pattern:

1. **Initialization**: Components subscribe to the EventStream
2. **Task Start**: A StartEvent is published to the EventStream
3. **Action Generation**: The Agent generates an action and publishes it to the EventStream
4. **Action Execution**: The Runtime executes the action and publishes an observation to the EventStream
5. **Observation Processing**: The Agent processes the observation and generates the next action
6. **Task Completion**: When the task is complete, a StopEvent is published to the EventStream

## Usage Examples

### Creating an EventStream

```python
from openhands.events.stream import EventStream, EventStreamSubscriber

# Create an event stream
event_stream = EventStream()

# Subscribe to the event stream
await event_stream.subscribe(EventStreamSubscriber.AGENT_CONTROLLER)
await event_stream.subscribe(EventStreamSubscriber.RUNTIME)
```

### Publishing Events

```python
from openhands.events.event import CmdRunAction

# Create an action
action = CmdRunAction(command="ls -la")

# Publish the action to the event stream
await event_stream.publish(action, EventStreamSubscriber.AGENT_CONTROLLER)
```

### Consuming Events

```python
# Get the next event for a subscriber
event = await event_stream.get(EventStreamSubscriber.RUNTIME)

# Process the event
if isinstance(event, CmdRunAction):
    # Execute the command
    result = await execute_command(event.command)
    
    # Create an observation
    observation = CmdRunObservation(command=event.command, output=result)
    
    # Publish the observation
    await event_stream.publish(observation, EventStreamSubscriber.RUNTIME)
```

## AsyncEventStreamWrapper

The `AsyncEventStreamWrapper` provides an asynchronous iterator interface for the EventStream, making it easier to consume events in an asynchronous context.

```python
class AsyncEventStreamWrapper:
    def __init__(self, event_stream: EventStream, subscriber_id: EventStreamSubscriber):
        self.event_stream = event_stream
        self.subscriber_id = subscriber_id

    async def __aiter__(self):
        return self

    async def __anext__(self):
        return await self.event_stream.get(self.subscriber_id)
```

Usage:

```python
# Create an async event stream wrapper
async_event_stream = AsyncEventStreamWrapper(event_stream, EventStreamSubscriber.RUNTIME)

# Consume events asynchronously
async for event in async_event_stream:
    # Process the event
    if isinstance(event, CmdRunAction):
        # Execute the command
        result = await execute_command(event.command)
        
        # Create an observation
        observation = CmdRunObservation(command=event.command, output=result)
        
        # Publish the observation
        await event_stream.publish(observation, EventStreamSubscriber.RUNTIME)
```

## Best Practices

- **Event Typing**: Use specific event types for different actions and observations
- **Error Handling**: Include error information in observations when actions fail
- **Asynchronous Processing**: Use asynchronous programming to handle events efficiently
- **Event Filtering**: Filter events based on their type and source
- **Event Logging**: Log events for debugging and monitoring

## Related Components

- [Agent System](./agents.md): Uses the Event System to communicate with the Runtime
- [Runtime Environment](./runtime.md): Uses the Event System to receive actions and publish observations
- [Server Components](./server.md): Uses the Event System to communicate with clients
