import './SignUp.css';
import axios from 'axios';

const handleSignUp = async (event) => {
  event.preventDefault(); // Prevent default form submission
  const url = 'http://localhost:3001/signup';
  const data = {
    firstName: document.getElementById('firstName').value,
    middleName: document.getElementById('middleName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value
  };

  var status = false;
  try {
    const response = await axios.post(url, data);
    console.log(response);
    status = response.data.status;
  } catch (error) {
    console.error('Error:', error);
  }

  if (!status){
    alert(status.message);
    return;
  }

  window.location.href = '/home';
}

const SignUp = () => {

  return (
  <div id="SignUpBorder">
    <form id="SignUpForm" onSubmit={handleSignUp}>
        <h1 className="welcome">WELCOME TO FARM-TO-TABLE</h1>
        <p className="create">let's create your account</p>

        <label htmlFor="firstName" className="firstLabel">Fisrt Name:</label>
        <input type="text" id="firstName" name="firstName" required></input><br/>
        
        <label htmlFor="middleName" className="middleLabel">Middle Name:</label>
        <input type="text" id="middleName" name="middleName"></input><br/>

        <label htmlFor="lastName" className="lastLabel">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required></input><br/>
            
        <label htmlFor="email" className="email">Email:</label>
        <input type="email" id="email" name="email" required></input><br/>

        <label htmlFor="password" className="password">Password:</label>
        <input type="password" id="password" name="password" required></input><br/>
        
        <label htmlFor="confirmPassword" className="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required></input><br/>

        <button type="submit" className="submit" /*onSubmit={handleClick}*/>
        <p className="submitText">Sign Up</p>
        </button>
    </form>
  </div>
  );
}

export default SignUp;