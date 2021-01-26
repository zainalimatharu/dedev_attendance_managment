// importing action types
import { SET_NAV_LOADING, SET_OPEN_PAGE } from './types';

const setOpenPage = (payload) => async (dispatch) => {
  dispatch({ type: SET_OPEN_PAGE, payload });
};

const setNavLoading = (payload) => async (dispatch) => {
  dispatch({ type: SET_NAV_LOADING, payload });
};

export { setOpenPage, setNavLoading };
