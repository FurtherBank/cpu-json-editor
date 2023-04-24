import { FormatEditionProps } from '@cpu-json-editor/core/dist/esm/components/type/props';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import React, { useCallback, useMemo } from 'react';

export const DateTimeEdition = (props: FormatEditionProps) => {
  const {
    route,
    field,
    data,
    schemaEntry,
    fieldInfo: { ctx },
  } = props;

  const dateValue = useMemo(() => {
    return moment(data);
  }, [data]);

  const handleValueChange = useCallback(
    (value: Moment | null, dateString: string) => {
      if (value !== undefined)
        ctx.executeAction('change', {
          route,
          field,
          value: dateString,
          schemaEntry,
        });
    },
    [ctx],
  );

  return (
    <DatePicker
      size="small"
      key="value"
      showTime
      value={dateValue}
      onChange={handleValueChange}
      style={{ width: '100%' }}
      allowClear={false}
    />
  );
};