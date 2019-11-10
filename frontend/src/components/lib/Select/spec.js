/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId } from '@testing-library/dom';

import { act } from 'react-dom/test-utils';

import Select from './Select';

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

it('lib/Select', () => {
    const onChange = jest.fn();
    const options = [
        { value: 'auto', text: 'auto' },
        { value: 'casa', text: 'casa' },
    ];
    act(() => {
        render(
            <Select
                id="guaranteeActive"
                text="Garantia"
                value="auto"
                onChange={onChange}
                options={options}
                required
            />,
            container,
        );
    });

    const select = getByTestId(container, 'select');
    const label = getByTestId(container, 'label');

    expect(select.value).toBe('auto');

    select.value = 'casa';

    expect(label.textContent).toBe('Garantia');
    expect(select.id).toBe('guaranteeActive');
    expect(select.value).toBe('casa');
});
