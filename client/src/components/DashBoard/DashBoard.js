import MessageBox from './MessageBox/MessageBox';
import './DashBoard.css';
import LeftPanel from './LeftPanel/LeftPanel';
import { useState } from 'react';

const DashBoard = () => {
    const [menu, setMenu] = useState(false);

    return (
        <div className="dash-board-container-1 animate__animated animate__fadeIn">
            <LeftPanel menu={menu} setMenu={setMenu} />
            <MessageBox setMenu={setMenu} />
        </div>
    );
};

export default DashBoard;
