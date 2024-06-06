import "../stylesheets/Signup.css";
import axios from 'axios';
import Navbar from "../components/navbar"

export default function Signup() {
    const handleSignup = async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        const url = 'http://localhost:3001/signup';
        const email = document.getElementById('SUEmail').value;
        const data = {
          firstName: document.getElementById('SUFN').value,
          middleName: document.getElementById('SUMN').value,
          lastName: document.getElementById('SULN').value,
          email: email,
          password: document.getElementById('SUPassword').value,
          confirmPassword: document.getElementById('confirmPassword').value,
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
          
        window.location.href = '/home';
    }
    
    return (
      <div id="SignupPage">
        <Navbar links = {navElements}/>
        {/* <div id="SUBackground">
            <img
                src={rootbg}
                alt="peter-wendt-r5-KSMkyo-Sc-unsplash"
                border="0"
            />
        </div> */}
        <div id="SUBorder">
          <form id="SUForm" onSubmit={handleSignup}>
              <h1 className="SUWelcome">WELCOME TO FARM-TO-TABLE</h1>
              <p className="SUCreate">let's create your account</p>
      
              <label htmlFor="SUFN" className="SUFNLabel">First Name:</label>
              <input type="text" id="SUFN" name="firstName" required></input><br/>
              
              <label htmlFor="SUMN" className="SUMNLabel">Middle Name:</label>
              <input type="text" id="SUMN" name="middleName"></input><br/>
      
              <label htmlFor="SULN" className="SULNLabel">Last Name:</label>
              <input type="text" id="SULN" name="lastName" required></input><br/>
                  
              <label htmlFor="SUEmail" className="SUEmail">Email:</label>
              <input type="email" id="SUEmail" name="email" required></input><br/>
      
              <label htmlFor="SUPassword" className="SUPassword">Password:</label>
              <input type="password" id="SUPassword" name="password" required></input><br/>
      
              <label htmlFor="confirmPassword" className="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" required></input><br/>
              
              <button type="submit" className="SUSubmit">
              <p className="SUSubmitText">Sign Up</p>
              </button>
          </form>
        </div>
      </div>
    );
}

const navElements = [
  { title: 'Login', path: '/login' },
  { title: 'Signup', path: '/signup' },
]
