import { css } from 'glamor';

export default css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 60px)',
    padding: '0 10px',

    ' .title': {
        color: 'var(--dove-gray)',
        maxWidth: '600px',
        lineHeight: '34px',
        textAlign: 'center',
    },

    '@media screen and (max-width: 630px)': {
        height: 'auto',
        margin: '30px 0',
    },
});
