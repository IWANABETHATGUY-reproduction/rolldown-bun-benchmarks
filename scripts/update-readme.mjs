#!/usr/bin/env node
// Writes the tables from the CI artifacts in ./results into README.md, between the BENCHMARK markers.
import { readFileSync, writeFileSync } from 'node:fs';

const platforms = [
  ['Ubuntu', 'ubuntu-latest'],
  ['macOS', 'macos-latest'],
  ['Windows', 'windows-latest'],
];

function extractTable(output) {
  const lines = output.replace(/\r/g, '').split('\n');
  const start = lines.findIndex((line) => line.startsWith('| Tool'));
  if (start === -1) return '(no table in the benchmark output)';
  return lines.slice(start).filter((line) => line.startsWith('|')).join('\n');
}

const date = new Date().toISOString().split('T')[0];
const preview = process.env.SPEC ? `\`${process.env.SPEC}\`` : 'the build in `tools/rolldown-preview/package.json`';
let section = `<!-- BENCHMARK_START -->

Updated ${date} by [this workflow run](${process.env.RUN_URL}). \`rolldown preview\` is ${preview}.
`;
for (const [name, os] of platforms) {
  const output = readFileSync(`./results/benchmark-${os}/benchmark-output.txt`, 'utf-8');
  section += `\n### ${name}\n\n${extractTable(output)}\n`;
}
section += '\n<!-- BENCHMARK_END -->';

const readme = readFileSync('README.md', 'utf-8');
const start = readme.indexOf('<!-- BENCHMARK_START -->');
const endMarker = '<!-- BENCHMARK_END -->';
const end = readme.indexOf(endMarker);
if (start === -1 || end === -1) throw new Error('README.md has no BENCHMARK markers');
writeFileSync('README.md', readme.slice(0, start) + section + readme.slice(end + endMarker.length));
console.log('README.md updated');
