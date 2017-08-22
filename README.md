# Mobitel JSON-Schema template
A small helper for generating a JSON schema elements.

## <a name="navigation"></a>Navigation



## <a name="install"></a>Install

    npm i --save mobitel-json-schema-template

## <a name="example"></a>Example

**Writing JSON-schema**
```javascript
const jst = require('mobitel-json-schema-template');

module.exports = {
    id: 'exampleSchema',
    type: 'object',
    additionalProperties: false,
    required: [
        'propArray',
        'propInteger',
        'propNumber',
        'propString',
        'propEnum',
        'propNull',
        'propBoolean',
        'propStringFormat',
        'propAnyOf',
        'propAllOf',
        'propOneOf',
        'propNot',
        'propRef',
    ],
    properties: {
        propArray: jst.array()
            .additional(false)
            .items(
                [
                    {type: 'object'},
                    jst.boolean(),
                ]
            )
            .done(),
        propInteger: jst.integer().min(10).max(100)
            .eMax()
            .done(),
        propNumber: jst.number().enum([1, 3, 5, 7, 9]).done(),
        propString: jst.string().pattern(/^\w+$/).done(),
        propEnum: jst.enum('viva', 'vita'),
        propNull: jst.null(),
        propBoolean: jst.boolean(false),
        propStringFormat: jst.stringFormat('hostname'),
        propAnyOf: jst.anyOf([
            jst.string().done(),
            jst.integer().done(),
        ]),
        propAllOf: jst.allOf([
            jst.string().done(),
            jst.string().max(10).done(),
        ]),
        propOneOf: jst.oneOf([
            jst.string().done(),
            jst.integer().done(),
        ]),
        propNot: jst.not(jst.null()),
        propRef: jst.ref('#/definitions/refExample'),
    },
    definitions: {
        refExample: {
            type: 'object',
            required: [
                'asString',
                'asNumber',
                'asNull',
            ],
            properties: {
                asString: jst.string().min(1).done(),
                asNumber: jst.number().min(1).done(),
                asNull: jst.null(),
            },
        },
    },
};
```

**Result**
```json
{
  "id": "exampleSchema",
  "type": "object",
  "additionalProperties": false,
  "required": [
    "propArray",
    "propInteger",
    "propNumber",
    "propString",
    "propEnum",
    "propNull",
    "propBoolean",
    "propStringFormat",
    "propAnyOf",
    "propAllOf",
    "propOneOf",
    "propNot",
    "propRef"
  ],
  "properties": {
    "propArray": {
      "type": "array",
      "additionalItems": false,
      "items": [
        {"type": "object"},
        {"type": "boolean"}
      ]
    },
    "propInteger": {
      "type":"integer",
      "minimum": 10,
      "maximum": 100,
      "exclusiveMaximum": true
    },
    "propNumber": {
      "type": "number",
      "enum": [1, 3, 5, 7, 9]
    },
    "propString": {
      "type": "string",
      "pattern": "/^\\w+$/"
    },
    "propEnum": {
      "enum": ["viva", "vita"]
    },
    "propNull": {
      "type": "null"
    },
    "propBoolean": {
      "type": "boolean",
      "enum": [false]
    },
    "propStringFormat": {
      "type": "string",
      "format": "hostname"
    },
    "propAnyOf": {
      "anyOf": [
        {"type": "string"},
        {"type": "integer"}
      ]
    },
    "propAllOf": {
      "allOf": [
        {"type": "string"},
        {
          "type": "string",
          "maxLength": 10
        }
      ]
    },
    "propOneOf": {
      "oneOf": [
        {"type": "string"},
        {"type": "integer"}
      ]
    },
    "propNot": {
      "not": {"type": "null"}
    },
    "propRef": {
    "$ref": "#/definitions/refExample"
    }
  },
  "definitions":{
    "refExample": {
      "type": "object",
      "required": [
        "asString",
        "asNumber",
        "asNull"
      ],
      "properties": {
        "asString": {
          "type": "string",
          "minLength": 1
        },
        "asNumber": {
          "type": "number",
          "minimum": 1
        },
        "asNull": {"type": "null"}
      }
    }
  }
}
```

## <a name="api"></a>API

### <a name="initializing"></a>Initializing

```javascript
const jst = require('mobitel-json-schema-template');
```
Returns object for generating a JSON schema elements.

### <a name="jst-allof"></a>.allOf()
**Arguments** - `Object[]|Object`  
Can accept mix of `Object[]` and `Object`

**Example**
```javascript
jst.allOf(
    [
        {type: "string", maxLength: 5 },
        {type: "number", minimum: 0}
    ]
);
```

**Result**
```json
{
  "anyOf": [
    { "type": "string", "maxLength": 5 },
    { "type": "number", "minimum": 0 }
  ]
}
```

### <a name=""></a>.anyOf()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```

### <a name=""></a>.boolean()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```

### <a name=""></a>.enum()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```

### <a name=""></a>.not()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```

### <a name=""></a>.null()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```

### <a name=""></a>.oneOf()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```

### <a name=""></a>.ref()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```

### <a name=""></a>.stringFormat()
**Arguments**


**Example**
```javascript
jst.
```

**Result**
```json
{
  
}
```


### <a name=""></a>.array()
#### <a name=""></a>.array().additional()
#### <a name=""></a>.array().items()
#### <a name=""></a>.array().max()
#### <a name=""></a>.array().min()
#### <a name=""></a>.array().unique()

### <a name=""></a>.integer()
#### <a name=""></a>.integer().max()
#### <a name=""></a>.integer().min()
#### <a name=""></a>.integer().eMax()
#### <a name=""></a>.integer().eMin()
#### <a name=""></a>.integer().eMin()
#### <a name=""></a>.integer().multipleOf()
#### <a name=""></a>.integer().enum()
#### <a name=""></a>.integer().allOf()
#### <a name=""></a>.integer().anyOf()
#### <a name=""></a>.integer().oneOf()
#### <a name=""></a>.integer().not()
#### <a name=""></a>.integer().done()

### <a name=""></a>.number()
#### <a name=""></a>.number().max()
#### <a name=""></a>.number().min()
#### <a name=""></a>.number().eMax()
#### <a name=""></a>.number().eMin()
#### <a name=""></a>.number().multipleOf()
#### <a name=""></a>.number().enum()
#### <a name=""></a>.number().allOf()
#### <a name=""></a>.number().anyOf()
#### <a name=""></a>.number().oneOf()
#### <a name=""></a>.number().not()
#### <a name=""></a>.number().done()

### <a name=""></a>.string()
#### <a name=""></a>.string().min()
#### <a name=""></a>.string().max()
#### <a name=""></a>.string().pattern()
#### <a name=""></a>.string().enum()
#### <a name=""></a>.string().allOf()
#### <a name=""></a>.string().anyOf()
#### <a name=""></a>.string().not()
#### <a name=""></a>.string().oneOf()
#### <a name=""></a>.string().done()

## <a name=""></a>Testing

    npm run test

## <a name=""></a>License
MIT License  
Copyright (c) 2017 Mobitel Ltd
