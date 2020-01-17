import React from 'react';
import AppContext from 'Provider/context';
import {
    setInitalData,
    setChangeGuarantee,
    setChangeInputs,
    setSubmit,
} from 'Provider/actions';

import { checkFormValidity } from 'Helpers';

const WhithFormLogic = (Component) => () => {
    const { state, dispatch } = React.useContext(AppContext);
    const [modal, setModal] = React.useState({ show: false, msg: '' });
    const { guarantee, active, result } = state;

    React.useEffect(() => {
        setInitalData(dispatch, { guarantee, active });
    }, []);

    const handleChangeGuarantee = (event) => setChangeGuarantee(dispatch, { guarantee, event });

    const handleChangeInputs = (event) => setChangeInputs(dispatch, event);

    const handleSubmit = (event) => {
        event.preventDefault();
        const valid = checkFormValidity(active);
        if (valid.isValid) {
            setSubmit(dispatch, active);
        } else {
            setModal({ show: true, msg: valid.error.msg });
            setChangeInputs(dispatch, { name: 'valueLoan', value: valid.error.value });
        }
    };

    const handleModal = () => {
        setModal({ show: false, msg: '' });
        setSubmit(dispatch, active);
    };


    const propsFileds = {
        guaranteeOptions: guarantee.map((item) => ({ value: item.type, text: item.type })),
        active,
        handleChangeGuarantee,
        handleChangeInputs,
    };

    const propsResult = {
        handleSubmit,
        result,
    };

    const propsModal = {
        modal,
        handleModal,
    };

    return <Component fields={propsFileds} result={propsResult} {...propsModal} />;
};

export default WhithFormLogic;
