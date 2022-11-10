//1. {a:1, b:2} => [{a:1}, {b:2}]
export const objToArr1 = (obj: any) => {
  const arr = [];
  for (const key in obj) {
    arr.push({ [key]: obj[key] });
  }
  return arr;
};
