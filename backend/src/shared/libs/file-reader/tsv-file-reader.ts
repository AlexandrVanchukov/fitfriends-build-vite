import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Workout, WorkoutDuration, WorkoutLevel, WorkoutSex, WorkoutType } from '../../../types/index.js';
export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseLineToWorkout(line: string): Workout {
    const [
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
    ] = line.split('\t');

    return {
      id,
      title,
      backgroundImage,
      level: this.parseType<WorkoutLevel>(level),
      type: this.parseType<WorkoutType>(type),
      duration: this.parseType<WorkoutDuration>(duration),
      price: this.parseInt(price),
      calories: this.parseInt(calories),
      description,
      sex: this.parseType<WorkoutSex>(sex),
      video,
      rating: this.parseFloat(rating),
      coachName,
      isSpecial: this.parseBoolean(isSpecial)
    };
  }

  private parseBoolean(booleanString: string): boolean {
    return booleanString.toLowerCase() === 'true';
  }

  private parseInt(intString: string): number {
    return Number.parseInt(intString, 10);
  }

  private parseFloat(floatString: string): number {
    return Number.parseFloat(floatString);
  }

  private parseType<T>(parseString: string): T {
    return parseString as T;
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToWorkout(completeRow);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
