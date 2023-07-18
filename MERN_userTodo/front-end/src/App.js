import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Component/Hadder/Nav';
import UsersDetails from './Component/UsersDetails/UsersDetails';
import SignUp from './Component/Auth/SignUp';
import Login from './Component/Auth/Login';
import PrivetComponent from './Component/Auth/PrivetComponent';
import UserTodo from './Component/dailyTaskDetails/UserTodo';



function App() {
  return (
    <div >
    {/* <FindCities /> */}
      <BrowserRouter>
        <Nav />
        <Routes>
        <Route element={<PrivetComponent />}>
            <Route path='/' element={<UsersDetails />} />
            <Route path='/userTodo' element={<UserTodo />} />
          </Route>
            <Route path='/login' element={<Login />} />
          <Route path='/signUp' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
