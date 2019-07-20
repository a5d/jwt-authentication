import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadProduct} from '../actions';
import LayoutMd from '../components/LayoutMd';
import {IProduct, IProducts} from '../components/Model';
import ProductForm from '../components/ProductForm';
import TextBlock from '../components/TextBlock';

interface IProps {
  match: {params: {id: string}};
}

interface IStateProps {
  product: IProduct;
  loadProduct: (p: { id: string }) => void;
}

interface IState {
  product: IProducts;
}

type TProps = IProps & IStateProps;

class EditProductPage extends Component<TProps> {
  componentDidMount() {
    const {id} = this.props.match.params;
    const {loadProduct} = this.props;
    loadProduct({id});
  }

  render() {
    const {product} = this.props;
    return (
      <LayoutMd title="Edit Product Page">
        <TextBlock>
          <p>{JSON.stringify(product)}</p>
          <ProductForm id={product.id} />
        </TextBlock>
      </LayoutMd>
    );
  }
}

const mapStateToProps = ({product}: IState, ownProps: IProps) => {
  const {id} = ownProps.match.params;

  return {
    product: product[id] || {},
  };
};

export default connect(mapStateToProps, {loadProduct})(EditProductPage);
