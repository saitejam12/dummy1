import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import "./Task.css";

const COMPLETED = "Completed";

const ProgressData = props => {
  return props.data.summary.map((summary, i) => {
    return (
      <Card.Body key={i}>
        <div className="footer">
          <div className="footerTitle">
            {summary.title}

            <div className="footerValue">{summary.value}</div>
          </div>
        </div>
      </Card.Body>
    );
  });
};

class Task extends Component {
  getPercentage = () => {
    let calculatePercentage = [];
    // eslint-disable-next-line array-callback-return
    this.props.taskData.summary.map(summary => {
      if (summary.title === COMPLETED) {
        calculatePercentage[0] = Math.round(
          (summary.value / this.props.taskData.total) * 100
        );
        calculatePercentage[1] = 100 - calculatePercentage[0];
      }
    });

    return calculatePercentage;
  };
  getDoughNut = () => {
    const percents = this.getPercentage();
    const data = {
      responsive: true,
      labels: ["Completed %", "Remaining %"],
      datasets: [
        {
          data: percents,
          backgroundColor: ["#36a2de", "#ffffee"],
          borderColor: "#cccccc"
        }
      ]
    };

    return data;
  };

  render() {
    const { taskData } = this.props;
    return (
      <div className="Task">
        <Card variant="light" style={{ border: "hidden" }}>
          <Card.Header style={{ backgroundColor: "#ccc" }}>
            {taskData.title}
          </Card.Header>
          <Card.Body>
            <Doughnut
              data={this.getDoughNut()}
              text={this.getPercentage()[0]}
            />
          </Card.Body>
          <ProgressData data={taskData} />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.reducer
  };
};

export default connect(mapStateToProps)(Task);
