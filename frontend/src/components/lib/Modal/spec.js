/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { getByTestId, fireEvent } from '@testing-library/dom';

import { act } from 'react-dom/test-utils';

import Modal from './Modal';

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

it('lib/Modal', () => {
    const handleModal = jest.fn();
    act(() => {
        render(
            <Modal show handleClose={handleModal}>
                <p>modal</p>
            </Modal>,
            container,
        );
    });

    const modal = getByTestId(container, 'modal');
    const button = getByTestId(container, 'modal-close');
    const children = document.getElementsByTagName('p');
    const overlay = getComputedStyle(modal);
    fireEvent.click(button);

    expect(overlay.display).toBe('block');
    expect(children[0].textContent).toBe('modal');
    expect(handleModal).toHaveBeenCalledTimes(1);
});
