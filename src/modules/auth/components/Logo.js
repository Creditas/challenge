import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import {LogoContainer, LogoImage} from './styles';

export const Logo = ({show, ...props}) => {
  const [_show, _setShow] = useState(true);
  const view = useRef();

  useEffect(() => {
    if (_show !== show) {
      _setShow(show);
      if (show) {
        view.current.setNativeProps({height: 'auto'});
        view.current.fadeInDown();
      } else {
        view.current
          .fadeOutUp()
          .then(() => view.current.setNativeProps({height: 0}));
      }
    }
  }, [show]);

  return (
    <LogoContainer ref={view}>
      <LogoImage {...props} resizeMode={'contain'} />
    </LogoContainer>
  );
};

Logo.propTypes = {
  source: PropTypes.number.isRequired,
  show: PropTypes.bool,
};

Logo.defaultProps = {
  show: true,
};

export default Logo;
