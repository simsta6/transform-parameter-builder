import { Id64Array, Id64String } from "@itwin/core-bentley";
import { NewClipPrimitivePlaneProps, NewClipPrimitiveShapeProps } from "./ClipVectors";

export interface ViewVisibilityList {
  enabled?: Id64Array | string;
  disabled?: Id64Array | string;
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
