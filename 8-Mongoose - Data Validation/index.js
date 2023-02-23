const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => console.log('connected to MongoDB...'))
    .catch((err) => console.log('error connecting to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    //mongoose validation 
    name: {
        type: String,
        required: true, //built-in validator
        minlength: 5,//built-in validator
        maxlength: 255,//built-in validator
        /* match: /pat+tern/ */ //built-in validator
    },
    category: {
        type: String,
        enum: ['web', 'mobile', 'network'], //built-in validator
        lowercase:true, //scheme type options
        //uppercase:true, //scheme type options
        trim:true //scheme type options

    },
    author: String,
    tags: {
        type: Array,
        isAsync: true,
        validate: { //custom validation
            validator: function (v, callback) {
                setTimeout(() => {
                    //do some async work
                    result = v && v.length > 0;
                    callback(result)
                }, 4000)
                // return v && v.length > 0;
            },
            message: 'a course should have atleast on tag'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        // we can't use arrow function beacuse arrow function hasn't this
        required: function () { return this.isPublished },
        min: 10, //built-in validator
        max: 200,//built-in validator
        get:(v)=>{ //scheme type options
            Math.round(v)
        },
        set:(v)=>{ //scheme type options
            Math.round(v)
        }
    }
});
// this a class  
const Course = mongoose.model('Course', courseSchema)

async function createCourse() {
    const course = new Course({
        name: 'Web 3.0',
        category: '-',
        author: "Hassan",
        //tags: [/* 'node', 'backend' */],
        tags: null,
        isPublished: true,
        price: 15
    });
    try {
        /*  course.validate((err) => {
             if (err) {
                 // we are using callback because  
                 //it doesn't return boolean it just return void 
             }
         }) */
        const result = await course.save();
        console.log(result)
    } catch (e) {
        for (field in e.errors) {
            console.log(e.errors[field])
        }
    }
}


createCourse();

//query data
/* async function getCourse() {
    const courses = await Course
        .find({ author: 'Hassan' })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses)
} */

//comparsison operator
/* async function getCourse() {
    //comparison operator
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    //nin (not in)
    const courses = await Course
        //.find({ author: 'Hassan' })
        //.find({ price: { $gte: 10, $lte: 20 } })
        .find({ price: { $in: [10, 15, 20] } }) // select those values whose price is 10,15,20
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses)
} */

// logical operator
/*async function getCourse() {
    const courses = await Course
        .find()
        .or([{ author: 'Hassan' }, { isPublished: true }])
        .and([{ author: 'Hassan' }, { isPublished: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 })
    console.log(courses)
} */

//async function getCourse() {
// /pattern/
// /^pattern/  string that start with i.e /^Hassan/
//   string that ends with i.e /Imtiaz$/
// /pattern$/i this makes sensitive so i at end
// /.*pattern.*/  contains word  i.e /.*Hassan.*/
// const courses = await Course
//.find({ author: '/^Hassan/' })
// .find({ author: '/Imtiaz$/' })
// .find({ author: '/.*Hassan.*/' })
//.limit(10)
//  .sort({ name: 1 })
//    .select({ name: 1, tags: 1 })
//  console.log(courses)
//}

// returns no of document
/* async function getCourse() {
    const courses = await Course
        .find({ author: 'Hassan' })
        .limit(10)
        .sort({ name: 1 })
        .count();
    console.log(courses);
} */

/* async function getCourse() {
    const pageNumber = 2;
    const pageSize = 10;
    // in real example /ap/courses?pageNumber=2&pageSize=10
    const courses = await Course
        .find({ author: 'Hassan' })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .count();
    console.log(courses);
} */
//getCourse();

/* async function updateCourse(id) {
    //Approach 1: Query First
    // findById()
    //modify it properties
    //save()

    const course = await Course.findById(id)
    if (!course) return;
    // 1 way of setting values
    course.isPublished = true;
    course.author = 'Mosh';
    // 2 way of setting values
    // course.set({
    //    isPublished: true,
    //   author: 'mosh'
    //})
    const result = await course.save();
    console.log(result);
} */

/*  async function updateCourse(id) {
    //Approach 2: Update First
    //Update Directly
    //optionally get the updated documents

    const result = await Course.update({ _id: id }, {
        $set: {
            author: 'Ali',
            isPublished: true
        }
    })
    console.log(result);
}  */

//updateCourse('63d7a93fb5dd8d0dc0ef9b84')

/* 
async function deleteCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    //const result = await Course.findByIdAndRemove({ _id: id });
    console.log(result);
}
deleteCourse('63d7a93fb5dd8d0dc0ef9b84') */
