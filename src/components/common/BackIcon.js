import React from 'react';

import {BackIconContainer, BackIconImage} from './styles';
import BackIconImg from '../../assets/images/BackIconImg.png';

const BackIcon = props => (
  <BackIconContainer {...props}>
    <BackIconImage resizeMode={'contain'} source={BackIconImg} />
  </BackIconContainer>
);

export default BackIcon;
