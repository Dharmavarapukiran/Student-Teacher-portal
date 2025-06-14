import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from './StudentReg.module.css';

function StudentReg() {
  const [name, setName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'students'), {
        name,
        registrationNo,
        email,
        phone,
        approved: false
      });
      alert('Student Registered Successfully!');
      // Navigate to admin home or any page you want
      navigate('/AdminHome');
    } catch (error) {
      console.error('Error adding student: ', error);
      alert('Failed to register student');
    }
  };

  return (
    <div className={styles.StudentReg}>
      <div className={styles.SignUpBox}>
        <form className={styles.SignUp} onSubmit={handleSubmit}>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Student Name'
            required
          /><br />
          <input
            type='text'
            value={registrationNo}
            onChange={(e) => setRegistrationNo(e.target.value)}
            placeholder='Registration Number'
            required
          /><br />
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          /><br />
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone Number'
            required
          /><br />
          <button type="submit" className={styles.SignUpBtn}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default StudentReg;
