const LogIn = () => {

  const handleLogIn = () => {
  };

  const createClick = () =>{
  };

  return (
    <div>
      <div className="LIBorder"></div>
      <div id="LIBorder">
        <form id="LIForm" onSubmit={handleLogIn}>
          <h1 className="LIWelcome">FARM-TO-TABLE</h1>
          <p className="LICreate">Sign In</p>

          <label htmlFor="LiEmail" className="LIEmail">Email:</label>
          <input type="email" id="LIEmail" name="email" required /><br/>

          <label htmlFor="password" className="LIPassword">Password:</label>
          <input type="password" id="LIPassword" name="password" required /><br/>

          <button type="submit" className="LISubmit">
            <p className="LISubmitText">Log In</p>
          </button>

          <div className="LIline"></div>
        </form>
        <form onSubmit={createClick}>
          <button type="submit" className="LICreateAcc">
            <p className="LICreateAccText">Create New Account</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
