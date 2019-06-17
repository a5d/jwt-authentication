import React from 'react';
import { create } from 'react-test-renderer'
import LoginForm from './Form';

describe('My first snapshot test',()=>{
  test('testing form', () => {
    const tree = create(<LoginForm
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