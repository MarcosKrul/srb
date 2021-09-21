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
        "@errors": "./src/errors",
        "@middlewares": "./src/middlewares",
        "@infra": "./src/infra",
        "@helpers": "./src/helpers",
        "@common": "./src/common",
        "@controllers": "./src/controllers",
        "@repositories": "./src/repositories",
        "@containers": "./src/containers",
      }}
    ],
  ],
  ignore: ["**/*.spec.ts"],
};
