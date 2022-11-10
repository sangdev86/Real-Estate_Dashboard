export const delay = async (ms = 100) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
};
export const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
