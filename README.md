
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

@raydeck/serverless-yaml - v1.2.0

# @raydeck/serverless-yaml - v1.2.0

## Table of contents

### Functions

- [apply](#apply)
- [inspectDependency](#inspectdependency)

## Functions

### apply

▸ **apply**(`source`: { [key: string]: *any*;  }, `key`: *string*, `objOrArray`: { [key: string]: *any*;  } \| *any*[]): *undefined* \| { [key: string]: *any*;  }

#### Parameters:

Name | Type |
------ | ------ |
`source` | { [key: string]: *any*;  } |
`key` | *string* |
`objOrArray` | { [key: string]: *any*;  } \| *any*[] |

**Returns:** *undefined* \| { [key: string]: *any*;  }

Defined in: [index.ts:47](https://github.com/rhdeck/serverless-yaml/blob/6439144/src/index.ts#L47)

___

### inspectDependency

▸ **inspectDependency**(`path`: *string*, `keys?`: *string*[]): *object*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`path` | *string* | - |
`keys` | *string*[] | ... |

**Returns:** *object*

Name | Type |
------ | ------ |
`key?` | *undefined* \| *string* |
`value?` | *undefined* \| *any*[] \| { [key: string]: *any*;  } |

Defined in: [index.ts:4](https://github.com/rhdeck/serverless-yaml/blob/6439144/src/index.ts#L4)
