import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";
import "./data/setupTests";

window.HTMLCanvasElement.prototype.getContext = () => {};

jest.mock("react-chartjs-2", () => ({
  Doughnut: () => null
}));

it("renders without crashing", () => {
  let wrapper = mount(<App />);
  expect(wrapper.find(".Charts").length).toBe(1);
});
