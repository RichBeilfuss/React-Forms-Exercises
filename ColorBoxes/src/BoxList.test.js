import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import BoxList from "./BoxList";
import Box from "./Box";

function addBox(boxList, height = "2", width="2", color="teal"){
    const heightInput = boxList.getByLabelText("Height");
    const widthInput = boxList.getByLabelText("Width");
    const backgroundInput = boxList.getByLabelText("Background Color");
    fireEvent.change(backgroundInput, {target: {value: color } });
    fireEvent.change(widthInput, {target: {value: width } });
    fireEvent.change(heightInput, {target: {value: height } });
    const button = boxList.getByText("Add a new box!!");
    fireEvent.click(button);
}

it("renders properly", function(){
    render(<BoxList />);
});

it("matches snapshot", function(){
    const {asFragment} = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
});

it("adds new box", function(){
    const boxList = render(<BoxList />);
    expect(boxList.queryByText("Remove the Box!")).not.toBeInTheDocument();

    addBox(boxList);

    const removeButton = boxList.getByText("Remove the Box!");
    expect(removeButton).toBeInTheDocument();
    expect(removeButton.previousSibling).toHaveStyle(`
      width: 2em;
      height: 2em;
      background-color: teal;
    `);

    expect(boxList.getAllByDisplayValue("")).toHaveLength(3);
});

it("removes box", function(){
    const boxList = render(<BoxList />);
    addBox(boxList);

    const removeButton = boxList.getByText("Remove the Box!");

    fireEvent.click(removeButton);
    expect(removeButton).not.toBeInTheDocument();
});