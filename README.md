This README.md is generated automatically by an AI-powered documentation system integrated into this repository.

---

# sap-vendor-api

A robust NestJS API for managing vendor data, featuring PostgreSQL database interaction, HTTP Basic Authentication, and an innovative automated documentation generation system. This project serves as a backend solution for handling vendor information, including header details and associated items.

## 1. Automated Documentation System

This repository is equipped with an advanced documentation generation system powered by Google Gemini AI. It automatically analyzes the codebase and updates this `README.md` file on every `git push`, ensuring the documentation is always current and comprehensive.

### How It Works

1.  **Code Analysis**: The `generate-readme.js` script recursively reads all relevant source files in the repository.
2.  **AI Generation**: The collected code is sent to the Google Gemini AI, which acts as an expert technical documentation writer.
3.  **README.md Update**: Gemini AI generates a comprehensive `README.md` based on the code analysis.

### Activation Methods

Two methods are available for triggering documentation generation:

#### 1. GitHub Actions (Recommended for Teams)

The `workflows/update-readme.yml` file is configured to run on every `git push` to any branch. This process occurs on GitHub's servers, automatically commits the updated `README.md` back to the repository, and benefits all contributors.

**Quick Activation:**
1.  **Get a Google Gemini API Key**:
    *   Visit: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
    *   Create a new API Key and copy its value.
2.  **Add to GitHub Secrets**:
    *   Go to your GitHub repository `Settings` → `Secrets and variables` → `Actions`.
    *   Click `New repository secret`.
    *   **Name**: `GOOGLE_API_KEY` (must be exact).
    *   **Value**: Paste your copied Google Gemini API Key.
    *   Click `Add secret`.
3.  **Test**: Make a small code change, commit, and `git push`. Monitor the `Actions` tab in your GitHub repository to see "Auto Generate README via Google Gemini" workflow run and update this `README.md`.

#### 2. Local Git Hooks (Optional for Individual Development)

For instant local feedback, a `post-push` Git hook can be installed. This hook runs on your local machine after each `git push` command, generating `README.md` locally.

**Quick Activation:**
1.  **Install the hook**:
    ```bash
    cd sap-vendor-api # Navigate to the NestJS project root
    npm run setup-hooks
    ```
2.  **Set Environment Variable**:
    *   **Windows (PowerShell)**: `$env:GOOGLE_API_KEY = "your-api-key-here"`
    *   **macOS/Linux**: `export GOOGLE_API_KEY="your-api-key-here"`
3.  **Test**: `git push`. You'll see output in your terminal indicating documentation generation. You will then need to manually `git add README.md` and `git commit` its changes.

---

## 2. Project Overview

This NestJS application (`sap-vendor-api`) provides a backend API for managing vendor-related information. It is designed to interact with a PostgreSQL database to store and retrieve vendor headers and their associated items. The API incorporates essential features like request/response transformation, global exception handling, and basic HTTP authentication to secure its endpoints.

## 3. Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 16.x or higher.
*   **npm**: Node Package Manager (comes with Node.js).
*   **Git**: For cloning the repository and managing version control.
*   **PostgreSQL**: A running instance of PostgreSQL for the database.
*   **Google Gemini API Key**: Required for the automated documentation system. Follow the steps in section 1 to obtain and configure it.

## 4. Installation

Follow these steps to set up and run the project locally:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Singh0202/sap-vendor-api.git
    cd sap-vendor-api
    ```
2.  **Install root-level dependencies**:
    This is for the documentation generation scripts.
    ```bash
    npm install
    ```
3.  **Navigate to the NestJS application directory**:
    ```bash
    cd sap-vendor-api/sap-vendor-api
    ```
4.  **Install application dependencies**:
    ```bash
    npm install
    ```
5.  **Set up your PostgreSQL database**:
    *   Create a new PostgreSQL database (e.g., `sap_vendor_db`).
    *   Ensure your database user has appropriate permissions.

## 5. Configuration

### Environment Variables

The application uses environment variables for database configuration. Create a `.env` file in the `sap-vendor-api/sap-vendor-api` directory with the following variables:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=sap_vendor_db
```

### Documentation Automation Key

As described in section 1, the `GOOGLE_API_KEY` is crucial for the automated documentation system.

*   For **GitHub Actions**: Add `GOOGLE_API_KEY` as a repository secret.
*   For **Local Git Hooks**: Set `GOOGLE_API_KEY` as an environment variable in your terminal session.

## 6. Project Structure

The project follows a standard NestJS modular structure, with additional scripts at the root level for documentation automation.

