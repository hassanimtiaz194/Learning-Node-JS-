// In RDMS we have concept of relationship which enforces 
//data integrity

// to work with association there are two approches

//using refernces (Normalization)
//seperate collection for storing authors
let author = {
    name: 'Hassan'
}
let course = {
    // here we are using reference
    //storing id of author collection
    author: 'id'
}

//using Embedded Documents (Denormalization)
//embedding document inside another document
let course2 = {
    author: {
        name: 'Hassan'
    }
}

//Hybrid
let author3 = {
    name: 'Hassan'
    //50 other properties
}
let course3 = {
    author3: {
        id: 'ref',
        name: 'Hassan'
    }
}