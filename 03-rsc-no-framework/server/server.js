const path = require("node:path");
const { readFileSync } = require("node:fs");
const Fastify = require("fastify");
const fastifystaticPlugin = require("@fastify/static");
const React = require("react");
const { renderToPipeableStream } = require("react-server-dom-webpack/server");
const AppImport = require("../src/App.jsx");

const App = AppImport.default;

const MANIFEST = readFileSync(
  path.resolve(__dirname, "../dist/react-client-manifest.json"),
  "utf8",
);

const MODULE_MAP = JSON.parse(MANIFEST);
const PORT = process.env.PORT ? process.env.PORT : 3000;

const fastify = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

fastify.register(fastifystaticPlugin, {
  root: path.join(__dirname, "../dist"),
  prefix: "/assets/",
});

fastify.register(fastifystaticPlugin, {
  root: path.join(__dirname, "../public"),
  decorateReply: false,
});

fastify.get("/", async function rootHandler(req, reply) {
  return reply.sendFile("index.html");
});

// fastify.get("/react-flight", function reactFlightHandler(request, reply) {
//   try {
//     return reply.send(`3:I["./src/ClientComponent.jsx",["vendors-node_modules_react_jsx-dev-runtime_js","vendors-node_modules_react_jsx-dev-runtime_js.chunk.js","client0","client0.chunk.js"],""]
// 1:{"name":"App","env":"Server","key":null,"owner":null,"props":{}}
// 0:D"$1"
// 0:["$","div",null,{"children":[["$","h1",null,{"children":"Notes App"},"$1"],["$","$L3",null,{},"$1"]]},"$1"]
// `);
//   } catch (err) {
//     request.log.error("react-flight err", err);
//     throw err;
//   }
// });

fastify.get("/react-flight", function reactFlightHandler(request, reply) {
  try {
    reply.header("Content-Type", "application/octet-stream");
    const { pipe } = renderToPipeableStream(
      React.createElement(App),
      MODULE_MAP,
    );
    pipe(reply.raw);
  } catch (err) {
    request.log.error("react-flight err", err);
    throw err;
  }
});
module.exports = async function start() {
  try {
    await fastify.listen({
      port: PORT,
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
