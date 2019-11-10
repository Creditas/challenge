/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';
import Footer from './Footer';

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

it('components/Footer', () => {
    act(() => {
        render(
            <Footer />,
            container,
        );
    });

    const footer = getByTestId(container, 'footer');

    const expectValue = '*Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere quas non harum dolor eligendi id, ab corrupti blanditiis suscipit ex odit error alias minus. Enim dolores eum officiis quae rem!*';
    expect(footer.textContent).toBe(expectValue);
});
