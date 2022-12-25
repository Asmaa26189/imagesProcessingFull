import sharp from 'sharp';
import { Response } from 'express';
// function that resize image
const convertImageSize = (
  filePath: string,
  width: number,
  height: number,
  outputFilePath: string,
  res?: Response
): void => {
  if (res) {
    sharp(filePath)
      .resize(width, height)
      .toFile(outputFilePath)
      .then(async () => {
        res.sendFile(outputFilePath);
      });
  } else {
    sharp(filePath).resize(width, height).toFile(outputFilePath);
  }
};

// function that resize image and Flip
const convertImageSizeWithFlip = (
  filePath: string,
  width: number,
  height: number,
  outputFilePath: string,
  res?: Response
): void => {
  if (res) {
    sharp(filePath)
      .resize(width, height)
      .toFile(outputFilePath)
      .then(async () => {
        res.sendFile(outputFilePath);
      });
  } else {
    sharp(filePath).resize(width, height).toFile(outputFilePath);
  }
};

export default { convertImageSize, convertImageSizeWithFlip };
