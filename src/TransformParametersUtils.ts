import { ClipPrimitivePlanesProps, ClipPrimitiveShapeProps, ClipVectorProps } from "@itwin/core-geometry";
import { ClipData, PlaneProps, ShapeProps, SubCategoryOverrideData, ViewDefinition } from "./models/ViewDefinition";
import { TransformParameters, ViewModes } from "./models/FilterByViewDefinition";

/* TODO: in order to support new saved views format we will need to convert these properties (User needs to get response from saved views public API and use prefer header "return=representation"):
    properties.categorySelectorProps.categories => savedView.savedViewData.itwin3dView.categories
    properties.modelSelectorProps.models => savedView.savedViewData.models.enabled
    properties.emphasizeElementsProps.neverDrawn => JSON.parse(savedView.extensions.find(x => x.extensionName === "emphasizeElementsProps").data)
    properties.displayStyleProps.jsonProperties.styles.subCategoryOvr => savedView.savedViewData.displayStyle.subCategoryOverrides
    properties.viewDefinitionProps.jsonProperties.viewDetails.clip => savedView.savedViewData.clipVectors
    properties.perModelCategoryVisibility => JSON.parse(savedView.extensions.find(x => x.extensionName === "perModelCategoryVisibilityProps").data)
*/

export function parseLegacyViewDefinitionToTransformParameters(legacyViewDefinition: ViewDefinition, viewMode: ViewModes): TransformParameters {
  return {
    categories: legacyViewDefinition.categorySelectorProps.categories,
    models: legacyViewDefinition.modelSelectorProps?.models || [],
    neverDrawn: legacyViewDefinition.emphasizeElementsProps?.neverDrawn,
    subCategoryOvr: legacyViewDefinition.displayStyleProps.jsonProperties?.styles?.subCategoryOvr as SubCategoryOverrideData[],
    clip: tryGetClipData(legacyViewDefinition),
    perModelCategoryVisibility: legacyViewDefinition.perModelCategoryVisibility,
    hiddenCategories: legacyViewDefinition.hiddenCategories,
    hiddenModels: legacyViewDefinition.hiddenModels,
    viewMode,
  };
}

export function parseTransformParametersToJson(transformParameters: TransformParameters, includeEscapeCharacters?: boolean): string {
  const params = JSON.stringify(transformParameters);
  if (!includeEscapeCharacters)
    return params;

  return params.replace(/"/g, '\\"');
}

function tryGetClipData(view: any): ClipData | undefined {
  const clip: ClipVectorProps = view.viewDefinitionProps.jsonProperties?.viewDetails?.clip;

  if (!clip || !clip.length)
    return undefined;

  const clipPlanes: PlaneProps[] = clip
    .filter((primitive) => isPlanePrimitive(primitive))
    .map((primitive) => (primitive as ClipPrimitivePlanesProps).planes! as PlaneProps);

  const clipShapes: ShapeProps[] = clip
    .filter((primitive) => isShapePrimitive(primitive))
    .map((primitive) => (primitive as ClipPrimitiveShapeProps).shape! as ShapeProps);

  return {
    shapes: clipShapes.length > 0 ? clipShapes : undefined,
    planes: clipPlanes.length > 0 ? clipPlanes : undefined,
  };
}

function isPlanePrimitive(primitive: any): primitive is ClipPrimitivePlanesProps {
  return "planes" in primitive;
}

function isShapePrimitive(primitive: any): primitive is ClipPrimitiveShapeProps {
  return "shape" in primitive;
}
