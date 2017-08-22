# Mobitel JSON-Schema template
A small helper for generating a JSON schema elements.

> What is JSON schema? Look [here](http://json-schema.org/) and [here](https://spacetelescope.github.io/understanding-json-schema/) 

## <a name="navigation"></a>Navigation

* [Install](install)
* [Example](example)
* [API](api)
    * [Initializing](initializing)
    * [.allOf()](jst-allof)
    * [.anyOf()](jst-anyof)
    * [.boolean()](jst-boolean)
    * [.enum()](jst-enum)
    * [.not()](jst-not)
    * [.null()](jst-null)
    * [.oneOf()](jst-oneof)
    * [.ref()](jst-ref)
    * [.stringFormat()](jst-string-format)
    * [.array()](jst-array)
        * [.array().additional()](jst-array-additional)
        * [.array().items()](jst-array-items)
        * [.array().max()](jst-array-max)
        * [.array().min()](jst-array-min)
        * [.array().unique()](jst-array-unique)
    * [.integer()](jst-integer)
        * [.integer().allOf()](jst-integer-allof)
        * [.integer().anyOf()](jst-integer-anyof)
        * [.integer().eMax()](jst-integer-emax)
        * [.integer().eMin()](jst-integer-emin)
        * [.integer().enum()](jst-integer-enum)
        * [.integer().max()](jst-integer-max)
        * [.integer().min()](jst-integer-min)
        * [.integer().multipleOf()](jst-integer-multipleof)
        * [.integer().not()](jst-integer-not)
        * [.integer().oneOf()](jst-integer-oneof)
        * [.integer().done()](jst-integer-done)
    * [.number()](jst-number)
        * [.number().allOf()](jst-number-allof)
        * [.number().anyOf()](jst-number-anyof)
        * [.number().eMax()](jst-number-emax)
        * [.number().eMin()](jst-number-emin)
        * [.number().enum()](jst-number-enum)
        * [.number().max()](jst-number-max)
        * [.number().min()](jst-number-min)
        * [.number().multipleOf()](jst-number-multipleof)
        * [.number().not()](jst-number-not)
        * [.number().oneOf()](jst-number-oneof)
        * [.number().done()](jst-number-done)
    * [.string()](jst-string)
        * [.string().allOf()](jst-string-allof)
        * [.string().anyOf()](jst-string-anyof)
        * [.string().enum()](jst-string-enum)
        * [.string().max()](jst-string-max)
        * [.string().min()](jst-string-min)
        * [.string().not()](jst-string-not)
        * [.string().oneOf()](jst-string-oneof)
        * [.string().pattern()](jst-string-pattern)
        * [.string().done()](jst-string-done)
* [Testing](testing)
* [License](license)

## <a name="install"></a>Install

    npm i --save mobitel-json-schema-template

## <a name="example"></a>Example

Writing JSON-schema
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

Result
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

### <a name="jst-allof"></a>.allOf(arg[, arg2[, arg3]...])
Arguments - `Object[]|Object`  
Can accept mix of `Object[]` and `Object`

Example
```javascript
jst.allOf(
    [
        { type: 'string' },
        { maxLength: 5 }
    ]
);
```

Result
```json
{
  "allOf": [
    { "type": "string" },
    { "maxLength": 5 }
  ]
}
```
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-anyof"></a>.anyOf(arg[, arg2[, arg3]...])
Arguments - `Object[]|Object`  
Can accept mix of `Object[]` and `Object`

Example
```javascript
jst.anyOf(
    [
        {type: 'string'},
        jst.number().done()
    ]
);
```

Result
```json
{
  "anyOf": [
    { "type": "string" },
    { "type": "number" }
  ]
}
```

### <a name="jst-boolean"></a>.boolean([arg])
Arguments - `Boolean` or `'all'` (default)

**Example Boolean**
```javascript
jst.boolean(true);
```

**Result Boolean**
```json
{
  "type": "boolean",
  "enum": [true]
}
```

**Example `'all'`**
```javascript
jst.boolean();
```

**Result `'all'`**
```json
{
  "type": "boolean"
}
```

### <a name="jst-enum"></a>.enum(arg[, arg2[, arg3]...])
Arguments - `Array|*`  
Can accept mix of `Array` and `*`

Example
```javascript
jst.enum(['one', 'two', 'three']);
```

Result
```json
{
  "enum": [
    "one",
    "two",
    "three"
  ]
}
```

### <a name="jst-not"></a>.not(arg)
Arguments - `Object`

Example
```javascript
jst.not({type: 'string'})
```

Result
```json
{
  "not": {"type": "string"}
}
```

### <a name="jst-null"></a>.null()
Arguments - no

Example
```javascript
jst.null();
```

Result
```json
{
  "type": "null"
}
```

### <a name="jst-oneof"></a>.oneOf(arg[, arg2[, arg3]...])
Arguments - `Object[]|Object`  
Can accept mix of `Object[]` and `Object`

Example
```javascript
jst.oneOf(
    [
        { type: 'number', multipleOf: 5 },
        jst.number().multipleOf(3)
    ]
);
```

Result
```json
{
  "oneOf": [
    { "type": "number", "multipleOf": 5 },
    { "type": "number", "multipleOf": 3 }
  ]
}
```

### <a name="jst-ref"></a>.ref(arg)
Arguments - `String`

Example
```javascript
jst.ref('#/definitions/subschema');
```

Result
```json
{
  "$ref": "#/definitions/address"
}
```

### <a name="jst-string-format"></a>.stringFormat(arg)
Arguments - `String`  
Argument must be values like: 
* date-time
* email
* hostname
* ipv4
* ipv6
* uri

Example
```javascript
jst.stringFormat('hostname');
```

Result
```json
{
  "type": "string",
  "format": "hostname"
}
```



### <a name="jst-array"></a>.array()
Arguments - no  

Example
```javascript
jst.array().done();
```

Result
```json
{
  "type": "array"
}
```

#### <a name="jst-array-additional"></a>.array().additional(arg)
Arguments - `Boolean`  

Example
```javascript
jst.array().additional(true).done();
```

Result
```json
{
  "type": "array",
  "additionalItems": true
}
```

#### <a name="jst-array-items"></a>.array().items(arg[, arg2[, arg3]...])
Arguments - `Object[]|Object`  
Can accept mix of `Object[]` and `Object`

Example
```javascript
jst.array().items(
    [
        {type: 'string'},
        jst.number().done()
    ]
).done();
```

Result
```json
{
  "type": "array",
  "items": [
    {"type": "string"},
    {"type": "number"}
  ]
}
```

#### <a name="jst-array-max"></a>.array().max(arg)
Arguments - positive `Number`  

Example
```javascript
jst.array().max(10).done();
```

Result
```json
{
  "type": "array",
  "maxItems": 10
}
```

#### <a name="jst-array-min"></a>.array().min(arg)
Arguments - positive `Number`  

Example
```javascript
jst.array().min(1).done();
```

Result
```json
{
  "type": "array",
  "minItems": 1
}
```

#### <a name="jst-array-unique"></a>.array().unique()
Arguments - no  

Example
```javascript
jst.array().unique().done();
```

Result
```json
{
  "type": "array",
  "uniqueItems": true
}
```


### <a name="jst-integer"></a>.integer()
#### <a name="jst-integer-allof"></a>.integer().allOf()
#### <a name="jst-integer-anyof"></a>.integer().anyOf()
#### <a name="jst-integer-emax"></a>.integer().eMax()
#### <a name="jst-integer-emin"></a>.integer().eMin()
#### <a name="jst-integer-enum"></a>.integer().enum()
#### <a name="jst-integer-max"></a>.integer().max()
#### <a name="jst-integer-min"></a>.integer().min()
#### <a name="jst-integer-multipleof"></a>.integer().multipleOf()
#### <a name="jst-integer-not"></a>.integer().not()
#### <a name="jst-integer-oneof"></a>.integer().oneOf()
#### <a name="jst-integer-done"></a>.integer().done()

### <a name="jst-number"></a>.number()
#### <a name="jst-number-allof"></a>.number().allOf()
#### <a name="jst-number-anyof"></a>.number().anyOf()
#### <a name="jst-number-emax"></a>.number().eMax()
#### <a name="jst-number-emin"></a>.number().eMin()
#### <a name="jst-number-enum"></a>.number().enum()
#### <a name="jst-number-max"></a>.number().max()
#### <a name="jst-number-min"></a>.number().min()
#### <a name="jst-number-multipleof"></a>.number().multipleOf()
#### <a name="jst-number-not"></a>.number().not()
#### <a name="jst-number-oneof"></a>.number().oneOf()
#### <a name="jst-number-done"></a>.number().done()

### <a name="jst-string"></a>.string()
#### <a name="jst-string-allof"></a>.string().allOf()
#### <a name="jst-string-anyof"></a>.string().anyOf()
#### <a name="jst-string-enum"></a>.string().enum()
#### <a name="jst-string-max"></a>.string().max()
#### <a name="jst-string-min"></a>.string().min()
#### <a name="jst-string-not"></a>.string().not()
#### <a name="jst-string-oneof"></a>.string().oneOf()
#### <a name="jst-string-pattern"></a>.string().pattern()
#### <a name="jst-string-done"></a>.string().done()

## <a name="testing"></a>Testing

    npm run test

## <a name="license"></a>License
MIT License  
Copyright (c) 2017 Mobitel Ltd
