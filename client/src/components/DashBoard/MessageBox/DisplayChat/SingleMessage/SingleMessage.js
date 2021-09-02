import './SingleMessage.css';

const SingleMessage = ({ chat }) => {
    return (
        <div
            className={`single-message-container ${chat.self && 'my-message'}`}
        >
            <p
                className="single-message"
                dangerouslySetInnerHTML={{
                    __html: chat.message
                }}
            />
            <p className="single-message-author">{`by ${chat.user.name} at ${chat.time}`}</p>
        </div>
    );
};

export default SingleMessage;
