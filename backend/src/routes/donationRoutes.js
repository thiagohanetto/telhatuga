import { Router } from "express";

import {
  createDonationRequest,
  approveDonationRequest,
  completeDonation,
  getReceivedRequests,
  getMyRequests
} from "../controllers/donationController.js";

import { authMiddleware }
from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/request",
  authMiddleware,
  createDonationRequest
);

router.patch(
  "/:id/approve",
  authMiddleware,
  approveDonationRequest
);

router.patch(
  "/:id/complete",
  authMiddleware,
  completeDonation
);

router.get(
  "/received",
  authMiddleware,
  getReceivedRequests
);

router.get(
  "/my-requests",
  authMiddleware,
  getMyRequests
);

export default router;