# Library Management System

A modern full-stack library management application that enables users to browse and check out books while providing administrators with tools to manage inventory, user requests, and content submissions. Built as a learning exercise to gain hands-on experience with ASP.NET Core Web APIs, Entity Framework Core, and C# backend development.

## Project Context

This project represents a complete rebuild of an earlier Node.js/Express.js library system, reimagined using ASP.NET Core to deepen understanding of the .NET ecosystem. The conversion maintains the same frontend while rebuilding the backend API from scratch, allowing direct comparison between Node.js and C# approaches to REST API design, ORM patterns, and authentication flows.

## Live Demo

*Deployment in progress*

## Features

### User Features
- **Authentication System**: Secure user registration and login with JWT token-based authentication supporting both cookie and Bearer token flows
- **Book Catalog**: Browse, search, and filter books by title, author, genre, and release date with pagination support
- **Personal Cart**: Add books to cart and manage checkout selections
- **Collection Management**: Track currently checked-out books with due dates and checkout history
- **Content Requests**: Submit requests for books or authors not yet in the catalog

### Admin Features
- **Dashboard**: Centralized admin interface for managing returns, requests, and catalog content
- **Book Returns**: Track and process book returns with automatic inventory updates
- **Request Review**: Review and approve user-submitted book and author requests
- **Catalog Management**: Add, edit, and remove books, authors, and genres from the system

## Tech Stack

### Frontend
- **React** with Vite for fast development and optimized builds
- **React Router** for client-side routing and navigation
- **Context API** for global state management (user authentication state)
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for modern iconography

### Backend
- **ASP.NET Core Web API** (.NET 9.0)
- **Entity Framework Core** with PostgreSQL for data persistence
- **BCrypt.Net** for secure password hashing
- **JWT Bearer Authentication** with dual cookie/Bearer token support
- **Dependency Injection** for clean architecture and testability
- **Docker** containerization for consistent development and deployment environments

### Database
- **PostgreSQL 15** relational database running in Docker container
- **Entity Framework Core Migrations** for version-controlled schema management with automatic migration on application startup
- **Docker Volumes** for persistent data storage across container restarts

## Getting Started

### Prerequisites
- Docker and Docker Compose installed
- .NET 9.0 SDK (for local development)
- Node.js (for frontend development)

### Running with Docker

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-app-aspnet
   ```

2. **Start the backend and database**
   ```bash
   cd Backend
   docker-compose up --build
   ```

   This will:
   - Build the ASP.NET Core backend image
   - Pull and start PostgreSQL 15 container
   - Run database migrations automatically
   - Expose the API on `http://localhost:3000`

3. **Access the application**
   - Backend API: `http://localhost:3000`
   - PostgreSQL: `localhost:5432` (credentials in docker-compose.yml)

### Docker Configuration

The application uses multi-stage Docker builds for optimized image sizes:
- **Build stage**: Uses .NET SDK 9.0 to compile and publish the application
- **Runtime stage**: Uses lighter ASP.NET runtime image for production deployment

Database migrations run automatically on container startup via `db.Database.Migrate()` in Program.cs, ensuring schema is always up-to-date.

## Architecture

### Backend Structure
The backend follows a three-layer architecture pattern:
```
Backend/
├── Controllers/          # HTTP request handling and routing
│   ├── AuthController.cs
│   ├── CatalogController.cs
│   └── MyCollectionController.cs
├── Services/            # Business logic layer
│   ├── interfaces/      # Service contracts
│   └── implementations/ # Service implementations
├── Models/
│   ├── Entities/        # Database entity models
│   └── dtos/            # Data Transfer Objects
├── Data/
│   └── LibraryAppContext.cs  # EF Core DbContext
├── Dockerfile           # Multi-stage Docker build configuration
└── docker-compose.yml   # Orchestrates backend and PostgreSQL containers
```

### Key Design Patterns
- **Repository Pattern**: Service layer abstracts database operations from controllers
- **DTO Pattern**: Separate request/response models prevent over-posting and protect sensitive data
- **Dependency Injection**: Services registered in `Program.cs` for loose coupling and testability
- **Role-Based Authorization**: Admin-only endpoints protected with `[Authorize(Roles = "Admin")]` attribute

### Authentication Flow
1. User registers or logs in via `/api/auth/register` or `/api/auth/login`
2. Server generates JWT token with user claims (userId, username, role)
3. Token returned in response body AND set as httpOnly cookie
4. Subsequent requests authenticated via cookie (web) or Bearer header (API clients)
5. Middleware validates token and populates `HttpContext.User` with claims

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate and receive JWT token
- `POST /api/auth/logout` - Clear authentication cookie

