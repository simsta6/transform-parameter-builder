import { Extension } from "./Extension";
import { ITwin3dView } from "./ITwin3dView";
import { LegacyView } from "./LegacyView";

export interface SavedView
{
  savedViewData: {
    itwin3dView: ITwin3dView;
    legacyView: LegacyView;
  };
  extensions: Extension[];
}
