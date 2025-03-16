# Server Components

The Server Components in OpenHands manage communication with clients, handle WebSocket connections, and coordinate agent sessions.

## Overview

The Server Components provide a WebSocket-based API for clients to interact with the agent system. They handle client connections, manage agent sessions, and coordinate the flow of events between clients and agents.

## Key Components

### Session

The `Session` class represents a WebSocket session with a client. It is responsible for:

- Handling WebSocket connections and disconnections
- Initializing and managing the agent session
- Dispatching events between the client and the agent
- Sending messages and errors to the client

```python
class Session:
    def __init__(self, websocket: WebSocket, conversation_manager: ConversationManager):
        self.websocket = websocket
        self.conversation_manager = conversation_manager
        self.agent_session = None
        self.connected = False

    async def connect(self) -> None:
        """Accept the WebSocket connection."""
        await self.websocket.accept()
        self.connected = True

    async def disconnect(self) -> None:
        """Close the WebSocket connection."""
        if self.connected:
            await self.websocket.close()
            self.connected = False

    async def initialize_agent_session(self, config: Dict[str, Any]) -> None:
        """Initialize the agent session with the provided configuration."""
        self.agent_session = AgentSession(config)
        await self.agent_session.initialize()

    async def handle_message(self, message: Dict[str, Any]) -> None:
        """Handle a message from the client."""
        action = message.get("action")
        args = message.get("args", {})

        if action == "initialize":
            await self.initialize_agent_session(args)
        elif action == "start":
            await self.agent_session.start_task(args.get("task"))
        else:
            await self.agent_session.handle_action(action, args)

    async def send_message(self, message: Dict[str, Any]) -> None:
        """Send a message to the client."""
        if self.connected:
            await self.websocket.send_json(message)

    async def send_error(self, error: str) -> None:
        """Send an error message to the client."""
        await self.send_message({"error": error})
```

### AgentSession

The `AgentSession` class manages the lifecycle of an agent within a session. It is responsible for:

- Creating and managing the runtime environment
- Initializing the agent controller
- Handling security analysis
- Managing the event stream

```python
class AgentSession:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.event_stream = EventStream()
        self.runtime = None
        self.agent_controller = None
        self.security_analyzer = None

    async def initialize(self) -> None:
        """Initialize the agent session."""
        # Create the runtime
        self.runtime = create_runtime(self.config.get("runtime_type", "docker"))
        await self.runtime.ainit()

        # Create the agent
        agent_cls = get_agent_class(self.config.get("agent_cls", "codeact"))
        agent = agent_cls()

        # Create the agent controller
        self.agent_controller = AgentController(agent, self.runtime, self.event_stream)

        # Initialize security analyzer if enabled
        if self.config.get("security_enabled", False):
            self.security_analyzer = SecurityAnalyzer()

    async def start_task(self, task: str) -> None:
        """Start processing a task."""
        await self.agent_controller.start(task)

    async def handle_action(self, action: str, args: Dict[str, Any]) -> None:
        """Handle an action from the client."""
        if action == "run":
            await self.event_stream.publish(CmdRunAction(command=args.get("command")))
        elif action == "read":
            await self.event_stream.publish(FileReadAction(path=args.get("path")))
        elif action == "write":
            await self.event_stream.publish(FileWriteAction(path=args.get("path"), content=args.get("content")))
        elif action == "browse":
            await self.event_stream.publish(BrowseAction(url=args.get("url")))
        elif action == "think":
            await self.event_stream.publish(ThinkAction(thought=args.get("thought")))
        elif action == "finish":
            await self.event_stream.publish(FinishAction())
```

### ConversationManager

The `ConversationManager` class is responsible for managing multiple client conversations. It:

- Adds and restarts conversations
- Sends messages to specific conversations
- Cleans up inactive conversations

