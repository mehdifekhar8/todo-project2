import {
  use, useRouter, useTranslate, useUIComponents,
} from "@bluelibs/x-ui";
import React, { useEffect, useMemo, useState } from "react";
import * as Ant from "antd";
import { Todo, TodoCollection } from "@bundles/UIAppBundle/collections";
import { PlusOutlined, FilterOutlined, SettingOutlined, EditOutlined, EllipsisOutlined, DeleteOutlined, FolderViewOutlined } from "@ant-design/icons";
import { features } from "../../config/features";
import { Routes } from "@bundles/UIAppBundle";
import * as debounce from "lodash.debounce";

export function DragDropTodoList() {
  const UIComponents = useUIComponents();
  const router = useRouter();
  const t = useTranslate();
  const todosCollection = use(TodoCollection);
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState(new RegExp(``, "i"))

  useMemo(() => {
    todosCollection.find({
      filters: {
        titel: filter
      },
      options: {
        sort: {
          index: 1,
        },
      }
    }, {
      _id: 1,
      done: 1,
      titel: 1,
      index: 1
    }).then((result) => {
      setTodos(result);
    });
  }, [filter])

  const onDragOversort = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  }
  const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  }

  const onDrop = (ev: React.DragEvent<HTMLDivElement>, done: boolean) => {
    console.log("ondrop");
    const id = ev.dataTransfer.getData("id");
    const updatedTodo = todos.filter((todo) => {
      if (todo._id == id) {
        todo.done = done;
        todosCollection.updateOne(todo._id, { $set: { done: done } })
      }
      return todo;
    });
    setTodos(updatedTodo);
  }
  const onDropSort = (ev: React.DragEvent<HTMLDivElement>, toTodoElement: Todo) => {
    const fromElementid = ev.dataTransfer.getData("id");
    const updatedTodo = todos.filter(async (todo) => {
      if (todo._id == fromElementid) {
        await todosCollection.updateOne(todo._id, { $set: { index: toTodoElement.index } })
        await todosCollection.updateOne(toTodoElement._id, { $set: { index: todo.index } })
      }
      setFilter(new RegExp(``, "i"))
      return todo;
    });
  }

  function checkTodoDone(todo: Todo) {
    if (todo.done)
      return true;
  }

  function checkTodoNotDone(todo: Todo) {
    if (!todo.done)
      return true;
  }
  console.log("render")
  return (
    <UIComponents.AdminLayout>
      <Ant.PageHeader
        title="Drag and Drop TodoList"
        extra={[
          features.create ? (
            <Ant.Button
              key="1"
              onClick={() => router.go(Routes.TODO_CREATE)}
              icon={<PlusOutlined />}
            >
              {t("management.todo.list.create_btn")}
            </Ant.Button>
          ) : null,
        ]}
      />
      <Ant.Input.Search
        name="Search"
        placeholder="search by title"
        className="search"
        onKeyUp={(e) => {
          const value = (e.target as HTMLInputElement).value;
          setFilter(
            new RegExp(`${value}`, "i"),
          )
        }}
      />
      <div className="page-todo-lists"   >
        <Ant.Divider orientation="left" plain>
          <h4 style={{ color: "#124BD1" }} >Note : </h4>
        </Ant.Divider>
        <h5> to change task from todo to done and change  order at the same time just drag it above the task card </h5>
        <h5> to change task from todo to done without changin the order drag it next to the blue Todo or blue done card title  </h5>
        <Ant.Row>
          <Ant.Col span={12} >
            <div className="page-todo-lists"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => { onDrop(e, false) }}>
              <Ant.List className="page-todo-lists"
                header={<div className="page-todo-lists"   ><h5 style={{ color: "#124BD1" }} >Todo </h5> </div>}
                footer={<div className="page-todo-lists" >Todo Lists</div>}
                bordered
                dataSource={todos ? todos.filter(checkTodoNotDone) : null}
                renderItem={todo => (
                  <Ant.List.Item onDragOver={(e) => onDragOversort(e)}
                    onDrop={(e) => { onDropSort(e, todo) }}   >
                    <Ant.Typography.Text mark></Ant.Typography.Text>
                    <Ant.Card actions={[
                      <FolderViewOutlined
                        style={{ color: "#124BD1" }}
                        key="view"
                        onClick={() => router.go(Routes.TODO_VIEW, {
                          params: { id: todo._id.toString() },
                        })} />,
                      <EditOutlined style={{ color: "#53A753" }}
                        key="edit"
                        onClick={() => router.go(Routes.TODO_EDIT, {
                          params: { id: todo._id.toString() },
                        })} />,
                      <Ant.Popconfirm
                        key="delete"
                        title="Are you sure you want to delete this Todo?"
                        onConfirm={() => {
                          todosCollection.deleteOne(todo._id).then(() => {
                            router.go(Routes.TODO_LIST_Drag_Drop);
                            Ant.notification.success({
                              message: "Success",
                              description: "You have deleted the Todo",
                            });
                          });
                        }}
                      >
                        <DeleteOutlined style={{ color: "#eb2f96" }} />
                      </Ant.Popconfirm>
                    ]} style={{
                      borderTopColor: "#124BD1",
                      width: "100%"
                    }}
                      size="small"
                      key={todo.titel}
                      onDragStart={(e) => e.dataTransfer.setData("id", todo._id)}
                      draggable
                      bordered={true}>
                      {todo.titel} | index : {todo.index}
                    </Ant.Card>
                  </Ant.List.Item>
                )}
              />
            </div>
          </Ant.Col>
          <Ant.Col span={12}>
            <div className="page-todo-lists"
              onDragOver={(ev) => onDragOver(ev)}
              onDrop={(e) => onDrop(e, true)}
            >
              <Ant.List
                header={<div className="page-todo-lists"  > <h5 style={{ color: "#124BD1" }} >Done </h5>
                </div>}
                footer={<div className="page-todo-lists" >done Lists</div>}
                bordered
                dataSource={todos ? todos.filter(checkTodoDone) : null}
                renderItem={todo => (
                  <Ant.List.Item onDragOver={(e) => onDragOversort(e)}
                    onDrop={(e) => { onDropSort(e, todo) }}  >
                    <Ant.Typography.Text mark></Ant.Typography.Text>
                    <Ant.Card actions={[
                      <FolderViewOutlined style={{ color: "#124BD1" }}
                        key="view"
                        onClick={() => router.go(Routes.TODO_VIEW, {
                          params: { id: todo._id.toString() },
                        })} />,
                      <EditOutlined style={{ color: "#53A753" }}
                        key="edit"
                        onClick={() => router.go(Routes.TODO_EDIT, {
                          params: { id: todo._id.toString() },
                        })} />,
                      <Ant.Popconfirm
                        key="delete"
                        title="Are you sure you want to delete this Todo?"
                        onConfirm={() => {
                          todosCollection.deleteOne(todo._id).then(() => {
                            router.go(Routes.TODO_LIST_Drag_Drop);
                            Ant.notification.success({
                              message: "Success",
                              description: "You have deleted the Todo",
                            });
                          });
                        }}
                      >
                        <DeleteOutlined style={{ color: "#eb2f96" }} />
                      </Ant.Popconfirm>
                    ]}
                      style={{ borderTopColor: "#53A753", width: "100%" }}
                      size="small" key={todo.titel}
                      onDragStart={(e) => e.dataTransfer.setData("id", todo._id)}
                      draggable
                      bordered={true}>
                      {todo.titel}  | index: {todo.index}
                    </Ant.Card>
                  </Ant.List.Item>
                )}
              />
            </div>
          </Ant.Col>
        </Ant.Row>
      </div>
    </UIComponents.AdminLayout>
  )











}