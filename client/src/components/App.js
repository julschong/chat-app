import DashBoard from './DashBoard';
import './styles/App.css';
import { useContext } from 'react';
import { SocketContext } from './../context/socketContext';
import Login from './Login';

const App = () => {
    const { user } = useContext(SocketContext);
    return <main className="app">{user ? <DashBoard /> : <Login />}</main>;
};

export default App;
