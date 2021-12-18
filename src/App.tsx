import React from 'react';
import Styles from './App.module.css';
import ClassPage from './components/ClassPage/ClassPage';
import StudentPage from './components/StudentsPage/StudentPage';
import CreatePage from './components/CreatePage/CreatePage';
import {BrowserRouter as MainRouter, Route, Routes as Swich, Link, Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className={Styles.header}>
        <h2>hello</h2>
      </header>
      <div>
        <MainRouter>
          <div>
            <Link to='/'>classes</Link>
            <Link to='/StudentPage'>StudentPage</Link>
            <Link to='/CreatePage'>CreatePage</Link>
          </div>
          <Swich>
            <Route path='/' element={<ClassPage/>}/>
            <Route path='/StudentPage' element={<StudentPage/>}/>
            <Route path='/CreatePage' element={<CreatePage/>}/>
          </Swich>
        </MainRouter>
      </div>
    </div>
  );
}

export default App;
