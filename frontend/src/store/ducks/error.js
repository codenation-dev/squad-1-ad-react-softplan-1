import { createActions, createReducer } from "reduxsauce";
const INITIAL_STATE = { allErrors: [], filteredErrors: [] };

export const { Types, Creators } = createActions({
  setErrors: ["data"],
  removeError: ["id"],
  updateFilteredErrors: ["data"]
});

const setErrors = (state = INITIAL_STATE, action) => ({
  ...state,
  allErrors: action.data,
  filteredErrors: action.data
});

const removeError = (state = INITIAL_STATE, action) => ({
  ...state,
  allErrors: state.allErrors.filter((item, _) => item._id !== action.id),
  filteredErrors: state.filteredErrors.filter((item, _) => item._id !== action.id)
});

const updateFilteredErrors = (state = INITIAL_STATE, action) => ({
  ...state,
  filteredErrors: action.data
});

export default createReducer(INITIAL_STATE, {
  [Types.SET_ERRORS]: setErrors,
  [Types.REMOVE_ERROR]: removeError,
  [Types.UPDATE_FILTERED_ERRORS]: updateFilteredErrors
});
