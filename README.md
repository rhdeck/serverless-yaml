
<a name="readmemd"></a>

# serverless-yaml

Utility for extending serverless yml based on common components from dependencies.

## Usage

Create files that are useful in a "serverless" subdirectory in a dependency or in the top level package with names that point to the path within the serverless object you want to update, like:

- `provider.environment.yml` - a map of environment variables to be added to provider.envrionment for common usage
- `Resources.mainRole.Properties.Policies.yml` - a list of policies to add to the the roles called mainRole.

Supports yaml encoding (detected by `.yml` or `.yaml` extension) and JSON (`.json`)


<a name="__climd"></a>

# Usage
```bash
npx @raydeck/serverless-yaml [options]
```
Update serverless yml based on partials in depedencies
# Options
* -y --yaml-file \<`path`> Serverless yml file to inspect (default: `./serverless.yml`)
* -o --output \<`path`> Output file (default is same as input serverless file) 
* -w --working-path \<`path`> Working path for node project (default: `.`)

<a name="_librarymd"></a>


# @raydeck/serverless-yaml - v1.2.0

## Index

### Functions

* [apply](#apply)
* [getAllDependencies](#getalldependencies)
* [inspectDependency](#inspectdependency)

## Functions

###  apply

▸ **apply**(`source`: object, `key`: string, `objOrArray`: object | any[]): *undefined | object*

*Defined in [index.ts:29](https://github.com/rhdeck/serverless-yaml/blob/c78ce01/src/index.ts#L29)*

**Parameters:**

Name | Type |
------ | ------ |
`source` | object |
`key` | string |
`objOrArray` | object &#124; any[] |

**Returns:** *undefined | object*

___

###  getAllDependencies

▸ **getAllDependencies**(`path`: string): *[string, string][]*

*Defined in [bin.ts:9](https://github.com/rhdeck/serverless-yaml/blob/c78ce01/src/bin.ts#L9)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`path` | string | process.cwd() |

**Returns:** *[string, string][]*

___

###  inspectDependency

▸ **inspectDependency**(`path`: string): *object*

*Defined in [index.ts:4](https://github.com/rhdeck/serverless-yaml/blob/c78ce01/src/index.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *object*

* **key**? : *undefined | string*

* **value**? : *any[] | object*
