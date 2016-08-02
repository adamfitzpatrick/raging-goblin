import "normalize-css/normalize.css";
import "./app";

import "adamfitzpatrick-fonts";
import "./app.scss";

declare const OFFLINE;
if (OFFLINE) {
    require("../offline-assets/fonts/offline-fonts.css");
}
