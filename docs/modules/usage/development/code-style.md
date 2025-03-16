# Code Style Guide

This document outlines the coding standards and style guidelines for the OpenHands project. Following these guidelines ensures consistency across the codebase and makes it easier for contributors to understand and maintain the code.

## Python Style Guidelines

### General Guidelines

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) for Python code style
- Use 4 spaces for indentation (no tabs)
- Maximum line length is 88 characters (compatible with Black)
- Use meaningful variable and function names
- Add docstrings to all public modules, functions, classes, and methods

### Imports

- Group imports in the following order:
  1. Standard library imports
  2. Related third-party imports
  3. Local application/library specific imports
- Separate each group with a blank line
- Sort imports alphabetically within each group

Example:
```python
import os
import sys
from typing import Dict, List, Optional

import numpy as np
import torch
from fastapi import FastAPI

from openhands.core.config import AppConfig
from openhands.utils.logger import get_logger
```

### Docstrings

- Use Google-style docstrings
- Include type annotations in function signatures
- Document parameters, return values, and exceptions

Example:
```python
def process_data(data: List[Dict[str, Any]], normalize: bool = False) -> np.ndarray:
    """
    Process input data and convert to numpy array.
    
    Args:
        data: List of dictionaries containing input data
        normalize: Whether to normalize the data
        
    Returns:
        Processed data as numpy array
        
    Raises:
        ValueError: If data is empty or contains invalid values
    """
    # Implementation
```

### Type Annotations

- Use type annotations for function parameters and return values
- Use `Optional[T]` for parameters that can be `None`
- Use `Union[T1, T2]` for parameters that can be multiple types
- Use `Any` sparingly, only when the type is truly dynamic

Example:
```python
from typing import Dict, List, Optional, Union

def get_value(data: Dict[str, Any], key: str, default: Optional[Union[str, int]] = None) -> Any:
    """Get value from dictionary with optional default."""
    return data.get(key, default)
```

### Error Handling

- Use specific exception types rather than generic exceptions
- Handle exceptions at the appropriate level
- Include meaningful error messages

Example:
```python
try:
    result = process_data(data)
except ValueError as e:
    logger.error(f"Invalid data format: {e}")
    raise
except IOError as e:
    logger.error(f"IO error during data processing: {e}")
    raise RuntimeError(f"Failed to process data: {e}") from e
```

## JavaScript/TypeScript Style Guidelines

### General Guidelines

- Use 2 spaces for indentation (no tabs)
- Maximum line length is 100 characters
- Use semicolons at the end of statements
- Use single quotes for strings
- Use meaningful variable and function names
- Use camelCase for variables and functions
- Use PascalCase for classes and components

### Imports

- Group imports in the following order:
  1. React and related libraries
  2. Third-party libraries
  3. Local components and utilities
- Separate each group with a blank line
- Sort imports alphabetically within each group

Example:
```typescript
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { Button } from '../components/Button';
import { formatDate } from '../utils/date';
```

### TypeScript Types

- Use TypeScript interfaces and types for props and state
- Use descriptive names for interfaces and types
- Export interfaces and types that are used across multiple files

Example:
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export type UserRole = User['role'];

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
  isLoading?: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect, isLoading = false }) => {
  // Implementation
};
```

### React Components

- Use functional components with hooks instead of class components
- Use destructuring for props
- Use the `useCallback` hook for event handlers
- Use the `useMemo` hook for expensive computations
- Use the `useEffect` hook for side effects

Example:
```typescript
import React, { useCallback, useEffect, useState } from 'react';

interface CounterProps {
  initialValue?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + step);
  }, [step]);
  
  const decrement = useCallback(() => {
    setCount((prevCount) => prevCount - step);
  }, [step]);
  
  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

## Git Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

Example:
```
feat(agent): add support for delegating tasks to micro-agents

- Implement agent delegation mechanism
- Add micro-agent selection logic
- Update documentation

Closes #123
```

### Branch Naming

- Use descriptive, hyphenated slugs in branch names
- Format: `<type>/<description>`
- Types: `feature`, `bugfix`, `hotfix`, `docs`, `refactor`, `test`, `chore`

Example:
```
feature/agent-delegation
bugfix/memory-leak
docs/api-reference
```

## Code Review Guidelines

### General Guidelines

- Be respectful and constructive in code reviews
- Focus on the code, not the person
- Provide specific feedback with examples
- Explain the reasoning behind your suggestions
- Acknowledge good practices and improvements

### What to Look For

- Correctness: Does the code work as intended?
- Performance: Are there any performance issues?
- Security: Are there any security vulnerabilities?
- Maintainability: Is the code easy to understand and maintain?
- Testability: Is the code testable?
- Documentation: Is the code well-documented?
- Edge cases: Are edge cases handled properly?

### Review Process

1. Read the pull request description to understand the context
2. Review the code changes
3. Run the code locally if necessary
4. Provide feedback using GitHub's review features
5. Approve the pull request if it meets the standards
6. Request changes if necessary

## Testing Guidelines

### Unit Tests

- Write unit tests for all public functions and methods
- Use descriptive test names that explain what is being tested
- Follow the Arrange-Act-Assert pattern
- Mock external dependencies
- Keep tests independent of each other

Example:
```python
def test_process_data_with_valid_input():
    # Arrange
    data = [{"value": 1}, {"value": 2}, {"value": 3}]
    
    # Act
    result = process_data(data)
    
    # Assert
    assert result.shape == (3, 1)
    assert np.array_equal(result, np.array([[1], [2], [3]]))
```

### Integration Tests

- Test the interaction between components
- Use real dependencies when possible
- Clean up resources after tests
- Handle asynchronous operations properly

### End-to-End Tests

- Test the entire system from the user's perspective
- Focus on critical user flows
- Use realistic test data
- Document test scenarios

## Documentation Guidelines

### Code Documentation

- Document all public APIs
- Explain complex algorithms and design decisions
- Update documentation when code changes
- Include examples for non-trivial functionality

### Project Documentation

- Keep README files up to date
- Document installation and setup procedures
- Provide usage examples
- Explain architecture and design decisions
- Include troubleshooting guides

## Conclusion

Following these guidelines ensures consistency across the OpenHands codebase and makes it easier for contributors to understand and maintain the code. If you have any questions or suggestions, please open an issue or discussion on GitHub.
