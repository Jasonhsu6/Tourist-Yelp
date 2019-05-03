# Tourist attraction yelp web application with MEN stack (Mongodb, Express, Node.js)

## Intro
[MongoDB](https://www.mongodb.com/) - MongoDB is the leading NoSQL database, empowering businesses to be more agile and scalable.

[Express](https://expressjs.com/) - Express is a minimal and flexible node.js web application framework, providing a robust set of features for building single and multi-page, and hybrid web applications.

[Node.js](https://nodejs.org/en/) - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.

### RESTful API/Routes
REST(representational state transfer)

|name    |url         |verb    |Purpose|
|--------|:-----------|:-------|:--------------------------------------|
|INDEX   |/dogs       |GET     |Display a list of all dogs|
|NEW     |/dogs/new   |GET     |Display a form to make a new dogs
|CREATE  |/dogs       |POST    |Add new dog to DB
|SHOW    |/dogs/:id   |GET     |Shows info about one dog
|Edit    |/dogs/:id   |GET     |Shows edit form about one dog
|Update  |/dogs/:id   |PUT     |Updata one dog, then redirect somewhere
|Destroy |/dogs/:id   |DELETE  |Delete one dog, then redirect somewhere

## Getting Started and Prerequisites
### Install node.js
Install [Node.js](https://nodejs.org/en/)

### Install express
npm install express

### Set up mongodb
npm install mongodb --save

More on this [Tutorial](https://www.npmjs.com/package/mongodb)

### Clone the repository:
git clone https://github.com/Jasonhsu6/Toursit-Yelp


### Start up the server
(Note: Before running, make sure mongodb is running)
node app.js
