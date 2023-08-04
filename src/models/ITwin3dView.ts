import { Id64Array, Id64String } from "@itwin/core-bentley";
import { NewClipPrimitivePlaneProps, NewClipPrimitiveShapeProps } from "./ClipVectors";

export interface ViewVisibilityList {
  enabled?: Id64Array;
  disabled?: Id64Array;
}

export interface SubCategoryOverrideData {
  invisible: boolean;
  subCategory: Id64String;
}

export interface DisplayStyle {
  subCategoryOverrides: SubCategoryOverrideData[];
}

export interface ITwin3dView {
  categories?: ViewVisibilityList;
  models?: ViewVisibilityList;
  clipVectors?: Array<NewClipPrimitivePlaneProps | NewClipPrimitiveShapeProps>;
  displayStyle?: DisplayStyle;
}
