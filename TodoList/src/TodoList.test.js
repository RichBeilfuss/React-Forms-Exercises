import React from "react";
import {render, fireEvent} from "@testing-library/react";
import TodoList from "./TodoList";
import Todo from "./Todo";

function addTodo(todoList, task = "write tests"){
    const taskInput = todoList.getByLabelText("Task:");
    fireEvent.change(taskInput, {target: {value: task }});
    const submitButton = todoList.getByText("Add a todo!");
    fireEvent.click(submitButton);
}

it("renders properly", function(){
    render(<TodoList />);
});

it("matches snapshot", function(){
    const {asFragment} = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
});

it("can add todo", function(){
    const list = render (<TodoList />);
    addTodo(list);

    expect(list.getByLabelText("Task:")).toHaveValue("");
    expect(list.getByText("write tests")).toBeInDocument();
    expect(list.getByText("Edit")).toBeInDocument();
    expect(list.getByText("X")).toBeInDocument();
});

it("can edit todo", function(){
    const list = render(<TodoList />);
    addTodo(list);

    fireEvent.click(list.getByText("Edit"));
    const editInput = list.getByDisplayValue("write tests");
    fireEvent.change(editInput, {target: {value: "sleep" }});
    fireEvent.click(list.getByText("Update!"));

    expect(list.getByText("sleep")).toBeInDocument();
    expect(list.queryByText("write tests")).not.toBeInDocument();
});

it("can delete todo", function(){
    const list = render(<TodoList />);
    addTodo(list);

    fireEvent.click(list.getByText("X"));

    expect(list.queryByText("write tests")).not.toBeInDocument();
});