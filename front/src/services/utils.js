export const mockRequest = (url, getData) => (requestData = {}) => new Promise((resolve) => {
  // eslint-disable-next-line no-console
  console.log(
    'Request',
    url,
    requestData,
  );
  setTimeout(
    async () => {
      try {
        const data = await getData(requestData);
        // eslint-disable-next-line no-console
        console.log(
          'Response',
          url,
          requestData,
          {
            data,
          },
        );
        resolve({
          data,
          error: null,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(
          'Error',
          url,
          requestData,
          error,
        );
        resolve({
          data: null,
          error,
        });
      }
    },
    500,
  );
});

export const mockResponse = (url, getData) => async (requestData = {}) => {
  const request = mockRequest(url, getData);
  const {
    data,
  } = await request(requestData);
  return data;
};
