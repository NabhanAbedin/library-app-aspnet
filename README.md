# Library Managment Application

## Overview
A full-stack Library Management Application modeled after real-world systems used by librarians. Users can browse and check out books, while administrators manage user submissions and requests. In a real-world scenario, this system could support actual acquisitions and inventory updates by library staff.


## Features
List of key features implemented.

- User registration and login
- HTTP-only JWT authentication
- Browse, filter, and search books
- Admin specific dashboard for managing content
- User-specific collection and request handling
- API integrated with Prisma ORM
- Context API with StateContext: Used to store user information on the client after login, avoiding unnecessary repeated HTTP requests

## Tech Stack

### Frontend
- React
- React Router
- Vite
- Context API
- Fetch API
  
### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- bcrypt
- JWT

## Future Implementations
- in the future this app will be deployed in order to be used a demo for the skills that I learned for this project and for users to test and review the web app MVP
## Known Limitations

- **Scalability and Performance**:  
  The application has not been optimized for large datasets. Features such as pagination, query efficiency, and database indexing are not implemented. As a result, performance may degrade as data volume increases.

- **Inconsistent Code Design**:  
  Some functions with similar purposes vary in structure or naming conventions, which may affect maintainability. This is due to iterative development during the learning process, and would benefit from a standardized coding pattern and refactoring.

- **Lack of Automated Testing**:  
  The application currently lacks unit and integration tests. As a result, some minor runtime errors may be present and future changes could introduce regressions. Adding a test suite and structured error handling would improve reliability.

- **Missing Centralized Error Handling Middleware**:  
  Error handling is not centralized across the backend. Errors are managed inconsistently within individual routes and controllers, which can lead to duplication or unclear server responses. Implementing a middleware-based approach would improve consistency and debuggability.
