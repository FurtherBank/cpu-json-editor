import { ComponentModel, IRoleModel } from '@cpu-json-editor/core/dist/esm/components/ComponentModel'
import { useEffect } from 'react'

export const useRoleModelAttach = (model: ComponentModel, content: IRoleModel, role: string) => {
  useEffect(() => {
    model.roles[role] = content
    return () => {
      delete model.roles[role]
    }
  }, [])
}
