import Types from "../types/types";

const initialState = {
  isLoading: false,

  listError: [],
  fullList: [],
  allSelected: false,

  objError: null,
  user: null,

  objMensagemErro: null
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case Types.REQUEST_GENERICS: {
      return {
        ...state,
        isLoading: true
      };
    }

    case Types.ERROR_GENERICS: {
      console.log(action.payload);
      // Futuramente pode tratar uma variável para abrir um componente de error aqui
      return {
        ...state,
        objMensagemErro: action.payload
      };
    }

    case Types.GET_ALL_ERRORS_SUCESSO: {
      return {
        ...state,
        isLoading: false,
        listError: action.payload,
        fullList: action.payload
      };
    }

    case Types.ARCHIVE_SELECTED_SUCESSO: {
      return {
        ...state,
        isLoading: false,
        listError: action.payload
      };
    }

    case Types.SET_SELECTED_ITEM: {
      return {
        ...state,
        listError: state.listError.map(item => {
          if (item._id === action.payload) {
            item.selected = !item.selected;
          }

          return item;
        })
      };
    }

    case Types.SELECT_ALL: {
      return {
        ...state,
        listError: action.payload,
        allSelected: !state.allSelected
      };
    }

    case Types.FILTER_AMBIENTE: {
      const filters = {
        Produção: "production",
        Homologação: "homologation",
        Dev: "development"
      };
      const filter = filters[action.payload];
      let items = state.fullList;
      if (filter) {
        items = items.filter(e => e.environment === filter);
      }
      return {
        ...state,
        listError: items
      };
    }

    case Types.CHANGE_ORDER_BY: {
      let items = state.listError;
      if (action.payload === "Frequência") {
        items.sort((a, b) => {
          return a.occurrences - b.occurrences;
        });
      }
      if (action.payload === "Level") {
        items.sort((a, b) => {
          return a.level === "warning" ? 1 : -1;
        });
      }
      items = items.filter(e => e);

      return {
        ...state,
        listError: items
      };
    }

    case Types.APPLY_FILTER: {
      let items = state.fullList;
      let filter = action.payload;
      if (filter !== "") {
        items = items.filter(item => {
          return (
            item.description.title.search(filter) !== -1 ||
            item.description.stacktrace.search(filter) !== -1 ||
            item.origin.search(filter) !== -1 ||
            item.level.search(filter) !== -1 ||
            item.occurrences.toString().search(filter) !== -1
          );
        });
      }
      return {
        ...state,
        listError: items
      };
    }

    case Types.GET_ERROR_BY_ID_SUCESSO: {
      return {
        ...state,
        isLoading: false,
        objError: action.payload
      };
    }

    case Types.GET_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    default:
      return state;
  }
};

export default list;
