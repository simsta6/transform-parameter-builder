import { readFileSync, writeFileSync } from "fs";
import { parseLegacyViewDefinitionToTransformParameters, parseTransformParametersToJson } from "./TransformParametersUtils";
import { ViewModes } from "./models/FilterByViewDefinition";

function run(): void {
  const savedViewFileName = "savedView.json";
  const outputFileName = "transformParameters.json";
  const viewMode: ViewModes = !!process.argv.find((value) => value === "includeNewContent") ? ViewModes.IncludeNewContent : ViewModes.FilterContent;
  const escapeFlag = !!process.argv.find((value) => value === "escape");

  const savedViewJSON = readFileSync(savedViewFileName, "utf8");
  const legacyViewDefinition = JSON.parse(savedViewJSON).properties;
  const transformParameters = parseLegacyViewDefinitionToTransformParameters(legacyViewDefinition, viewMode);

  const transformParametersJSON = parseTransformParametersToJson(transformParameters, escapeFlag);

  console.log("\nTRANSFORM PARAMETERS:\n");
  console.log("\x1b[33m%s\x1b[0m\n", transformParametersJSON);
  writeFileSync(outputFileName, transformParametersJSON);
}

run();
