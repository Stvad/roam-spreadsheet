import runExtension from "roamjs-components/util/runExtension";
import createButtonObserver from "roamjs-components/dom/createButtonObserver";
import {render} from './spreadsheet'

export default runExtension({
  run: (args) => {
    args.extensionAPI.settings.panel.create({
      tabTitle: "roam-spreadsheet",
      settings: [],
    });

    console.log("spreadsheet extension loaded")

    createButtonObserver({
      shortcut: "spreadsheet",
      attribute: "spreadsheet",
      render,
    });
  },
});
