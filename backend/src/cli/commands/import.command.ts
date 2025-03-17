import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';

import { DefaultWorkoutService, WorkoutModel, WorkoutService } from '../../shared/modules/workout/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Workout } from '../../types/index.js';

export class ImportCommand implements Command {
  private workoutService: WorkoutService;
  private databaseClient: DatabaseClient;
  private logger: Logger;

  constructor() {
    this.onImportedWorkout = this.onImportedWorkout.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.workoutService = new DefaultWorkoutService(this.logger, WorkoutModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedWorkout(workout: Workout, resolve: () => void) {
    await this.saveWorkout(workout);
    resolve();
  }

  private async saveWorkout(workout: Workout) {

    await this.workoutService.create({
      id: workout.id,
      title: workout.title,
      backgroundImage: workout.backgroundImage,
      level: workout.level,
      type: workout.type,
      duration: workout.duration,
      price: workout.price,
      calories: workout.calories,
      description: workout.description,
      sex: workout.sex,
      video: workout.video,
      rating: workout.rating,
      coachName: workout.coachName,
      isSpecial: workout.isSpecial
    });

  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedWorkout);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(err));
    }
  }
}
