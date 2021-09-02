import './SingleMessage.css';

const SingleMessage = ({ chat }) => {
    return (
        <div className="single-message-container">
            <p
                className={`single-message ${
                    chat.self && 'align-self-end my-message'
                }`}
                dangerouslySetInnerHTML={{
                    __html: chat.message
                }}
            />
            <p
                className={`single-message-author ${
                    chat.self && 'align-self-end'
                }`}
            >{`from ${chat.self ? 'you' : chat.user.name} at ${chat.time}`}</p>
        </div>
    );
};

export default SingleMessage;
