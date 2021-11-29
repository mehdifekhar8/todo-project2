import {
  newSmart,
  useRouter,
  useUIComponents,
  useTranslate,
} from "@bluelibs/x-ui";
import { useEffect, useState, useMemo } from "react";
import { UsersAntTableSmart } from "./UsersTableSmart";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { Routes } from "@bundles/UIAppBundle";
import { features } from "../../config/features";
import { UsersListFilters } from "./UsersListFilters";

export function UsersList() {
  const UIComponents = useUIComponents();
  const router = useRouter();
  const t = useTranslate();
  const [api, Provider] = newSmart(UsersAntTableSmart);
  const [filtersOpened, setFiltersOpened] = useState(false);
  const { Option } = Ant.Select;
  const children = [];
  const defaultSelection = [];
  const [cole, setCole] = useState(api.getTableProps());
  const onFiltersUpdate = useMemo(() => {
    return (filters) => {
      api.setFlexibleFilters(filters);
    };
  }, []);

  function handleChange(value) {
    cole.columns = api.getTableProps().columns.filter(function (value2, index, arr) {
      if (value.includes(value2.title)) {
        return value2
      }
    });
    setCole({
      ...cole,
    })
  }

  api.getTableProps().columns.forEach((col) => {
    children.push(<Option key={col.title.toString()} value={col.title.toString()}>{col.title.toString()}</Option>);
    defaultSelection.push(col.title.toString())
  })



  return (
    <UIComponents.AdminLayout>

      <Ant.PageHeader
        title={t("management.users.list.header")}
        extra={[
          features.create ? (
            <Ant.Button
              key="1"
              onClick={() => router.go(Routes.USERS_CREATE)}
              icon={<PlusOutlined />}
            >
              {t("management.users.list.create_btn")}
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
      <h3
      >
        Column visibility
        <Ant.Select

          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Please select"
          onChange={handleChange}
          defaultValue={defaultSelection}

        >
          {children}
        </Ant.Select>
      </h3>
      <Ant.Divider> </Ant.Divider>

      {api.state.isError && (
        <Ant.Alert type="error" message={t("generics.error_message")} />
      )}
      <Ant.Layout.Content>
        <Provider>
          <div className="page-users-list">
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
            <Ant.Table {...api.getTableProps()} columns={cole.columns} />
          </div>
        </Provider>
      </Ant.Layout.Content>
    </UIComponents.AdminLayout>
  );
}
