import { css } from 'glamor';

export default css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    minWidth: '200px',
    height: 245,
    padding: 10,
    backgroundColor: ' var(--white)',
    borderRadius: '4px',
    boxShadow: '0px -5px 2px -1px var(--silver)',
    boxSizing: 'border-box',

    ' .result__container': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        ' .result__title': {
            color: 'var(--boulder)',
            fontSize: '.7rem',
            textAlign: 'center',
            marginBottom: '3px',
        },

        ' .result__text': {
            fontSize: '.7rem',
        },

        ' .quota__text': {
            fontSize: '21px',
            color: 'var(--dove-gray)',

            ' span': {
                margin: '0 5px',
                fontSize: '28px',
                color: 'var(--mountain-meadow)',
                fontWeight: 'bold',
            },
        },
    },
});
