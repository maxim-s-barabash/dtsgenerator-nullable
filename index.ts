import { PreProcessHandler, Plugin, PluginContext, Schema } from "dtsgenerator";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json");

type TestFn = (key: string) => boolean;

/**
 * This file is the main implementation for this plugin.
 */
const plugin: Plugin = {
  meta: {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
  },
  preProcess,
};

function deepTransformKeys(obj: any, testKey: TestFn) {
  if (obj && Array.isArray(obj)) {
    for (const item of obj) {
      deepTransformKeys(item, testKey);
    }
  } else if (obj && typeof obj === "object") {
    const allKeys = Object.keys(obj);
    for (let i = 0; i < allKeys.length; i++) {
      const key = allKeys[i];

      const value = obj[key];
      if (testKey(key)) {
        delete obj[key];
      }
      if (typeof value === "object") {
        deepTransformKeys(value, testKey);
      }
    }
  }
  return obj;
}

async function preProcess(
  pluginContext: PluginContext
): Promise<PreProcessHandler | undefined> {
  return (contents: Schema[]): Schema[] => {
    const option = pluginContext.option;
    if (typeof option !== "string") {
      return contents;
    }

    const KeyRegex = new RegExp(option);

    function testKey(key: string) {
      return KeyRegex.test(key);
    }

    deepTransformKeys(contents, testKey);

    return contents;
  };
}

export default plugin;
