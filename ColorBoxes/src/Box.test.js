import React from "react";
import { render } from "@testing-library/react";
import Box from "./Box";

it("renders properly", function(){
    render(<Box />);
});

it("matches snapshot", function(){
    const {asFragment} = render(<Box />);
    expect(asFragment()).toMatchSnapshot();
});