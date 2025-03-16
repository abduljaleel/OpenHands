# Frontend

The Frontend is a key component of OpenHands, providing a user-friendly interface for interacting with the agent system.

## Overview

The Frontend is built using React with Remix SPA Mode, providing a modern, responsive user interface for interacting with the OpenHands agent system. It communicates with the backend server via WebSockets and uses Redux for state management.

## Architecture

```
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|    Components    |<--->|     Context      |<--->|      Hooks       |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
         |                        |                        |
         |                        |                        |
         v                        v                        v
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|      Routes      |     |  WebSocket Client|     |       API        |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
                                |
                                |
                                v
                         +-------------+
                         |             |
                         |    Server   |
                         |             |
                         +-------------+
```

## Key Components

### React Components

The Frontend is built using React components, organized into a hierarchical structure:

- **Layout Components**: Define the overall layout of the application
- **Page Components**: Define the content of specific pages
- **UI Components**: Reusable UI elements used across the application
- **Form Components**: Components for user input and form handling

#### Component Structure

```
frontend/src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── forms/
│   │   ├── TaskForm.tsx
│   │   └── ConfigForm.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── Task.tsx
│       └── Settings.tsx
├── routes/
│   ├── index.tsx
│   ├── task.tsx
│   └── settings.tsx
└── ...
```

### WebSocket Client

The WebSocket client handles communication with the backend server, sending actions and receiving observations:

```typescript
// WebSocket client provider
import React, { createContext, useContext, useEffect, useState } from 'react';

interface WebSocketContextType {
  connected: boolean;
  send: (message: any) => void;
  lastMessage: any;
}

const WebSocketContext = createContext<WebSocketContextType>({
  connected: false,
  send: () => {},
  lastMessage: null,
});

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000/ws');

    ws.onopen = () => {
      setConnected(true);
    };

    ws.onclose = () => {
      setConnected(false);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setLastMessage(message);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const send = (message: any) => {
    if (socket && connected) {
      socket.send(JSON.stringify(message));
    }
  };

  return (
    <WebSocketContext.Provider value={{ connected, send, lastMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
```

### Redux Store

The Redux store manages the application state, including:

- **Task State**: The current task and its status
- **Agent State**: The agent's current status and history
- **UI State**: The current UI state, including modals and notifications

```typescript
// Redux store
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import agentReducer from './slices/agentSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    task: taskReducer,
    agent: agentReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### API Client

The API client provides a typed interface for interacting with the backend API:

```typescript
// API client
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const analyzeSecurityRisks = async (code: string) => {
  const response = await api.post('/security/analyze', { code });
  return response.data;
};
```

### Custom Hooks

Custom hooks encapsulate reusable logic:

```typescript
// Custom hook for task management
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { startTask, stopTask, pauseTask, resumeTask } from '../slices/taskSlice';
import { useWebSocket } from '../context/ws-client-provider';

export const useTaskManager = () => {
  const dispatch = useDispatch();
  const { send } = useWebSocket();
  const task = useSelector((state: RootState) => state.task);

  const handleStartTask = (taskDescription: string) => {
    dispatch(startTask(taskDescription));
    send({ action: 'start', args: { task: taskDescription } });
  };

  const handleStopTask = () => {
    dispatch(stopTask());
    send({ action: 'finish' });
  };

  const handlePauseTask = () => {
    dispatch(pauseTask());
    send({ action: 'pause' });
  };

  const handleResumeTask = () => {
    dispatch(resumeTask());
    send({ action: 'resume' });
  };

  return {
    task,
    startTask: handleStartTask,
    stopTask: handleStopTask,
    pauseTask: handlePauseTask,
    resumeTask: handleResumeTask,
  };
};
```

## Workflow

The frontend workflow follows these steps:

1. **User Input**: The user inputs a task through the UI
2. **WebSocket Communication**: The task is sent to the backend via WebSocket
3. **Agent Execution**: The agent processes the task and generates actions
4. **Observation Display**: Observations from the agent are displayed in the UI
5. **User Interaction**: The user can interact with the agent through the UI
6. **Task Completion**: When the task is complete, the results are displayed to the user

## User Interface

The user interface includes several key screens:

### Home Screen

The home screen provides an overview of the system and allows the user to start a new task.

### Task Screen

The task screen displays the current task, agent actions, and observations. It allows the user to interact with the agent and view the results of the task.

### Settings Screen

The settings screen allows the user to configure the system, including the agent type, runtime environment, and language model.

## Internationalization

The frontend supports internationalization using the i18next library:

```typescript
// i18n configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import zhTranslation from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      zh: { translation: zhTranslation },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

## Styling

The frontend uses Tailwind CSS for styling:

```typescript
// Tailwind CSS configuration
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
        accent: '#f59e0b',
        background: '#f3f4f6',
        text: '#1f2937',
      },
    },
  },
  plugins: [],
};
```

## Build and Deployment

The frontend is built using Vite and can be deployed as a static site:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Usage Examples

### Starting a Task

```typescript
import { useTaskManager } from '../hooks/useTaskManager';

const TaskForm = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const { startTask } = useTaskManager();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTask(taskDescription);
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

### Displaying Observations

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ObservationList = () => {
  const observations = useSelector((state: RootState) => state.agent.observations);

  return (
    <div>
      <h2>Observations</h2>
      <ul>
        {observations.map((observation, index) => (
          <li key={index}>
            <div>{observation.type}</div>
            <pre>{observation.content}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Best Practices

- **Component Composition**: Use component composition to create reusable UI elements
- **State Management**: Use Redux for global state management and React hooks for local state
- **Type Safety**: Use TypeScript for type safety and better developer experience
- **Responsive Design**: Design the UI to work well on different screen sizes
- **Accessibility**: Ensure the UI is accessible to all users
- **Testing**: Write tests for components and hooks to ensure they work as expected

## Related Components

- [Server Components](./server.md): The server components that provide the backend API
- [Agent System](./agents.md): The agent system that processes tasks and generates actions
- [Event System](./events.md): The event system used for communication between components
