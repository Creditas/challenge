import React from 'react';
import styles from './styles';

const Header = () => (
    <header {...styles} data-testid="header">
        <div className="header__container">
            <h1 className="header__title">
                <a href="#home" title="Creditas">
                    <img className="logo" src="https://staging.creditas.com.br/static/images/logo-creditas-white-3cd22a2808.svg" alt="Creditas" />
                </a>
            </h1>
            <a className="help" href="#ajuda">Ajuda</a>
        </div>
    </header>
);

export default Header;
