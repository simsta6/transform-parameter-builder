import { readFileSync, writeFileSync } from "fs";
import { SavedView } from "./models/SavedView";
import path from "path";
import { parseOpenCitiesSavedView, parseTransformParametersToJson } from "./TransformParametersUtils";

function run(): void {
  const savedViewFileName = "savedView.json";
  const outputFileName = "transformParameters.json";
  const escapeFlag = !!process.argv.find((value) => value === "escape");

  const savedViewJSON = readFileSync(path.join(__dirname, "../", savedViewFileName), "utf8");
  const savedView: SavedView = JSON.parse(savedViewJSON).savedView;
  const transformParameters = parseOpenCitiesSavedView(savedView.savedViewData.legacyView);

  const transformParametersJSON = parseTransformParametersToJson(transformParameters, escapeFlag);

  console.log("\nTRANSFORM PARAMETERS:\n");
  console.log("\x1b[33m%s\x1b[0m\n", transformParametersJSON);
  writeFileSync(outputFileName, transformParametersJSON);
}

run();
