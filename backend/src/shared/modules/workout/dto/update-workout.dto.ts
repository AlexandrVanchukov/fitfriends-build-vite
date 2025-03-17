import { WorkoutType, WorkoutLevel, WorkoutDuration, WorkoutSex } from '../../../../types/index.js';

export class UpdateWorkoutDto {
  public title?: string;
  public backgroundImage?: string;
  public level?: WorkoutLevel;
  public type?: WorkoutType;
  public duration?: WorkoutDuration;
  public price?: number;
  public calories?: number;
  public description?: string;
  public sex?: WorkoutSex;
  public video?: string;
  public coachName?: string;
  public isSpecial?: boolean;
}
