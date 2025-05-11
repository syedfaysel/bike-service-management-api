import { ServiceStatus, ServiceRecord } from '../../../generated/prisma';

// Convert string status to enum
export const toServiceStatus = (status: string): ServiceStatus => {
  switch (status) {
    case 'pending':
      return ServiceStatus.PENDING;
    case 'in-progress':
      return ServiceStatus.IN_PROGRESS;
    case 'done':
      return ServiceStatus.DONE;
    default:
      throw new Error(`Invalid service status. Must be one of: pending, in-progress, done`);
  }
};

// Convert enum status to string
export const fromServiceStatus = (status: ServiceStatus): string => {
  const statusMap = {
    [ServiceStatus.PENDING]: 'pending',
    [ServiceStatus.IN_PROGRESS]: 'in-progress',
    [ServiceStatus.DONE]: 'done'
  };
  return statusMap[status];
};

// Transform service record for response  
export const transformServiceResponse = (service: ServiceRecord) => ({
  ...service,
  status: fromServiceStatus(service.status)
}); 