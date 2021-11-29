import {
  use,
} from "@bluelibs/x-ui";
import { useState } from "react";
import * as Ant from "antd";
import { Todo, TodoCollection } from "@bundles/UIAppBundle/collections";

export function DragDropTodoList(props: { state1: Partial<Todo>[] }) {

  let [state1, setState1] = useState(props.state1);
  state1 = props.state1;
  const todocollection = use(TodoCollection);

  const onDragOver = (ev) => {
    ev.preventDefault();
  }

  const onDrop = (ev, cat) => {
    const id = ev.dataTransfer.getData("id");
    let tasks = state1.filter((task) => {
      if (task.titel == id) {
        task.done = cat;
        todocollection.updateOne(task._id, { $set: { done: cat } })
      }
      return task;
    });

    setState1({
      ...state1,
      ...tasks
    })
  }
  const tasks = {
    todo: [],
    done: []
  }

  state1 && state1.forEach((t) => {
    (t.done) ? tasks["done"].push(
      <div className="page-todo-lists2"   >
        <Ant.Card style={{ borderTopColor: "#124BD1" }} size="small" key={t.titel} onDragStart={(e) => e.dataTransfer.setData("id", t.titel)} draggable bordered={true}>
          {t.titel}
        </Ant.Card>
      </div>
    ) : tasks["todo"].push(
      <div className="page-todo-lists2"   >
        <Ant.Card style={{ borderTopColor: "#53A753" }} size="small" key={t.titel} onDragStart={(e) => e.dataTransfer.setData("id", t.titel)} draggable bordered={true}>
          {t.titel}
        </Ant.Card>
      </div>

    )
  })

  return (

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
              dataSource={tasks.todo}
              renderItem={item => (
                <Ant.List.Item  >
                  <Ant.Typography.Text mark></Ant.Typography.Text> {item}
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
              dataSource={tasks.done}
              renderItem={item => (
                <Ant.List.Item>
                  <Ant.Typography.Text mark></Ant.Typography.Text> {item}
                </Ant.List.Item>
              )}
            />
          </div>
        </Ant.Col>
      </Ant.Row>

    </div>
  )











}