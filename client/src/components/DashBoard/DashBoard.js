import MessageBox from './MessageBox/MessageBox';
import './DashBoard.css';
import LeftPanel from './LeftPanel/LeftPanel';

const DashBoard = () => {
    return (
        <div className="dash-board-container-1 animate__animated animate__fadeIn">
            <LeftPanel />
            <MessageBox />
        </div>
    );
};

export default DashBoard;
