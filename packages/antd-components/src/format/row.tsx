import { FormatEditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props';
import React, { useCallback } from 'react';
import { CInput } from '../base/cacheInput';

export const RowEdition = (props: FormatEditionProps) => {
  const {
    route,
    field,
    data,
    schemaEntry,
    fieldInfo: { ctx },
  } = props;

  const handleValueChange = useCallback(
    (value: any) => {
      if (value !== undefined)
        ctx.executeAction('change', { route, field, value, schemaEntry });
    },
    [ctx],
  );

  return (
    <CInput
      size="small"
      key="value"
      value={data}
      onValueChange={handleValueChange}
      validate={true}
      onPressEnter={(e: any) => {
        e.currentTarget.blur();
      }}
      style={{ flex: 1, minWidth: '400px' }}
    />
  );
};
