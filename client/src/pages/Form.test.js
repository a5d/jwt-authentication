import React from 'react';
import { create } from 'react-test-renderer'
import Form from './Form';

describe('My first snapshot test',()=>{
  test('testing form', () => {
    const tree = create(<Form
      email="123"
      password="123"
      error=""
      name=""
      onSubmit={() => {}}
      updateInput={() => {}}
      icon=""
      link=""
    />)
    expect(tree.toJSON()).toMatchSnapshot();
  })
})