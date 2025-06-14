import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';  // CSS Module import

function LoginPage() {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminEmail === 'admin@123' && adminPassword === 'admin') {
      // Redirect to AdminHome
      navigate('/AdminHome');
    } else {
      alert('Invalid Admin Credentials!');
    }
  };

  return (
    <div className={styles.LoginPage}>
      <div className={styles.Header}>
        <h1>MGR University</h1>
      </div>

      <div className={styles.LoginBoxes}>
        {/* Admin Login */}
        <div className={`${styles.loginBox} ${styles.Admin}`}>
          <h2>Admin Login</h2>
          <form className={styles.loginForm} onSubmit={handleAdminLogin}>
            <input 
              type='email' 
              placeholder='Email' 
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              required 
            /><br />
            <input 
              type='password' 
              placeholder='Password'
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              required 
            /><br />
            <button type="submit" className={styles.LoginBtn}>Login</button>
          </form>
        </div>

        {/* Student Login */}
        <div className={`${styles.loginBox} ${styles.Student}`}>
          <h2>Student Login</h2>
          <form className={styles.loginForm}>
            <input type='text' placeholder='Registration Number' required /><br />
            <button type="submit" className={styles.LoginBtn}>Get Otp</button>
            <p>Create An Account &nbsp; <Link to="/Student-Login">SignUp</Link></p>
          </form>
        </div>

        {/* Teacher Login */}
        <div className={`${styles.loginBox} ${styles.Teacher}`}>
          <h2>Teacher Login</h2>
          <form className={styles.loginForm}>
            <input type='email' placeholder='Email' required /><br />
            <input type='password' placeholder='Password' required /><br />
            <button type="submit" className={styles.LoginBtn}>Login</button>
            <p>Create an Account &nbsp; <Link to="/Teacher-Login">SignUp</Link></p>
          </form>
        </div>

      </div>
    </div>
  )
}

export default LoginPage;
