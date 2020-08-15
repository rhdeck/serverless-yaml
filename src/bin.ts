#!/usr/bin/env node
import commander from "commander";
import yaml from "yaml";
import { strOptions } from "yaml/types";
import { inspectDependency, apply } from "./";
import { readFileSync, writeFileSync } from "fs";
import { resolve, join } from "path";
import { getServerlessConfig } from "@raydeck/serverless-base";
export function getAllDependencies(path: string = process.cwd()) {
  const { dependencies, devDependencies } = JSON.parse(
    readFileSync(join(path, "package.json"), { encoding: "utf-8" })
  );
  return Object.entries<string>({
    ...(dependencies || {}),
    ...(devDependencies || {}),
  }).sort(([key, path], [key2, path2]) => key.localeCompare(key2));
}
commander.description("Update serverless yml based on partials in depedencies");
commander.option(
  "-y --yaml-file <path>",
  "Serverless yml file to inspect",
  "./serverless.yml"
);
commander.option(
  "-o --output <path>",
  "Output file (default is same as input serverless file)"
);
commander.option(
  "-w --working-path <path>",
  "Working path for node project",
  "."
);
commander.action(() => {
  const yamlpath = resolve(commander.workingPath, commander.yamlFile);
  const obj = yaml.parse(
    readFileSync(yamlpath, {
      encoding: "utf-8",
    })
  );
  //Look at package.json dependencies
  const dependencies = getAllDependencies(commander.workingPath);
  dependencies.forEach(([key, path]) => {
    const dependencyInfo = inspectDependency(
      resolve(commander.workingPath, "node_modules", key)
    );
    Object.entries(dependencyInfo).forEach(([key, value]) => {
      if (value && typeof value !== "string") apply(obj, key, value);
    });
  });
  //now look at serverless dependencies
  const serverlessDependencies = getServerlessConfig(commander.workingPath)
    .dependencies;
  if (serverlessDependencies) {
    Object.entries(<{ [key: string]: string }>serverlessDependencies).forEach(
      ([key, path]) => {
        const dependencyInfo = inspectDependency(
          resolve(commander.workingPath, path)
        );
        Object.entries(dependencyInfo).forEach(([key, value]) => {
          if (value && typeof value !== "string") apply(obj, key, value);
        });
      }
    );
  }
  // console.log("Starting with this app", commander.workingPath);
  // const dependencyInfo = inspectDependency(commander.workingPath);
  // Object.entries(dependencyInfo).forEach(([key, value]) => {
  //   if (value && typeof value !== "string") apply(obj, key, value);
  // });
  const outPath = commander.output
    ? resolve(commander.workingPath, commander.output)
    : resolve(commander.workingPath, commander.yamlFile);
  /* @ts-ignore */
  strOptions.defaultType = "QUOTE_DOUBLE";
  writeFileSync(outPath, yaml.stringify(obj));
});
commander.parse(process.argv);
export { commander };
