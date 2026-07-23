import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const clientDirectory = join(projectRoot, "dist", "client");
const workerEntry = join(projectRoot, "dist", "server", "index.js");
const outputDirectory = join(projectRoot, "docs");
const publicUrl = "https://nedu96.github.io/nedu-engineering-portfolio/";

async function renderPortfolio() {
  const workerUrl = pathToFileURL(workerEntry);
  workerUrl.searchParams.set("github-pages-build", `${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  if (!response.ok) {
    throw new Error(`Portfolio render failed with HTTP ${response.status}.`);
  }

  return response.text();
}

function makeStatic(html) {
  const socialMetadata = [
    `<link rel="canonical" href="${publicUrl}"/>`,
    '<meta property="og:type" content="website"/>',
    '<meta property="og:title" content="Nedu Anandarajan | Real-Time &amp; Systems Software Engineer"/>',
    '<meta property="og:description" content="Software engineer building reliable maritime, industrial IoT, robotics and distributed systems."/>',
    `<meta property="og:url" content="${publicUrl}"/>`,
    '<meta name="twitter:card" content="summary"/>',
  ].join("");

  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(
      /<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*\/?>/gi,
      "",
    )
    .replace(/\sdata-rsc-css-href="[^"]*"/gi, "")
    .replace(
      /<meta\b(?=[^>]*\bname=["']codex-preview["'])[^>]*\/?>/gi,
      "",
    )
    .replace("</head>", `${socialMetadata}</head>`)
    .replace(
      /\/[^"'()\s<>]*?\.vinext\/fonts\//g,
      "/assets/_vinext_fonts/",
    )
    .replaceAll('href="/', 'href="./')
    .replaceAll('src="/', 'src="./')
    .replaceAll("url(/assets/", "url(./assets/");
}

async function removeRuntimeFiles() {
  await rm(join(outputDirectory, ".vite"), { recursive: true, force: true });
  await rm(join(outputDirectory, ".assetsignore"), { force: true });
  await rm(join(outputDirectory, "_headers"), { force: true });

  const assetsDirectory = join(outputDirectory, "assets");
  const assets = await readdir(assetsDirectory, { withFileTypes: true });
  await Promise.all(
    assets
      .filter((asset) => asset.isFile() && asset.name.endsWith(".js"))
      .map((asset) => rm(join(assetsDirectory, asset.name))),
  );
}

async function validateOutput() {
  const html = await readFile(join(outputDirectory, "index.html"), "utf8");
  const checks = [
    ["portfolio title", /Nedu Anandarajan/],
    ["robotics work", /ROS programming for Fetch and Pepper/],
    ["coffee telemetry work", /Raspberry Pi edge integration/],
    ["mobile number", /0402 429 024/],
    ["LinkedIn profile", /linkedin\.com\/in\/nedunchezia-pandia-rajan/],
    ["relative assets", /href="\.\/assets\//],
  ];

  for (const [label, pattern] of checks) {
    if (!pattern.test(html)) {
      throw new Error(`Static output is missing ${label}.`);
    }
  }

  if (/<script\b/i.test(html)) {
    throw new Error("Static output still contains a runtime script.");
  }

  if (/(?:href|src)="\/(?!\/)/i.test(html)) {
    throw new Error("Static output contains a root-relative asset URL.");
  }

  if (
    html.includes(".vinext/fonts") ||
    html.includes("/workspace/") ||
    html.includes("/home/runner/")
  ) {
    throw new Error("Static output contains a build-machine asset path.");
  }
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });
await removeRuntimeFiles();

const html = makeStatic(await renderPortfolio());
await writeFile(join(outputDirectory, "index.html"), html);
await writeFile(join(outputDirectory, ".nojekyll"), "");
await validateOutput();

console.log(`GitHub Pages output created at ${outputDirectory}`);
