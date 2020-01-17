import { css } from 'glamor';

export default css({
    backgroundColor: 'var(--mountain-meadow)',
    padding: '20px 0',

    ' .header__container': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        margin: '0 auto',

        ' .logo': {
            height: '1em',
        },

        ' .help': {
            textDecoration: 'none',
            color: 'var(--concrete)',
        },
    },
});
