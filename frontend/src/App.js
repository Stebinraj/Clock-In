import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddEmployee from './pages/AddEmployee';
import AddProjectOrTask from './pages/AddProjectOrTask';
import Analysis from './pages/Analysis';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import UpdateEmployee from './pages/UpdateEmployee';
import UpdateTracker from './pages/UpdateTracker';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/analysis' element={<Analysis />}></Route>
            <Route path='/register' element={<AddEmployee />}></Route>
            <Route path='/update' element={<UpdateEmployee />}></Route>
            <Route path='/updatetracker' element={<UpdateTracker />}></Route>
            <Route path='/create' element={<AddProjectOrTask />}></Route>
        </Routes>
    );
}

export default App;
