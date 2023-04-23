import { render, screen } from '@testing-library/react';
import React from 'react';
import HomePage from '../Foo/index';

it('test', () => {
  render(<HomePage />);
  // asserts
  const input = screen.getByDisplayValue('umi');
  expect(input).toBeTruthy();
});