```python
class ConversationManager:
    def __init__(self):
        self.conversations = {}
        self.lock = asyncio.Lock()

    async def add_conversation(self, conversation_id: str, session: Session) -> None:
        """Add a conversation to the manager."""
        async with self.lock:
            self.conversations[conversation_id] = session

    async def restart_conversation(self, conversation_id: str, session: Session) -> None:
        """Restart an existing conversation."""
        async with self.lock:
            if conversation_id in self.conversations:
                old_session = self.conversations[conversation_id]
                await old_session.disconnect()
            self.conversations[conversation_id] = session

    async def send_message(self, conversation_id: str, message: Dict[str, Any]) -> None:
        """Send a message to a specific conversation."""
        async with self.lock:
            if conversation_id in self.conversations:
                await self.conversations[conversation_id].send_message(message)

    async def cleanup(self) -> None:
        """Clean up inactive conversations."""
        async with self.lock:
            inactive_conversations = []
            for conversation_id, session in self.conversations.items():
                if not session.connected:
                    inactive_conversations.append(conversation_id)
            
            for conversation_id in inactive_conversations:
                del self.conversations[conversation_id]
```

### FastAPI Application

The main server file sets up the FastAPI application and defines various API endpoints:

```python
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a conversation manager
conversation_manager = ConversationManager()

# WebSocket endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    session = Session(websocket, conversation_manager)
    await session.connect()
    
    try:
        while True:
            message = await websocket.receive_json()
            await session.handle_message(message)
    except WebSocketDisconnect:
        await session.disconnect()
    except Exception as e:
        await session.send_error(str(e))
        await session.disconnect()

# File upload endpoint
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # Handle file upload
    pass

# Security analysis endpoint
@app.post("/security/analyze")
async def analyze_security(request: Request):
    # Handle security analysis
    pass

# Serve static files
app.mount("/", StaticFiles(directory="frontend/dist", html=True), name="static")
```

## API Schema

The server supports two types of messages:

### Actions

Actions are sent from the client to the server:

- `initialize`: Initialize the agent
  - `model`: The name of the model to use
  - `directory`: The path to the workspace
  - `agent_cls`: The class of the agent to use
- `start`: Start a new development task
  - `task`: The task to start
- `read`: Read the content of a file
  - `path`: The path of the file to read
- `write`: Write content to a file
  - `path`: The path of the file to write
  - `content`: The content to write to the file
- `run`: Run a command
  - `command`: The command to run
- `browse`: Open a web page
  - `url`: The URL to open
- `think`: Record a thought
  - `thought`: The thought to record
- `finish`: Signal that the task is completed

### Observations

Observations are sent from the server to the client:

- `read`: The content of a file
  - `path`: The path of the file read
- `browse`: The HTML content of a URL
  - `url`: The URL opened
- `run`: The output of a command
  - `command`: The command run
  - `exit_code`: The exit code of the command
- `chat`: A message from the user

## Workflow

The server workflow follows these steps:

1. **Client Connection**: A client connects to the WebSocket endpoint
2. **Session Creation**: A new Session is created for the client
3. **Agent Initialization**: The client sends an initialization request, and the server creates and configures the agent
4. **Task Start**: The client sends a task to start, and the server initializes the agent with the task
5. **Action Handling**: The client sends actions to the server, which forwards them to the agent
6. **Observation Delivery**: The server sends observations from the agent back to the client
7. **Task Completion**: When the task is complete, the client or agent sends a finish action

## Security Considerations

The server includes several security features:

- **File Upload Restrictions**: File uploads are restricted by size and type
- **Security Analysis**: Actions can be analyzed for security risks before execution
- **Sandboxed Execution**: Actions are executed in isolated environments to prevent affecting the host system

## Configuration

The server can be configured through environment variables:

```sh
LLM_API_KEY=sk-... # Your Anthropic API Key
LLM_MODEL=claude-3-5-sonnet-20241022 # Default model for the agent to use
WORKSPACE_BASE=/path/to/your/workspace # Default absolute path to workspace
```

## Usage Examples

### Starting the Server

```sh
uvicorn openhands.server.listen:app --reload --port 3000
```

### Testing the Server with WebSocat

```sh
websocat ws://127.0.0.1:3000/ws
{"action": "start", "args": {"task": "write a bash script that prints hello"}}
```

## Best Practices

- **Error Handling**: Implement robust error handling to handle unexpected situations
- **Logging**: Use logging to track server activity and diagnose issues
- **Rate Limiting**: Implement rate limiting to prevent abuse
- **Authentication**: Add authentication for production deployments
- **Monitoring**: Monitor server performance and resource usage

## Related Components

- [Agent System](./agents.md): The agent system that processes tasks and generates actions
- [Runtime Environment](./runtime.md): The runtime environment that executes actions
- [Event System](./events.md): The event system used for communication between components
- [Frontend](./frontend.md): The frontend that provides the user interface
