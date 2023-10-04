import { ClipPrimitivePlanesProps, ClipPrimitiveShapeProps, ClipVectorProps } from "@itwin/core-geometry";
import { ClipData, LegacyView, PerModelCategoryData, PlaneProps, ShapeProps } from "./models/LegacyView";
import { TransformParameters, ViewModes } from "./models/FilterByViewDefinition";
import { Id64, Id64Array, Id64String, CompressedId64Set, Id64Set } from "@itwin/core-bentley";
import { SubCategoryOverrideData } from "./models/ITwin3dView";
import { SavedView } from "./models/SavedView";
import { NewClipPrimitivePlaneProps, NewClipPrimitiveShapeProps } from "./models/ClipVectors";

export function parseSavedView(savedView: SavedView, viewMode: ViewModes): TransformParameters {
  // TODO: add a way to handle alwaysDrawn parameter
  return {
    categories: savedView.savedViewData.itwin3dView.categories?.enabled ?? [],
    models: savedView.savedViewData.itwin3dView.models?.enabled || [],
    neverDrawn: getExtensionValue<Id64Array>(savedView.extensions, "emphasizeElementsProps"),
    subCategoryOvr: savedView.savedViewData.itwin3dView.displayStyle?.subCategoryOverrides,
    clip: tryGetClipData(savedView.savedViewData.itwin3dView.clipVectors),
    perModelCategoryVisibility: getExtensionValue<PerModelCategoryData[]>(savedView.extensions, "perModelCategoryVisibilityProps") ?? [],
    hiddenCategories: savedView.savedViewData.itwin3dView.categories?.disabled,
    hiddenModels: savedView.savedViewData.itwin3dView.models?.disabled,
    viewMode,
  };
}

export function parseLegacySavedView(legacyViewDefinition: LegacyView, viewMode: ViewModes): TransformParameters {
  return {
    categories: legacyViewDefinition.categorySelectorProps.categories,
    models: legacyViewDefinition.modelSelectorProps?.models || [],
    neverDrawn: legacyViewDefinition.emphasizeElementsProps?.neverDrawn,
    alwaysDrawn: legacyViewDefinition.emphasizeElementsProps?.alwaysDrawn,
    subCategoryOvr: legacyViewDefinition.displayStyleProps.jsonProperties?.styles?.subCategoryOvr as SubCategoryOverrideData[],
    clip: tryGetClipDataForLegacyView(legacyViewDefinition.viewDefinitionProps.jsonProperties?.viewDetails?.clip),
    perModelCategoryVisibility: legacyViewDefinition.perModelCategoryVisibility,
    hiddenCategories: legacyViewDefinition.hiddenCategories,
    hiddenModels: legacyViewDefinition.hiddenModels,
    viewMode,
  };
}

function getExcludedElementSet(view: LegacyView): Id64Set {
  const excludedElements = view.displayStyleProps.jsonProperties?.styles?.excludedElements;
  if (excludedElements === undefined)
    return new Set<Id64String>();
  if (typeof excludedElements === "string")
    return CompressedId64Set.decompressSet(excludedElements);

  return new Set<Id64String>(excludedElements);
}

export function parseOpenCitiesSavedView(legacyViewDefinition: LegacyView): TransformParameters {
  const transparentElements = legacyViewDefinition.emphasizeElementsProps?.appearanceOverride?.map((a) => a.ids ?? []).flat() ?? [];
  const excludedElementSet = getExcludedElementSet(legacyViewDefinition);
  const alwaysDrawnElements: Id64Array = [];
  transparentElements.forEach((element) => {
    if (!excludedElementSet.has(element))
      alwaysDrawnElements.push(element);
  });

  return {
    categories: [],
    models: legacyViewDefinition.modelSelectorProps?.models || [],
    neverDrawn: legacyViewDefinition.emphasizeElementsProps?.neverDrawn,
    alwaysDrawn: alwaysDrawnElements,
    subCategoryOvr: legacyViewDefinition.displayStyleProps.jsonProperties?.styles?.subCategoryOvr as SubCategoryOverrideData[],
    clip: tryGetClipDataForLegacyView(legacyViewDefinition.viewDefinitionProps.jsonProperties?.viewDetails?.clip),
    perModelCategoryVisibility: legacyViewDefinition.perModelCategoryVisibility,
    viewMode: ViewModes.FilterContent,
  };
}

function getExtensionValue<R>(extensions: { extensionName: string, data: string }[], extensionName: string): R | undefined {
  const data = extensions.find((x: { extensionName: string }) => x.extensionName === extensionName)?.data;

  return data ? JSON.parse(data) : undefined;
}

export function parseTransformParametersToJson(transformParameters: TransformParameters, includeEscapeCharacters?: boolean): string {
  const params = JSON.stringify(transformParameters);
  if (!includeEscapeCharacters)
    return params;

  return params.replace(/"/g, '\\"');
}

function tryGetClipDataForLegacyView(clipVectors: ClipVectorProps | undefined): ClipData | undefined {
  if (!clipVectors || !clipVectors.length)
    return undefined;

  const clipPlanes: PlaneProps[] = clipVectors
    .filter((primitive) => isPlanePrimitive(primitive))
    .map((primitive) => (primitive as ClipPrimitivePlanesProps).planes! as PlaneProps);

  const clipShapes: ShapeProps[] = clipVectors
    .filter((primitive) => isShapePrimitive(primitive))
    .map((primitive) => (primitive as ClipPrimitiveShapeProps).shape! as ShapeProps);

  return {
    shapes: clipShapes.length > 0 ? clipShapes : undefined,
    planes: clipPlanes.length > 0 ? clipPlanes : undefined,
  };
}

function tryGetClipData(_clipVectors: Array<NewClipPrimitivePlaneProps | NewClipPrimitiveShapeProps> | undefined): ClipData | undefined {
  // TODO: fix
  // if (!clipVectors || !clipVectors.length)
  //   return undefined;

  // const clipPlanes = clipVectors
  //   .map((primitive) => isNewPlanePrimitive(primitive) && changeDistanceToDistForClips(primitive.planes))
  //   .filter((primitive) => isNewPlanePrimitive(primitive));

  // const clipShapes = clipVectors
  //   .filter((primitive) => isNewShapePrimitive(primitive))
  //   .map((primitive) => (primitive as NewClipPrimitiveShapeProps).shape as unknown as ShapeProps);

  // return {
  //   shapes: clipShapes.length > 0 ? clipShapes : undefined,
  //   planes: clipPlanes.length > 0 ? clipPlanes : undefined,
  // };
  return;
}

function isPlanePrimitive(primitive: any): primitive is ClipPrimitivePlanesProps {
  return "planes" in primitive;
}

function isShapePrimitive(primitive: any): primitive is ClipPrimitiveShapeProps {
  return "shape" in primitive;
}
