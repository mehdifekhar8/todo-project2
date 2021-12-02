/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  Todo,
  UsersCollection,
  TodoCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class TodoList extends XList<Todo> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "titel",
        title: t("management.todo.fields.titel"),
        key: "management.todo.fields.titel",
        dataIndex: ["titel"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "string",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "done",
        title: t("management.todo.fields.done"),
        key: "management.todo.fields.done",
        dataIndex: ["done"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "boolean",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "User",
        title: t("management.todo.fields.User"),
        key: "management.todo.fields.User",
        dataIndex: ["User"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.USERS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "fullName",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
    ]);
  }

  static getSortMap() {
    return {
      User: "User.fullName",
    };
  }

  static getRequestBody(): QueryBodyType<Todo> {
    return {
      _id: 1,
      titel: 1,
      done: 1,
      User: {
        _id: 1,
        fullName: 1,
      },
      userId: 1,
    };
  }
}
