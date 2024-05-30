import axios from 'axios';
import "../stylesheets/Login.css";
import rootbg from '../images/root-img.jpg';
import Navbar from "../components/navbar";
import useAuth from '../hooks/useauth';
import AuthContext from '../context/authprovider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

export default function Login(props) {
    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";
    const from2 = location.state?.from?.pathname || "/admin";

    const handleLogIn = async (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const url = 'http://localhost:3001/login';
        const data = {
          email: document.getElementById('LIEmail').value,
          password: document.getElementById('LIPassword').value,
        };

        const url2 = 'http://localhost:3001/get-user-by-email'
        const data2 = {
          email: document.getElementById('LIEmail').value
        };

        var status = false;
        try {
          const response = await axios.post(url, data);  // Await the response
          console.log(response.data);
          status = response.data.status;

        } catch (error) {
          console.error('Error:', error);
        }

        delete data.password;
        var user = {};
        try {
          const findUser = await axios.post('http://localhost:3001/get-user-by-email', data);
          user = findUser.data;
          sessionStorage.setItem("user", JSON.stringify(user.email));
        } catch (error) {
          console.error('Error:', error);
        }

        try{
          const response2 = await axios.post(url2, data);
          const roles2 = response2.data.userType;
          const uemail = response2.data.email;
          const ufname = response2.data.firstName;
          const umname = response2.data.middleName;
          const ulname = response2.data.lastName;
          JSON.stringify(roles2);
          JSON.stringify(uemail);
          JSON.stringify(ufname);
          JSON.stringify(umname);
          JSON.stringify(ulname);
          console.log(roles2);

          var roles = [];
          if(roles2 == 'customer')
            {
              roles = [1];
              navigate(from, { replace: true });
            }
          if(roles2 == 'admin')
            {
              roles = [2];
              navigate(from2, { replace: true });
            }
          setAuth({roles: roles, email: uemail, fname: ufname, mname: umname, lname: ulname, userType: roles2});
        }
        catch (error){
          console.error('Error:', error);
        }
    
          console.log(status);
          if (!status){
            alert('Invalid email or password');
            return;
          }
      };

      useEffect(()=> { 
        console.log("clicked", auth);
      },[auth]);
    
      const createAccount = (event) => {
        event.preventDefault();
        window.location.href = '/signup';
      };
    

      //======================================================================================================
      return (
        <div className='LoginPage'>
          <Navbar links = {navElements}/>
          <div id="LIBackground">
          <img
                    src={rootbg}
                    alt="peter-wendt-r5-KSMkyo-Sc-unsplash"
                    border="0"
                />
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
        </div>
    );
}

const navElements = [
  { title: 'Login', path: '/login' },
  { title: 'Signup', path: '/signup' },
]
