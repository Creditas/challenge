/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId } from '@testing-library/dom';

import { act } from 'react-dom/test-utils';

import Input from './Input';

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

it('lib/Input', () => {
    const onChange = jest.fn();
    act(() => {
        render(
            <Input
                id="inputID"
                text="input"
                type="text"
                value="value"
                onChange={onChange}
            />,
            container,
        );
    });

    const input = getByTestId(container, 'Input');
    const label = getByTestId(container, 'Label');

    expect(input.value).toBe('value');

    act(() => {
        input.value = 'new value';
        input.dispatchEvent(new MouseEvent('change', { bubbles: true }));
    });

    expect(label.textContent).toBe('input');
    expect(input.type).toBe('text');
    expect(input.id).toBe('inputID');
    expect(input.value).toBe('new value');
});
