export const enumerate = (items) => items.map((item, id) => ({
  id: `${id + 1}`,
  ...item,
}));

export const makeIndices = (items) => items.reduce(
  (result, item) => ({
    ...result,
    [item.id]: item,
  }),
  {},
);

export const mockResponse = (getData) => () => new Promise((resolve) => {
  setTimeout(
    async () => {
      const data = await getData();
      resolve({ data });
    },
    500,
  );
});
