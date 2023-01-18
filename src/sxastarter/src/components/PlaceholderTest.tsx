import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const phKeyPrefix = 'placholdertest-';
  const phKey = `${phKeyPrefix}${props.params.DynamicPlaceholderId}`;
  const id = props.params.RenderingIdentifier;

  if (props.rendering.placeholders && props.rendering.placeholders[`${phKeyPrefix}{*}`]) {
    props.rendering.placeholders[phKey] = props.rendering.placeholders[`${phKeyPrefix}{*}`];
    delete props.rendering.placeholders[`${phKeyPrefix}{*}`];
  }

  return (
    <div className={`component container ${styles}`} id={id ? id : undefined}>
      <div className="component-content">
        <div className="row">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
