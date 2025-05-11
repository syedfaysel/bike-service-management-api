import { Router } from 'express';
import {
  createService,
  getAllServices,
  getServiceById,
  updateServiceStatus,
  completeService,
  getPendingOrOverdueServices
} from './service.controller';

const router = Router();

// Service routes
router.post('/', createService);
router.get('/', getAllServices);
router.get('/status', getPendingOrOverdueServices);
router.get('/:id', getServiceById);
router.put('/:id/status', updateServiceStatus);
router.put('/:id/complete', completeService);

export default router; 