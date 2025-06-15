import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';  // Make sure this is properly imported
import styles from './LoginPage.module.css';

function LoginPage() {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (adminEmail === 'admin@123' && adminPassword === 'admin') {
      navigate('/AdminHome');
    } else {
      alert('Invalid Admin Credentials!');
    }
  };

  const handleStudentLogin = (e) => {
    e.preventDefault();
    navigate('/StudentHome');
  };

  const handleTeacherLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, teacherEmail, teacherPassword);
      alert('Teacher Login Successful!');
      navigate('/TeacherHome');
    } catch (error) {
      console.error('Teacher Login Failed:', error);
      alert('Invalid Teacher Credentials!');
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
          <form className={styles.loginForm} onSubmit={handleStudentLogin}>
            <input 
              type='text' 
              placeholder='Registration Number' 
              value={studentRegNo}
              onChange={(e) => setStudentRegNo(e.target.value)}
              required 
            /><br />
            <button type="submit" className={styles.LoginBtn}>Get Otp</button>
            <p>Create An Account &nbsp; <Link to="/Student-Login">SignUp</Link></p>
          </form>
        </div>

        {/* Teacher Login */}
        <div className={`${styles.loginBox} ${styles.Teacher}`}>
          <h2>Teacher Login</h2>
          <form className={styles.loginForm} onSubmit={handleTeacherLogin}>
            <input 
              type='email' 
              placeholder='Email' 
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              required 
            /><br />
            <input 
              type='password' 
              placeholder='Password' 
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
              required 
            /><br />
            <button type="submit" className={styles.LoginBtn}>Login</button>
            <p>Create an Account &nbsp; <Link to="/Teacher-Login">SignUp</Link></p>
          </form>
        </div>

      </div>
    </div>
  )
}

export default LoginPage;
