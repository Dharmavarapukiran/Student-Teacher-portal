import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import StudentReg from './Student-Components/StudentReg';
import TeacherReg from './Teacher-Component/TeacherReg';
import AdminHome from './Admin-components/AdminHome';
import StudentList from './Admin-components/StudentList';
import TeacherList from './Admin-components/TeacherList';


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
           <Route path='/Student-Login' element={<StudentReg />} />
           <Route path='/Teacher-Login' element={<TeacherReg />} />
           <Route path='/AdminHome' element={<AdminHome />} />
            <Route path='/StudentList' element={<StudentList />} />
             <Route path='/TeacherList' element={<TeacherList />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
