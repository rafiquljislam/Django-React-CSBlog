export const initialState = {
  profile: null,
};

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "ADD_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return state;
  }
};

export default reducer;
