require.main === module;
export interface TrainingResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface TrainingData {
  trainingHours: number[];
  target: number;
}

export const calculateExercises = (
  trainingHours: number[],
  target: number,
): TrainingResult => {
  const periodLength = trainingHours.length;
  const trainingDays = trainingHours.filter((hour) => hour !== 0).length;
  const sum = trainingHours.reduce((a, b) => a + b, 0);
  const average = sum / periodLength;
  const ratingPercentage = (average / target) * 100;

  const success = () => {
    if (average >= target) {
      return true;
    }
    return false;
  };

  const rating = () => {
    if (ratingPercentage < 50) {
      return 1;
    } else if (ratingPercentage >= 50 && ratingPercentage < 100) {
      return 2;
    } else {
      return 3;
    }
  };

  const ratingDescription = (rating: number): string => {
    switch (rating) {
      case 1:
        return "You got still alot work to do!";

      case 2:
        return "Getting there, keep it up!";

      case 3:
        return "Great job";

      default:
        return "error";
    }
  };

  const trainingInfo: TrainingResult = {
    periodLength,
    trainingDays,
    success: success(),
    rating: rating(),
    ratingDescription: ratingDescription(rating()),
    target,
    average,
  };

  return trainingInfo;
};

const checkExercises = (args: string[]): TrainingData => {
  if (args.length < 44) {
    throw new Error(
      "Not enough arguments. First target hour, then daily hours",
    );
  }

  const exerciseData = args.slice(2);
  exerciseData.forEach((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error("Values must be numbers");
    }
  });

  const hours: number[] = exerciseData.map(Number);
  const targetHours: number = hours.shift() as number;

  return {
    trainingHours: hours,
    target: targetHours,
  };
};

try {
  const { trainingHours, target } = checkExercises(process.argv);
  console.log(calculateExercises(trainingHours, target));
} catch (error: unknown) {
  let errorMessage = "Error! ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
