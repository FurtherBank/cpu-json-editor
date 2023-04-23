import { jsonDataType } from '@cpu-json-editor/core/dist/esm/utils';
import React from 'react';
import {
  ArrayItemCreator,
  CreateNameProps,
  ObjectPropCreator,
} from './CreateName';

export const CreateName = (props: CreateNameProps) => {
  const { data } = props;
  const type = jsonDataType(data);
  return type === 'object' ? (
    <ObjectPropCreator {...props} />
  ) : (
    <ArrayItemCreator {...props} />
  );
};
