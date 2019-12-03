import React, { Component } from "react";

class SelectedList extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = e => {
    this.props.setValue(e.target.value);
  };
  render(props) {
    const options = this.props.options.map((elem, idx) => (
      <option key={idx} value={elem}>
        {elem}
      </option>
    ));

    return (
      <select
        value={this.props.value}
        onChange={this.handleChange}
        className={this.props.classNameSelect}
      >
        {options}
      </select>
    );
  }
}

export default SelectedList;
