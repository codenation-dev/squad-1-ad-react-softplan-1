import Types from "../types/types";
import { getUser } from "../services/Auth";
import {
  getErrors,
  archiveError,
  deleteError,
  getErrorById
} from "../services/Api";

const requestGenerics = () => ({ type: Types.REQUEST_GENERICS });
const errorGenerics = objMensagemErro => ({
  type: Types.ERROR_GENERICS,
  payload: objMensagemErro
});

///////////////////////////////
////////// List.js ////////////
///////////////////////////////
const getAllErrosSucesso = errors => ({
  type: Types.GET_ALL_ERRORS_SUCESSO,
  payload: errors
});

export const getAllErrors = () => dispatch => {
  dispatch(requestGenerics());

  getErrors()
    .then(errors => {
      if (!errors) {
        throw new Error();
      }

      dispatch(getAllErrosSucesso(errors.data));
    })
    .catch(error => dispatch(errorGenerics(error)));
};

///////////////////////////////////
////////// ItemList.js ////////////
///////////////////////////////////
export const setSelected = id => ({
  type: Types.SET_SELECTED_ITEM,
  payload: id
});

////////////////////////////////////
////////// ItemsList.js ////////////
////////////////////////////////////
export const setSelectedAll = (select, listError) => {
  const listAtualizada = listError.map(item => {
    item.selected = !select;
    return item;
  });

  return {
    type: Types.SELECT_ALL,
    payload: listAtualizada
  };
};
///////////////////////////////////////
////////// ErrorDetails.js ////////////
///////////////////////////////////////

const getErrorIdSucesso = objError => ({
  type: Types.GET_ERROR_BY_ID_SUCESSO,
  payload: objError
});

export const getErrorId = id => dispatch => {
  dispatch(requestGenerics());

  getErrorById(id)
    .then(objError => {
      if (!objError) {
        throw new Error();
      }
      dispatch(getErrorIdSucesso(objError.data));
    })
    .catch(error => dispatch(errorGenerics(error)));
};

export const getUserLogado = () => ({
  type: Types.GET_USER,
  payload: getUser()
});

/////////////////////////////////////
////////// HeaderList.js ////////////
/////////////////////////////////////
const buscarConditionSelected = listError => {
  let condicao = "";
  listError.forEach(item => {
    if (item.selected) {
      condicao.length > 0 ? (condicao += ", " + item) : (condicao += item);
    }
  });
  return condicao;
};

const archiveSelectedSucesso = listError => ({
  type: Types.ARCHIVE_SELECTED_SUCESSO,
  payload: listError
});

export const archiveSelected = listError => dispatch => {
  listError.forEach(item => {
    if (item.selected) {
      archiveError(item._id);
    }
  });

  listError = listError.filter(item => !item.selected);

  dispatch(archiveSelectedSucesso(listError));
};

export const deleteSelected = listError => dispatch => {
  listError.forEach(item => {
    if (item.selected) {
      deleteError(item._id);
    }
  });

  listError = listError.filter(item => !item.selected);

  dispatch(archiveSelectedSucesso(listError));
};

export const changeAmbiente = filterAmbiente => ({
  type: Types.FILTER_AMBIENTE,
  payload: filterAmbiente
});

export const changeOrderBy = orderBy => ({
  type: Types.CHANGE_ORDER_BY,
  payload: orderBy
});

export const applyFilter = filter => ({
  type: Types.APPLY_FILTER,
  payload: filter
});
