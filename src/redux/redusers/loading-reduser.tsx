const initialState = {
  isLoading: false
};

export const loaderReducer = (state = initialState, action: { type: any; }) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return { ...state, isLoading: true };
    case 'HIDE_LOADER':
      return { ...state, isLoading: false };
    default:
      return state;
  }
};