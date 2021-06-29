import MessageBox from './MessageBox/MessageBox';
import './DashBoard.css';
import LeftPanel from './LeftPanel/LeftPanel';

const DashBoard = () => {
    return (
        <div className="dash-board-container">
            <div className="dash-board-container-1">
                <LeftPanel />
                <MessageBox />
            </div>
        </div>
    );
};

export default DashBoard;
