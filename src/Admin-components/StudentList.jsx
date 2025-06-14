import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './StudentList.css';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'students'), (snapshot) => {
      const studentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentData);
    }, (error) => {
      console.error('Error fetching students:', error);
    });

    return () => unsubscribe();
  }, []);

  const handleApprove = async (id) => {
    try {
      const studentRef = doc(db, 'students', id);
      await updateDoc(studentRef, { approved: true });
      console.log(`Student ${id} approved`);
    } catch (error) {
      console.error('Error approving student:', error);
      alert('Failed to approve student');
    }
  };

  const handleDelete = async (id) => {
    try {
      const studentRef = doc(db, 'students', id);
      await deleteDoc(studentRef);
      console.log(`Student ${id} deleted`);
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Failed to delete student');
    }
  };

  return (
    <div className="student-list-container">
      <h2>Student List</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Registration Number</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="6">No students found.</td></tr>
          ) : (
            students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.registrationNo}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.approved ? 'Yes' : 'No'}</td>
                <td>
                  {!student.approved && (
                    <button onClick={() => handleApprove(student.id)}>Approve</button>
                  )}
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
