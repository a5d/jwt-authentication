import React from "react";
import LayoutMd from "../components/LayoutMd";
import Category from '../components/Category';
import Product from "../components/Product";
import TextBlock from "../components/TextBlock";

const HomePage = () => {
  return (
    <LayoutMd title="Home">
      <TextBlock>
        <h1>Heading 1</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam aspernatur blanditiis consectetur cum doloremque dolores doloribus esse facilis harum incidunt ipsam iure nam, nihil obcaecati officia perferendis quaerat quas quasi quibusdam similique vero, voluptas, voluptates? A ab accusantium alias aut commodi cupiditate debitis dicta doloremque ducimus enim harum hic inventore, iste iusto minima molestias natus obcaecati perspiciatis porro provident quae quis quisquam quos reiciendis similique sit temporibus ut. Aliquid aperiam beatae commodi consequuntur delectus deleniti deserunt dolores doloribus ea est expedita, fugit illum impedit itaque iusto necessitatibus nihil officiis pariatur perferendis quaerat quisquam quod ratione repellendus reprehenderit sunt suscipit vero.</p>
      </TextBlock>
      <Category title="Heading 2">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </Category>
    </LayoutMd>
  )
}

export default HomePage