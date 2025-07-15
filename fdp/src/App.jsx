import { useState } from 'react'
import './App.css'
import Dashboard from './dashboard'
import User from './userlogin'
import StudentDash from './studentdashboard'
import Payment from './payment'
import WorkshopEvents from './eventselection'
import SignIn from './studentsignin'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Dashboard/> */}
    {/* <User/> */}
    {/* <Payment/>   */}
    {/* <StudentDash/> */}
    {/* <WorkshopEvents/> */}
    <Router>
      <Routes>
        <Route path='/' element= {<SignIn/>}/>;
        <Route path='/payment' element= {<Payment/>}/>;
        <Route path='/selection' element ={<WorkshopEvents/>}/>;
        <Route path='/dash' element={<StudentDash/>}/>;
        <Route path='/register' element= {<User/>}/>;
        <Route path='/AdminDash' element= {<Dashboard/>}/>;
        <Route path='/signin' element= {<SignIn/>}/>;
      </Routes>
    </Router>
    </>
  )
}

export default App
