import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

const Modal = ({ handleClose, show, children }) => (
    <section {...styles(show)} data-testid="modal">
        <div className="modal-main">
            {children}
            <button onClick={handleClose} type="button" data-testid="modal-close">
                Ok
            </button>
        </div>
    </section>
);


Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
