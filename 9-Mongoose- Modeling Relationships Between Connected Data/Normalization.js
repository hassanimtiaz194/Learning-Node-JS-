const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    /* .populate('author') */ // this will show whole document of author
    //.populate('author', 'name bio') // this will show id(default) name bio property of author document
    .populate('author', 'name -_id') // this will show id(default) will be excluded name property of author document
    .select('name author');
  console.log(courses);
}

//createAuthor('Hassan', 'My bio', 'My Website');

//createCourse('Node Course', '63f7123ecf15ff85e30675eb')

listCourses();