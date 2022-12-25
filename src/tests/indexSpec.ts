// unit test with jasmine super test
// all imports used
import app from '../index';
import supertest from 'supertest';
import imageResizing from '../utilities/imageResizing';

const request = supertest(app);
// test start page
describe('Test main', () => {
  it('Start page', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});
describe('Test Resize image', () => {
  // test image with well defined name, width and height
  it('image fjord ', async () => {
    const response = await request.get(
      '/images?filename=img1&width=900&height=500'
    );
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  // test image with -ve values in width and height
  it('image -ve width and height', async () => {
    const response = await request.get(
      '/images?filename=img2&width=-700&height=-100'
    );
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  // test image with empty file name
  it('empty image name', async () => {
    const response = await request.get(
      '/images?filename=&width=-700&height=-100'
    );
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  // test float image width and height
  it('float width and height', async () => {
    const response = await request.get(
      '/images?filename=img1&width=700.9999&height=100.88888'
    );
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  // test image without width
  it('test image without width ', async () => {
    const response = await request.get('/images?filename=img2&height=800');
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  // test image without height
  it('test image without height ', async () => {
    const response = await request.get('/images?filename=img1&width=800');
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  // test image without height and width
  it('test image without width and height ', async () => {
    const response = await request.get('/images?filename=img2');
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
  // test format form to
  it('format form to ', async () => {
    const response = await request.get(
      '/images?filename=img1&width=200&height=700&from=jpg&to=Gif'
    );
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/gif');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  // test image link without parameters
  it('image without parameters', async () => {
    const response = await request.get('/images');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });

  // test image fliped
  it('image fliped ', async () => {
    const response = await request.get(
      '/images?filename=img2&width=200&height=700&flip=true'
    );
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/jpeg');
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});
describe('Test api', () => {
  // test /api
  it('api', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    expect(response.notFound).toBeFalsy();
    expect(response.forbidden).toBeFalsy();
    expect(response.notAcceptable).toBeFalsy();
    expect(response.ok).toBeTruthy();
  });
});

const mainDir = process.cwd() as string;
const fileName = 'img1';
const width = 100;
const height = 100;
const imageToFormat = '.jpg';
const imageFormFormat = '.jpg';
const outputFilePath =
  ((((mainDir + '/images/thumb/' + fileName + 'Procssed_' + width) as string) +
    '_' +
    height) as string) +
  '.' +
  imageToFormat;
const filePath = mainDir + '/images/full/' + fileName + '.' + imageFormFormat;

describe('image processing function', () => {
  it('resize', async () => {
    // test image processing
    expect(async () => {
      await imageResizing.convertImageSize(
        filePath,
        width,
        height,
        outputFilePath
      );
    }).not.toThrow();
  });
  it('resize with flip', async () => {
    // test image processing
    expect(async () => {
      await imageResizing.convertImageSizeWithFlip(
        filePath,
        width,
        height,
        outputFilePath
      );
    }).not.toThrow();
  });
});
