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
        case "DASHBOARD":
          return {
            ...state,
            dashboard: action.payload
          };
      case "PROPERTIES":
        return {
          ...state,
          properties: action.payload
        };
        case "PROPERTY_TYPES":
          return {
            ...state,
            propertyTypes: action.payload
          };
        case "TRENDING_AND_BEST_CRIBS":
          return {
            ...state,
            trendingCribs: action.payload.trending_cribs,
            bestCribs: action.payload.best_cribs
          };
        case "CRIB":
          return {
            ...state,
            crib: action.payload.property
          };
      default:
        return state;
    }
  };