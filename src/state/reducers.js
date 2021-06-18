export default (state, action) => {
    switch (action.type) {
      case "USER":
        return {
          ...state,
          user: action.payload
        };
      case "AUTH":
        return {
          ...state,
          auth: action.payload
        };
      default:
        return state;
    }
  };