# LLM API Reference

This document provides a comprehensive reference for the LLM (Large Language Model) APIs in OpenHands.

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

## AsyncLLM

The `AsyncLLM` class extends the `LLM` class to provide asynchronous completion capabilities.

### Class Definition

```python
class AsyncLLM(LLM):
    def __init__(self, config: LLMConfig = None):
        super().__init__(config)
```

### Key Methods

#### acompletion

```python
async def acompletion(self, prompt: str, **kwargs) -> str:
    """
    Generate a completion for the given prompt asynchronously.
    
    Args:
        prompt: The prompt to generate a completion for.
        **kwargs: Additional arguments to pass to the underlying model.
        
    Returns:
        The generated completion.
    """
```

Generates a completion for the given prompt asynchronously.

#### achat_completion

```python
async def achat_completion(self, messages: List[Message], **kwargs) -> str:
    """
    Generate a chat completion for the given messages asynchronously.
    
    Args:
        messages: The messages to generate a completion for.
        **kwargs: Additional arguments to pass to the underlying model.
        
    Returns:
        The generated completion.
    """
```

Generates a chat completion for the given messages asynchronously.

### Usage Example

```python
from openhands.llm.async_llm import AsyncLLM
from openhands.core.config.llm_config import LLMConfig
from openhands.core.message import Message

# Create an LLM configuration
config = LLMConfig(model="claude-3-5-sonnet-20241022", api_key="your-api-key")

# Create an async LLM
llm = AsyncLLM(config)

# Generate a completion asynchronously
completion = await llm.acompletion("Write a Python function to calculate the Fibonacci sequence.")

# Generate a chat completion asynchronously
messages = [
    Message(role="system", content="You are a helpful assistant."),
    Message(role="user", content="Write a Python function to calculate the Fibonacci sequence."),
]
completion = await llm.achat_completion(messages)
```

## StreamingLLM

The `StreamingLLM` class extends the `AsyncLLM` class to provide streaming completion capabilities.

### Class Definition

```python
class StreamingLLM(AsyncLLM):
    def __init__(self, config: LLMConfig = None):
        super().__init__(config)
```

### Key Methods

#### streaming_completion

```python
async def streaming_completion(self, prompt: str, **kwargs) -> AsyncGenerator[str, None]:
    """
    Generate a completion for the given prompt with streaming.
    
    Args:
        prompt: The prompt to generate a completion for.
        **kwargs: Additional arguments to pass to the underlying model.
        
    Yields:
        Chunks of the generated completion.
    """
```

Generates a completion for the given prompt with streaming, yielding chunks of the generated completion.

#### streaming_chat_completion

```python
async def streaming_chat_completion(self, messages: List[Message], **kwargs) -> AsyncGenerator[str, None]:
    """
    Generate a chat completion for the given messages with streaming.
    
    Args:
        messages: The messages to generate a completion for.
        **kwargs: Additional arguments to pass to the underlying model.
        
    Yields:
        Chunks of the generated completion.
    """
```

Generates a chat completion for the given messages with streaming, yielding chunks of the generated completion.

### Usage Example

```python
from openhands.llm.streaming_llm import StreamingLLM
from openhands.core.config.llm_config import LLMConfig
from openhands.core.message import Message

# Create an LLM configuration
config = LLMConfig(model="claude-3-5-sonnet-20241022", api_key="your-api-key")

# Create a streaming LLM
llm = StreamingLLM(config)

# Generate a completion with streaming
async for chunk in llm.streaming_completion("Write a Python function to calculate the Fibonacci sequence."):
    print(chunk, end="", flush=True)

# Generate a chat completion with streaming
messages = [
    Message(role="system", content="You are a helpful assistant."),
    Message(role="user", content="Write a Python function to calculate the Fibonacci sequence."),
]
async for chunk in llm.streaming_chat_completion(messages):
    print(chunk, end="", flush=True)
```

## LLMConfig

The `LLMConfig` class provides configuration for language model settings and credentials.

### Class Definition

```python
class LLMConfig:
    def __init__(
        self,
        model: str = None,
        api_key: str = None,
        api_base: str = None,
        temperature: float = 0.7,
        max_tokens: int = 4096,
        **kwargs
    ):
        self.model = model
        self.api_key = api_key
        self.api_base = api_base
        self.temperature = temperature
        self.max_tokens = max_tokens
        self.kwargs = kwargs
```

