import express from "express";
import diagnoseService from "../services/diagnoseService";
import { Response } from "express";
import { Diagnosis } from "../types";
const router = express.Router();

router.get("/", (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
