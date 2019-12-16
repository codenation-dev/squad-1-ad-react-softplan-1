import React, { useEffect } from "react";
import Items from "./ItemsList";
import HeaderList from "./HeaderList";
import { getErrors } from "../../services/Api";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/error";
import { useSelector } from "react-redux";

const List = props => {
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const setErrors = (data) => {
    dispatch(Actions.setErrors(data));
  };

  const getListErrors = async () => {    
    await getErrors(setErrors, user);
  };

  useEffect(() => {
    getListErrors();
  }, []);

  return (
    <div className="m-3 p-2 p-md-4 p-xl-4">
      <HeaderList />
      <Items
        history={props.history}
      />
    </div>
  );
};

export default List;
