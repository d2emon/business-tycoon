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

export const mockRequest = (getData) => (...args) => new Promise((resolve) => {
  setTimeout(
    async (...args) => {
      const data = await getData();
      resolve({ data });
    },
    500,
  );
});

export const mockResponse = (getData) => async (...args) => {
  const request = mockRequest(getData);
  const {
    data,
  } = await request(...args);
  return data;
};
