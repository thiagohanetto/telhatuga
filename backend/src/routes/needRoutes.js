import { Router } from "express";

import {
  createNeed,
  getAllNeeds,
  getNeedMatches,
  getMyNeeds
} from "../controllers/needController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  createNeed
);

router.get(
  "/",
  getAllNeeds
);

router.get(
  "/my",
  authMiddleware,
  getMyNeeds
);

router.get(
  "/:id/matches",
  authMiddleware,
  getNeedMatches
);

export default router;