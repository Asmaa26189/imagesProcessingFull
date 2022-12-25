// this is the main this end point used for resize  current images in full folder and put them with new size in thumb folder
// all imports used
import express, { Request, Response } from 'express';
import fs from 'fs';
import imageResizing from '../../utilities/imageResizing';
import sizeOf from 'image-size';

// router definition
const images = express.Router();
// all supported image format
const imagesFormat: string[] = ['jpg', 'png', 'gif'];
// default image format from to
const defaultFormFormat: string = 'jpg' as string;
const defaultToFormat: string = 'jpg' as string;

// acess it by /image?filename=&width=&height=&from=&to=
images.get('/', async (req: Request, res: Response): Promise<void> => {
  // check that reponse completed true
  if (res.statusCode == 200) {
    // define the main directory
    const mainDir: string = process.cwd() as string;
    // dfine image directory
    const dir = './images/full';
    //get all files in image directory
    const files = fs.readdirSync(dir);
    // define the output image directory
    const outDir = './images/thumb';
    // get all files in output image directory
    const outFiles = fs.readdirSync(outDir);

    // get image name from query string
    const fileName: string = req.query.filename as string;
    let width: number;
    let height: number;
    // get image width from query string
    const widthQuery: string = req.query.width as string;
    //get image height from query string
    const heightQuery: string = req.query.height as string;

    // getting format
    let imageFormFormat: string | undefined = req.query.from as string;
    let imageToFormat: string | undefined = req.query.to as string;

    // flip image
    const imageFlip: string = req.query.flip as string;

    //check if format didn't send back to your default format (jpg)
    imageFormFormat = checkFromImageFormat(imageFormFormat, imagesFormat);
    imageToFormat = checkToImageFormat(imageToFormat, imagesFormat);

    // check if the target image allready exists in full folder or not
    if (files.includes(fileName + '.' + imageFormFormat)) {
      // get the full path for target image
      const filePath =
        mainDir + '/images/full/' + fileName + '.' + imageFormFormat;
      // get width after check if exists or not
      width = checkQueryWidth(widthQuery, filePath, req.query.width as string);
      // get height after check if exists or not
      height = checkQueryHeight(
        heightQuery,
        filePath,
        req.query.height as string
      );
      // check that width and height are +ve
      if (width > 0 && height > 0) {
        // get the full path for output image
        const outputFilePath =
          ((((mainDir +
            '/images/thumb/' +
            fileName +
            'Procssed_' +
            width) as string) +
            '_' +
            height) as string) +
          '.' +
          imageToFormat;
        const imageOutName =
          ((((fileName + 'Procssed_' + width) as string) +
            '_' +
            height) as string) +
          '.' +
          imageToFormat;
        // check if the image is allready processed before or not
        if (outFiles.includes(imageOutName)) {
          // get out image size
          const dimensions = sizeOf(outputFilePath);
          // check is it the same image with same size is not exist
          if (dimensions.width != width || dimensions.height != height) {
            // check if user needs to flip image or not

            if (imageFlip == undefined && imageFlip != 'true') {
              // resize target image with sharp
              imageResizing.convertImageSize(
                filePath,
                width,
                height,
                outputFilePath,
                res
              );
            } else {
              //if user need to flip image
              // resize target image with sharp
              imageResizing.convertImageSizeWithFlip(
                filePath,
                width,
                height,
                outputFilePath,
                res
              );
            }
          } else {
            // if image is allready exists get it directly from folder and show it
            console.log('Cached');
            res.sendFile(outputFilePath);
          }
        } else {
          // resize target image with sharp
          // check if user needs to flip image or not
          if (imageFlip == undefined && imageFlip != 'true') {
            imageResizing.convertImageSize(
              filePath,
              width,
              height,
              outputFilePath,
              res
            );
          } // if user need to flip image
          else {
            imageResizing.convertImageSizeWithFlip(
              filePath,
              width,
              height,
              outputFilePath,
              res
            );
          }
        }
      } else {
        // if user sends negative or zero in width/ height
        res.send(
          '<div style="text-align:center;"><h1>You have (-ve/0/Not Number) value (width/height) please check it  </h1></div>'
        );
      }
    } else {
      // if targat image not exist in full folder
      res.send(
        '<div style="text-align:center;"><h1>File Not Found </h1></div>'
      );
    }
  } else {
    res.send('<div style="text-align:center;"><h1>API Error </h1></div>');
  }
});
//// functions//////
// to check Form image format exists or not
const checkFromImageFormat = (
  imageFormFormat: undefined | string,
  imagesFormat: string[]
): undefined | string => {
  let imageFormat: undefined | string = imageFormFormat;
  // if image format doesnot exists return default one
  if (
    imageFormFormat == undefined ||
    imageFormFormat == null ||
    !imagesFormat.includes(imageFormFormat.toLowerCase())
  )
    imageFormat = defaultFormFormat.toLowerCase();
  return imageFormat;
};
// to check Form image format exists or not
const checkToImageFormat = (
  imageToFormat: undefined | string,
  imagesFormat: string[]
): undefined | string => {
  let imageFormat: undefined | string = imageToFormat;
  // if image format doesnot exists return default one
  if (
    imageToFormat == undefined ||
    imageToFormat == null ||
    !imagesFormat.includes(imageToFormat.toLowerCase())
  )
    imageFormat = defaultToFormat.toLowerCase();

  return imageFormat;
};

// check width sends in query string or not
const checkQueryWidth = (
  widthQuery: undefined | string,
  filePath: string,
  reqQueryWidth: undefined | string
): number => {
  let width: number;
  // if it doesn't exist get the default width
  if (widthQuery == undefined) width = sizeOf(filePath).width as number;
  else width = parseInt(reqQueryWidth as string);
  return width;
};
// check height sends in query string or not
const checkQueryHeight = (
  heightQuery: undefined | string,
  filePath: string,
  reqQueryHeight: undefined | string
): number => {
  let height: number;
  // if it doesn't exist get the default height
  if (heightQuery == undefined) height = sizeOf(filePath).height as number;
  else height = parseInt(reqQueryHeight as string);
  return height;
};

// Export router to use it in any import
export default images;
