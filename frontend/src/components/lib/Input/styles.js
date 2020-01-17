import { css } from 'glamor';

export default (width) => css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width,

    ' label': {
        color: 'var(--dove-gray)',
        fontWeight: 'bold',
        fontSize: '.8rem',
        marginBottom: 5,
    },

    ' input': {
        color: 'var(--emperor)',
        border: '1px solid var(--nobel)',
        backgroundColor: 'var(--alabaster)',
        borderRadius: 4,
        padding: '10px 5px',
    },
});
