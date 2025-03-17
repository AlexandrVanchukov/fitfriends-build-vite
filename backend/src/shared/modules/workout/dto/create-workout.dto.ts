import { WorkoutType, WorkoutLevel, WorkoutDuration, WorkoutSex } from '../../../../types/index.js';

export class CreateWorkoutDto {
  id: string;
  title: string;
  backgroundImage: string;
  level: WorkoutLevel;
  type: WorkoutType;
  duration: WorkoutDuration;
  price: number;
  calories: number;
  description: string;
  sex: WorkoutSex;
  video: string;
  rating: number;
  coachName: string;
  isSpecial: boolean;
}
