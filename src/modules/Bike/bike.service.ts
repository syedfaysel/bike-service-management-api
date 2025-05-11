import { Bike } from '../../generated/prisma';
import prisma from '../../utils/prisma';
import { AppError } from '../../utils/errorHandler';
import { handlePrismaError } from '../../utils/prismaErrorHandler';

type CreateBikeInput = Omit<Bike, 'bikeId'>;

export class BikeService {
  // Create a new bike
  async createBike(data: CreateBikeInput): Promise<Bike> {
    try {
      
      // Check if customer exists
      const customer = await prisma.customer.findUnique({
        where: { customerId: data.customerId }
      });

      if (!customer) {
        throw new AppError('Customer not found', 404);
      }

      return await prisma.bike.create({ data });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Get all bikes
  async getAllBikes(): Promise<Bike[]> {
    try {
      return await prisma.bike.findMany({});
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Get bike by ID
  async getBikeById(id: string): Promise<Bike> {
    try {
      const bike = await prisma.bike.findUnique({
        where: { bikeId: id },
      });

      if (!bike) {
        throw new AppError('Bike not found', 404);
      }

      return bike;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }


  // Delete bike
  async deleteBike(id: string): Promise<void> {
    try {
      // Check if bike belogns to any service
      const bike = await prisma.bike.findUnique({
        where: { bikeId: id },
        include: {
          services: true
        }
      });

      if (!bike) {
        throw new AppError('Bike not found', 404);
      }

      if (bike.services.length > 0) {
        throw new AppError('Cannot delete bike with associated service records', 400);
      }

      await prisma.bike.delete({
        where: { bikeId: id }
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
