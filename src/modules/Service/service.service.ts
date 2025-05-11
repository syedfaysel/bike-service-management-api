import {
  PrismaClient,
  ServiceStatus,
  ServiceRecord,
} from "../../../generated/prisma";
import prisma from "../../utils/prisma";
import { AppError } from "../../utils/errorHandler";
import { handlePrismaError } from "../../utils/prismaErrorHandler";

type CreateServiceInput = {
  bikeId: string;
  serviceDate: Date;
  description: string;
  status: ServiceStatus;
};

type UpdateServiceStatusInput = {
  id: string;
  status: ServiceStatus;
};

type CompleteServiceInput = {
  id: string;
  completionDate: Date;
};

export class ServiceService {
  // Create a new service record
  async createService(data: CreateServiceInput): Promise<ServiceRecord> {
    try {
      if (data.description.length < 10 || data.description.length > 500) {
        throw new AppError(
          "Description must be between 10 and 500 characters",
          400
        );
      }

      const bike = await prisma.bike.findUnique({
        where: { bikeId: data.bikeId },
      });

      if (!bike) {
        throw new AppError("Bike not found", 404);
      }

      return await prisma.serviceRecord.create({
        data,
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Get all services
  async getAllServices(): Promise<ServiceRecord[]> {
    try {
      return await prisma.serviceRecord.findMany({
        orderBy: { serviceDate: "desc" },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Get service by ID
  async getServiceById(id: string): Promise<ServiceRecord> {
    try {
      const service = await prisma.serviceRecord.findUnique({
        where: { serviceId: id },
      });

      if (!service) {
        throw new AppError("Service not found", 404);
      }

      return service;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Update service status
  async updateServiceStatus({
    id,
    status,
  }: UpdateServiceStatusInput): Promise<ServiceRecord> {
    try {
      return await prisma.serviceRecord.update({
        where: { serviceId: id },
        data: {
          status,
          ...(status === ServiceStatus.DONE && { completionDate: new Date() }),
        },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Complete service
  async completeService({
    id,
    completionDate,
  }: CompleteServiceInput): Promise<ServiceRecord> {
    try {
      return await prisma.serviceRecord.update({
        where: { serviceId: id },
        data: {
          status: ServiceStatus.DONE,
          completionDate,
        },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  // Get pending or overdue services
  async getPendingOrOverdueServices(): Promise<ServiceRecord[]> {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      return await prisma.serviceRecord.findMany({
        where: {
          AND: [
            {
              OR: [
                { status: ServiceStatus.PENDING },
                { status: ServiceStatus.IN_PROGRESS },
              ],
            },
            {
              serviceDate: { lt: sevenDaysAgo },
            },
          ],
        },
        orderBy: { serviceDate: "asc" },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
