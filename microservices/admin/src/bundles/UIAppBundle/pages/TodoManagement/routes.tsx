import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  TODO_LIST as BASE_TODO_LIST,
  TODO_CREATE as BASE_TODO_CREATE,
  TODO_EDIT as BASE_TODO_EDIT,
  TODO_VIEW as BASE_TODO_VIEW,
} from "./config/routes";

export const TODO_LIST: IRoute = {
  ...BASE_TODO_LIST,
};

export const TODO_CREATE: IRoute = {
  ...BASE_TODO_CREATE,
};

export const TODO_EDIT: IRoute = {
  ...BASE_TODO_EDIT,
};

export const TODO_VIEW: IRoute = {
  ...BASE_TODO_VIEW,
};
