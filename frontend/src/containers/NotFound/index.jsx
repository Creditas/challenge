import React from 'react';
import notFoundImage from './assets/notfound.png';
import smile from './assets/smiling-face.png';

import styles from './NotFound.scss';

const NotFound = () => {
  return (
    <div className={styles['not-found-wrapper']}>
      <img className={styles['not-found-wrapper__icon']} src={notFoundImage} alt="Not Found" />
      <h1>404</h1>
      <p> Ooops. This page isn&apos;t available, but I&apos;m...</p>
      <p>
        Please, hire me
        <img className={styles['not-found-wrapper__smile']} src={smile} alt="Smile" />
      </p>
    </div>
  );
};

export default NotFound;
