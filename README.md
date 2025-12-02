Here's a comprehensive `README.md` generated based on the provided repository code, as if the `generate-readme.js` script (powered by Google Gemini AI) had analyzed the entire project.

```markdown
# NestJS SAP Vendor API

## 1. Project Overview

This repository hosts a robust NestJS API designed for managing vendor data, integrating seamlessly with a PostgreSQL database. It provides core functionalities for creating and retrieving vendor information, safeguarded by a basic authentication mechanism. The API is structured to be scalable and maintainable, leveraging NestJS's modular architecture, TypeORM for database interactions, and Passport.js for authentication.

**Key Feature**: This `README.md` itself is automatically generated and updated on every `git push` to the repository, utilizing a custom GitHub Actions workflow powered by Google Gemini AI. This ensures that the documentation always remains synchronized with the latest codebase.

## 2. Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **Node.js**: Version 16.x or higher (Node.js 20.x is recommended for optimal performance and compatibility with GitHub Actions setup).
*   **npm**: Node Package Manager, usually bundled with Node.js.
*   **PostgreSQL**: A running instance of a PostgreSQL database server.
*   **Git**: For version control.

## 3. Installation

Follow these steps to set up and run the application locally.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Singh0202/sap-vendor-api.git
    cd sap-vendor-api
    ```

