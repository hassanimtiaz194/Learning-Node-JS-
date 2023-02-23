//A promise is a object that hold the result of async operations
// intiallially its independent state
const p = new Promise((resolve, reject) => {
    // kick off some async work
    setTimeout(() => {
        //resolve(1);  //pending=> resolved, fullfilled
        reject(new Error('message')) //pending=> rejected
    }, 2000)

})

p.then(result => console.log('Result', result))
    .catch(err => console.log('Error', err.message));