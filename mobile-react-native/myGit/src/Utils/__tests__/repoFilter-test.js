import { filterByKeyword } from '../repoFilter';

const values = [
  { name: 'João' },
  { name: 'Pedro' },
  { name: 'Pedro Augusto' },
];

it('filterByKeyword with valid keyword should return 1 result', () => {
  expect(filterByKeyword(values, 'João').length).toBe(1)
});

it('filterByKeyword with valid keyword should return 2 results', () => {
  expect(filterByKeyword(values, 'Pedro').length).toBe(2)
});

it('filterByKeyword with valid keyword should return 0 results', () => {
  expect(filterByKeyword(values, 'Wesley Snipes').length).toBe(0)
});

it('filterByKeyword with empty keyword should return 3 results', () => {
  expect(filterByKeyword(values, '').length).toBe(values.length)
});
