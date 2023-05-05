# Transform parameters builder for FilterByViewDefinition transformation

This is a tool to get transformation parameters for the [FilterByViewDefinition](https://developer.bentley.com/apis/transformations/operations/filterbyviewdefinition/) transformation.
There are multiple ways to get a saved view object that is used to construct transformation parameters. Make sure the object has these properties (NOTE: real data will contain more information):

```json
{
    "properties": {
        "categorySelectorProps": {
            "categories": ["0x20000000024", "0x3000000002e", "0x30000000065", "0x3000000006b", "0x40000000013", "0x4000000001b", "0x40000000023", "0x20000000011"]
        },
        "modelSelectorProps": {
            "models": ["0x1", "0x10", "0x20000000002", "0x20000000005", "0x20000000010", "0x20000000028", "0x40000000009", "0x30000000020"]
        },
        "displayStyleProps": {
            "jsonProperties": {
                "styles": {
                    "subCategoryOvr": [{
                        "invisible": false,
                        "subCategory": "0x20000000012"
                    }, {
                        "invisible": true,
                        "subCategory": "0x30000000026"
                    }, {
                        "invisible": true,
                        "subCategory": "0x30000000069"
                    }, {
                        "invisible": true,
                        "subCategory": "0x30000000029"
                    }]
                }
            }
        },
        "viewDefinitionProps": {
            "jsonProperties": {
                "viewDetails": {
                    "clip": [{
                        "shape": {
                            "points": [
                                [-2.9596674999999997, -10.908823015741232, 0],
                                [6.384667499999999, -10.908823015741232, 0],
                                [6.384667499999999, -6.650518162899094, 0],
                                [-2.9596674999999997, -6.650518162899094, 0],
                                [-2.9596674999999997, -10.908823015741232, 0]
                            ],
                            "trans": [
                                [-1, -1.2246467991473532E-16, 0, 7.38],
                                [1.2246467991473532E-16, -1, 0, 0.281245448872],
                                [0, 0, 1, 0.1]
                            ],
                            "zlow": -5.28203496441487,
                            "zhigh": 5.000601003367825
                        }
                    },{
                        "planes": {
                            "clips": [
                                [{
                                    "normal": [0, 0, -1],
                                    "dist": 1.0011145316459724
                                }, {
                                    "normal": [0, -1, 0],
                                    "dist": -8.740126900566516
                                }]
                            ]
                        }
                    }]
                }
            }
        },
         "emphasizeElementsProps": {
            "neverDrawn": ["0x40000000011", "0x3000000004c", "0x3000000004d", "0x3000000004e", "0x3000000004f", "0x30000000050", "0x30000000051", "0x30000000052", "0x30000000053", "0x3000000004b"]
        }
    }
}

```

## Setup

1. Run `npm ci`.
1. Run `npm run build`.

## Usage

1. Paste a saved view json into  `savedView.json` file.
1. Run:
    - `npm run start`
    - `npm run start -- escape`  to get parameters with escaped quotation marks.
    - `npm run start -- includeNewContent` to set viewMode to IncludeNewContent extract hiddenCategories and hiddenModels.
1. Result will be available in console and in transformParameters.json file.
