import { extractFieldDomId, getFieldDomId } from '../../src/utils/utils'

it('id', () => {
  const id = getFieldDomId('window', ['a', 'b', 'c'])
  expect(id).toBe('window:/a/b/c')
  const { viewport, path, pathArray } = extractFieldDomId(id)
  expect(viewport).toBe('window')
  expect(path).toBe('/a/b/c')
  expect(pathArray).toEqual(['a', 'b', 'c'])
})
