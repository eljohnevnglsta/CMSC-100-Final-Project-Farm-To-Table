import './SignUp.css';
import axios from 'axios';

const handleSignUp = async (event) => {
  event.preventDefault(); // Prevent default form submission
  const url = 'http://localhost:3001/signup';
  const data = {
    firstName: document.getElementById('SUFN').value,
    middleName: document.getElementById('SUMN').value,
    lastName: document.getElementById('SULN').value,
    email: document.getElementById('SUEmail').value,
    password: document.getElementById('SUPassword').value,
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
  <div id="SUBorder">
    <form id="SUForm">
        <h1 class="SUWelcome">WELCOME TO FARM-TO-TABLE</h1>
        <p class="SUCreate">let's create your account</p>

        <label for="SUFN" class="SUFNLabel">Fisrt Name:</label>
        <input type="text" id="SUFN" name="firstName" required></input><br/>
        
        <label for="SUMN" class="SUMNLabel">Middle Name:</label>
        <input type="text" id="SUMN" name="middleName"></input><br/>

        <label for="SULN" class="SULNLabel">Last Name:</label>
        <input type="text" id="SULN" name="lastName" required></input><br/>
            
        <label for="SUEmail" class="SUEmail">Email:</label>
        <input type="email" id="SUEmail" name="email" required></input><br/>

        <label for="SUPassword" class="SUPassword">Password:</label>
        <input type="password" id="SUPassword" name="password" required></input><br/>
        
        <button type="submit" class="SUSubmit" /*onSubmit={handleClick}*/>
        <p class="SUSubmitText">Sign Up</p>
        </button>
    </form>
  </div>
  );
}

export default SignUp;
