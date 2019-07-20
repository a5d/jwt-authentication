import {Button, CardMedia, makeStyles} from '@material-ui/core';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import TextBlock from '../components/TextBlock';
import {deleteProduct, loadProduct} from '../actions';
import LayoutMd from '../components/LayoutMd';
import {IProduct, IProducts} from '../components/Model';

/**
 * Пропсы страницы товаров.
 */
interface IProps {
  id: string;
}

interface IState {
  product: IProducts;
  auth: boolean;
}

/**
 * Стайт-пропсы страницы товаров
 */
interface IStateProps {
  product: IProduct;
  loadProduct: (p: { id: string }) => void;
  deleteProduct: (id: string) => void;
  auth: boolean;
}

type TProps = IProps & IStateProps;

const useStyles = makeStyles({
  editButtons: {
    '& a' : {
      marginRight: '10px',
    },
    margin: '0 0 20px 0',
  },
  productDescription: {
    whiteSpace: 'pre-line',
  },
});

interface IDescription {
  text: string;
}

const ProductDescription = ({text}: IDescription) => {
  const classes = useStyles();
  return <p className={classes.productDescription}>{text}</p>;
};

/**
 * Страница товара.
 * {string} children Text
 */
interface IEditButtonsProps {
  children: JSX.Element[];
}

const EditButtons = (props: IEditButtonsProps) => {
  const classes = useStyles();
  return <div className={classes.editButtons}>{props.children}</div>;
};

/**
 * Страница товара.
 */
class ProductPage extends Component<TProps> {
  componentDidMount() {
    const {product, loadProduct, id} = this.props;
    if (!product.id) {
      loadProduct({id});
    }
  }

  renderEditButton = () => {
    const {product, auth} = this.props;

    if (auth) {
      return <Button
        type="submit"
        variant="contained"
        color="default"
        size="small"
        component={Link}
        to={`/product/${product.id}/edit`}
      >
        Edit
      </Button>;
    }
    return null;
  }

  deleteHandler = () => {
    const {id, deleteProduct} = this.props;
    deleteProduct(id);
  }

  render() {
    const {product, auth} = this.props;

    if (!product) {
      return null;
    }

    return (
      <LayoutMd title={product.name}>
        <EditButtons>{this.renderEditButton() as JSX.Element}
          {(auth && <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            onClick={this.deleteHandler}
          >
            Delete
          </Button>
          ) as JSX.Element}
        </EditButtons>
        <TextBlock>
          {<CardMedia
            component="img"
            alt={product.name}
            height="140"
            image={`http://127.0.0.1:3000/${product.image}`}
            title={product.name}
          />}
          <ProductDescription text={product.description}/>
          <ProductDescription text={product.bigDescription}/>
        </TextBlock>
      </LayoutMd>
    );
  }
}

const mapStateToProps = ({auth, product}: IState, ownProps: IProps) => {
  return {
    auth,
    product: product[ownProps.id] || {},
  };
};

export default connect(mapStateToProps, {loadProduct, deleteProduct})(ProductPage);
