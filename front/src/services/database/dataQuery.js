const DataQuery = (data) => {
  const DATA = [...data];

  return {
    all: () => new Promise((resolve) => {
      setTimeout(
        () => resolve([...DATA]),
        500,
      );
    }),
    any: () => new Promise((resolve) => {
      setTimeout(
        () => resolve(DATA.length > 0),
        500,
      );
    }),
    count: () => new Promise((resolve) => {
      setTimeout(
        () => resolve(DATA.length),
        500,
      );
    }),
    first: () => new Promise((resolve) => {
      setTimeout(
        () => resolve((DATA.length > 0) ? DATA[0] : null),
        500,
      );
    }),
    find: (query) => DataQuery(DATA.filter(query)),
    sort: (query) => DataQuery(DATA.sort(query)),
  };
};

export default DataQuery;
