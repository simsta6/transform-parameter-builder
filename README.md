# Transform parameters builder for FilterByViewDefinition transformation

This is a tool to get transformation parameters for the [FilterByViewDefinition](https://developer.bentley.com/apis/transformations/operations/filterbyviewdefinition/) transformation.
To get compatible saved views, use [Saves Views API](https://developer.bentley.com/apis/savedviews/operations/get-savedview/). Set the `Prefer` header to 'return=representation`.
Make sure the object has these properties (NOTE: real data will contain more information):

```json
{
    "savedView": {
        "id": "id",
        "shared": true,
        "savedViewData": {
            "itwin3dView": {
                "origin": [510084.88764693454, 6650787.234719286, -22.034522060553506],
                "extents": [109.77969621257716, 50.627195624788875, 54.88984810892244],
                "angles": {
                    "pitch": 67.25527133335302,
                    "roll": -44.57278162408132,
                    "yaw": -43.10946009114593
                },
                "camera": {
                    "lens": 90.00000000000539,
                    "focusDist": 54.88984810628343,
                    "eye": [510144.77487766906, 6650826.831049917, 17.555364627677914]
                },
                "categories": {
                    "enabled": ["0x2000000003c"]
                },
                "models": {
                    "enabled": ["0x1"]
                },
                "displayStyle": {
                    "viewflags": {
                        "renderMode": 6,
                        "noConstructions": true,
                        "clipVolume": true,
                        "backgroundMap": true
                    },
                    "environment": {
                        "ground": {
                            "display": false,
                            "elevation": -0.01,
                            "aboveColor": {
                                "red": 0,
                                "green": 100,
                                "blue": 0
                            },
                            "belowColor": {
                                "red": 101,
                                "green": 67,
                                "blue": 33
                            }
                        },
                        "sky": {
                            "display": true,
                            "twoColor": true,
                            "skyColor": {
                                "red": 222,
                                "green": 242,
                                "blue": 255
                            },
                            "groundColor": {
                                "red": 240,
                                "green": 236,
                                "blue": 232
                            },
                            "zenithColor": {
                                "red": 222,
                                "green": 242,
                                "blue": 255
                            },
                            "nadirColor": {
                                "red": 240,
                                "green": 236,
                                "blue": 232
                            }
                        }
                    }
                },
                "clipVectors": [{
                    "planes": {
                        "clips": [
                            [{
                                "normal": [0, 0, -1],
                                "distance": -10.220581603000625
                            }]
                        ]
                    }
                }]
            },
            "legacyView": {
                "is2d": false,
                "groupId": "-1",
                "name": "plane1",
                "shared": true,
                "categorySelectorProps": {
                    "classFullName": "BisCore:CategorySelector",
                    "code": {
                        "spec": "0x1",
                        "scope": "0x1",
                        "value": ""
                    },
                    "model": "0x10",
                    "categories": ["0x2000000003c"]
                },
                "modelSelectorProps": {
                    "classFullName": "BisCore:ModelSelector",
                    "code": {
                        "spec": "0x1",
                        "scope": "0x1",
                        "value": ""
                    },
                    "model": "0x10",
                    "models": ["0x1"]
                },
                "displayStyleProps": {
                    "classFullName": "BisCore:DisplayStyle",
                    "jsonProperties": {
                        "styles": {
                            "viewflags": {
                                "noConstruct": true,
                                "clipVol": true,
                                "backgroundMap": true,
                                "renderMode": 6
                            },
                            "environment": {
                                "sky": {
                                    "display": true,
                                    "twoColor": true,
                                    "groundColor": 15265008,
                                    "zenithColor": 16773854,
                                    "nadirColor": 15265008,
                                    "skyColor": 16773854
                                },
                                "ground": {
                                    "display": false,
                                    "elevation": -0.01,
                                    "aboveColor": 25600,
                                    "belowColor": 2179941
                                }
                            }
                        }
                    },
                    "code": {
                        "spec": "0x1",
                        "scope": "0x1",
                        "value": ""
                    },
                    "model": "0x10"
                },
                "viewDefinitionProps": {
                    "classFullName": "BisCore:SpatialViewDefinition",
                    "jsonProperties": {
                        "viewDetails": {
                            "clip": [{
                                "planes": {
                                    "clips": [
                                        [{
                                            "normal": [0, 0, -1],
                                            "dist": -10.220581603000625
                                        }]
                                    ]
                                }
                            }]
                        }
                    },
                    "code": {
                        "spec": "0x1",
                        "scope": "0x1",
                        "value": ""
                    },
                    "model": "0x10",
                    "categorySelectorId": "0",
                    "displayStyleId": "0",
                    "cameraOn": true,
                    "origin": [510084.88764693454, 6650787.234719286, -22.034522060553506],
                    "extents": [109.77969621257716, 50.627195624788875, 54.88984810892244],
                    "angles": {
                        "pitch": 67.25527133335302,
                        "roll": -44.57278162408132,
                        "yaw": -43.10946009114593
                    },
                    "camera": {
                        "lens": 90.00000000000539,
                        "focusDist": 54.88984810628343,
                        "eye": [510144.77487766906, 6650826.831049917, 17.555364627677914]
                    },
                    "modelSelectorId": "0"
                },
                "perModelCategoryVisibility": []
            }
        },
        "tags": [],
        "extensions": [{
            "extensionName": "PerModelCategoryVisibility",
            "markdownUrl": "https://www.bentley.com/",
            "schemaUrl": "https://www.bentley.com/",
            "data": "{\"perModelCategoryVisibilityProps\":[]}"
        }]
    }
}

```

## Setup

1. Run `npm ci`.
1. Run `npm run build`.

## Usage

1. Paste a saved view json object into  `savedView.json` file.
1. Run:
    - `npm run start`
    - `npm run start -- escape`  to get parameters with escaped quotation marks.
    - `npm run start -- includeNewContent` to set viewMode to IncludeNewContent extract hiddenCategories and hiddenModels.
1. Result will be available in console and in transformParameters.json file.
