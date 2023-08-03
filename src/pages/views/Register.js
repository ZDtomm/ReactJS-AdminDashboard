import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Register() {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi email
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(registerData.username)) {
      // Tampilkan pesan error jika email tidak valid
      Swal.fire({
        icon: 'error',
        title: 'Invalid email',
        text: 'Please enter a valid email address.',
      });
      return;
    }

    // Validasi password
    if (registerData.password.length < 8) {
      // Tampilkan pesan error jika password tidak memenuhi persyaratan
      Swal.fire({
        icon: 'error',
        title: 'Invalid password',
        text: 'Password must be at least 8 characters long.',
      });
      return;
    }

    // Kirim permintaan pendaftaran ke server
    fetch('http://localhost:8080/admin/register', {
      method: 'POST',
      body: JSON.stringify(registerData),
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
        console.log("sukses register", data);
        // Tampilkan SweetAlert sebagai pesan keberhasilan
        Swal.fire({
          icon: 'success',
          title: 'Registration successful!',
          text: 'You can now log in with your credentials.',
        }).then(() => {
          // Setelah SweetAlert ditutup, alihkan ke halaman login
          navigate('/');
        });
      })
      .catch((err) => {
        console.log(err);
        // Tampilkan pesan kesalahan jika pendaftaran gagal
        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: 'Something went wrong. Please try again.',
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-3">Registration Page</h2>
          <div className="card my-5">
            <form className="card-body cardbody-color p-lg-5">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  value={registerData.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="username"
                  className="form-control"
                  id="username"
                  placeholder="Email/Username"
                  value={registerData.username}
                  onChange={handleOnChange}
                />
              </div>
              <div className="mb-3">
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={registerData.password}
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
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  onClick={handleRegister}
                  className="btn btn-primary px-5 mb-4 w-100"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="emailHelp" className="form-text text-center text-dark">
          Already Registered? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
