# OpenHands Glossary

This glossary provides definitions for codebase-specific terms used in OpenHands.

## A

### ActionExecutor
Server inside runtime containers that receives and executes actions (`openhands/runtime/action_execution_server.py`).

### Agent
Entity generating actions based on state and observations (`openhands/controller/agent.py`).

### AgentController
Core orchestrator managing agent execution, state, and event handling (`openhands/controller/agent_controller.py`).

### AgentDelegateAction
Action requesting a subtask be handled by a specialized agent (`openhands/controller/agent_controller.py`).

### AgentSession
Container for runtime, agent, and controller for a user session (`openhands/server/session/agent_session.py`).

### AgentState
Enum tracking agent status: RUNNING, PAUSED, ERROR, FINISHED (`openhands/core/schema/agent.py`).

### AgentSkill
Pluggable capability providing specific functionality to agents (`openhands/runtime/plugins/agent_skills/`).

### AppConfig
Central configuration object for application settings (`openhands/core/config/app_config.py`).

### AsyncEventStreamWrapper
Wrapper for asynchronous iteration of events (`openhands/server/listen_socket.py`).

## B

### BashSession
Manages tmux sessions for command execution in containers (`openhands/runtime/utils/bash.py`).

## C

### CmdRunAction
Action request to execute a command within the runtime (`openhands/events/event.py`).

### CodeActAgent
Agent using a unified code action space paradigm (`agenthub/codeact_agent/codeact_agent.py`).

### ConversationManager
Manages lifecycle of conversations across sessions (`openhands/server/session/manager.py`).

## D

### DockerRuntime
Runtime implementation using Docker containers (`openhands/runtime/impl/docker/docker_runtime.py`).

## E

### EvalOutput
Container for evaluation results including metrics and test results (`evaluation/utils/shared.py`).

### EventStream
Central component managing events between agent, controller, and runtime (`openhands/events/stream.py`).

### EventStreamSubscriber
Entities subscribing to event streams: AGENT_CONTROLLER, RUNTIME (`openhands/events/stream.py`).

## G

### GithubIssue
Representation of issues/PRs for automatic resolution (`openhands/resolver/github_issue.py`).

## I

### IssueHandler
Extracts information from GitHub issues for agent processing (`openhands/resolver/issue_definitions.py`).

## L

### LLM
Abstraction for language model interaction via litellm (`openhands/llm/llm.py`).

### LLMConfig
Configuration for language model settings and credentials (`openhands/core/config/llm_config.py`).

## M

### Message
Format for communication with LLMs with role and content (`openhands/core/message.py`).

### MicroAgent
Small specialized agent designed for specific tasks (`agenthub/micro/agent.py`).

## R

### RemoteRuntime
Runtime that executes actions in a remote container (`openhands/runtime/impl/remote/remote_runtime.py`).

### ResolverOutput
Results of issue resolution process including patches (`openhands/resolver/resolver_output.py`).

### Runtime
Interface for executing actions in isolated environments (`openhands/runtime/base.py`).

## S

### SandboxConfig
Configuration for runtime sandboxes including permissions (`openhands/core/config/sandbox_config.py`).

### SecurityAnalyzer
Analyzes agent actions for security risks (`openhands/core/config/security_config.py`).

### SessionManager
Manages agent sessions with distributed cluster support (`openhands/server/session/manager.py`).

## W

### WsClientProvider
React component handling WebSocket connections to backend (`frontend/src/context/ws-client-provider.tsx`).
