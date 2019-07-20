import React from 'react';
import Loadable from 'react-loadable';

export default (loader: () => Promise<any>, text: string) => Loadable({
  loader,
  loading() {
    return <div>{text}</div>;
  },
});
