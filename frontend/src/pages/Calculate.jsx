import React from 'react';
import Header from 'Components/Header';
import Form from 'Components/Form';
import Footer from 'Components/Footer';
import styles from './styles';

const Calculate = () => (
    <>
        <Header />
        <section {...styles}>
            <h1 className="title">Realize uma simulação de crédito utilizando seu bem como garantia.</h1>
            <Form />
            <Footer />
        </section>
    </>
);

export default Calculate;
