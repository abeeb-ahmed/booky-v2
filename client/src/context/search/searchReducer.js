const searchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET":
      return {
        city: undefined,
        dates: [],
        options: {
          adult: undefined,
          children: undefined,
          room: undefined,
        },
      };
    default:
      return state;
  }
};

export default searchReducer;
