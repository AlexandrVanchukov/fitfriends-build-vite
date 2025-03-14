import { WorkoutDuration, WorkoutLevel, WorkoutSex, WorkoutType } from './workout.type.js';


export type MockWorkoutData = {
    titles: string[];
    backgroundImages: string[];
    levels: WorkoutLevel[];
    types: WorkoutType[];
    durations: WorkoutDuration[];
    prices: number[];
    calories: number[];
    descriptions: string[];
    sex: WorkoutSex[];
    videos: string[];
    ratings: number[];
    coachIds: string[];
    isSpecials: boolean[];
};
