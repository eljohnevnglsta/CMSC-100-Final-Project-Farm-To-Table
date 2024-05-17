// import './SignUp.css';

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