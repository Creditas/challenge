import React, {
  FunctionComponent,
  ChangeEventHandler,
  FormEventHandler,
} from 'react'
import styled from 'styled-components'

interface StyledInputProps {
  width: string
}

export const StyledInput = styled.input<StyledInputProps>`
  max-height: 48px;
  height: 100%;
  flex-grow: 2;
  width: ${props => props.width};
  max-width: 100%;
  border: 0;
  background: #fff;
  color: #20232a;
  font-size: 0.8rem;
  padding-left: 20px;

  :focus {
    outline-width: 0;
  }

  &::-webkit-input-placeholder {
    color: #20232a;
    font-family: 'Montserrat';
  }
`

interface InputProps {
  placeholder: string
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  width: string
  onKeyPress?: FormEventHandler<HTMLInputElement>
  onSubmit?: FormEventHandler<HTMLInputElement>
}

const Input: FunctionComponent<InputProps> = ({
  placeholder,
  value,
  onChange,
  onKeyPress,
  onSubmit,
  width,
}) => (
  <StyledInput
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    onKeyPress={onKeyPress}
    onSubmit={onSubmit}
    width={width}
  />
)

export default Input
