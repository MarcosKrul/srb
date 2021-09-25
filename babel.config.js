module.exports = {
  presets: [
    "@babel/preset-typescript",
    ["@babel/preset-env", { targets: { node: "current" }, loose: false }],
  ],
  plugins: [
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: false }],
    [
      "module-resolver", { alias: { 
        "@config": "./src/config",
        "@error": "./src/handlers/errors",
        "@success": "./src/handlers/success",
        "@middlewares": "./src/middlewares",
        "@infra": "./src/infra",
        "@helpers": "./src/helpers",
        "@common": "./src/common",
        "@controllers": "./src/controllers",
        "@repositories": "./src/repositories",
        "@containers": "./src/containers",
        "@services": "./src/services",
        "@provider": "./src/provider",
      }}
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
