import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import styles from './TeacherReg.module.css';

function TeacherReg() {
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'teachers'), {
        name,
        teacherId,
        email,
        phone,
        approved: false
      });
      alert('Teacher Registered Successfully!');
      setName('');
      setTeacherId('');
      setEmail('');
      setPhone('');
      // You can add navigation here with useNavigate if you want
    } catch (error) {
      console.error('Error adding teacher:', error);
      alert('Failed to register teacher');
    }
  };

  return (
    <div className={styles.TeacherReg}>
      <div className={styles.SignUpBox}>
        <form className={styles.SignUp} onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Teacher Name"
            required
          /><br />
          <input
            type="text"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            placeholder="Teacher ID"
            required
          /><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          /><br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          /><br />
          <button type="submit" className={styles.SignUpBtn}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default TeacherReg;
