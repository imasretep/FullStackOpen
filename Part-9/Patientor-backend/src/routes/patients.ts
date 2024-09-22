import express, { NextFunction } from "express";
import patientService from "../services/patientService";
import { Response, Request } from "express";
import { NonSensitivePatientEntry, Patient } from "../types";
import { z } from "zod";
import { newEntrySchema } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, Patient>, res: Response<Patient>) => {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  },
);

router.get("/:id", (req, res: Response<Patient | { error: string }>) => {
  const id = req.params.id;
  const patients: Patient[] = patientService.getPatients();
  const patient: Patient | undefined = patients.find((p) => p.id === id);
  if (!patient) {
    res.status(400).json({ error: "No patients found with that id" });
  }
  res.json(patient);
});

router.use(errorMiddleware);

export default router;