### Catalog
- `GET /api/catalog/books` - List books with optional query filters
- `POST /api/catalog/books` - Add new book (Admin only)
- `DELETE /api/catalog/books/{id}` - Remove book (Admin only)
- `GET /api/catalog/authors` - List authors with optional filters
- `POST /api/catalog/authors` - Add new author (Admin only)
- `GET /api/catalog/genres` - List available genres

### My Collection
- `GET /api/mycollection/cart` - Get user's cart items
- `POST /api/mycollection/cart/{bookId}` - Add book to cart
- `DELETE /api/mycollection/cart/{cartItemId}` - Remove from cart
- `POST /api/mycollection/checkedout` - Check out cart items
- `GET /api/mycollection/checkedout` - Get checked-out books

## Database Schema

### Core Entities
- **Users**: Authentication and profile information
- **Books**: Title, author, genre, release date, availability count
- **Authors**: Name, bio, age
- **Genres**: Genre type classifications
- **Cart**: User's selected books for checkout
- **CheckedOut**: Active book rentals with checkout/due/return dates
- **Requests**: User-submitted content requests for admin review

### Key Relationships
- Book → Author (Many-to-One)
- Book → Genre (Many-to-One)
- Cart → User, Book (Many-to-One)
- CheckedOut → User, Book (Many-to-One)

## Key Learnings

### Pattern Recognition
Successfully translated Node.js/Express.js patterns to C# equivalents:
- Express middleware → ASP.NET Core middleware
- Prisma ORM → Entity Framework Core
- Node.js async/await → C# Task-based asynchronous pattern

### Entity Framework Core
- **Change Tracking**: Understood how EF Core tracks entity state vs. Prisma's explicit approach
- **Eager Loading**: Learned when to use `.Include()` for related data vs. `.Select()` projections
- **Bulk Operations**: Used `.ExecuteUpdateAsync()` for efficient batch updates without loading entities

### Security Best Practices
- **DTO Whitelisting**: Prevents malicious input and protects sensitive internal fields
- **Password Hashing**: Never stores plain-text passwords, uses BCrypt with automatic salting
- **Token Security**: httpOnly cookies prevent XSS attacks, Bearer tokens support API clients
- **Role-Based Access**: Restricts admin operations to authorized users only

### Clean Architecture
- **Separation of Concerns**: Controllers handle HTTP, services contain logic, repositories manage data
- **Dependency Injection**: Promotes testability and makes dependencies explicit
- **Interface Segregation**: Service interfaces define contracts independent of implementation

### Docker & Containerization
- **Multi-stage Builds**: Separate build and runtime images minimize final container size
- **Health Checks**: PostgreSQL container includes health checks to ensure database readiness before backend starts
- **Automatic Migrations**: Database schema updates automatically on application startup
- **Persistent Storage**: Docker volumes ensure data survives container restarts
- **Service Dependencies**: `depends_on` with health condition ensures proper startup order

## Known Limitations

### Scalability & Performance
- **No Pagination**: All queries return full result sets, which degrades performance with large datasets
- **Missing Indexing**: Database lacks optimized indexes on frequently queried columns
- **N+1 Queries**: Some operations could be optimized with better query design
- **No Caching**: Repeated queries hit the database unnecessarily

### Code Quality
- **Frontend/Backend Sync**: Frontend still uses old Node.js API patterns and needs updates for new ASP.NET endpoints
- **Error Handling**: Lacks global exception handling middleware for consistent error responses
- **Logging**: No structured logging for debugging and monitoring
- **Validation**: Input validation could be more comprehensive and centralized

### Features
- **Limited Admin Tools**: Cannot edit existing books/authors, only add/delete
- **No Search Optimization**: Basic string matching without full-text search
- **Checkout Limits**: Hard-coded 5-book limit with no configuration option
- **No Due Date Management**: Fixed 7-day checkout period with no extensions

## Future Implementations

### Near-Term
- Complete frontend migration to new ASP.NET API endpoints
- Implement pagination for all list endpoints
- Add global exception handling middleware


### Mid-Term
- Book/author editing capabilities

### Long-Term
- Deploy containerized application to Azure or AWS
- Add frontend Docker container and orchestrate full stack with docker-compose

## Project Motivation

This project serves three key learning objectives:

1. **Career Development**: Building practical experience with C# and .NET to strengthen internship applications
2. **Pattern Translation**: Understanding how familiar backend concepts (authentication, ORMs, REST APIs) translate between Node.js and C#
3. **Portfolio Demonstration**: Creating a deployable full-stack application that showcases clean architecture and modern development practices

The side-by-side comparison between the original Express.js implementation and this ASP.NET Core version provides valuable insights into the strengths and trade-offs of each technology stack.
