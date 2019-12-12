import React, {memo, useState, useRef, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

import {LoadingContainer} from './styles';
import theme from '../theme';

const Loading = ({show}) => {
  const [_show, _setShow] = useState();
  const view = useRef();

  useEffect(() => {
    if (_show !== show) {
      _setShow(show);
      if (show) {
        view.current.setNativeProps({zIndex: 99});
        view.current.fadeIn();
      } else {
        view.current
          .fadeOut()
          .then(() => view.current.setNativeProps({zIndex: -1}));
      }
    }
  }, [show]);

  return (
    <LoadingContainer ref={view}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </LoadingContainer>
  );
};

Loading.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default memo(Loading);
