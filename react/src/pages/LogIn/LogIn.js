import './LogIn.css';

const LogIn = () => {

  const handleLogIn = () => {
  };

  const createClick = () =>{
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
        <form onSubmit={createClick}>
          <button type="submit" className="createAcc">
            <p className="createAccText">Create New Account</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
