import React from "react";
import { shallow } from "enzyme";
import Dashboard from "./Dashboard";

describe("Test on Dashboard Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Dashboard />); //shallow allows you check the content component wise.
  });

  test("renders wrapper class", () => {
    //  console.log(wrapper.debug()); <- use if you want to print the html
    expect(wrapper.find(".dashboard-wrapper").text()).toBe("Dashboard text");
  });
});
