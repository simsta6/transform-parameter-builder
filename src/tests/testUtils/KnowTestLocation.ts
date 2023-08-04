import * as path from "path";

export class KnownTestLocations {

  /** The directory where test assets are stored. */
  public static get assetsDir(): string {
    return path.join(__dirname, "../assets");
  }
}
