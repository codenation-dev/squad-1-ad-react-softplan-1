import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";
import { archiveError, deleteError } from "../../services/Api";
import { MobileView, BrowserView } from "react-device-detect"
import SearchForm from "./SearchForm";
import ArchiveDelete from "./ArchiveDelete";
import SimpleFilters from "./SimpleFilters";

const HeaderList = () => {
  const allErrors = useSelector(({ error: { allErrors } }) => allErrors);
  const filteredErrors = useSelector(({ error: { filteredErrors } }) => filteredErrors); 
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const [searchBy, setSearchBy] = useState("");

  const confirmAction = text => window.confirm(text);

  const removeDeleted = (id) => {
    dispatch(Actions.removeError(id))
  }

  const archiveSelected = () => {
    filteredErrors.forEach(item => {
      if (item.selected) {
        if (confirmAction(`Deseja arquivar o item: ${item._id}`)) {
          archiveError(item._id, removeDeleted, user);
        }
      }
    });
  };

  const deleteSelected = () => {
    filteredErrors.forEach(item => {
      if (item.selected) {
        if (confirmAction(`Deseja deletar o item: ${item._id}`)) {
          deleteError(item._id, removeDeleted, user);
        }
      }
    });
  };

  const changeAmbiente = filterAmbiente => {
    const filters = {
      ["Produção"]: "production",
      ["Homologação"]: "homologation",
      ["Dev"]: "development"
    };
    const filter = filters[filterAmbiente];
    let items = allErrors;
    if (filter) items = items.filter(e => e.environment === filter);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const changeOrderBy = orderBy => {
    switch (orderBy) {
      case "Frequência":
        filteredErrors.sort((a, b) => a.occurrences - b.occurrences);
        break;
      case "Level":
        filteredErrors.sort((a, b) => a.level.localeCompare(b.level));
        break;
      default:
        filteredErrors.sort((a, b) => (
          new Date(b.lastOccurrence.date) - new Date(a.lastOccurrence.date))
        );
    }
    const items = filteredErrors.filter(e => e);
    dispatch(Actions.updateFilteredErrors(items));
  };

  const changeSearchBy = searchBy => setSearchBy(searchBy);

  const applyFilter = filter => {
    let items = []
    if (filter) {
      const pattern = new RegExp(filter.trim(), "i");
      switch (searchBy) {
        case "Level":
          items = allErrors.filter(item => item.level.match(pattern));
          break;
        case "Origem":
          items = allErrors.filter(item => item.origin.match(pattern));
          break;
        case "Descrição":
          items = allErrors.filter(item => {
            return (
              item.description.title.match(pattern) ||
              item.description.stacktrace.match(pattern)
            );
          });
          break;
        default:
          items = allErrors.filter(item => {
            return (
              item.description.title.match(pattern) ||
              item.description.stacktrace.match(pattern) ||
              item.origin.match(pattern) ||
              item.level.match(pattern) ||
              item.occurrences.toString().match(pattern)
            );
          });
      }
      dispatch(Actions.updateFilteredErrors(items));
    } else {
      dispatch(Actions.updateFilteredErrors(allErrors));
    }
  };

  const handleSubmit = (event, filter) => {
    event.preventDefault();
    event.stopPropagation();
    applyFilter(filter);
  };

  return (
    <>
      <MobileView>
        <div className="d-flex flex-column align-items-center">
          <div className="p2 col-example d-flex flex-row pb-3">
            <SearchForm 
              handleSubmit={handleSubmit}
              changeSearchBy={changeSearchBy}
            />
          </div>
        </div>
        <div className="d-flex flex-row pb-2 justify-content-between">
          <div className="p2 col-example d-flex flex-row">
            <ArchiveDelete 
              deleteSelected={deleteSelected}
              archiveSelected={archiveSelected}
            />
          </div>
          <div className="p2 mb-1 col-example d-flex flex-row">
            <SimpleFilters
              changeAmbiente={changeAmbiente}
              changeOrderBy={changeOrderBy}
              classname="mr-1"
            />
          </div>
        </div>
      </MobileView>
      <BrowserView>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="p2 col-example d-flex flex-row">
            <ArchiveDelete 
              deleteSelected={deleteSelected}
              archiveSelected={archiveSelected}
            />
          </div>
          <div className="p2 d-flex flex-row pb-3">
            <SimpleFilters
              changeAmbiente={changeAmbiente}
              changeOrderBy={changeOrderBy}
              classname="mr-1"
            />
            <SearchForm 
              handleSubmit={handleSubmit}
              changeSearchBy={changeSearchBy}
            />
          </div>
          
        </div>
      </BrowserView>
    </>
  );
};

export default HeaderList;
