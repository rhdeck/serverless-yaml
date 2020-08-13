import { readFileSync, existsSync, readdirSync, lstatSync } from "fs";
import { join, basename, extname } from "path";
import { isArray } from "util";
import yaml from "yaml";
export function inspectDependency(path: string) {
  //Check for serverless path
  const serverlessPath = join(path, "serverless");
  if (existsSync(serverlessPath)) {
    const files = readdirSync(serverlessPath);
    return (<[{ key?: string; value?: any[] | { [key: string]: any } }]>(
      files.map((file) => {
        const filePath = join(serverlessPath, file);
        if (lstatSync(filePath).isDirectory()) return {};
        const ext = extname(file);
        const text = readFileSync(filePath, { encoding: "utf-8" });
        switch (ext) {
          case ".yml":
          case ".yaml":
            return { key: basename(file, ext), value: yaml.parse(text) };
          case ".json":
            return { key: basename(file, ext), value: JSON.parse(text) };
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
      if (isArray(objOrArray)) endpoint[path] = [];
      else endpoint[path] = {};
    }
    endpoint = endpoint[path];
  });
  //apply our solution
  if (isArray(endpoint)) {
    if (isArray(objOrArray)) {
      endpoint.push(...objOrArray);
    }
  } else if (!isArray(objOrArray)) {
    //overlay my keys
    Object.entries(objOrArray).forEach(([key, val]) => {
      endpoint[key] = val;
    });
  }
}