```
.
├── generate-readme.js            # Main script for AI-powered README generation
├── scripts/                      # Utility scripts for git hooks
│   ├── setup-git-hooks.js        # Script to install local git hooks
│   ├── post-push-hook.bat        # Windows-specific git post-push hook
│   └── post-push-hook.sh         # macOS/Linux-specific git post-push hook
├── workflows/                    # GitHub Actions workflows
│   └── update-readme.yml         # Workflow for automated README generation on push
└── sap-vendor-api/               # Root directory for the NestJS application
    ├── src/                      # Application source code
    │   ├── app.module.ts         # Root application module
    │   ├── auth/                 # Authentication module
    │   │   ├── auth.module.ts    # Defines authentication components
    │   │   ├── basic-auth.guard.ts # Custom Basic Auth guard
    │   │   └── basic.strategy.ts # Passport Basic authentication strategy
    │   ├── common/               # Common utilities, filters, and interceptors
    │   │   ├── filters/          # Global exception filters
    │   │   │   └── http-exception.filter.ts # Handles HTTP exceptions globally
    │   │   └── interceptors/     # Global interceptors
    │   │       └── transform.interceptor.ts # Transforms API responses
    │   ├── config/               # Application configuration files
    │   │   └── database.config.ts # TypeORM database configuration
    │   ├── main.ts               # Application entry point (bootstrap)
    │   └── vendor/               # Vendor management module
    │       ├── dto/              # Data Transfer Objects (DTOs)
    │       │   ├── map-input.dto.ts # DTO for vendor input data
    │       │   └── map-output.dto.ts # DTO for vendor output data
    │       ├── entities/         # TypeORM database entities
    │       │   ├── vendor-header.entity.ts # Vendor header entity
    │       │   └── vendor-item.entity.ts # Vendor item entity
    │       ├── mapper/           # Data mappers for DTO transformations
    │       │   └── vendor.mapper.ts # Maps data between DTOs and entities
    │       ├── vendor.controller.ts # Handles vendor API requests
    │       ├── vendor.module.ts  # Defines vendor module components
    │       ├── vendor.repository.ts # Custom TypeORM repositories
    │       └── vendor.service.ts # Business logic for vendor operations
    ├── ormconfig.js              # TypeORM configuration file
    ├── package.json              # Project metadata, scripts, and dependencies
    ├── tsconfig.json             # TypeScript compiler configuration
    └── test/                     # End-to-End (e2e) tests
        └── vendor.e2e-spec.ts    # E2E tests for vendor endpoints
```

## 7. API Endpoints

All API endpoints are prefixed with `/vendors` and require HTTP Basic Authentication.

### Vendor Controller (`sap-vendor-api/src/vendor/vendor.controller.ts`)

*   **`POST /vendors`**
    *   **Description**: Creates a new vendor entry in the database.
    *   **Authentication**: Required (`BasicAuthGuard`).
    *   **Request Body**: `MapInputDto`
        ```json
        {
            "vendorName": "Example Vendor Inc.",
            "vendorDescription": "A test vendor for demonstration.",
            "contactPerson": "John Doe",
            "contactEmail": "john.doe@example.com",
            "contactPhone": "+1234567890"
            // `header` and `items` are expected by service, MapInputDto only shows flat fields.
            // This might indicate a mismatch or a simplified DTO for mapping.
            // Based on service usage, a `data.header` and `data.items` structure is expected.
        }
        ```
    *   **Response**: `MapOutputDto` (HTTP 201 Created)
        ```json
        {
            "statusCode": 201,
            "data": {
                "id": 1,
                "name": "Example Vendor Inc.",
                "description": "A test vendor for demonstration.",
                "createdAt": "2023-01-01T12:00:00.000Z",
                "updatedAt": "2023-01-01T12:00:00.000Z",
                "phone": "9922334455",
                "items": [
                    {
                        "id": 101,
                        "description": "Item Description",
                        "price": 10.99
                    }
                ]
            }
        }
        ```
*   **`GET /vendors`**
    *   **Description**: Retrieves a list of all registered vendors.
    *   **Authentication**: Required (`BasicAuthGuard`).
    *   **Request Body**: None.
    *   **Response**: `MapOutputDto[]` (HTTP 200 OK)
        ```json
        {
            "statusCode": 200,
            "data": [
                {
                    "id": 1,
                    "name": "Vendor A",
                    "description": "Description A",
                    "createdAt": "...",
                    "updatedAt": "...",
                    "phone": "9922334455",
                    "items": [...]
                },
                {
                    "id": 2,
                    "name": "Vendor B",
                    "description": "Description B",
                    "createdAt": "...",
                    "updatedAt": "...",
                    "phone": "9922334455",
                    "items": [...]
                }
            ]
        }
        ```

