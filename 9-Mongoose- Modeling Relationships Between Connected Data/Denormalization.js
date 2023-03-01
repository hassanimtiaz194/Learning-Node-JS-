const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/test')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  /* author: authorSchema */
  /*  author: {
     type: authorSchema,
     required: true
   } */
  // array of sub documents
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById({ _id: courseId }, [{
    /* $set: {
      'author.name': 'Teddy'
    } */
    $unset: {
      'author.name': ''  // to remove the property
    }
  }]);
  //if we using $set we don't need this 
  /*  course.author.name='hassan imtiaz'
   course.save(); */
}

/* createCourse('Node Course', [
  new Author({ name: 'Hassan1' }),
  new Author({ name: 'Hassan2' }),
  new Author({ name: 'Hassan3' })
]); */

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}
//updateAuthor('63f718a0b1e39e03fde859d7')

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove()
  course.save();
}
//addAuthor('63fd83c5183490e504f627cc',new Author({name:'Hassan4'}))
removeAuthor('63fd83c5183490e504f627cc', '63fd83c5183490e504f627cb')