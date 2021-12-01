/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import { DragDropTodoList } from "../components/List/DragDropTodoList";
import { SettingFilled } from "@ant-design/icons";

export const TODO_LIST_Drag_Drop: IRoute = {
  path: "/admin/draganddrop",
  component: DragDropTodoList,
  menu: {
    key: "TODO_LIST_Drag_Drop",
    label: "management.todoDrag.menu.title",
    icon: SettingFilled,
  },
};


