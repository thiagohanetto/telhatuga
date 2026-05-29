import { Router } from "express";

import {
  createAvailability,
  getAllAvailabilities,
  getMyAvailabilities
} from "../controllers/availabilityController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createAvailability
);

router.get(
  "/",
  getAllAvailabilities
);

router.get(
  "/my",
  authMiddleware,
  getMyAvailabilities
);

export default router;