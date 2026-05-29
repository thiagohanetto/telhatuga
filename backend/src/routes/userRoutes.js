import { Router } from "express";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    return res.json({
      message: "Rota protegida funcionando",
      userId: req.userId
    });

  }
);

export default router;