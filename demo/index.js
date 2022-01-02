// import tools from './tools.js'
// const tools = require("./tools.js");
// console.log(tools)
const test = async () => {
  const tools = await import("./tools.js");
  console.log(tools.add(1, 2));
};
test();
