import { css } from 'glamor';

export default (width) => css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width,

    ' input': {
        transform: 'translateY(5px)',
    },

    ' .range__values': {
        display: 'flex',
        justifyContent: 'space-between',

        ' span': {
            paddingTop: 5,
            fontSize: '.6rem',
        },
    },
});
