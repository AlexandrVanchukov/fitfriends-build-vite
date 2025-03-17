
export type WorkoutLevel = 'новичок' | 'любитель' | 'профессионал';
export type WorkoutType = 'йога'| 'бег'| 'бокс'| 'стрейчинг'| 'кроссфит'| 'аэробика'| 'пилатес';
export type WorkoutDuration = '10-30 мин' | '30-50 мин' | '50-80 мин' | '80-100 мин';
export type WorkoutSex = 'для мужчин' | 'для женщин' | 'для всех';

export type Workout = {
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
};
