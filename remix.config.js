const {
  createRoutesFromFolders,
} = require("@remix-run/v1-route-convention");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    // makes the warning go away in v1.15
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_meta: true,
  },
  serverDependenciesToBundle: ["mapbox-gl"],

  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
};
