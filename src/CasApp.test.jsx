import React from "react";
import CasApp from "./CasApp";
import { shallow } from "enzyme";

describe("Test on CasApp Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CasApp />);//shallow allows you to test only component not its child component
  });

  test("renders h1 tag", () => {
     //console.log(wrapper.debug()); <- use if you want to print the html
    expect(wrapper.find(".layout-wrapper"))
  });


});
