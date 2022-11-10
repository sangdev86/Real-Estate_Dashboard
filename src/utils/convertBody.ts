export const convertBody = (body: any, bodyEmtype: any) => {
  for (const key in bodyEmtype) {
    if (body.hasOwnProperty(key)) {
      bodyEmtype[key] = body[key];
    }
  }
  return bodyEmtype;
};
