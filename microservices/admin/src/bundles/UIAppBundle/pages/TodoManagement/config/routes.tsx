/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { TodoList } from "../components/List/TodoList";
import { TodoCreate } from "../components/Create/TodoCreate";
import { TodoEdit } from "../components/Edit/TodoEdit";
import { TodoView } from "../components/View/TodoView";

import { SettingFilled } from "@ant-design/icons";

export const TODO_LIST: IRoute = {
  path: "/admin/todo",
  component: TodoList,
  menu: {
    key: "TODO_LIST",
    label: "management.todo.menu.title",
    icon: SettingFilled,
  },
};

export const TODO_CREATE: IRoute = {
  path: "/admin/todo/create",
  component: TodoCreate,
};

export const TODO_EDIT: IRoute<{ id: string }> = {
  path: "/admin/todo/:id/edit",
  component: TodoEdit,
};

export const TODO_VIEW: IRoute<{ id: string }> = {
  path: "/admin/todo/:id/view",
  component: TodoView,
};
