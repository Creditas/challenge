/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

import Result from './Result';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('components/Result', () => {

    const props = {
        result: {
            monthlyPayment: '10000',
            total: '100000',
            interestRate: '100',
        },
    };

    act(() => {
        render(
            <Result {...props} />,
            container,
        );
    });

    const result = getByTestId(container, 'result');
    const quotaText = result.querySelector('.quota__text').getElementsByTagName('span')[0];
    const total = getByTestId(container, 'total');
    const interes = getByTestId(container, 'interes');

    expect(quotaText.textContent).toBe('10,000');
    expect(total.textContent).toBe('R$ 100,000');
    expect(interes.textContent).toBe('100%');
});
