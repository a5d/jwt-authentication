import React from 'react';
import Loadable from 'react-loadable';

const HomePage = () => {
  const Component = Loadable({
    loader: () => import(/* webpackChunkName: "HomePage" */'./HomePage'),
    loading: () => <div>HomePage</div>,
  });
  return <Component />;
};

export default HomePage;
