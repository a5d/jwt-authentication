import {Button, Container, CssBaseline, TextField} from '@material-ui/core';
import React, {ChangeEvent, Component, FormEvent} from 'react';
import {connect} from 'react-redux';
import {updateProduct} from '../actions';
import history from '../history';
import {productService} from '../service/Product';
import {IProduct, IProducts} from './Model';

/**
 * Параметры компонента.
 */
interface IProps {
  id?: string;
}

/**
 * Параметры состояния компонента.
 */
interface IState extends IProduct {
  error: string;
}

/**
 * Стайт-пропсы страницы формы
 */
interface IStateProps {
  product: IProducts;
}

/**
 * Стайт-пропсы страницы формы
 */
interface IStateFromProps {
  product: IProduct;
  updateProduct: (product: IProduct) => Promise<void>;
}

type TProps = IProps & IStateFromProps;

/**
 * Компонент формы добавлени/редактирования товара
 */
class ProductForm extends Component<TProps, IState> {
  state: IState = {
    bigDescription: '',
    description: '',
    error: '',
    id: '',
    image: '',
    name: '',
  };

  componentDidUpdate(prevProps: IProps) {
    const {product} = this.props;
    if (!this.state.id && product && prevProps) {
      this.setState({...product});
    }
  }

  submitForm = (e: FormEvent<HTMLFormElement>) => {
    const {id, name, description, image, bigDescription} = this.state;
    const {updateProduct} = this.props;

    e.preventDefault();

    if (id) {
      updateProduct({id, name, description, image, bigDescription});
      history.push(`/product/${id}`);
    } else {
      productService({name, description, image, bigDescription})
        .then((data) => {
          if (data.error) {
            this.setState({error: data.error});
          }

          history.push('/');
        });
    }
  }

  updateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.currentTarget;
    this.setState<never>({[name]: value});
  }

  render() {
    const {id, name, description, image, bigDescription} = this.state;

    return (
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div>
          <form onSubmit={this.submitForm} noValidate={true}>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              label="Name"
              name="name"
              fullWidth={true}
              autoFocus={true}
              onChange={this.updateInput}
              value={name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth={true}
              name="description"
              multiline={true}
              rows={2}
              rowsMax={4}
              label="Description"
              onChange={this.updateInput}
              value={description}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth={true}
              name="bigDescription"
              multiline={true}
              rows={5}
              rowsMax={10}
              label="Description"
              onChange={this.updateInput}
              value={bigDescription}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth={true}
              name="image"
              label="Image Link"
              onChange={this.updateInput}
              value={image}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"

            >
              {id ? 'Edit Product' : 'Add Product'}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({product}: IStateProps, ownProps: IProps) => {
  const {id} = ownProps;

  return {
    product: id ? product[id] : {},
  };
};

const dispatchToProps = {
  updateProduct
};

export default connect(mapStateToProps, dispatchToProps)(ProductForm);
