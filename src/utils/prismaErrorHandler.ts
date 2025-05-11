import { Prisma } from '../generated/prisma';
import { AppError } from './errorHandler';


export const handlePrismaError = (error: unknown): AppError => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = error as Prisma.PrismaClientKnownRequestError;
    switch (prismaError.code) {
      case 'P2002':
        // unique field error
        const field = (prismaError.meta?.target as string[])?.[0] || 'field';
        return new AppError(`${field} already exists`, 400);
      
      case 'P2003':
        //  foreign key error
        return new AppError('Referenced record does not exist', 400);
      
      case 'P2025':
        // Record not found
        return new AppError('Record not found', 404);
      
      case 'P2014':
        // Invalid ID
        return new AppError('Invalid ID format', 400);
      
      default:
        return new AppError('Database operation failed', 500);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new AppError('Invalid data provided', 400);
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return new AppError('Database operation failed', 500);
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return new AppError('Database error occurred', 500);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new AppError('Database connection failed', 500);
  }

  if (error instanceof AppError) {
    return error;
  }

  return new AppError('An unexpected error occurred', 500);
}; 