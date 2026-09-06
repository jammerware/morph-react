import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src/app",
  ssr: false,
  basename: process.env.GITHUB_PAGES === "true" ? "/morph-react/" : "/",
} satisfies Config;
