import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadCategory} from '../../actions';
import Category from '../../components/Category';
import LayoutMd from '../../components/LayoutMd';
import {IProduct} from '../../components/Model';
import Product from '../../components/Product';
import TextBlock from '../../components/TextBlock';

interface IStateProps {
  products: IProduct[];
  loadCategory: () => void;
}

class HomePage extends Component<IStateProps> {
  componentDidMount() {
    const {loadCategory, products} = this.props;
    if (products.length === 0) {
      loadCategory();
    }
  }

  render() {
    const {products} = this.props;

    return (
      <LayoutMd title="Home">
        <TextBlock>
          <h1>Heading 1</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur blanditiis consectetur
            cum doloremque dolores doloribus esse facilis harum incidunt ipsam iure nam, nihil obcaecati officia
            perferendis quaerat quas quasi quibusdam similique vero, voluptas, voluptates? A ab accusantium alias aut
            commodi cupiditate debitis dicta doloremque ducimus enim harum hic inventore, iste iusto minima molestias
            natus obcaecati perspiciatis porro provident quae quis quisquam quos reiciendis similique sit temporibus ut.
            Aliquid aperiam beatae commodi consequuntur delectus deleniti deserunt dolores doloribus ea est expedita,
            fugit illum impedit itaque iusto necessitatibus nihil officiis pariatur perferendis quaerat quisquam quod
            ratione repellendus reprehenderit sunt suscipit vero.</p>
        </TextBlock>
        <Category id="1" title="Heading 2">
          {products.map((item: IProduct) => <Product key={item.id} {...item} />)}
        </Category>
      </LayoutMd>
    );
  }
}

const mapStateToProps = (state: IStateProps) => {
  const {products} = state;
  return {
    products: products || [],
  };
};

export default connect(mapStateToProps, {loadCategory})(HomePage);
