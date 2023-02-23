
/* // resolve unit test
const p = Promise.resolve({ id: 1 })
p.then(result => console.log(result))

// rejected unit test
const p1 = Promise.reject(new Error('Reason for rejection...'))
p1.catch(error => console.log(error.message))
 */

// multiple async operation
const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 1......')
        resolve(1)
    }, 2000)
})
const p3 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 2......')
        resolve(2)
    }, 2000)
})
const p4 = new Promise((reject) => {
    setTimeout(() => {
        console.log('async operation 3......')
        reject(new Error('async operation 3 failed'))
    }, 2000)
})


// return result if all promise is resolved
Promise.all([p2, p3, p4]).then(result => console.log(result)).catch(err => console.log(err.message))

// return result if one promise is fullfilled
Promise.race([p2, p3, p4]).then(result => console.log(result)).catch(err => console.log(err.message))