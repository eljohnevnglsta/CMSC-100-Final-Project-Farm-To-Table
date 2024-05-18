import axios from 'axios';
import "../stylesheets/Login.css";

export default function Login(props) {
    
    const handleLogIn = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const url = 'http://localhost:3001/login';
        const data = {
          email: document.getElementById('LIEmail').value,
          password: document.getElementById('LIPassword').value,
        };

        var status = false;
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

          delete data.password;
          var user = {};
          try {
            const findUser = await axios.post('http://localhost:3001/get-user-by-email', data);
            user = findUser.data;
            sessionStorage.setItem('user', JSON.stringify(user));
          } catch (error) {
            console.error('Error:', error);
          }
          
          window.location.href = '/home';
      };
    
      const createAccount = (event) => {
        event.preventDefault();
        window.location.href = '/signup';
      };
    
      return (
        <div className='LoginPage'>
            <div id="LIBorder">
                <form id="LIForm" onSubmit={handleLogIn}>
                    <h1 className="LIWelcome">FARM-TO-TABLE</h1>
                    <p className="LICreate">Sign In</p>

                    <label htmlFor="LiEmail" className="LIEmail">Email:</label>
                    <input type="email" id="LIEmail" name="email" required /><br />

                    <label htmlFor="password" className="LIPassword">Password:</label>
                    <input type="password" id="LIPassword" name="password" required /><br />

                    <button type="submit" className="LISubmit">
                        <p className="LISubmitText">Log In</p>
                    </button>
                    <div id='message'></div>
                </form>

                <form onSubmit={createAccount}>
                    <button type="submit" className="LICreateAcc">
                        <p className="LICreateAccText">Create New Account</p>
                    </button>
                </form>
            </div>
        </div>
    );
}