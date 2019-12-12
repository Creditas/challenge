import React from 'react';
import PropTypes from 'prop-types';

import HeaderLogoImg from '../../assets/images/HeaderLogoImg.png';
import {HeaderContainer, HeaderLogo} from './styles';
import BackIcon from './BackIcon';

const Header = ({onBack}) => (
  <HeaderContainer>
    {onBack && <BackIcon onPress={onBack} />}
    <HeaderLogo resizeMode={'contain'} source={HeaderLogoImg} />
  </HeaderContainer>
);

Header.propTypes = {
  onBack: PropTypes.func,
};

export default Header;
