/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "server/build",
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  server: "./server.js", // optional, bisa dihapus di Cloudflare Pages
  future: {
    v3_routeConvention: true,
  },
  // ⬇️ ini yang penting
  serverBuildTarget: "cloudflare-pages",
};
