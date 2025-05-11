import { Request, Response, NextFunction } from "express";
import { ServiceService } from "./service.service";
import { AppError } from "../../utils/errorHandler";
import { toServiceStatus, transformServiceResponse } from "./service.utils";

const serviceRecordService = new ServiceService();

// Create a new service record
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bikeId, serviceDate, description, status } = req.body;

    if (!bikeId || !serviceDate || !description || !status) {
      throw new AppError(
        "Bike ID, service date, description, and status are required",
        400
      );
    }

    const parsedDate = new Date(serviceDate);
    if (isNaN(parsedDate.getTime())) {
      throw new AppError("Invalid service date format", 400);
    }

    const service = await serviceRecordService.createService({
      bikeId,
      serviceDate: parsedDate,
      description,
      status: toServiceStatus(status),
    });

    res.status(201).json({
      success: true,
      message: "Service record created successfully",
      data: transformServiceResponse(service),
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Invalid service status")
    ) {
      next(new AppError(error.message, 400));
    } else {
      next(error);
    }
  }
};

// Get all services
export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await serviceRecordService.getAllServices();
    res.status(200).json({
      success: true,
      message: "Service records fetched successfully",
      data: services.map(transformServiceResponse),
    });
  } catch (error) {
    next(error);
  }
};

// Get service by id
export const getServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError("Service ID is required", 400);
    }

    const service = await serviceRecordService.getServiceById(id);
    res.status(200).json({
      success: true,
      message: "Service record fetched successfully",
      data: transformServiceResponse(service),
    });
  } catch (error) {
    next(error);
  }
};

// Update service status
export const updateServiceStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      throw new AppError("Service ID and status are required", 400);
    }

    const service = await serviceRecordService.updateServiceStatus({
      id,
      status: toServiceStatus(status),
    });

    res.status(200).json({
      success: true,
      message: "Service record status updated successfully",
      data: transformServiceResponse(service),
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Invalid service status")
    ) {
      next(new AppError(error.message, 400));
    } else {
      next(error);
    }
  }
};

// Complete a service
export const completeService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { completionDate } = req.body;
    const doneDate = completionDate ? new Date(completionDate) : new Date();
    if (!id) {
      throw new AppError("Service ID is required", 400);
    }

    if (isNaN(doneDate.getTime())) {
      throw new AppError("Invalid completion date format", 400);
    }

    const service = await serviceRecordService.completeService({
      id,
      completionDate: doneDate,
    });
    res.status(200).json({
      success: true,
      message: "Service marked as completed",
      data: transformServiceResponse(service),
    });
  } catch (error) {
    next(error);
  }
};

// Get pending or overdue services
export const getPendingOrOverdueServices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await serviceRecordService.getPendingOrOverdueServices();
    res.status(200).json({
      success: true,
      message: "Overdue or pending services fetched successfully",
      data: services.map(transformServiceResponse),
    });
  } catch (error) {
    next(error);
  }
};
