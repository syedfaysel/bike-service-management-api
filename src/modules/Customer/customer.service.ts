import { Customer } from '../../../generated/prisma';
import prisma from '../../utils/prisma';
import { AppError } from '../../utils/errorHandler';
import { handlePrismaError } from '../../utils/prismaErrorHandler';


type CreateCustomerInput = Omit<
  Customer,
  'customerId' | 'createdAt'
>;


export class CustomerService {
  // Create a new customer
  async createCustomer(data: CreateCustomerInput): Promise<Customer> {
    try {
      return await prisma.customer.create({ data });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Get all customers
  async getAllCustomers(): Promise<Customer[]> {
    try {
      return await prisma.customer.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Get customer by ID
  async getCustomerById(id: string): Promise<Customer> {
    try {
      const customer = await prisma.customer.findUnique({
        where: { customerId: id }
      });

      if (!customer) {
        throw new AppError('Customer not found', 404);
      }

      return customer;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Update customer
  async updateCustomer(id: string, data: Partial<CreateCustomerInput>): Promise<Customer> {
    try {
      return await prisma.customer.update({
        where: { customerId: id },
        data
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Delete customer
  async deleteCustomer(id: string): Promise<void> {
    try {
      const customer = await prisma.customer.findUnique({
        where: { customerId: id },
        include: { bikes: true }
      });

      if (!customer) {
        throw new AppError('Customer not found', 404);
      }

      if (customer.bikes.length > 0) {
        throw new AppError('Cannot delete customer with associated bikes', 400);
      }

      await prisma.customer.delete({
        where: { customerId: id }
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
} 