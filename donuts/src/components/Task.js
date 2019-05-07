/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import { Chart, Doughnut } from "react-chartjs-2";
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

    //Work Around method suggested by ChartJs Library forum for Text inside Doughnut chart starts here /-----
    const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
      draw: function() {
        originalDoughnutDraw.apply(this, arguments);

        let chart = this.chart.chart;
        let ctx = chart.ctx;
        let width = chart.width;
        let height = chart.height;

        let fontSize = (height / 150).toFixed(2);
        ctx.font = fontSize + "em Arial";
        ctx.textBaseline = "middle";

        let text = chart.config.data.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 1.65;

        ctx.fillText(text, textX, textY);
      }
    });
    // ends here /-------

    const data = {
      labels: ["Completed %", "Remaining %"],
      datasets: [
        {
          data: percents,
          backgroundColor: ["#36a2de", "#ffffee"],
          borderColor: "#cccccc",
          responsive: true
        }
      ],
      text: percents[0] + "%",
      weight: 0.5
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
              options={{
                maintainAspectRatio: true,
                responsive: true
              }}
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
