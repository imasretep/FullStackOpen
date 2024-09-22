import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { TrainingResult } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (height && weight) {
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
      const infoText: string = calculateBmi(Number(height), Number(weight));
      return res.json({
        height: Number(height),
        weight: Number(weight),
        bmi: infoText,
      });
    }
  }
  return res.status(400).json({ error: "malformatted parameters" });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  for (const hour of daily_exercises) {
    if (isNaN(Number(hour))) {
      return res.status(400).json({ error: "malformatted parameters" });
    }
  }

  if (isNaN(Number(target))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result: TrainingResult = calculateExercises(daily_exercises, target);

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
