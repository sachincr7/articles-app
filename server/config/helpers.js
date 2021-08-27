const sortArgsHelper = (sort) => {
  let sortArgs = { sortBy: "_id", order: "asc", limit: 3, skip: 0 };

  for (let k in sort) {
    if (sort[k]) {
      sortArgs[k] = sort[k];
    }
    // console.log(k);
  }

  return sortArgs;
};

module.exports = {
  sortArgsHelper,
};
