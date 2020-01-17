/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId, getNodeText } from '@testing-library/dom';

import { act } from 'react-dom/test-utils';

import Range from './Range';

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

it('lib/Range', () => {
    const handleChangeInputs = jest.fn();
    act(() => {
        render(
            <Range
                id="valueGuarantee"
                value={0}
                min={10}
                max={20}
                step={1}
                onChange={handleChangeInputs}
            />,
            container,
        );
    });

    const input = getByTestId(container, 'range');
    const min = getNodeText(container.querySelector('.range__values').getElementsByTagName('span')[0]);
    const max = getNodeText(container.querySelector('.range__values').getElementsByTagName('span')[1]);

    expect(input.value).toBe('0');

    act(() => {
        input.value = 15;
        input.dispatchEvent(new MouseEvent('change', { bubbles: true }));
    });

    expect(min).toBe('10');
    expect(max).toBe('20');
    expect(input.id).toBe('valueGuarantee');
    expect(input.value).toBe('15');
    expect(input.min).toBe('10');
    expect(input.max).toBe('20');
});
