import React from 'react';
import { GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

type ProductDetailProps = {
  params: { [key: string]: string };
  product: Product;
};

export const Default = (props: ProductDetailProps): JSX.Element => {
  return (
    <div
      className={`component product-detail ${props.params.styles}`}
      id={props.params.RenderingIdentifier ?? undefined}
    >
      <h1>{props.product.name}</h1>
      <h3>{props.product.category}</h3>
      <p>{props.product.description}</p>
      <p>Price: ${props.product.price}</p>
      <img src={props.product.image} alt={props.product.name} />
    </div>
  );
};

export const getStaticComponentProps: GetStaticComponentProps = async (context) => {
  const productId = context?.params?.requestPath[0] || '';
  if (productId === '') {
    // This shouldn't happen, but just in case let's throw a 404
    // TODO: 404
  }

  const productResponse = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product = await productResponse.json();

  if (product === null) {
    // TODO: 404
  }

  return {
    props: {
      params: context.params,
      product: product,
    },
  };
};
