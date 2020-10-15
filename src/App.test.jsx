import React from "react";
import App from "./App";
import { shallow } from "enzyme";

describe("Test on App Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);//shallow allows you to test only component not its child component
  });

  test("renders h1 tag", () => {
     //console.log(wrapper.debug()); <- use if you want to print the html
    expect(wrapper.find(".layout-wrapper"))
  });


});
