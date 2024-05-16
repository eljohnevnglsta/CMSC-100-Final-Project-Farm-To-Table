import './SignUp.css';

const SignUp = () => {

  return (
  <div id="SignUpBorder">
    <form id="SignUpForm">
        <h1 class="welcome">WELCOME TO FARM-TO-TABLE</h1>
        <p class="create">let's create your account</p>

        <label for="firstName" class="firstLabel">Fisrt Name:</label>
        <input type="text" id="firstName" name="firstName" required></input><br/>
        
        <label for="middleName" class="middleLabel">Middle Name:</label>
        <input type="text" id="middleName" name="middleName"></input><br/>

        <label for="lastName" class="lastLabel">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required></input><br/>
            
        <label for="email" class="email">Email:</label>
        <input type="email" id="email" name="email" required></input><br/>

        <label for="password" class="password">Password:</label>
        <input type="password" id="password" name="password" required></input><br/>
        
        <button type="submit" class="submit" /*onSubmit={handleClick}*/>
        <p class="submitText">Sign Up</p>
        </button>
    </form>
  </div>
  );
}

export default SignUp;