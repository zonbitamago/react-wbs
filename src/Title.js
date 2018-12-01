import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

@observer
class Title extends Component {
  changeTitleStyle(id) {
    if (document.querySelector(`#title${id} label`).style.display !== "none") {
      document.querySelector(`#title${id} label`).style.display = "none";
      document.querySelector(`#title${id} input`).style.display = "block";

      document.querySelector(`#title${id} input`).focus();
    } else {
      document.querySelector(`#title${id} label`).style.display = "block";
      document.querySelector(`#title${id} input`).style.display = "none";
    }
  }
  render() {
    const { id, title, changeTitle } = this.props;
    return (
      <div
        id={`title${id}`}
        onClick={this.changeTitleStyle.bind(this, id)}
        style={{ maxWidth: "100px" }}
      >
        <label>{title}</label>
        <input
          type="text"
          defaultValue={title}
          style={{ display: "none", maxWidth: "100px" }}
          onBlur={this.changeTitleStyle.bind(this, id)}
          onChange={e => {
            changeTitle(id, e.target.value);
          }}
        />
      </div>
    );
  }
}

Title.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  changeTitle: PropTypes.func.isRequired
};

export default Title;
