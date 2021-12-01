import { Dashboard } from "./Dashboard";
import { DashboardOutlined } from "@ant-design/icons";
import { IRoute } from "@bluelibs/x-ui-react-router-bundle";

export const DASHBOARD : IRoute= {
  path: "/dashboard",
  component: Dashboard,
  menu: {
    key: "Dashboard",
    label: "Dashboard",
    icon: DashboardOutlined,
  },
};
