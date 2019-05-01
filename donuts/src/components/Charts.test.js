import React from "react";
import Charts from "./Charts";
import { mount } from "enzyme";
import "../data/setupTests";
import { Provider } from "react-redux";
import { store } from "../store";
import data from "../data/givenData";

it("renders without crashing", () => {
  // let store ={};
  let props = {
    getData: jest.fn(),
    userValues: {}
  };
  store.getState().myproject = {
    data: []
  };
  let wrapper = mount(
    <Provider store={store}>
      <Charts {...props} />
    </Provider>
  );
  expect(wrapper.find(".Charts").length).toBe(1);
});

it("Should have Task Components", () => {
  // let store ={};
  let props = {
    getData: jest.fn(),
    userValues: {}
  };
  store.getState().myproject = {
    ...data
  };

  let wrapper = mount(
    <Provider store={store}>
      <Charts {...props} />
    </Provider>
  );
  expect(wrapper.find("Task").length).toBe(4);
});
