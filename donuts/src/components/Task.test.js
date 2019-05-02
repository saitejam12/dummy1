import React from "react";
import Task from "./Task";
import { shallow, mount } from "enzyme";
import "../data/setupTests";
import { Provider } from "react-redux";
import { store } from "../store";

window.HTMLCanvasElement.prototype.getContext = () => {};

jest.mock("react-chartjs-2", () => ({
  Doughnut: () => null
}));

it("renders without crashing", () => {
  // let store ={};
  let props = {
    taskData: {
      title: "Task Status",
      summary: [
        {
          title: "Completed",
          value: 2
        },
        {
          title: "On Target",
          value: 155
        }
      ],
      total: 160
    }
  };
  store.getState().myproject = {
    userData: {}
  };
  let wrapper = mount(
    <Provider store={store}>
      <Task {...props} />
    </Provider>
  );
  expect(wrapper.find(".Task").length).toBe(1);
});

describe("ProgressLayout Card", () => {
  let props = {
    taskData: {
      title: "Task Status",
      summary: [
        {
          title: "Completed",
          value: 2
        },
        {
          title: "On Target",
          value: 155
        }
      ],
      total: 160
    }
  };
  store.getState().myproject = {
    userData: {}
  };
  let wrapper = mount(
    <Provider store={store}>
      <Task {...props} />
    </Provider>
  );

  it("should have Doughnut", () => {
    expect(wrapper.find("Doughnut").length).toBe(1);
  });
  it("should have footer section", () => {
    expect(wrapper.find(".footer").length).toBe(2);
  });
  it("should have footerTitle", () => {
    expect(wrapper.find(".footerTitle").length).toBe(2);
  });
  it("should have footerValue", () => {
    expect(wrapper.find(".footerValue").length).toBe(2);
  });
});
