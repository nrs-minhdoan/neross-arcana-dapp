import snakeCase from "lodash/snakeCase";
import toLower from "lodash/toLower";

import CONFIG from "../config/dev.config";

function downloadJSON(data: Object, fileName?: string) {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  const element = document.createElement("a");
  element.setAttribute("href", dataStr);
  element.setAttribute(
    "download",
    `${snakeCase(toLower(fileName || `${CONFIG.APP_NAME} keys`))}.json`
  );
  document.body.appendChild(element); // required for firefox
  element.click();
  element.remove();
}

export default downloadJSON;
