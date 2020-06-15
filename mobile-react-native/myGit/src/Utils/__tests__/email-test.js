import { isEmailValid } from '../email';

it('isEmailValid with valid email should return true', () => {
  expect(isEmailValid('um@email.com')).toBe(true)
});

it('isEmailValid with invalid email should return false', () => {
  expect(isEmailValid('nem')).toBe(false)
});

it('isEmailValid with empty should return false', () => {
  expect(isEmailValid('')).toBe(false)
});

it('isEmailValid with undefined email should return false', () => {
  expect(isEmailValid(undefined)).toBe(false)
});
