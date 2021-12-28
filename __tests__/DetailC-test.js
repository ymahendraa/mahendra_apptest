import React from 'react';
import renderer from 'react-test-renderer';
import DetailContact from '../src/screens/DetailContact';

test('renders correctly', () => {
  const tree = renderer.create(<DetailContact />).toJSON();
  expect(tree).toMatchSnapshot();
});