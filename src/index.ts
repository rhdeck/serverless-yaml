import { readFileSync, existsSync, readdirSync, lstatSync } from "fs";
import { join, basename, extname } from "path";
import yaml from "yaml";
export function inspectDependency(path: string, keys: string[] = []) {
  //Check for serverless path
  const serverlessPath = join(path, "serverless");
  if (existsSync(serverlessPath)) {
    const files = readdirSync(serverlessPath);
    return (<[{ key?: string; value?: any[] | { [key: string]: any } }]>(
      files.flatMap((file) => {
        const filePath = join(serverlessPath, file);
        if (lstatSync(filePath).isDirectory()) {
          if (["common", ...keys].includes(file)) {
            return readdirSync(filePath).map((file2) => {
              const filePath = join(serverlessPath, file, file2);
              if (lstatSync(filePath).isDirectory()) return {};
              if (["base.yml", "serverless.yml"].includes(basename(filePath)))
                return {};

              const ext = extname(filePath);
              const text = readFileSync(filePath, { encoding: "utf-8" });
              switch (ext) {
                case ".yml":
                case ".yaml":
                  // console.log("Getting data from ", filePath);
                  return {
                    key: basename(filePath, ext),
                    value: yaml.parse(text),
                  };
                // case ".json":
                //   return {
                //     key: basename(filePath, ext),
                //     value: JSON.parse(text),
                //   };
                default:
                  return {};
              }
            });
          } else return {};
        }
        const ext = extname(file);
        const text = readFileSync(filePath, { encoding: "utf-8" });
        if (["base.yml", "serverless.yml"].includes(basename(filePath)))
          return {};
        switch (ext) {
          case ".yml":
          case ".yaml":
            // console.log("Getting data from ", filePath);

            return { key: basename(file, ext), value: yaml.parse(text) };
          // case ".json":
          //   return { key: basename(file, ext), value: JSON.parse(text) };
          default:
            return {};
        }
      })
    )).reduce((o, { key, value }) => (key ? { ...o, [key]: value } : o), {});
  } else return {};
}

export function apply(
  source: { [key: string]: any },
  key: string,
  objOrArray: { [key: string]: any } | any[]
) {
  //let's look through the pile here
  if (!objOrArray) return source;
  const paths = key.split(".");
  //walk the paths
  let endpoint = source;
  paths.forEach((path) => {
    if (!endpoint[path]) {
      if (Array.isArray(objOrArray)) endpoint[path] = [];
      else endpoint[path] = {};
    }
    endpoint = endpoint[path];
  });
  //apply our solution
  if (Array.isArray(endpoint)) {
    if (Array.isArray(objOrArray)) {
      endpoint.push(...objOrArray);
    }
  } else if (!Array.isArray(objOrArray)) {
    //overlay my keys
    Object.entries(objOrArray).forEach(([key, val]) => {
      endpoint[key] = val;
    });
  }
}
