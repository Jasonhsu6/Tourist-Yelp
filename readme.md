RESTful routes

name    url         verb    desc.
INDEX   /dogs       GET     Display a list of all dogs
NEW     /dogs/new   GET     Display a form to make a new dogs
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog

RESTful Routing
Representational state transfer
REST - a mapping between HTTP routes and CRUD(create, read, update, destroy)

name    url         verb    Purpose
INDEX   /dogs       GET     Display a list of all dogs
NEW     /dogs/new   GET     Display a form to make a new dogs
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog
Edit    /dogs/:id   GET     Shows edit form about one dog
Update  /dogs/:id   PUT     Updata one dog, then redirect somewhere
Destroy /dogs/:id   DELETE  Delete one dog, then redirect somewhere