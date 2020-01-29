import * as fs from 'fs';
import * as zlib from 'zlib';
import * as path from 'path';

export const compress = (dirPath, config: compressOptions) => {
  const err = ():void => console.log(`Incorrect directory: ${dirPath}`);

  try {
    if (!fs.statSync(dirPath).isDirectory()) {
      err();
      return;
    }
  } catch {
    err();
    return;
  }

  const compressDir = (dirPath: string) => {
    let files;
    try {
      files = fs.readdirSync(dirPath);
    } catch (e) {
      console.error(e);
      return;
    }

    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isFile()) {
          const fileExtension = filePath.split('.')[filePath.split('.').length - 1];
          if (config.fileTypes.indexOf(fileExtension.toLowerCase()) < 0) {
            continue;
          }

          if (config.verbose) {
            console.log('Compressing ', filePath);
          }

          if (config.compression.indexOf('br') > -1) {
            const outputBrotli = fs.createWriteStream(`${filePath}.br`);
            fs.createReadStream(filePath)
              .pipe(zlib.createBrotliCompress({ params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }))
              .pipe(outputBrotli);
          }

          if (config.compression.indexOf('gz') > -1) {
            const outputGzip = fs.createWriteStream(`${filePath}.gz`);
            fs.createReadStream(filePath)
              .pipe(zlib.createGzip({ level: 9 }))
              .pipe(outputGzip);
          }
        } else {
          compressDir(filePath);
        }
      }
    }
  };

  console.log(`Compressing ${dirPath}...`);
  compressDir(dirPath);
};

export interface compressOptions {
  fileTypes: Array<string>;
  compression: Array<string>;
  verbose: boolean;
}
