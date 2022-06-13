import * as authActions from "./auth/auth.action";
import * as fileActions from "./file/file.action";
import * as limitActions from "./limit/limit.action";

const actions = {
  auth: authActions,
  file: fileActions,
  limit: limitActions,
};

export default actions;
