import React from "react";
import { shallow } from "enzyme";
import Dashboard from "./CasDashboard";

describe("Test on Dashboard Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Dashboard />); //shallow allows you check the content component wise.
  });

  test("renders initial text", () => {
    //  console.log(wrapper.debug()); <- use if you want to print the html
    expect(wrapper.find("h1").text()).toBe("No User selected");
  });
});
