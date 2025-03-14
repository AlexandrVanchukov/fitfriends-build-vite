import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, OfferType, City, Goods, User } from '../../types/index.js';

const DEFAULT_ZOOM = 9;

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
  }

  private parseLineToOffer(line: string): Offer {
    const [
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
      lon,
    ] = line.split('\t');

    return {
      id,
      title,
      description,
      createdDate: new Date(createdDate),
      city: city as City,
      previewImage,
      images: this.parseStringsSplitBySemicolon(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: this.parseFloat(rating),
      type: type as OfferType,
      bedrooms: this.parseInt(bedrooms),
      maxAdults: this.parseInt(maxAdults),
      price: this.parseInt(price),
      goods: this.parseGoods(goods),
      hostId: this.parseHostId(hostId),
      comments: this.parseInt(comments),
      location: {
        latitude: this.parseFloat(lat),
        longitude: this.parseFloat(lon),
        zoom: DEFAULT_ZOOM
      }
    };
  }

  private parseHostId(hostId: string): User {
    return {
      id: hostId,
      name: 'default_name',
      email: 'default_email',
      avatarUrl: '',
      password: 'default',
      type: 'default'

    };
  }

  private parseStringsSplitBySemicolon(parseString: string): string[] {
    return parseString.split(';');
  }

  private parseGoods(goodsString: string): Goods[] {
    return goodsString.split(';') as Goods[];
  }

  private parseBoolean(booleanString: string): boolean {
    return booleanString.toLowerCase() === 'true';
  }

  private parseInt(priceString: string): number {
    return Number.parseInt(priceString, 10);
  }

  private parseFloat(priceString: string): number {
    return Number.parseFloat(priceString);
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

        const parsedOffer = this.parseLineToOffer(completeRow);
        await new Promise((resolve) => {
          this.emit('line', parsedOffer, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);
  }
}
