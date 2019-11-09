import { css } from 'glamor';

export default css({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    maxWidth: 700,
    width: '100%',
    margin: '50px 0',
    '@media screen and (max-width: 630px)': {
        flexDirection: 'column',
        alignItems: 'center',

        ' >div': {
            width: '100%',
            maxWidth: 330,
            minWidth: 330,

            '&:first-child': {
                marginBottom: 50,
            },
        },
    },
});
