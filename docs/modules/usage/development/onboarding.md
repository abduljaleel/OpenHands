# Developer Onboarding Guide

This guide will help new developers get started with contributing to OpenHands.

## First Steps

1. **Setup Development Environment**
   - Follow the Development Guide in the repository root to set up your local environment
   - Ensure all dependencies are installed correctly:
     - Python 3.12
     - Poetry >= 1.8
     - NodeJS >= 20.x
     - Docker

2. **Understand the Architecture**
   - Review the [Architecture Overview](../architecture/overview.md)
   - Familiarize yourself with the event-driven architecture and component interactions

3. **Explore Key Components**
   - [Agent System](../architecture/agents.md)
   - [Runtime Environment](../architecture/runtime.md)
   - [Server Components](../architecture/server.md)
   - [Frontend](../architecture/frontend.md)

## Repository Structure

OpenHands is organized into several key directories:

- **`openhands/`**: Core backend implementation
  - `agenthub/`: Agent implementations
  - `controller/`: Agent controller and state management
  - `core/`: Core application logic
  - `events/`: Event system
  - `llm/`: LLM integration
  - `runtime/`: Sandbox environments
  - `server/`: FastAPI server
  - `utils/`: Utility functions

- **`frontend/`**: React-based web interface
  - `src/routes/`: React Router routes defining application pages
  - `src/components/`: React components for UI elements
  - `src/context/`: React context providers for state management
  - `src/api/`: API client for backend communication
  - `src/hooks/`: Custom React hooks for shared logic

- **`agenthub/`**: Agent implementations
  - `codeact_agent/`: Implementation of the CodeAct agent paradigm
  - `monologue_agent/`: Simple agent that generates responses without external tools
  - `micro/`: Micro-specialized agents for specific tasks
  - `planner_agent/`: Agent focused on task planning and decomposition

- **`evaluation/`**: Benchmarking and testing frameworks
  - `benchmarks/`: Various benchmarks for evaluating agent performance
  - `integration_tests/`: Integration tests for the system
  - `regression/`: Regression tests for ensuring system stability

- **`docs/`**: Documentation
  - `modules/`: Documentation modules
  - `static/`: Static assets for documentation
  - `i18n/`: Internationalization files

- **`containers/`**: Docker configuration
  - `app/`: Application container configuration
  - `dev/`: Development container configuration
  - `runtime/`: Runtime container configuration

## Development Workflow

### Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/All-Hands-AI/OpenHands.git
   cd OpenHands
   ```

2. **Install Dependencies**
   ```bash
   make build
   ```

3. **Configure Language Model**
   ```bash
   make setup-config
   ```

4. **Run the Application**
   ```bash
   make run
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - API Documentation: http://localhost:3000/docs

### Making Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow the [Code Style Guidelines](/modules/usage/development/code-style)
   - Ensure all tests pass

3. **Run Tests**
   ```bash
   # Backend linting
   make lint-backend
   
   # Frontend linting
   make lint-frontend
   
   # Unit tests
   poetry run pytest ./tests/unit/test_*.py
   ```

4. **Submit a Pull Request**
   - Push your changes to your fork
   - Create a pull request to the main repository
   - Ensure CI checks pass
   - Wait for review and address any feedback

## Common Development Tasks

### Adding a New Agent

1. Create a new directory in `agenthub/` for your agent
2. Implement the agent class extending the base agent class
3. Register the agent in the agent registry
4. Add tests for your agent
5. Update documentation

### Modifying the Runtime

1. Understand the existing runtime implementation
2. Make changes to the runtime code
3. Test your changes thoroughly
4. Update documentation

### Updating the Frontend

1. Understand the existing frontend architecture
2. Make changes to the frontend code
3. Test your changes in the browser
4. Run frontend linting
5. Update documentation

## Debugging

### Backend Debugging

- Use logging to debug issues
  ```python
  from openhands.core.logger import get_logger
  
  logger = get_logger(__name__)
  logger.debug("Debug message")
  logger.info("Info message")
  logger.warning("Warning message")
  logger.error("Error message")
  ```

- Use the Python debugger
  ```python
  import pdb
  pdb.set_trace()
  ```

### Frontend Debugging

- Use browser developer tools
- Use React Developer Tools extension
- Use Redux DevTools extension for state debugging

## Getting Help

- Check the [Documentation](https://docs.all-hands.dev/)
- Ask questions in the [GitHub Discussions](https://github.com/All-Hands-AI/OpenHands/discussions)
- Report issues in the [Issue Tracker](https://github.com/All-Hands-AI/OpenHands/issues)

## Next Steps

After getting familiar with the codebase, you can:

- Explore the [Feature Development Guide](./feature-development.md) for guidance on developing new features
- Review the [Contribution Workflow Guide](./contribution-workflow.md) for details on the contribution process
- Check the [API Documentation](/modules/usage/api/overview) for information on the API interfaces
