import { Id64Array } from "@itwin/core-bentley";
import { ClipData, PerModelCategoryData, SubCategoryOverrideData } from "./ViewDefinition";

export enum ViewModes {
  IncludeNewContent = "IncludeNewContent",
  FilterContent = "FilterContent"
}

export interface TransformParameters {
  categories: Id64Array;
  hiddenCategories?: Id64Array;
  models: Id64Array;
  hiddenModels?: Id64Array;
  neverDrawn?: Id64Array;
  subCategoryOvr?: SubCategoryOverrideData[];
  clip?: ClipData;
  perModelCategoryVisibility?: PerModelCategoryData[];
  viewMode?: ViewModes;
}
