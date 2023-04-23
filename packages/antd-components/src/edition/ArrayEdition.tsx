import { useArrayListContent } from '@cpu-json-editor/core/dist/esm/components/hooks/useArrayListContent';
import { useFatherInfo } from '@cpu-json-editor/core/dist/esm/components/hooks/useFatherInfo';
import { EditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props';
import { concatAccess } from '@cpu-json-editor/core/dist/esm/utils';
import React, { useMemo } from 'react';
import { ListDisplayPanel } from '../base/ListDisplayPanel';
import { ConstEdition } from './ConstEdition';

const ArrayEditionPanel = (props: EditionProps) => {
  const { viewport, data, route, field, schemaEntry, fieldInfo } = props;
  const { valueEntry, mergedValueSchema } = fieldInfo;

  console.assert(data instanceof Array);

  const access = useMemo(() => {
    return concatAccess(route, field);
  }, [route, field]);

  const fatherInfo = useFatherInfo(
    data,
    schemaEntry,
    valueEntry,
    mergedValueSchema,
  );

  const lists = useArrayListContent(data, schemaEntry, fieldInfo);

  return (
    <ListDisplayPanel
      viewport={viewport}
      lists={lists}
      data={data}
      fieldInfo={fieldInfo}
      fatherInfo={fatherInfo}
      access={access}
    />
  );
};

export const ArrayEdition = (props: EditionProps) => {
  const { short } = props;
  return short ? <ConstEdition {...props} /> : <ArrayEditionPanel {...props} />;
};
