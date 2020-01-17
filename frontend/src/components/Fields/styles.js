import { css } from 'glamor';

export default css({
    display: 'flex',
    justifyContent: 'space-between',
    width: 330,

    ' .fields__group': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        ' >div:nth-child(2)': {
            margin: '30px 0',
        },
    },
});
