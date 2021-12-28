import React from 'react';
import renderer from 'react-test-renderer';
import AddContact from '../src/screens/AddContactScreen';

test('renders correctly', () => {
  const tree = renderer.create(<AddContact />).toJSON();
  expect(tree).toMatchSnapshot();
});