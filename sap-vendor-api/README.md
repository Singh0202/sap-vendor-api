# sap-vendor-api

## Description
The `sap-vendor-api` is a NestJS application that provides an API for managing vendor data. It interacts with a PostgreSQL database to update and retrieve information from the `vendor_header` and `vendor_item` tables. The API is secured using basic authentication.

## Features
- Basic authentication for secure access to the API.
- CRUD operations for managing vendor data.
- Interaction with a PostgreSQL database using TypeORM.
- Input data mapping to output data through DTOs.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd sap-vendor-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration
1. Create a `.env` file in the root directory and add your PostgreSQL database credentials:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=your_database
   ```

## Running the Application
To start the application, run:
```
npm run start
```

## API Endpoints
- **POST /vendors**: Create a new vendor.
- **GET /vendors**: Retrieve a list of vendors.
- **GET /vendors/:id**: Retrieve a vendor by ID.
- **PUT /vendors/:id**: Update a vendor by ID.
- **DELETE /vendors/:id**: Delete a vendor by ID.

## Testing
To run the end-to-end tests, use:
```
npm run test:e2e
```

## License
This project is licensed under the MIT License.