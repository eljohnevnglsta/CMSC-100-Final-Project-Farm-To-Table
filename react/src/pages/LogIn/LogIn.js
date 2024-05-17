// import './LogIn.css';
import axios from 'axios';

const LogIn = () => {

  const handleLogIn = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const url = 'http://localhost:3001/login';
    const data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    var status = '';
    try {
      const response = await axios.post(url, data);  // Await the response
      console.log(response.data);
      status = response.data.status;
    } catch (error) {
      console.error('Error:', error);
    }

      console.log(status);
      if (!status){
        alert('Invalid email or password');
        return;
      }

      window.location.href = '/home';
  };

  const createAccount = (event) => {
    event.preventDefault();
    window.location.href = '/signup';
  };

  return (
    <div>
      <div className="border"></div>
      <div id="SignUpBorder">
        <form id="SignUpForm" onSubmit={handleLogIn}>
          <h1 className="welcome">FARM-TO-TABLE</h1>
          <p className="create">Sign In</p>

          <label htmlFor="email" className="email">Email:</label>
          <input type="email" id="email" name="email" required /><br/>

          <label htmlFor="password" className="password">Password:</label>
          <input type="password" id="password" name="password" required /><br/>

          <button type="submit" className="submit">
            <p className="submitText">Log In</p>
          </button>

          <div className="line"></div>
        </form>
        <form onSubmit={createAccount}>
          <button type="submit" className="createAcc">
            <p className="createAccText">Create New Account</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
