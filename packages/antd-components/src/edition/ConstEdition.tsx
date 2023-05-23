import { EditionProps, toConstName } from '@cpu-json-editor/core'
import { Input, Space } from 'antd'
import React, { ForwardedRef, forwardRef } from 'react'

export const ConstEdition = forwardRef((props: EditionProps, ref: ForwardedRef<any>) => {
  const {
    fieldProps: { data }
  } = props

  return (
    <Space style={{ flex: 1 }}>
      <Input key="const" size="small" value={toConstName(data)} disabled allowClear={false} ref={ref} />
    </Space>
  )
})
