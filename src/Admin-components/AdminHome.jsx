import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminHome.module.css';

function AdminHome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Home</h1>
      <Link className={styles.linkButton} to="/StudentList">View Student List</Link><br/>
      <Link className={styles.linkButton} to="/TeacherList">View Teacher List</Link>
    </div>
  );
}

export default AdminHome;
