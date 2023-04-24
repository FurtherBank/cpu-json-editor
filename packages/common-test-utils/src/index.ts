import examples from '@cpu-json-editor/test-examples/src';

export const getExample = (name: string) => {
  return examples.plainData[name] || [0, {}];
};
