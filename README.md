# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-18 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39104646033). `rolldown preview` is the build in `tools/rolldown-preview/package.json`.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |        869.47 ±  23.60 ms | 1.0x       |  1174 ms |     584 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.e83e725 |       1532.65 ±   4.82 ms | 1.8x       |  3286 ms |     172 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.e83e725 |       1634.41 ±  21.60 ms | 1.9x       |  3500 ms |     466 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1638.91 ±  31.70 ms | 1.9x       |  3496 ms |     464 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.e83e725 |       1652.77 ±  20.15 ms | 1.9x       |  3589 ms |     478 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |        669.28 ±  85.25 ms | 1.0x       |   765 ms |     531 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, cold cache | 1.2.14+commit.e83e725 |       1373.80 ± 346.60 ms | 2.1x       |  2152 ms |     713 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, warm cache | 1.2.14+commit.e83e725 |       1463.81 ± 494.50 ms | 2.2x       |  2325 ms |     329 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.e83e725 |       1729.12 ± 317.78 ms | 2.6x       |  2340 ms |     932 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       2174.05 ± 254.51 ms | 3.2x       |  2758 ms |    1175 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       2114.46 ±  81.01 ms | 1.0x       |  2163 ms |    2308 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache | 1.2.14+commit.e83e725 |       3018.70 ±  18.11 ms | 1.4x       |  5391 ms |    2431 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview             | 1.2.14+commit.e83e725 |       3025.38 ±  19.48 ms | 1.4x       |  5452 ms |    2461 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.e83e725 |       3030.63 ±  31.57 ms | 1.4x       |  5341 ms |    2541 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       3350.65 ± 329.74 ms | 1.6x       |  5566 ms |    2513 ms | 5.00 MB | not found | 14.01 MB   |

<!-- BENCHMARK_END -->

## Rows

CI benchmarks `apps/10000` on Ubuntu, macOS and Windows:

- `rolldown`: the npm release in the root `package.json`.
- `rolldown preview`: the build in `tools/rolldown-preview`, by default the pkg.pr.new build of [rolldown#11234](https://github.com/rolldown/rolldown/pull/11234).
- `rolldown preview, warm cache` and `rolldown preview, cold cache`: the same build with the fs cache of rolldown#11234 turned on by `apps/10000/fs-cache.mjs`. The cache is unix only, so on Windows these rows equal the no-cache row.
- `bun`: the version from `oven-sh/setup-bun`.

Each job writes its table to the run's summary page and uploads it as an artifact. After a run on `main`, CI writes the three tables into this README.

## Test another rolldown build

Run the CI workflow by hand and set `rolldown_preview` to a package spec:

```sh
gh workflow run ci.yml -R IWANABETHATGUY-reproduction/rolldown-bun-benchmarks \
  -f rolldown_preview=https://pkg.pr.new/rolldown/rolldown@<sha>
```

A rolldown PR gets a pkg.pr.new build when it has the `trigger: preview` label. `pnpm-workspace.yaml` sets `blockExoticSubdeps: false`, because the preview's bindings are URL dependencies.

## Run locally

Install [hyperfine](https://github.com/sharkdp/hyperfine) and [bun](https://bun.sh), then:

```sh
pnpm install
node bench.mjs --app apps/10000
```

Other apps (`apps/1000`, `apps/3000`, `apps/5000`, `apps/rome`, `apps/three10x`) run only the rows that have a `build:<tool>` script.

## Differences from rolldown/benchmarks

- Only rolldown and bun.
- hyperfine runs one warmup build per row.
- The table has user and system CPU columns. On runners with few cores, CPU time decides the wall time.
