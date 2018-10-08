import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Slide from '@material-ui/core/Slide';

import styles from './AddNewRoomButton.scss';

const AddNewHomeButton = ({ handleAddNewRoom }) => {
  return (
    <div className={styles['new-room-button']}>
      <Slide in timeout={1200}>
        <Button
          type="button"
          onClick={handleAddNewRoom}
          variant="fab"
          color="secondary"
          aria-label="Add"
        >
          <AddIcon />
        </Button>
      </Slide>
    </div>
  );
};

AddNewHomeButton.propTypes = {
  handleAddNewRoom: PropTypes.func.isRequired
};

export default AddNewHomeButton;
