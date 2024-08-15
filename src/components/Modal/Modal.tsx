import { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';

interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  headerContent: ReactNode;
  mainContent: ReactNode;
}

const Modal: FC<IProps> = ({ isOpen, toggleModal, headerContent, mainContent }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={toggleModal}
      shouldCloseOnEsc={true}
      preventScroll={true}
      ariaHideApp={false}
      onAfterOpen={() => (document.body.style.overflow = 'hidden')}
      onAfterClose={() => (document.body.style.overflow = 'unset')}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.35)'
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'fit-content',
          minHeight: 'fit-content',
          minWidth: '500px',
          maxHeight: '90%',
          border: '1px solid #ccc',
          background: '#fff',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
          overflowY: 'auto'
        }
      }}>
      {headerContent}
      <main
        style={{
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          padding: '20px'
        }}>
        {mainContent}
      </main>
    </ReactModal>
  );
};

export default Modal;
