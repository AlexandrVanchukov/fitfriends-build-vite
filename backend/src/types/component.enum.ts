export const Component = {
    RestApplication: Symbol.for('RestApplication'),
    Logger: Symbol.for('Logger'),
    Config: Symbol.for('Config'),
    DatabaseClient: Symbol.for('DatabaseClient'),
    WorkoutService: Symbol.for('WorkoutService'),
    WorkoutModel: Symbol.for('WorkoutModel'),
  } as const;
  