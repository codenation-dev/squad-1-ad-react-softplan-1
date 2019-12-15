import React, { useEffect } from "react";
import Items from "./ItemsList";
import HeaderList from "./HeaderList";
import { Loading } from "../Loading";

import { connect } from "react-redux";
import { getAllErrors } from "../../actions";

const List = props => {
  useEffect(() => {
    props.getAllErrors();
  }, []);

  return (
    <div className="m-3 p-4">
      <HeaderList />
      {props.isLoading ? <Loading /> : <Items history={props.history} />}
    </div>
  );
};

const mapStateToProps = state => ({
  listError: state.listError,
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  getAllErrors: () => dispatch(getAllErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
