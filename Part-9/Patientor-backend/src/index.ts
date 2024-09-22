import express from "express";
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses/", diagnosesRouter);
app.use("/api/patients/", patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
