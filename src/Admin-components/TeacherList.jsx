import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import styles from './TeacherList.module.css';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', teacherId: '', email: '', phone: '' });

  useEffect(() => {
    const q = query(collection(db, 'teachers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const teachersArr = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(teachersArr);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (id) => {
    try {
      const docRef = doc(db, 'teachers', id);
      await updateDoc(docRef, { approved: true });
      alert('Teacher approved!');
    } catch (error) {
      console.error('Error approving teacher:', error);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        const docRef = doc(db, 'teachers', id);
        await deleteDoc(docRef);
        alert('Teacher deleted!');
      } catch (error) {
        console.error('Error deleting teacher:', error);
      }
    }
  };

  const startEdit = (teacher) => {
    setEditId(teacher.id);
    setEditForm({
      name: teacher.name,
      teacherId: teacher.teacherId,
      email: teacher.email,
      phone: teacher.phone,
    });
  };

  const cancelEdit = () => {
    setEditId(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const docRef = doc(db, 'teachers', id);
      await updateDoc(docRef, {
        name: editForm.name,
        teacherId: editForm.teacherId,
        email: editForm.email,
        phone: editForm.phone,
      });
      alert('Teacher updated!');
      setEditId(null);
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };

  return (
    <div className={styles.TeacherList}>
      <h2>Teacher List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Teacher ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map(teacher => (
            <tr key={teacher.id}>
              {editId === teacher.id ? (
                <>
                  <td><input type="text" name="name" value={editForm.name} onChange={handleEditChange} /></td>
                  <td><input type="text" name="teacherId" value={editForm.teacherId} onChange={handleEditChange} /></td>
                  <td><input type="email" name="email" value={editForm.email} onChange={handleEditChange} /></td>
                  <td><input type="text" name="phone" value={editForm.phone} onChange={handleEditChange} /></td>
                  <td>{teacher.approved ? 'Yes' : 'No'}</td>
                  <td>
                    <button className={styles.saveBtn} onClick={() => saveEdit(teacher.id)}>Save</button>
                    <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{teacher.name}</td>
                  <td>{teacher.teacherId}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.approved ? 'Yes' : 'No'}</td>
                  <td>
                    <button className={styles.approveBtn} onClick={() => handleApprove(teacher.id)}>Approve</button>
                    <button className={styles.updateBtn} onClick={() => startEdit(teacher)}>Update</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(teacher.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherList;
