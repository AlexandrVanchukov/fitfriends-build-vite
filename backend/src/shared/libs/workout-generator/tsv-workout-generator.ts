import dayjs from 'dayjs';

import { WorkoutGenerator } from './workout-generator.interface.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { MockWorkoutData } from '../../../types/index.js';

const MIN_ID = 1;
const MAX_ID = 100000;


export class TSVWorkoutGenerator implements WorkoutGenerator {
  constructor(private readonly mockData: MockWorkoutData) {}

  public generate(): string {
    const randomLocation = getRandomItem<Location>(this.mockData.locations) as Location;

    const id = generateRandomValue(MIN_ID, MAX_ID).toString();
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItems<string>(this.mockData.descriptions).join(' ');
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(this.mockData.isPremium);
    const isFavorite = getRandomItem<string>(this.mockData.isFavorite);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const type = getRandomItem<string>(this.mockData.types);
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const hostId = getRandomItem<string>(this.mockData.hostIds);
    const comments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();
    const lat = randomLocation.latitude;
    const lon = randomLocation.longitude;

    return [
      id,
      title,
      description,
      createdDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      hostId,
      comments,
      lat,
      lon
    ].join('\t');
  }
}
