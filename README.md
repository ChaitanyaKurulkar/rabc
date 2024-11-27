- `This project is a React + TypeScript application built using Vite for role-based access control (RBAC). It includes features for managing roles and permissions and uses Material-UI for the user interface, Zustand for state management, and JSON Server for a mock backend.`

Features
Role Management: Add, edit, delete, and view roles with permissions (read, write, delete).
Authentication: User login functionality with email and password validation.
State Management: Lightweight state management using Zustand.
Responsive UI: Built with Material-UI for a modern and responsive design.
Mock Backend: JSON Server used for simulating RESTful API endpoints.

# Run Project 

- `cd rabc`
- `npm run dev`

# Start backend server 

- `json-server --watch db.json --port 3001`

- ' If you get error while running server in powershell add this commnad '
`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

# React + TypeScript + Vite

Installed react + typescript with vite

- `npm create vite@latest rabc`

Installed material UI , added Emotion

- `npm install @mui/material @emotion/react @emotion/styled`

Instaliing zustand because of small application if I want to build more complex application use
react react-redux

- `npm install zustand`

Added react-router-

- `npm install react-router-dom`

Added axios and json server for api's 

- `npm install -g json-server`
- `npm install axios`

Added components , pages , services , stores and styles folder in src 