## 8. Authentication

The application implements **HTTP Basic Authentication** using NestJS Passport.

*   **Strategy**: `BasicStrategy` (from `passport-http`) is used to validate incoming `username` and `password` credentials.
*   **Validation**: The `validate` method in `BasicStrategy` calls an (implied) `AuthService.validateUser` to verify credentials. If validation fails, an `UnauthorizedException` is thrown.
*   **Guard**: `BasicAuthGuard` (extending `AuthGuard('basic')`) protects the API endpoints. Any request to a guarded route must include a valid `Authorization` header with Basic credentials.

**Example `Authorization` Header:**
`Authorization: Basic <base64_encoded(username:password)>`

*Note: The `AuthService` and user validation logic are not provided in the current codebase, implying they would be implemented elsewhere or are part of a larger authentication system.*

## 9. Database

The application uses **PostgreSQL** as its database and **TypeORM** as the Object Relational Mapper (ORM).

### Configuration

*   Database configuration is handled by `sap-vendor-api/src/config/database.config.ts` and `sap-vendor-api/ormconfig.js`.
*   Environment variables (`DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`) are loaded from the `.env` file.
*   `synchronize: true` is set for development, which automatically creates and updates database tables based on entity definitions. This should be set to `false` in production environments, preferring migrations instead.

### Entities

*   **`VendorHeader` (`sap-vendor-api/src/vendor/entities/vendor-header.entity.ts`)**
    Represents the main vendor information.
    *   `id`: Primary key (auto-generated).
    *   `name`: Vendor's name.
    *   `address`: Vendor's address.
    *   `contact_number`: Contact phone number.
    *   `email`: Contact email address.
    *   `created_at`: Timestamp for creation.
    *   `updated_at`: Timestamp for last update.
*   **`VendorItem` (`sap-vendor-api/src/vendor/entities/vendor-item.entity.ts`)**
    Represents individual items associated with a vendor.
    *   `id`: Primary key (auto-generated).
    *   `vendorId`: Foreign key linking to `VendorHeader`.
    *   `itemName`: Name of the item.
    *   `price`: Price of the item (decimal).
    *   `quantity`: Quantity of the item.
    *   `description`: Optional description of the item.

## 10. Running the Application

To run the NestJS application:

1.  **Ensure you are in the `sap-vendor-api/sap-vendor-api` directory.**
2.  **Start in development mode**:
    ```bash
    npm run start:dev # Or `npm run start` if not using watch mode
    ```
    The application will start and listen on port `3000`. You can access it at `http://localhost:3000`.

## 11. Testing

The project includes both unit/integration tests and end-to-end (e2e) tests using Jest.

1.  **Ensure you are in the `sap-vendor-api/sap-vendor-api` directory.**
2.  **Run all tests**:
    ```bash
    npm test
    ```
3.  **Run end-to-end tests only**:
    ```bash
    npm run test:e2e
    ```
    *Note: The e2e tests in `vendor.e2e-spec.ts` include placeholder credentials (`username`, `password`) that need to be replaced with actual valid credentials for successful execution.*

## 12. Deployment

While no specific deployment scripts are provided, here are general guidelines for deploying a NestJS application:

1.  **Build for production**:
    ```bash
    cd sap-vendor-api/sap-vendor-api
    npm run build
    ```
    This compiles the TypeScript code into JavaScript in the `dist` directory.
2.  **Environment Variables**: Ensure all necessary environment variables (especially database credentials) are securely configured in your production environment. Avoid hardcoding sensitive information.
3.  **Process Manager**: Use a process manager like PM2 to keep the application running continuously and handle restarts.
    ```bash
    # Example PM2 command
    pm2 start dist/main.js --name "sap-vendor-api"
    ```
4.  **Containerization**: For scalable deployments, consider containerizing the application using Docker.
5.  **Database Migrations**: In production, set `synchronize: false` in `ormconfig.js` and use TypeORM migrations to manage schema changes.

## 13. Contributing

We welcome contributions to the `sap-vendor-api` project! If you're interested in contributing, please follow these guidelines:

1.  **Fork the repository**.
2.  **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
3.  **Make your changes**. Ensure your code adheres to the project's coding style.
4.  **Write tests** for your changes.
5.  **Run tests** (`npm test` and `npm run test:e2e`) to ensure everything passes.
6.  **Commit your changes** with clear and descriptive commit messages.
7.  **Push your branch** to your forked repository.
8.  **Create a Pull Request** to the `main` branch of the original repository.

## 14. License

This project is licensed under the **MIT License**. See the `LICENSE` file in the root of the `sap-vendor-api` application for more details.