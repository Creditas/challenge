import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'Lib/Modal';
import Fields from '../Fields';
import Result from '../Result';
import whithFormLogic from './whithFormLogic';

import styles from './styles';

const Form = ({ fields, result, modal, handleModal }) => (
    <>
        <Modal show={modal.show} handleClose={handleModal}>
            <p>{modal.msg}</p>
        </Modal>
        <form {...styles}>
            <Fields {...fields} />
            <Result {...result} />
        </form>
    </>
);

Form.propTypes = {
    fields: PropTypes.shape({
        guaranteeOptions: PropTypes.arrayOf(
            PropTypes.shape({ value: PropTypes.string, text: PropTypes.string }),
        ),
        active: PropTypes.shape({}),
        handleChangeGuarantee: PropTypes.func,
        handleChangeInputs: PropTypes.func,
    }),
    result: PropTypes.shape({
        result: PropTypes.shape({}),
        handleSubmit: PropTypes.func,
    }),
    modal: PropTypes.shape({
        show: PropTypes.bool,
        msg: PropTypes.string,
    }),
    handleModal: PropTypes.func,
};

Form.defaultProps = {
    fields: {
        guaranteeOptions: [],
        active: {},
        handleChangeGuarantee: () => ({}),
        handleChangeInputs: () => ({}),
    },
    result: {
        result: {},
        handleSubmit: () => ({}),
    },
    modal: {
        show: false,
        msg: '',
    },
    handleModal: () => ({}),
};

export default whithFormLogic(Form);