2.  **Install Dependencies**:
    Navigate to the `sap-vendor-api` subdirectory (containing the NestJS project's `package.json`) and install all necessary dependencies.
    ```bash
    cd sap-vendor-api
    npm install
    ```
    If you intend to use the local Git hook for README generation, ensure the main repository root's `generate-readme.js` dependencies are also installed:
    ```bash
    # From the repository root
    npm install @google/generative-ai
    ```

3.  **Set Up Local Git Hooks (Optional for Auto-Documentation)**:
    For local, instant README generation after `git push`, you can install the Git hooks.
    ```bash
    # From the repository root
    npm run setup-hooks
    ```
    This command will copy the appropriate `post-push` hook script (`.sh` for Unix/macOS, `.bat` for Windows) into your `.git/hooks` directory.

## 4. Configuration

The application relies on environment variables for sensitive data and database connection settings.

1.  **Create `.env` File**:
    Create a `.env` file in the `sap-vendor-api` subdirectory. This file will store your database credentials and other configuration values.

2.  **Environment Variables**:
    Populate your `.env` file with the following variables:
    ```dotenv
    # Database Configuration
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_database_name

    # API Configuration
    PORT=3000 # Optional, default is 3000

    # For Documentation Automation (if using local Git hooks)
    GOOGLE_API_KEY=your_google_gemini_api_key
    ```
    **Important**: Never commit your `.env` file to version control. Ensure it's listed in your `.gitignore`.

3.  **Google API Key (for Auto-Documentation)**:
    *   **For Local Git Hooks**: Set `GOOGLE_API_KEY` as an environment variable in your shell session.
        *   **macOS/Linux**: `export GOOGLE_API_KEY="your-api-key"`
        *   **Windows (PowerShell)**: `$env:GOOGLE_API_KEY="your-api-key"`
    *   **For GitHub Actions**: Add `GOOGLE_API_KEY` as a repository secret in your GitHub repository settings (`Settings` > `Secrets and variables` > `Actions`). This is crucial for the automated README generation to work on pushes.

## 5. Project Structure

The project follows a standard NestJS modular structure, with a clear separation of concerns.

```
.
├── .git/
│   └── hooks/
│       └── post-push               # Local Git hook (installed by npm run setup-hooks)
├── scripts/
│   ├── setup-git-hooks.js          # Script to install Git hooks
│   ├── post-push-hook.sh           # Git hook for Unix/macOS
│   └── post-push-hook.bat          # Git hook for Windows
├── workflows/
│   └── update-readme.yml           # GitHub Actions workflow for auto-documentation
├── generate-readme.js              # Main script to generate README.md using Gemini AI
├── sap-vendor-api/                 # Root of the NestJS application
│   ├── src/
│   │   ├── app.module.ts           # Root module
│   │   ├── auth/                   # Authentication module
│   │   │   ├── auth.module.ts
│   │   │   ├── basic-auth.guard.ts # Basic Auth Guard
│   │   │   └── basic.strategy.ts   # Passport Basic Strategy
│   │   ├── common/                 # Common utilities (filters, interceptors)
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts # Global Exception Filter
│   │   │   └── interceptors/
│   │   │       └── transform.interceptor.ts # Global Response Interceptor
│   │   ├── config/                 # Configuration files
│   │   │   └── database.config.ts  # TypeORM database configuration
│   │   ├── main.ts                 # Application entry point
│   │   └── vendor/                 # Vendor management module
│   │       ├── dto/                # Data Transfer Objects
│   │       │   ├── map-input.dto.ts
│   │       │   └── map-output.dto.ts
│   │       ├── entities/           # TypeORM entities
│   │       │   ├── vendor-header.entity.ts
│   │       │   └── vendor-item.entity.ts
│   │       ├── mapper/             # Data mapping utilities
│   │       │   └── vendor.mapper.ts
│   │       ├── vendor.controller.ts # API controller for vendors
│   │       ├── vendor.module.ts    # Vendor module
│   │       ├── vendor.repository.ts # Custom TypeORM repositories
│   │       └── vendor.service.ts   # Business logic for vendors
│   ├── test/                       # E2E tests
│   │   └── vendor.e2e-spec.ts
│   ├── ormconfig.js                # TypeORM CLI configuration
│   ├── package.json                # Project dependencies and scripts
│   ├── tsconfig.json               # TypeScript configuration
│   └── .env.example                # Example environment variables (not provided, but good practice)
├── package.json                    # Root level dependencies (for auto-documentation)
└── README.md                       # This file (auto-generated)
```

## 6. API Endpoints

All API endpoints are prefixed with `/vendors`. Basic Authentication is required for all vendor-related operations.

| Method | Endpoint | Description | Request Body | Response Body | Authentication |
| :----- | :------- | :---------- | :----------- | :------------ | :------------- |
| `POST` | `/vendors` | Creates a new vendor entry in the database. | `MapInputDto` (contains vendor details like `vendorName`, `contactPerson`, `contactEmail`) | `MapOutputDto` (newly created vendor details with `id`, `name`, `phone`, `items`) | Basic Auth Required |
| `GET` | `/vendors` | Retrieves a list of all existing vendors. | None | `MapOutputDto[]` (array of vendor details) | Basic Auth Required |

## 7. Authentication

The API uses **Basic Authentication** implemented with `Passport.js`.

*   **Mechanism**: A `BasicStrategy` is configured using `passport-http`.
*   **Validation**: `BasicStrategy` delegates user validation to a (not explicitly provided but assumed) `AuthService`, which is expected to verify the provided username and password.
*   **Guard**: `BasicAuthGuard` protects the API endpoints, ensuring that only authenticated requests proceed.

To access protected endpoints, include an `Authorization` header with `Basic <base64_encoded(username:password)>`.
Example: `Authorization: Basic YWRtaW46cGFzc3dvcmQ=` (for username `admin` and password `password`).

## 8. Database

*   **Type**: PostgreSQL
*   **ORM**: TypeORM
*   **Configuration**: Database connection settings are managed via `ormconfig.js` and `src/config/database.config.ts`, utilizing environment variables for flexibility.
*   **Entities**:
    *   `VendorHeader`: Stores primary vendor information.
        *   `id` (PrimaryGeneratedColumn)
        *   `name` (string)
        *   `address` (string)
        *   `contact_number` (string)
        *   `email` (string)
        *   `created_at` (Date)
        *   `updated_at` (Date)
    *   `VendorItem`: Stores items associated with a vendor.
        *   `id` (PrimaryGeneratedColumn)
        *   `vendorId` (number)
        *   `itemName` (string)
        *   `price` (decimal)
        *   `quantity` (number)
        *   `description` (string, nullable)
*   **Synchronization**: The `synchronize: true` option is enabled in `ormconfig.js` and `database.config.ts`. This automatically creates database tables from your entities on application startup. **Note**: `synchronize: true` is suitable for development environments but **should be set to `false` in production** to prevent accidental data loss and use TypeORM migrations for schema changes.

## 9. Running the Application

To start the NestJS application:

1.  **Navigate to the application directory**:
    ```bash
    cd sap-vendor-api
    ```
2.  **Start in Development Mode**:
    This will compile the TypeScript code and start the application with hot-reloading.
    ```bash
    npm run start
    ```
    The application will typically run on `http://localhost:3000`.

3.  **Build for Production**:
    ```bash
    npm run build
    ```
    This compiles the TypeScript code into JavaScript in the `dist` directory.

4.  **Start in Production Mode**:
    After building, you can run the compiled JavaScript application.
    ```bash
    npm run start:prod
    # Or navigate to dist folder and run: node main.js
    ```

## 10. Testing

The project includes unit and end-to-end (e2e) tests.

1.  **Navigate to the application directory**:
    ```bash
    cd sap-vendor-api
    ```
2.  **Run Unit Tests**:
    ```bash
    npm test
    ```
3.  **Run End-to-End Tests**:
    ```bash
    npm run test:e2e
    ```
    **Note**: E2E tests (`test/vendor.e2e-spec.ts`) include placeholder credentials (`username`, `password`) in `auth('username', 'password')`. These should be replaced with valid credentials for actual testing.

## 11. Deployment

This is a standard NestJS application. Deployment involves:

1.  **Building the application**: `npm run build`
2.  **Setting up a production environment**: Ensure Node.js and PostgreSQL are available.
3.  **Configuring environment variables**: Crucially, ensure all `DB_*` environment variables are correctly set in the production environment. Set `NODE_ENV=production`.
4.  **Running the compiled application**: `node dist/main.js` or via a process manager like PM2.

For the automated README generation feature in a CI/CD pipeline (e.g., GitHub Actions):
*   Ensure `GOOGLE_API_KEY` is securely stored as a GitHub Secret.
*   The `workflows/update-readme.yml` workflow is already configured to build, generate docs, and push updates.

## 12. Contributing

We welcome contributions to this project!

1.  **Fork the repository**.
2.  **Create a new branch**: `git checkout -b feature/your-feature-name`
3.  **Make your changes**.
4.  **Ensure tests pass** and add new tests if necessary.
5.  **Commit your changes**: `git commit -m "feat: Add new vendor endpoint"`
6.  **Push to your fork**: `git push origin feature/your-feature-name`
7.  **Open a Pull Request** to the `main` branch.

**Regarding Documentation**: This repository features automated documentation generation. Any `git push` will trigger a GitHub Actions workflow that regenerates the `README.md` using Google Gemini AI, ensuring that the documentation stays up-to-date with your code changes. Please ensure your code is clean and well-structured to facilitate accurate AI-driven documentation. While the automation helps, manual review and refinement of the generated `README.md` are always encouraged before merging major changes.

## 13. License

This project is licensed under the **MIT License** - see the `LICENSE` file for details (not explicitly provided in snippets, but assumed based on `package.json` entry).

```