import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

const Modal: React.FC = ({ children }) => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const { state }: { state: { background?: string } | null } = useLocation();

    useEffect(() => {
        if (state?.background) {
            document.body.setAttribute('style', 'overflow: hidden;');
        } else {
            navigate(`/post/${postId}`);
        }
    }, [state, postId, navigate]);

    if (state?.background) {
        return (
            <ReactModal
                style={customStyles}
                isOpen={true}
                onRequestClose={() => {
                    navigate(-1);
                    document.body.removeAttribute('style');
                }}
                contentLabel="Modal"
            >
                {children}
            </ReactModal>
        );
    }
    return <>{children}</>;
}

const customStyles = {
    content: {
        width: "100%",
        minWidth: 335,
        maxWidth: 602,
        height: "fit-content",
        top: '0%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%,0%)',
        padding: 0,
        border: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        zIndex: 50,
        backgroundColor: "rgba(0,0,0,0.5)",
        overflow: "scroll",
    }
};

ReactModal.setAppElement('#root');

export default Modal;