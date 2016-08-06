import "normalize-css/normalize.css";
import "./app";

import "./assets/fontello/css/fontello-embedded.css";
import "./app.scss";

declare const OFFLINE;
if (OFFLINE) {
    require("../offline-assets/fonts/offline-fonts.css");
}
