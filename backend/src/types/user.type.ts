export type Sex = 'мужской' | 'женский' | 'неважно';
export type MetroStation = 'Пионерская' | 'Петроградская' | 'Удельная' | 'Звёздная' | 'Спортивная';

export type User = {
    id: string;
    name: string;
    email: string;
    photo: string;
    password: string;
    sex: Sex;
    birthdate: Date;
    description: string;
    metroStation: MetroStation;
    backgroundImage: string;
    createdAt: Date;
};
