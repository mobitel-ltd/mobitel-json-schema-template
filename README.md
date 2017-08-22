# Mobitel JSON-Schema template
A small helper for generating a JSON schema elements.

> What is JSON schema? Look [here](http://json-schema.org/) and [here](https://spacetelescope.github.io/understanding-json-schema/) 

## <a name="navigation">Navigation</a>

* [Install](#install)
* [Example](#example)
* [API](#api)
    * [Initializing](#initializing)
    * [.allOf()](#jst-allof)
    * [.anyOf()](#jst-anyof)
    * [.boolean()](#jst-boolean)
    * [.enum()](#jst-enum)
    * [.not()](#jst-not)
    * [.null()](#jst-null)
    * [.oneOf()](#jst-oneof)
    * [.ref()](#jst-ref)
    * [.stringFormat()](#jst-string-format)
    * [.array()](#jst-array)
        * [.array().additional()](#jst-array-additional)
        * [.array().items()](#jst-array-items)
        * [.array().max()](#jst-array-max)
        * [.array().min()](#jst-array-min)
        * [.array().unique()](#jst-array-unique)
    * [.integer()](#jst-integer)
        * [.integer().allOf()](#jst-integer-allof)
        * [.integer().anyOf()](#jst-integer-anyof)
        * [.integer().eMax()](#jst-integer-emax)
        * [.integer().eMin()](#jst-integer-emin)
        * [.integer().enum()](#jst-integer-enum)
        * [.integer().max()](#jst-integer-max)
        * [.integer().min()](#jst-integer-min)
        * [.integer().multipleOf()](#jst-integer-multipleof)
        * [.integer().not()](#jst-integer-not)
        * [.integer().oneOf()](#jst-integer-oneof)
        * [.integer().done()](#jst-integer-done)
    * [.number()](#jst-number)
        * [.number().allOf()](#jst-number-allof)
        * [.number().anyOf()](#jst-number-anyof)
        * [.number().eMax()](#jst-number-emax)
        * [.number().eMin()](#jst-number-emin)
        * [.number().enum()](#jst-number-enum)
        * [.number().max()](#jst-number-max)
        * [.number().min()](#jst-number-min)
        * [.number().multipleOf()](#jst-number-multipleof)
        * [.number().not()](#jst-number-not)
        * [.number().oneOf()](#jst-number-oneof)
        * [.number().done()](#jst-number-done)
    * [.string()](#jst-string)
        * [.string().allOf()](#jst-string-allof)
        * [.string().anyOf()](#jst-string-anyof)
        * [.string().enum()](#jst-string-enum)
        * [.string().max()](#jst-string-max)
        * [.string().min()](#jst-string-min)
        * [.string().not()](#jst-string-not)
        * [.string().oneOf()](#jst-string-oneof)
        * [.string().pattern()](#jst-string-pattern)
        * [.string().done()](#jst-string-done)
* [Testing](#testing)
* [License](#license)

## <a name="install">Install</a>

    npm i --save mobitel-json-schema-template

## <a name="example">Example</a>

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
[<p align="right">up to navigation</p>](#navigation)

## <a name="api">API</a>

### <a name="initializing">Initializing</a>

```javascript
const jst = require('mobitel-json-schema-template');
```
Returns object for generating a JSON schema elements.
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-allof">.allOf(arg[, arg2[, arg3]...])</a>
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

### <a name="jst-anyof">.anyOf(arg[, arg2[, arg3]...])</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-boolean">.boolean([arg])</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-enum">.enum(arg[, arg2[, arg3]...])</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-not">.not(arg)</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-null">.null()</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-oneof">.oneOf(arg[, arg2[, arg3]...])</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-ref">.ref(arg)</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-string-format">.stringFormat(arg)</a>
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
[<p align="right">up to navigation</p>](#navigation)

### <a name="jst-array">.array()</a>
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
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-array-additional">.array().additional(arg)</a>
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
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-array-items">.array().items(arg[, arg2[, arg3]...])</a>
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
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-array-max">.array().max(arg)</a>
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
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-array-min">.array().min(arg)</a>
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
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-array-unique">.array().unique()</a>
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
[<p align="right">up to navigation</p>](#navigation)


### <a name="jst-integer">.integer()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-allof">.integer().allOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-anyof">.integer().anyOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-emax">.integer().eMax()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-emin">.integer().eMin()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-enum">.integer().enum()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-max">.integer().max()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-min">.integer().min()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-multipleof">.integer().multipleOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-not">.integer().not()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-oneof">.integer().oneOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-integer-done">.integer().done()</a>
[<p align="right">up to navigation</p>](#navigation)


### <a name="jst-number">.number()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-allof">.number().allOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-anyof">.number().anyOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-emax">.number().eMax()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-emin">.number().eMin()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-enum">.number().enum()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-max">.number().max()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-min">.number().min()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-multipleof">.number().multipleOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-not">.number().not()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-oneof">.number().oneOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-number-done">.number().done()</a>
[<p align="right">up to navigation</p>](#navigation)


### <a name="jst-string">.string()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-allof">.string().allOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-anyof">.string().anyOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-enum">.string().enum()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-max">.string().max()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-min">.string().min()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-not">.string().not()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-oneof">.string().oneOf()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-pattern">.string().pattern()</a>
[<p align="right">up to navigation</p>](#navigation)

#### <a name="jst-string-done">.string().done()</a>
[<p align="right">up to navigation</p>](#navigation)


## <a name="testing">Testing</a>

    npm run test
[<p align="right">up to navigation</p>](#navigation)


## <a name="license">License</a>
MIT License  
Copyright (c) 2017 Mobitel Ltd
[<p align="right">up to navigation</p>](#navigation)

