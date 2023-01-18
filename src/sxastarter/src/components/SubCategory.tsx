import React from 'react';
import {
  RichText as JssRichText,
  useSitecoreContext,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface Fields {
  Content: RichTextField;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

type ProductDetailProps = {
  params: { [key: string]: string };
  fields: Fields;
  product: Product;
};

type ComponentContentProps = {
  id: string;
  styles: string;
  children: JSX.Element;
};

const ComponentContent = (props: ComponentContentProps) => {
  const id = props.id;
  return (
    <div className={`component content ${props.styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="field-content">{props.children}</div>
      </div>
    </div>
  );
};

export const Default = (props: ProductDetailProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const router = useRouter();

  if (!(props.fields && props.fields.Content) && !sitecoreContext?.route?.fields?.Content) {
    return (
      <div className={`component content ${props.params.styles}`}>
        <div className="component-content">
          <div className="field-content">[Content]</div>
        </div>
      </div>
    );
  }

  const path = router.asPath;
  const pathParts = path.split('/');
  const subCategory = pathParts[2];

  const field = (
    props.fields && props.fields.Content
      ? props.fields.Content
      : sitecoreContext?.route?.fields?.Content
  ) as RichTextField;

  return (
    <ComponentContent styles={props.params.styles} id={props.params.RenderingIdentifier}>
      <>
        <Head>
          <title>My Shop | {subCategory}</title>
        </Head>
        <h1>This is a subcategory page for {subCategory}</h1>
        <JssRichText field={field} />
      </>
    </ComponentContent>
  );
};
