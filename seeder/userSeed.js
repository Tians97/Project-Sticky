const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const demoUsers = [
    {
        username: "ps1",
        email: "ps1@123.com",
        password: "123456"
    },
    // {
    //     username: "",
    //     email: "",
    //     password: ""
    // }
]

function createRandomUser() {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

Array.from({ length: 10 }).forEach(() => {
    demoUsers.push(createRandomUser());
});


function createNewUser(userData) {
    const newUser = new User({
        username: userData.username,
        email: userData.email
    });

    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(userData.password, salt, async (err, hashedPassword) => {
            if (err) throw err;
            try {
                newUser.hashedPassword = hashedPassword;
                const user = await newUser.save();
                return res.json(await loginUser(user));
            }
            catch (err) {
                next(err);
            }
        })
    });
}

function seedUsers() {
    demoUsers.map(user => createNewUser(demoUsers))
}


console.log(seedUsers());


