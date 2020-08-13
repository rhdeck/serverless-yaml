# serverless-yaml

Utility for extending serverless yml based on common components from dependencies.

## Usage

Create files that are useful in a "serverless" subdirectory in a dependency or in the top level package with names that point to the path within the serverless object you want to update, like:

- `provider.environment.yml` - a map of environment variables to be added to provider.envrionment for common usage
- `Resources.mainRole.Properties.Policies.yml` - a list of policies to add to the the roles called mainRole.

Supports yaml encoding (detected by `.yml` or `.yaml` extension) and JSON (`.json`)
