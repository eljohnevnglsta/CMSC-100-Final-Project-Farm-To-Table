import needle from "needle";

const baseURL = 'http://localhost:3001'

async function AddUser(userData) {
    try {
        const response = await needle('post', `${baseURL}/add-user`, userData);
        console.log('Add User Response:', response.body);
        return response.body;
    } catch (error) {
        console.error('Error adding user:', error.message);
    }
}

// Function to test getUserByEmail endpoint
async function GetUserByEmail(email) {
    try {
        const response = await needle('post', `${baseURL}/get-user-by-email`, {email: email});
        // console.log('Found User:', response.body);
        return response.body;
    } catch (error) {
        console.error('Error searching user:', error.message);
    }
}

// Function to test updateUserDetails endpoint
async function UpdateUserDetails(email, updatedData) {
    try {
        const response = await needle('post', `${baseURL}/update-user`, {...updatedData, email: email});
        console.log('Update User Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error updating user details:', error.message);
    }
}

async function DeleteUser(email) {
    try {
        const response = await needle('post', `${baseURL}/delete-user`, {email: email});
        console.log('Delete Product Response:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error deleting user:', error.message);
    }
}

async function GetAllUsers(){
    try {
        const response = await needle('post', `${baseURL}/show-all-user`);
        console.log('User List:', response.body);
        return response.body; 
    } catch (error) {
        console.error('Error showing all user:', error.message);
    }
}

//function calls example
// AddUser({
//     firstName: 'John',
//     lastName: 'Doe',
//     userType: 'customer',
//     email: 'john@example.com',
//     password: 'password123'
// });

// console.log(GetUserByEmail('john1@example.com'));
// GetAllUsers();
// UpdateUserDetails('john2@example.com', { firstName: 'Jonathan' });   //email cannot be modified here
// DeleteUser('john2@example.com');
// GetAllUsers();

export {AddUser, GetUserByEmail, UpdateUserDetails, DeleteUser, GetAllUsers}