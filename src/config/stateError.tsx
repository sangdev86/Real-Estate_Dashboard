export const stateError = (object: any) => {
  const result: any = {};
  for (const key in object) {
    result[key + 'Error'] = '';
  }
  return result;
};
