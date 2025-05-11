import { Router } from 'express';
import {
  createBike,
  getAllBikes,
  getBikeById,
} from './bike.controller';

const router = Router();

// Bike routes
router.post('/', createBike);
router.get('/', getAllBikes);
router.get('/:id', getBikeById);

export default router; 