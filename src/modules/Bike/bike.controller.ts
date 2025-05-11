import { Request, Response, NextFunction } from 'express';
import { BikeService } from './bike.service';
import { AppError } from '../../utils/errorHandler';

const bikeService = new BikeService();

// Create a new bike
export const createBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { brand, model, year, customerId } = req.body;

    // Validate required fields
    if (!brand || !model || !year || !customerId) {
      throw new AppError('Brand, model, year, and customerId are required', 400);
    }

    const bike = await bikeService.createBike({ brand, model, year, customerId });

    res.status(201).json({
      success: true,
      message: 'Bike added successfully',
      data: bike
    });
  } catch (error) {
    next(error);
  }
};

// Get all bikes
export const getAllBikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bikes = await bikeService.getAllBikes();

    res.status(200).json({
      success: true,
      message: 'Bikes fetched successfully',
      data: bikes
    });
  } catch (error) {
    next(error);
  }
};

// Get a specific bike
export const getBikeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Bike ID is required', 400);
    }

    const bike = await bikeService.getBikeById(id);

    res.status(200).json({
      success: true,
      message: 'Bike fetched successfully',
      data: bike
    });
  } catch (error) {
    next(error);
  }
};
