import * as lazyLoadingType from "../types/lazyLoadingType";
const stateDefault = {
  isLoading: false,
  isLoadingModal: false,
};

const lazyLoadingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case lazyLoadingType.DISLAY_LOADING: {
      return { ...state, isLoading: true };
    }
    case lazyLoadingType.HIDE_LOADING: {
      return { ...state, isLoading: false };
    }
    case lazyLoadingType.DISLAY_LOADING_MODAL: {
      return { ...state, isLoadingModal: true };
    }
    case lazyLoadingType.HIDE_LOADING_MODAL: {
      return { ...state, isLoadingModal: false };
    }
    default:
      return { ...state };
  }
};
export default lazyLoadingReducer;
