import devConfig from "./dev.config";
import localConfig from "./local.config";

const appStage = process.env.REACT_APP_STAGE
  ? process.env.REACT_APP_STAGE.trim()
  : "dev";

interface IConfig {
  APP_URL: string;
  APP_ID: string;
  GOOGLE_CLIENT_ID: string;
}

// eslint-disable-next-line import/no-mutable-exports
let CONFIG: IConfig = devConfig;

if (appStage === "local") {
  CONFIG = localConfig;
}

export default CONFIG;
