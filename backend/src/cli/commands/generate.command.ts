import { Command } from './command.interface.js';
import { MockWorkoutData } from '../../types/mock-workout-data.type.js';
import got from 'got';
import { TSVWorkoutGenerator } from '../../shared/libs/workout-generator/index.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {
  private initialData: MockWorkoutData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, workoutCount: number) {
    const tsvWorkoutGenerator = new TSVWorkoutGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < workoutCount; i++) {
      await tsvFileWriter.write(tsvWorkoutGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const workoutCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filepath, workoutCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
    // Код для получения данных с сервера.
    // Формирование объявлений.
  }
}
