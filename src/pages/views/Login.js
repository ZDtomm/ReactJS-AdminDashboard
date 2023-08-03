import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authAction';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [adminLogin, setAdminLogin] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    setAdminLogin((currAdminLogin) => {
      return { ...currAdminLogin, [e.target.id]: e.target.value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!adminLogin.username || !adminLogin.password) {
      if (!adminLogin.username && !adminLogin.password) {
        Swal.fire({
          icon: 'error',
          title: 'Empty Fields',
          text: 'Please enter your email and password.',
          appendTo: '#password-error-container', 
        });
      } else if (!adminLogin.username) {
        Swal.fire({
          icon: 'error',
          title: 'Empty Email',
          text: 'Please enter your email.',
          appendTo: '#username-error-container', 
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Empty Password',
          text: 'Please enter your password.',
          appendTo: '#password-error-container', 
        });
      }
      return;
    }

    fetch('http://localhost:8080/api/authenticate', {
      method: 'POST',
      body: JSON.stringify(adminLogin),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        console.log("sukses login", data)
        let jwtToken = data.token
        let adminId = data.adminId
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('adminId', adminId);
        dispatch(login(jwtToken));

        if (location.state && location.state.fromPath) {
            console.log("masuk navigate")
            navigate(location.state.fromPath);
        } else {
            console.log("masuk home")
            navigate('/dashboard');
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Incorrect email or password.',
        });
        console.log(err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


    return ( 
        <div className="container">
      <div className="row">
          <div className="col-md-6 offset-md-3">
              <h2 className="text-center text-dark mt-3">Login Page</h2>
              <div className="card my-5">

                  <form className="card-body cardbody-color p-lg-5">

                      <div className="text-center" style={{ marginBottom: '15px' }}>
                          <img src="/images/logofoodease.png"
                                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                width="100px" alt="profile"/>
                      </div>

                      <div className="mb-3">
                          <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            aria-describedby="emailHelp" 
                            placeholder='username'
                            value={adminLogin.email}
                            onChange={handleOnChange}
                          />
                           <div id="username-error-container"></div>
                      </div>
                      <div className="mb-3">
                          <div className="input-group">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="form-control"
                              id="password"
                              placeholder="Password"
                              value={adminLogin.password}
                              onChange={handleOnChange}
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={togglePasswordVisibility}
                              style={{ border: 'none', background: 'none' }}
                            >
                              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </button>
                          </div>
                          <div id="password-error-container"></div>
                        </div>
                      <div className="text-center">
                          <button 
                            type="submit"
                            onClick={handleLogin}
                            className="btn btn-primary px-5 mb-4 w-100">Login</button>
                      </div>
                  </form>
              </div>

          </div>
          <div 
            id="emailHelp" 
            className="form-text text-center text-dark">Not Registered? <Link to="/register"> Create an Account </Link>
          </div>
      </div>
  </div>
     );
}

export default Login;