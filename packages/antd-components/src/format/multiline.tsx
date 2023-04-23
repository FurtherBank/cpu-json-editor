import { FormatEditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props';
import React, { useCallback } from 'react';
import { CTextArea } from '../base/cacheInput';

export const MultilineEdition = (props: FormatEditionProps) => {
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
        ctx.executeAction('change', { schemaEntry, route, field, value });
    },
    [ctx],
  );

  return (
    <CTextArea
      size="small"
      key="value"
      value={data}
      onValueChange={handleValueChange}
      validate={true}
      style={{ flex: 1 }}
      autoSize={{ minRows: 3, maxRows: 5 }}
      onPressEnter={undefined}
    />
  );
};
