// Example of Sync 
//console.log('before');
//console.log('after');

// Example of Async
console.log('before'); //displayed first
const user = await getUser(1);
console.log('after');//displayed second 


async function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user From DB') //displayed third after 2 sec
        return { id: id, gitHubUserID: 'mosh' }
    }, 2000);
}


/* console.log('before'); //displayed first
getUser(1, function (user) {
    console.log('User', user)
    getRepositories(user.gitHubUsername, (repos) => {
        console.log('repos', repos)
    });
})

console.log('after');//displayed second

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user From DB') //displayed third after 2 sec
        callback({ id: id, gitHubUsername: 'mosh' })
    }, 2000);
}

function getRepositories(id, callback) {
    setTimeout(() => {
        console.log('calling github API') //displayed third after 2 sec
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000);
} */

//callbacks named function

/* console.log('before'); //displayed first
getUser(1, getRepositories);
console.log('after');//displayed second

function getRepositories(user) {
    console.log('User', user)
    getRepositories(user.gitHubUsername, getCommits)
}

function getCommits(repos) {
    console.log('repos', repos)
    getCommits(repos, displayCommits)
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user From DB') //displayed third after 2 sec
        callback({ id: id, gitHubUsername: 'mosh' })
    }, 2000);
}

function getRepositories(id, callback) {
    setTimeout(() => {
        console.log('calling github API') //displayed forth after 2 sec
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000);
} */

// promises

/* getUser(1).then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos))
    .then(commits => console.log(commits))
    .catch((e) => console.log(e.message))

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user From DB') //displayed third after 2 sec
            resolve({ id: id, gitHubUsername: 'mosh' })
        }, 2000);
    })
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling github API') //displayed forth after 2 sec
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000);
    })
}

function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('calling github API') //displayed forth after 2 sec
            resolve(['commit'])
        }, 2000);
    })
}  */