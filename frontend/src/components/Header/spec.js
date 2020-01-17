/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

import Header from './Header';

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

it('components/Header', () => {
    act(() => {
        render(
            <Header />,
            container,
        );
    });

    const header = getByTestId(container, 'header');

    const expectValue = 'Ajuda';
    expect(header.textContent).toBe(expectValue);
});
