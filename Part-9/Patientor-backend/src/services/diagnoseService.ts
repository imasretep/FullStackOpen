import diagnoseData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const diagnosesList: Diagnosis[] = diagnoseData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesList;
};

export default {
  getDiagnoses,
};
