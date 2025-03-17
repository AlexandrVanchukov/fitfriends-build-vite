import { WorkoutGenerator } from './workout-generator.interface.js';
import { generateRandomValue, getRandomItem} from '../../helpers/index.js';
import { MockWorkoutData } from '../../../types/index.js';

const MIN_ID = 1;
const MAX_ID = 100000;

const MIN_PRICE = 0;
const MAX_PRICE = 100000;

const MIN_RATING = 0;
const MAX_RATING = 5;

export class TSVWorkoutGenerator implements WorkoutGenerator {
  constructor(private readonly mockData: MockWorkoutData) {}

  public generate(): string {
    const id = generateRandomValue(MIN_ID, MAX_ID).toString();
    const title = getRandomItem<string>(this.mockData.titles);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const level = getRandomItem<string>(this.mockData.levels);
    const type = getRandomItem<string>(this.mockData.types);
    const duration = getRandomItem<string>(this.mockData.durations);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const calories = getRandomItem<string>(this.mockData.calories);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const sex = getRandomItem<string>(this.mockData.sex);
    const video = getRandomItem<string>(this.mockData.videos);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const coachName = getRandomItem<string>(this.mockData.coachNames);
    const isSpecial = getRandomItem<string>(this.mockData.isSpecials);


    return [
      id,
      title,
      backgroundImage,
      level,
      type,
      duration,
      price,
      calories,
      description,
      sex,
      video,
      rating,
      coachName,
      isSpecial
    ].join('\t');
  }
}
