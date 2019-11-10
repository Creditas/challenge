/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId, fireEvent } from '@testing-library/dom';

import { act } from 'react-dom/test-utils';

import Button from './Button';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document
        .body
        .appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('lib/Button', () => {
    const onClick = jest.fn();
    act(() => {
        render(
            <Button
                type="submit"
                text="button"
                onClick={onClick}
            />,
            container,
        );
    });

    const button = getByTestId(container, 'button');

    fireEvent.click(button);

    expect(button.textContent).toBe('button');
    expect(button.type).toBe('submit');
    expect(onClick).toHaveBeenCalledTimes(1);
});
