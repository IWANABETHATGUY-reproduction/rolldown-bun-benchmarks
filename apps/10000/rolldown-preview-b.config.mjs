import base from "./rolldown-preview.config.mjs";

// The second preview (`rolldown_preview_b` input), so one run can compare two builds on one runner.
export default { ...base, output: { ...base.output, dir: "dist-rolldown-preview-b" } };
