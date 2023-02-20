import DataQuery from './dataQuery';

const Collection = (collectionId) => {
  let DATA = {};
  let lastId = 0;

  const addItem = (values) => new Promise((resolve) => {
    lastId += 1;
    const id = `${lastId}`;
    const item = {
      id,
      ...values,
    };
    setTimeout(() => {
      DATA[id] = item;
      resolve(item);
    }, 500);
  });

  const empty = async () => new Promise((resolve) => {
    setTimeout(() => {
      DATA = {};
      lastId = 0;
      resolve(true);
    }, 500);
  });

  const fill = async (items) => {
    const promises = items.map(addItem);
    return Promise.all(promises);
  };

  const getById = (id) => new Promise((resolve) => {
    setTimeout(() => resolve(id ? DATA[id] : null), 500);
  });

  const getEmpty = () => new Promise((resolve) => {
    const id = Object
      .keys(DATA)
      .find((itemId) => (!DATA[itemId]));
    resolve(id);
  });

  const query = () => DataQuery(Object.values(DATA));

  const update = (id, values) => new Promise((resolve) => {
    const player = {
      ...DATA[id],
      ...values,
    };
    DATA[id] = player;
    resolve(player);
  });

  return {
    id: collectionId,
    addItem,
    empty,
    fill,
    getById,
    query,
    getEmpty,
    update,
  };
};

export default Collection;
