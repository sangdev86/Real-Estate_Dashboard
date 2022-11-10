export const dispatchArr = async (arrs: any[], dispatch: any) => {
  // const arr = arrs.map((arr) => dispatch(arr()));
  await Promise.all(
    arrs.map((arr) => {
      dispatch(arr());
    })
  );
};
