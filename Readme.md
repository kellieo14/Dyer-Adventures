# Dyer Adventures
A simple website for sharing photo albums and blog posts.

This project was created from a desire to have a space for my husband and I to share our travel photos and stories with our families while we are on the road. The application links images from a user's Google Photos account, making album creation simple and database storage realtively small.

## Features
* You can create, edit and delete photo galleries and blogs.
* You can create, edit and delete pages.

## Technologies
* [EJS 2.6.2](https://ejs.co/)
* [Node 11.14.0](https://nodejs.org/en/)
* [Express 4.17.1](https://expressjs.com/)
* [Mongoose 5.6.7](https://mongoosejs.com/)
* [Passport 0.4.0](http://www.passportjs.org/)
* [Bootstrap 4.1.3](https://getbootstrap.com)
* [jQuery](https://jquery.com/)

## Code Style
This project follows Airbnb coding standards.


## Installing
1. Download the project to your computer.
2. In your terminal, direct yourself to DyerAdventures/backend.
3. Run "node app.js". 

## Usage
### Adding a photo gallery: 
1. Create a shared album in [Google Photos](https://www.google.com/photos/about/).
2. Copy the album id Google Photos provides(see below).
![albumId](https://user-images.githubusercontent.com/17169673/67250836-d5d33e80-f421-11e9-8ed4-c74369eb80b2.png)
3. In the "New Gallery" form, paste album id into "ALBUM ID" location.
![Screen Shot 2019-10-21 at 4 51 13 PM (2)](https://user-images.githubusercontent.com/17169673/67251244-475fbc80-f423-11e9-8063-c66cd184fbac.png)
4. To set the cover photo for the album, copy any image address and paste into the "New Gallery" form under "COVER PHOTO".
![Screen Shot 2019-10-21 at 5 04 13 PM 2](https://user-images.githubusercontent.com/17169673/67251737-e638e880-f424-11e9-844b-5118fe7ac56e.png)
5. Fill in the rest of the form fields and push "CREATE".


## License
MIT © [Kellie Dyer](https://github.com/kellieo14)