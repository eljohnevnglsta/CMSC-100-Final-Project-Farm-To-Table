import Home from '../Home/Home';
import { Outlet, Link } from 'react-router-dom';

const LogIn = () => {

  const handleLogIn = () => {

  };

  function createClick() {
    const pass = "1234"

    console.log("Successful");


    window.location.href = "/home"

  };

  return (
    <div>
      <a href="/Home">Home </a>
      <div className="border"></div>
      <div id="SignUpBorder">
        <form id="SignUpForm">
          <h1 className="welcome">FARM-TO-TABLE</h1>
          <p className="create">Sign In</p>

          <label htmlFor="email" className="email">Email:</label>
          <input type="email" id="email" name="email" required /><br />

          <label htmlFor="password" className="password">Password:</label>
          <input type="password" id="password" name="password" required /><br />


          <button type="submit" className="submit">
            <p className="submitText" value="Submit" onClick={createClick()}>Log In</p>
          </button>

          <div className="line"></div>
        </form>


        <form>
          <button type="submit" className="createAcc">
            <p className="createAccText">Create New Account</p>
          </button>
        </form>
      </div>
    </div >
  );
}

export default LogIn;
