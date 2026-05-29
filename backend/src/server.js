import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import needRoutes from "./routes/needRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/needs", needRoutes);
app.use("/availabilities", availabilityRoutes);
app.use("/donations", donationRoutes);

app.get("/", (req, res) => {
  return res.json({
    message: "TelhaTuga API funcionando!"
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Servidor rodando na porta ${process.env.PORT}`
  );
});