### Key Methods

#### to_dict

```python
def to_dict(self) -> Dict[str, Any]:
    """
    Convert the configuration to a dictionary.
    
    Returns:
        A dictionary representation of the configuration.
    """
```

Converts the configuration to a dictionary.

#### from_dict

```python
@classmethod
def from_dict(cls, config_dict: Dict[str, Any]) -> "LLMConfig":
    """
    Create a configuration from a dictionary.
    
    Args:
        config_dict: A dictionary representation of the configuration.
        
    Returns:
        A new LLMConfig instance.
    """
```

Creates a configuration from a dictionary.

### Usage Example

```python
from openhands.core.config.llm_config import LLMConfig

# Create an LLM configuration
config = LLMConfig(
    model="claude-3-5-sonnet-20241022",
    api_key="your-api-key",
    temperature=0.8,
    max_tokens=2048,
)

# Convert the configuration to a dictionary
config_dict = config.to_dict()

# Create a configuration from a dictionary
config = LLMConfig.from_dict(config_dict)
```

## Message

The `Message` class represents a message in a conversation with an LLM.

### Class Definition

```python
class Message:
    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content
```

### Key Methods

#### to_dict

```python
def to_dict(self) -> Dict[str, str]:
    """
    Convert the message to a dictionary.
    
    Returns:
        A dictionary representation of the message.
    """
```

Converts the message to a dictionary.

#### from_dict

```python
@classmethod
def from_dict(cls, message_dict: Dict[str, str]) -> "Message":
    """
    Create a message from a dictionary.
    
    Args:
        message_dict: A dictionary representation of the message.
        
    Returns:
        A new Message instance.
    """
```

Creates a message from a dictionary.

### Usage Example

```python
from openhands.core.message import Message

# Create a message
message = Message(role="user", content="Write a Python function to calculate the Fibonacci sequence.")

# Convert the message to a dictionary
message_dict = message.to_dict()

# Create a message from a dictionary
message = Message.from_dict(message_dict)
```

## LLM Provider Integration

OpenHands supports integration with various LLM providers through the LiteLLM library.

### Supported Providers

- **OpenAI**: GPT-3.5, GPT-4
- **Anthropic**: Claude, Claude 2, Claude 3
- **Google**: Gemini, PaLM
- **Azure**: Azure OpenAI
- **Groq**: LLaMA, Mixtral
- **OpenRouter**: Various models

### Provider Configuration

Each provider requires specific configuration parameters:

#### OpenAI

```python
config = LLMConfig(
    model="gpt-4",
    api_key="your-openai-api-key",
)
```

#### Anthropic

```python
config = LLMConfig(
    model="claude-3-5-sonnet-20241022",
    api_key="your-anthropic-api-key",
)
```

#### Google

```python
config = LLMConfig(
    model="gemini-pro",
    api_key="your-google-api-key",
)
```

#### Azure

```python
config = LLMConfig(
    model="gpt-4",
    api_key="your-azure-api-key",
    api_base="https://your-resource-name.openai.azure.com",
    api_version="2023-05-15",
)
```

#### Groq

```python
config = LLMConfig(
    model="llama2-70b-4096",
    api_key="your-groq-api-key",
)
```

#### OpenRouter

```python
config = LLMConfig(
    model="openai/gpt-4",
    api_key="your-openrouter-api-key",
    api_base="https://openrouter.ai/api/v1",
)
```

## Related Components

- [LLM Configuration](../llms/llms.md): Detailed documentation on LLM configuration
- [Azure LLMs](../llms/azure-llms.md): Detailed documentation on Azure LLM integration
- [Google LLMs](../llms/google-llms.md): Detailed documentation on Google LLM integration
- [Groq](../llms/groq.md): Detailed documentation on Groq integration
- [LiteLLM Proxy](../llms/litellm-proxy.md): Detailed documentation on LiteLLM proxy integration
- [OpenAI LLMs](../llms/openai-llms.md): Detailed documentation on OpenAI LLM integration
- [OpenRouter](../llms/openrouter.md): Detailed documentation on OpenRouter integration
