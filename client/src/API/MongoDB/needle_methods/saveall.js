import needle from 'needle';

const response = await needle('post', `http://localhost:3001/signup`, 
{
    email: "gcpelletero@gmail.com",
    firstName: "John",
    lastName: "Doe",
    password:"abcdefg",
    confirmPassword:"abcdefg"

});
