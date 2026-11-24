
import express from 'express';
import {
  createOnboarding,
  getOnboardings,
  getOnboardingById
} from '../controllers/OnboardingController.js';

const router = express.Router();

router.post('/', createOnboarding);
router.get('/', getOnboardings);
router.get('/:id', getOnboardingById);

export default router;
