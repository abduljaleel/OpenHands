# Runtime API Reference

This document provides a comprehensive reference for the runtime APIs in OpenHands.

## DockerRuntime

The `DockerRuntime` is an implementation of the `Runtime` interface that executes actions in a Docker container.

### Class Definition

```python
class DockerRuntime(ActionExecutionClient):
    def __init__(
        self,
        config: Dict[str, Any] = None,
        event_stream: EventStream = None,
    ):
        super().__init__(config, event_stream)
        self.container = None
        self.container_id = None
        self.container_name = None
        self.image_name = None
        self.network_name = None
        self.client = None
        self.api_client = None
```

### Key Methods

#### ainit

```python
async def ainit(self) -> None:
    """
    Initialize the Docker runtime asynchronously.
    """
```

Initializes the Docker runtime, creating a Docker client, building or pulling the runtime image, and creating a container.

#### cleanup

```python
async def cleanup(self) -> None:
    """
    Clean up the Docker runtime resources.
    """
```

Cleans up the Docker runtime resources, stopping and removing the container.

#### get_action_execution_url

```python
def get_action_execution_url(self) -> str:
    """
    Get the URL for the action execution server.
    
    Returns:
        The URL for the action execution server.
    """
```

Gets the URL for the action execution server running in the Docker container.

### Usage Example

```python
from openhands.runtime.impl.docker.docker_runtime import DockerRuntime
from openhands.events.stream import EventStream

# Create an event stream
event_stream = EventStream()

# Create a Docker runtime
runtime = DockerRuntime(event_stream=event_stream)

# Initialize the runtime
await runtime.ainit()

# Run a command
observation = await runtime.run("ls -la")

# Clean up the runtime
await runtime.cleanup()
```

## RemoteRuntime

The `RemoteRuntime` is an implementation of the `Runtime` interface that executes actions in a remote environment.

### Class Definition

```python
class RemoteRuntime(ActionExecutionClient):
    def __init__(
        self,
        config: Dict[str, Any] = None,
        event_stream: EventStream = None,
    ):
        super().__init__(config, event_stream)
        self.remote_url = None
        self.runtime_id = None
```

### Key Methods

#### ainit

```python
async def ainit(self) -> None:
    """
    Initialize the remote runtime asynchronously.
    """
```

Initializes the remote runtime, creating a runtime on the remote server.

#### cleanup

```python
async def cleanup(self) -> None:
    """
    Clean up the remote runtime resources.
    """
```

Cleans up the remote runtime resources, stopping the runtime on the remote server.

#### get_action_execution_url

```python
def get_action_execution_url(self) -> str:
    """
    Get the URL for the action execution server.
    
    Returns:
        The URL for the action execution server.
    """
```

Gets the URL for the action execution server running on the remote server.

### Usage Example

```python
from openhands.runtime.impl.remote.remote_runtime import RemoteRuntime
from openhands.events.stream import EventStream

# Create an event stream
event_stream = EventStream()

# Create a remote runtime
runtime = RemoteRuntime(config={"remote_url": "https://example.com"}, event_stream=event_stream)

# Initialize the runtime
await runtime.ainit()

# Run a command
observation = await runtime.run("ls -la")

# Clean up the runtime
await runtime.cleanup()
```

## ActionExecutor

The `ActionExecutor` is responsible for executing actions received via the `/execute_action` HTTP endpoint.

### Class Definition

```python
class ActionExecutor:
    def __init__(self, config: Dict[str, Any] = None):
        self.config = config or {}
        self.bash_session = None
        self.browser_env = None
        self.plugins = {}
```

### Key Methods

#### initialize

```python
async def initialize(self) -> None:
    """
    Initialize the action executor.
    """
```

Initializes the action executor, setting up the bash session, browser environment, and plugins.

#### execute_action

```python
async def execute_action(self, action: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute an action and return an observation.
    
    Args:
        action: The action to execute.
        
    Returns:
        An observation of the result of the action.
    """
```

Executes an action and returns an observation.

#### execute_bash_command

```python
async def execute_bash_command(self, command: str) -> Dict[str, Any]:
    """
    Execute a bash command and return an observation.
    
    Args:
        command: The command to execute.
        
    Returns:
        An observation of the result of the command.
    """
```

Executes a bash command and returns an observation.

#### execute_file_read

```python
async def execute_file_read(self, path: str) -> Dict[str, Any]:
    """
    Read a file and return an observation.
    
    Args:
        path: The path of the file to read.
        
    Returns:
        An observation of the file contents.
    """
```

