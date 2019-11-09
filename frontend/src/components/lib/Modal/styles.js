import { css } from 'glamor';

export default (show) => css({
    display: show ? 'block' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 2,

    ' .modal-main': {
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: '50%',
        height: 'auto',
        padding: 20,
        background: 'white',
        transform: 'translate(-50%,-50%)',
        color: 'var(--dove-gray)',
        lineHeight: '20px',
        textAlign: 'center',
        zIndex: 3,
    },

    ' button': {
        width: 100,
        padding: '10px 0',
        marginTop: 10,
        backgroundColor: 'var(--green-yellow)',
        border: 'none',
        color: 'var(--tom-thumb)',
        borderRadius: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        cursor: 'pointer',
    }
});
