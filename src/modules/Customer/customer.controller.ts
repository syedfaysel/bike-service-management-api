import { Request, Response, NextFunction } from 'express';
import { CustomerService } from './customer.service';
import { AppError } from '../../utils/errorHandler';

const customerService = new CustomerService();

// Create a new customer
export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      throw new AppError('Name, email, and phone are required', 400);
    }


    const customer = await customerService.createCustomer({ name, email, phone });

    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

// Get all customers
export const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await customerService.getAllCustomers();
    
    res.status(200).json({
      success: true,
      message: 'Customers fetched successfully',
      data: customers
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific customer
export const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Customer ID is required', 400);
    }

    const customer = await customerService.getCustomerById(id);

    res.status(200).json({
      success: true,
      message: 'Customer fetched successfully',
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

// Update customer 
export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    if (!id) {
      throw new AppError('Customer ID is required', 400);
    }

    const customer = await customerService.updateCustomer(id, {
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone })
    });

    res.status(200).json({
      success: true,
      message: 'Customer updated successfully',
      data: customer
    });
  } catch (error) {
    next(error);
  }
};

// Delete a customer
export const deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Customer ID is required', 400);
    }

    await customerService.deleteCustomer(id);

    res.status(200).json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}; 