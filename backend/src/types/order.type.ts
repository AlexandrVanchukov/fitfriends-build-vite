export type OrderTypes = 'абонимент';
export type PaymentMethod = 'visa' | 'mir' | 'umoney';

export type Order = {
    id: string;
    type: OrderTypes;
    workoutId: string;
    price: number;
    count: number;
    orderPrice: number;
    paymentMethod: PaymentMethod;
    createdAt: Date;
};
