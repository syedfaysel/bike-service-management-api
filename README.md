# Bike Servicing Management API

This project is a backend API for managing bike servicing operations. It is built with Node.js, Express, TypeScript, and Prisma ORM. Details of the project are given below:

## Live backend
- (https://bike-service-management-api.vercel.app)  

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

## Features

- Customer Management (CRUD operations)
- Bike Management (CRUD operations)
- Service Record Management
- Status tracking for services
- Pending/Overdue services tracking
- Standardized error handling
- Type-safe database operations with Prisma

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/syedfaysel/bike-service-management-api.git
   cd bike-service-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   PORT=3000
   NODE_ENV=development
   ```

4. Set up the database:
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Customer Endpoints
- `POST /api/customers` - Create a new customer
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get a specific customer
- `PUT /api/customers/:id` - Update customer details
- `DELETE /api/customers/:id` - Delete a customer

### Bike Endpoints
- `POST /api/bikes` - Add a new bike
- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/:id` - Get a specific bike

### Service Endpoints
- `POST /api/services` - Create a service record
- `GET /api/services` - Get all service records
- `GET /api/services/:id` - Get a specific service record
- `PUT /api/services/:id/complete` - Mark a service as completed
- `GET /api/services/status` - Get pending or overdue services

