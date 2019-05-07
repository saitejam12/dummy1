import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";
import "./Charts.css";

class Charts extends Component {
  render() {
    const { data = [] } = this.props;
    return (
      <div className="Charts">
        {data &&
          data.map((task, i) => {
            return (
              <div className="Charts_container" key={i}>
                <Task taskData={task} />
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.reducer
  };
};

export default connect(mapStateToProps)(Charts);
