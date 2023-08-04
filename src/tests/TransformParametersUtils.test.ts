import { expect } from "chai";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { TransformParameters, ViewModes } from "../models/FilterByViewDefinition";
import { parseLegacySavedView, parseSavedView, parseTransformParametersToJson } from "../TransformParametersUtils";
import { KnownTestLocations } from "./testUtils/KnowTestLocation";
import { SavedView } from "../../src/models/SavedView";

describe("Transform parameters utils", () => {
  it("should correctly parse legacy saved view json to transform parameters", async () => {
    // Arrange
    const viewDefinition: any = createTestViewDefinition();
    const planes = viewDefinition.viewDefinitionProps.jsonProperties.viewDetails.clip.filter(
      (primitive: any) => "planes" in primitive).map((primitive: any) => primitive.planes);
    const shapes = viewDefinition.viewDefinitionProps.jsonProperties.viewDetails.clip.filter(
      (primitive: any) => "shape" in primitive).map((primitive: any) => primitive.shape);

    // Act
    const transformParameters = parseLegacySavedView(viewDefinition, ViewModes.IncludeNewContent);

    // Assert
    expect(transformParameters.categories).to.be.equal(viewDefinition.categorySelectorProps.categories);
    expect(transformParameters.models).to.be.equal(viewDefinition.modelSelectorProps.models);
    expect(transformParameters.neverDrawn).to.be.equal(viewDefinition.emphasizeElementsProps.neverDrawn);
    expect(transformParameters.subCategoryOvr).to.deep.equal(viewDefinition.displayStyleProps.jsonProperties.styles.subCategoryOvr);

    expect(transformParameters.clip).to.not.be.undefined;
    expect(transformParameters.clip!.planes).to.be.deep.equal(planes);
    expect(transformParameters.clip!.shapes).to.be.deep.equal(shapes);

    expect(transformParameters.perModelCategoryVisibility).to.be.equal(viewDefinition.perModelCategoryVisibility);
  });

  it("should correctly parse transform parameters to JSON string with escape flag on", async () => {
    // Arrange
    const escapeFlag = true;
    const transformationParameters: TransformParameters = createTestTransformParameters();

    // Act
    const transformParametersJSON = parseTransformParametersToJson(transformationParameters, escapeFlag);

    // Assert
    expect(transformParametersJSON).to.be.equal(
      `{\\"categories\\":[\\"0x10000000001\\",\\"0x10000000002\\"],\\"models\\":[\\"0x20000000001\\",\\"0x20000000002\\"],\\"neverDrawn\\":[\\"0x30000000001\\",\\"0x30000000002\\"],\\"subCategoryOvr\\":[{\\"invisible\\":false,\\"subCategory\\":\\"0x40000000000\\"}],\\"clip\\":{\\"shapes\\":[{\\"points\\":[[1,-1,0],[2,-2,0]],\\"trans\\":[[-1,-2,0,3],[1,-1,0,0]],\\"zlow\\":-5,\\"zhigh\\":5}],\\"planes\\":[{\\"clips\\":[[{\\"normal\\":[0,0,-1],\\"dist\\":1},{\\"normal\\":[0,-1,0],\\"dist\\":1}]]}]},\\"viewMode\\":\\"FilterContent\\"}`
    );
  });

  it("should correctly parse transform parameters to JSON string with escape flag off", async () => {
    // Arrange
    const escapeFlag = false;
    const transformationParameters: TransformParameters = createTestTransformParameters();

    // Act
    const transformParametersJSON = parseTransformParametersToJson(transformationParameters, escapeFlag);

    // Assert
    expect(transformParametersJSON).to.be.equal(
      `{"categories":["0x10000000001","0x10000000002"],"models":["0x20000000001","0x20000000002"],"neverDrawn":["0x30000000001","0x30000000002"],"subCategoryOvr":[{"invisible":false,"subCategory":"0x40000000000"}],"clip":{"shapes":[{"points":[[1,-1,0],[2,-2,0]],"trans":[[-1,-2,0,3],[1,-1,0,0]],"zlow":-5,"zhigh":5}],"planes":[{"clips":[[{"normal":[0,0,-1],"dist":1},{"normal":[0,-1,0],"dist":1}]]}]},"viewMode":"FilterContent"}`
    );
  });

  // TODO: remove skip when parseSavedView is fixed
  it.skip("parseLegacySavedView and parseSavedView should returns same transform parameters", () => {
    const fileNames = readdirSync(KnownTestLocations.assetsDir).filter((fileName) => fileName.startsWith("savedView"));
    for (const fileName of fileNames) {
      const savedViewJSON = readFileSync(path.join(KnownTestLocations.assetsDir, fileName), "utf8");
      const savedView: SavedView = JSON.parse(savedViewJSON).savedView;

      const transformParametersLegacy = parseLegacySavedView(savedView.savedViewData.legacyView, ViewModes.IncludeNewContent);
      const transformParameters = parseSavedView(savedView, ViewModes.IncludeNewContent);

      console.log(transformParametersLegacy.neverDrawn);
      console.log(transformParameters.neverDrawn);
      console.log("aaaaaaaaaa");
      expect(transformParametersLegacy).to.deep.equal(transformParameters);
    }
  });

  const createTestTransformParameters = (): TransformParameters => {
    return {
      categories: ["0x10000000001", "0x10000000002"],
      models: ["0x20000000001", "0x20000000002"],
      neverDrawn: ["0x30000000001", "0x30000000002"],
      subCategoryOvr: [{ invisible: false, subCategory: "0x40000000000" }],
      clip: {
        shapes: [
          {
            points: [
              [1, -1, 0],
              [2, -2, 0],
            ],
            trans: [
              [-1, -2, 0, 3],
              [1, -1, 0, 0],
            ],
            zlow: -5,
            zhigh: 5,
          },
        ],
        planes: [
          {
            clips: [
              [
                { normal: [0, 0, -1], dist: 1 },
                { normal: [0, -1, 0], dist: 1 },
              ],
            ],
          },
        ],
      },
      viewMode: ViewModes.FilterContent,
    };
  };

  const createTestViewDefinition = () => {
    return {
      categorySelectorProps: { categories: ["0x10000000001", "0x10000000002"] },
      modelSelectorProps: { models: ["0x20000000001", "0x20000000002"] },
      emphasizeElementsProps: { neverDrawn: ["0x30000000001", "0x30000000002"] },
      displayStyleProps: {
        jsonProperties: {
          styles: { subCategoryOvr: [{ invisible: false, subCategory: "0x40000000000" }] },
        },
      },
      viewDefinitionProps: {
        jsonProperties: {
          viewDetails: {
            clip: [
              {
                shape: {
                  points: [
                    [1, -1, 0],
                    [2, -2, 0],
                  ],
                  trans: [
                    [-1, -2, 0, 3],
                    [1, -1, 0, 0],
                  ],
                  zlow: -5,
                  zhigh: 5,
                },
              },
              {
                planes: {
                  clips: [
                    [
                      { normal: [0, 0, -1], dist: 1 },
                      { normal: [0, -1, 0], dist: 1 },
                    ],
                  ],
                },
              },
            ],
          },
        },
      },
      perModelCategoryVisibility: [
        {
          modelId: "0x20000000000",
          categoryId: "0x20000000000",
          visible: true,
        },
      ],
    };
  };
});
