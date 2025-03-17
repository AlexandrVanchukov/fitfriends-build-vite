import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { WorkoutLevel } from '../../../types/index.js';
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface WorkoutEntity extends defaultClasses.Base {}
@modelOptions({
  schemaOptions: {
    collection: 'workouts',
    timestamps: true,
  },
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class WorkoutEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public id: string;

  @prop({trim: true, required: true})
  public title: string;

  @prop({trim: true, required: true})
  public backgroundImage: string;

  @prop({trim: true, required: true})
  public level: WorkoutLevel;

  @prop({trim: true, required: true})
  public type: WorkoutType;

  @prop({trim: true, required: true})
  public duration: WorkoutDuration;

  @prop({trim: true, required: true})
  public price: number;

  @prop({trim: true, required: true})
  public calories: number;

  @prop({trim: true, required: true})
  public description: string;

  @prop({trim: true, required: true})
  public sex: WorkoutSex;

  @prop({trim: true, required: true})
  public video: string;

  @prop({trim: true, required: true})
  public rating: number;

  @prop({trim: true, required: true})
  public coachName: string;

  @prop({trim: true, required: true})
  public isSpecial: boolean;


}
export const OfferModel = getModelForClass(OfferEntity);
