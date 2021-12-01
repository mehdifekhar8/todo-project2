import {
  use, useRouter, useTranslate, useUIComponents,
} from "@bluelibs/x-ui";
import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { Todo, TodoCollection } from "@bundles/UIAppBundle/collections";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { features } from "../../config/features";
import { Routes } from "@bundles/UIAppBundle";

export function DragDropTodoList() {
  const UIComponents = useUIComponents();
  const router = useRouter();
  const t = useTranslate();
  const todosCollection = use(TodoCollection);
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    todosCollection.find({}, {
      _id: 1,
      done: 1,
      titel: 1,
    }).then((result) => {
      setTodos(result);
    });
  }, [])

  const onDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  }

  const onDrop = (ev: React.DragEvent<HTMLDivElement>, done: boolean) => {
    const id = ev.dataTransfer.getData("id");
    const updatedTodo = todos.filter((todo) => {
      if (todo.titel == id) {
        todo.done = done;
        todosCollection.updateOne(todo._id, { $set: { done: done } })
      }
      return todo;
    });
    setTodos(updatedTodo);
  }

  function checkTodoDone(todo: Todo) {
    if (todo.done)
      return true;
  }

  function checkTodoNotDone(todo: Todo) {
    if (!todo.done)
      return true;
  }

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
      <div className="page-todo-lists"   >
        <Ant.Row>
          <Ant.Col span={12} >
            <div className="page-todo-lists"
              onDragOver={(e) => onDragOver(e)}
              onDrop={(e) => { onDrop(e, false) }}>
              <Ant.List className="page-todo-lists"
                header={<div className="page-todo-lists" >Todo</div>}
                footer={<div className="page-todo-lists" >Todo Lists</div>}
                bordered
                dataSource={todos ? todos.filter(checkTodoNotDone) : null}
                renderItem={todo => (
                  <Ant.List.Item  >
                    <Ant.Typography.Text mark></Ant.Typography.Text>
                    <Ant.Card style={{ borderTopColor: "#124BD1" }} size="small" key={todo.titel} onDragStart={(e) => e.dataTransfer.setData("id", todo.titel)} draggable bordered={true}>
                      {todo.titel}
                    </Ant.Card>
                  </Ant.List.Item>
                )}
              />
            </div>
          </Ant.Col>
          <Ant.Col span={12}>
            <div className="page-todo-lists"
              onDrop={(e) => onDrop(e, true)}
              onDragOver={(ev) => onDragOver(ev)}>
              <Ant.List
                header={<div className="page-todo-lists">Done</div>}
                footer={<div className="page-todo-lists" >done Lists</div>}
                bordered
                dataSource={todos ? todos.filter(checkTodoDone) : null}
                renderItem={todo => (
                  <Ant.List.Item>
                    <Ant.Typography.Text mark></Ant.Typography.Text>
                    <Ant.Card style={{ borderTopColor: "#53A753" }} size="small" key={todo.titel} onDragStart={(e) => e.dataTransfer.setData("id", todo.titel)} draggable bordered={true}>
                      {todo.titel}
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