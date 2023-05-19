import { ComponentModel, IRoleModel } from '@cpu-json-editor/core/dist/esm/components/ComponentModel'
import { useEffect } from 'react'

export const useRoleModelAttach = (model: ComponentModel, content: IRoleModel, role: string) => {
  useEffect(() => {
    console.log('🔗挂载 roleModel', role, content)

    model.roles[role] = content
    return () => {
      console.log('🔗卸载 roleModel', role, content)

      delete model.roles[role]
    }
  }, [])
}
