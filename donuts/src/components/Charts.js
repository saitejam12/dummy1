import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "./Task";
import "./Charts.css";

class Charts extends Component {
  render() {
    const { data = [] } = this.props;
    console.log(this.props.data, "Charts");
    return (
      <div className="Charts">
        {data &&
          data.map((task, i) => {
            return (
              <div className="Charts_container" key={i}>
                <Task taskData={task} key={i} />
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
