import {
  newSmart,
  useRouter,
  useUIComponents,
  useTranslate,
  useData,
  useLiveData,
} from "@bluelibs/x-ui";
import { useEffect, useState, useMemo } from "react";
import { TodoAntTableSmart } from "./TodoTableSmart";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { Routes } from "@bundles/UIAppBundle";
import { features } from "../../config/features";
import { TodoListFilters } from "./TodoListFilters";
import { TodoCollection } from "@bundles/UIAppBundle/collections/Todo/Todo.collection";
import { DragDropTodoList } from "./DragDropTodoList";
import Title from "antd/lib/skeleton/Title";

export function TodoList() {
  const UIComponents = useUIComponents();
  const router = useRouter();
  const t = useTranslate();
  let [api, Provider] = newSmart(TodoAntTableSmart);
  const [filtersOpened, setFiltersOpened] = useState(false);
  const onFiltersUpdate = useMemo(() => {
    return (filters) => {
      api.setFlexibleFilters(filters);
    };
  }, []);
  const { data: TodoData, error, isLoading } = useData(TodoCollection, {
  }, {
    _id: 1,
    done: 1,
    titel: 1,
  })

 
let cole  = api.getTableProps().columns ; 
cole[0].className="show";
console.log("the colume")
  console.log(cole)
  return (
    <UIComponents.AdminLayout>
      <Ant.PageHeader
        title={t("management.todo.list.header")}
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
          <Ant.Button
            key="2"
            onClick={() => setFiltersOpened(!filtersOpened)}
            icon={<FilterOutlined />}
          >
            {t("generics.list_filters")}
          </Ant.Button>,
        ]}
      />

      {api.state.isError && (
        <Ant.Alert type="error" message={t("generics.error_message")} />
      )}

      <Ant.Layout.Content>
        <Provider>
          <div className="page-todo-list">
            {filtersOpened && <TodoListFilters onUpdate={onFiltersUpdate} />}
            <Ant.Input.Search
              name="Search"
              placeholder={t("generics.list_search")}
              className="search"
              onKeyUp={(e) => {
                const value = (e.target as HTMLInputElement).value;
                api.setFilters({
                  // Customise your search filters!
                  title: new RegExp(`${value}`, "i"),
                });
              }}
            />
            <Ant.Table    
 {...api.getTableProps()} columns = {cole}  />
            <Ant.PageHeader
        title="Drag and Drop TodoList"
      />
           <DragDropTodoList state1={TodoData}></DragDropTodoList>
          </div>
        </Provider>
      </Ant.Layout.Content>
    </UIComponents.AdminLayout>
  );
}
