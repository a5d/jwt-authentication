import React from 'react';
import LayoutMd from '../components/LayoutMd';
import ProductForm from '../components/ProductForm';
import TextBlock from '../components/TextBlock';

interface IProps {
  id: string;
}

const ProductPage = ({id}: IProps) => {
  return (
    <LayoutMd title="New Product Page">
      <TextBlock>
        <p>{id}</p>
        <ProductForm />
      </TextBlock>
    </LayoutMd>
  );
};

export default ProductPage;
