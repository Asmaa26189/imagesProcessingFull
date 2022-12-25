#Main function 
===============
the project main functionality is to resized predefined images in full folder and if it allready resized with same width and height show it only without processed
##########################################################    
#Usage of API
==============
I have used 3 APIs
'/'
    to show me the main page
'/api'
    to test rouer 
'/images?filename=&width&height='
    to make the main functionality

Note : current images names in full path [img1.jpg,img2.jpg,img3.jpg,img4.jpg]
##########################################################
#Technologies Used
===================
I have written some scripts that needs to be run
scripts
    "test": "npm run build && npm run jasmine"
    "build": "npx tsc"
    "lint": "eslint . --ext .ts"
    "prettier": "prettier --config .prettierrc 'src/**/*.ts' --write"
    "start": "nodemon src/index.ts"
    "jasmine": "jasmine"
***********************************************************************
I have used some dependencies
"devDependencies":
    npm i --save-dev @types/express@4.17.13
    npm i --save-dev @types/jasmine@3.6.3
    npm i --save-dev @types/node@18.0.6
    npm i --save-dev @types/sharp@^0.30.4
    npm i --save-dev @types/supertest@2.0.12
    npm i --save-dev eslint@7.12.1
    npm i --save-dev eslint-config-prettier@6.15.0
    npm i --save-dev eslint-plugin-prettier@3.4.1
    npm i --save-dev nodemon@2.0.19
    npm i --save-dev prettier@2.7.1
    npm i --save-dev @typescript-eslint/eslint-plugin@5.30.7
    npm i --save-dev @typescript-eslint/parser@5.30.7
    npm i --save-dev  get-element@0.1.1
    npm i --save-dev image-size@1.0.2
    npm i --save-dev jasmine@3.6.4
    npm i --save-dev jasmine-spec-reporter@6.0.0 
    npm i --save-dev ts-node@10.9.1
    npm i --save-dev typescript@4.7.4
"dependencies":
    npm i express@4.18.1
    npm i sharp@0.25.4
    npm i supertest@6.2.4
 
##########################################################
#Unit Tests
==========
-test start page 
-test image with well defined name, width and height
-test image with -ve values in width and height
-test image with empty file name
-test image link without parameters
-test /api
-test function Resize
-test function Resize with flip
##########################################################
#How it works
=============
-you can access the url direct:
example:/images?filename=fjord&width=100&height=100
-or acess the main page and click link:Go To Image Resizing
then will go to empty parameters url :/images?filename=something&width=&height=
add your values after each equal 
also you can try to send height only or width only 
in this case the empty height or width will get it default image 
##########################################################
#extra
=============
to flip image
example:/images?filename=img1&width=200&height=700&flip=true
to take image format and convert it to other format
example:/images?filename=img1&width=200&height=700&from=jpg&to=Gif
to flip image and change image from format to other format 
example:/images?filename=img1&width=200&height=700&from=jpg&to=Gif&flip=true
##########################################################
#commands to run
================
npm run build
npm run prettier
npm run lint 
npm run test
npm run start
##########################################################