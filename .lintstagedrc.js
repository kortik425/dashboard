const path = require("path");

const formatStaged =
  (command, options = "") =>
  (filenames) =>
    `${command} ${options} ${filenames.map((f) => path.relative(process.cwd(), f)).join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [
    formatStaged("next lint", "--fix --file"),
    formatStaged("prettier", "--write"),
  ],
};