Reads a file and returns an observation.

#### execute_file_write

```python
async def execute_file_write(self, path: str, content: str) -> Dict[str, Any]:
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

#### execute_browse

```python
async def execute_browse(self, url: str) -> Dict[str, Any]:
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
from openhands.runtime.action_execution_server import ActionExecutor

# Create an action executor
executor = ActionExecutor()

# Initialize the executor
await executor.initialize()

# Execute a bash command
observation = await executor.execute_bash_command("ls -la")

# Read a file
observation = await executor.execute_file_read("/path/to/file.txt")

# Write to a file
observation = await executor.execute_file_write("/path/to/file.txt", "Hello, world!")

# Browse a URL
observation = await executor.execute_browse("https://example.com")
```

## BashSession

The `BashSession` manages tmux sessions for command execution in containers.

### Class Definition

```python
class BashSession:
    def __init__(self, session_name: str = "bash_session"):
        self.session_name = session_name
        self.initialized = False
```

### Key Methods

#### initialize

```python
async def initialize(self) -> None:
    """
    Initialize the bash session.
    """
```

Initializes the bash session, creating a tmux session.

#### execute_command

```python
async def execute_command(self, command: str) -> Tuple[str, int]:
    """
    Execute a command in the bash session.
    
    Args:
        command: The command to execute.
        
    Returns:
        A tuple containing the command output and exit code.
    """
```

Executes a command in the bash session and returns the output and exit code.

#### add_env_var

```python
async def add_env_var(self, name: str, value: str) -> None:
    """
    Add an environment variable to the bash session.
    
    Args:
        name: The name of the environment variable.
        value: The value of the environment variable.
    """
```

Adds an environment variable to the bash session.

#### cleanup

```python
async def cleanup(self) -> None:
    """
    Clean up the bash session.
    """
```

Cleans up the bash session, killing the tmux session.

### Usage Example

```python
from openhands.runtime.utils.bash import BashSession

# Create a bash session
bash_session = BashSession()

# Initialize the bash session
await bash_session.initialize()

# Add an environment variable
await bash_session.add_env_var("MY_VAR", "my_value")

# Execute a command
output, exit_code = await bash_session.execute_command("echo $MY_VAR")

# Clean up the bash session
await bash_session.cleanup()
```

## BrowserEnv

The `BrowserEnv` provides a browser environment for web interactions.

### Class Definition

```python
class BrowserEnv:
    def __init__(self):
        self.browser = None
        self.page = None
```

### Key Methods

#### initialize

```python
async def initialize(self) -> None:
    """
    Initialize the browser environment.
    """
```

Initializes the browser environment, launching a browser.

#### browse

```python
async def browse(self, url: str) -> str:
    """
    Browse a URL and return the HTML content.
    
    Args:
        url: The URL to browse.
        
    Returns:
        The HTML content of the URL.
    """
```

Browses a URL and returns the HTML content.

#### browse_interactive

```python
async def browse_interactive(self, url: str, actions: List[Dict[str, Any]]) -> str:
    """
    Browse a URL interactively and return the HTML content.
    
    Args:
        url: The URL to browse.
        actions: A list of actions to perform on the page.
        
    Returns:
        The HTML content of the URL after performing the actions.
    """
```

Browses a URL interactively, performing actions on the page, and returns the HTML content.

#### cleanup

```python
async def cleanup(self) -> None:
    """
    Clean up the browser environment.
    """
```

Cleans up the browser environment, closing the browser.

### Usage Example

```python
from openhands.runtime.utils.browser import BrowserEnv

# Create a browser environment
browser_env = BrowserEnv()

# Initialize the browser environment
await browser_env.initialize()

# Browse a URL
html_content = await browser_env.browse("https://example.com")

# Browse a URL interactively
actions = [
    {"type": "click", "selector": "#button"},
    {"type": "type", "selector": "#input", "text": "Hello, world!"},
    {"type": "submit", "selector": "#form"},
]
html_content = await browser_env.browse_interactive("https://example.com", actions)

# Clean up the browser environment
await browser_env.cleanup()
```

## Related Components

- [Runtime Environment](../architecture/runtime.md): Detailed documentation on the runtime environment
- [Docker Runtime](../architecture/runtime.md#docker-runtime): Detailed documentation on the Docker runtime
- [Remote Runtime](../architecture/runtime.md#remote-runtime): Detailed documentation on the remote runtime
