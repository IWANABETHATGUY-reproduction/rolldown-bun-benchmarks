# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-18 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39106762404). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@5759e7b`.

All rows ran with `SKIP_EXPORTS_KEY_CHECK=1`. Stock rolldown and bun ignore these variables.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1109.42 ±  30.78 ms | 1.0x       |  1682 ms |     650 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.f1bf764 |       1342.73 ±  14.23 ms | 1.2x       |  2463 ms |     241 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.f1bf764 |       1452.39 ±  13.60 ms | 1.3x       |  2754 ms |     547 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.f1bf764 |       1472.77 ±  15.69 ms | 1.3x       |  2732 ms |     550 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1998.80 ±  15.35 ms | 1.8x       |  4455 ms |     505 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1559.68 ± 174.33 ms | 1.0x       |  1656 ms |    1444 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.f1bf764 |       2555.71 ± 338.40 ms | 1.6x       |  2734 ms |     788 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.f1bf764 |       2984.93 ± 456.29 ms | 1.9x       |  2662 ms |    1739 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.f1bf764 |       3280.18 ± 664.01 ms | 2.1x       |  3371 ms |    2462 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       3687.34 ± 556.20 ms | 2.4x       |  4767 ms |    1992 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       2195.80 ±  64.23 ms | 1.0x       |  2290 ms |    2203 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache | 1.2.14+commit.f1bf764 |       2384.18 ±  25.81 ms | 1.1x       |  3439 ms |    2460 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview             | 1.2.14+commit.f1bf764 |       2403.73 ±  14.28 ms | 1.1x       |  3431 ms |    2492 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.f1bf764 |       2412.74 ±  19.31 ms | 1.1x       |  3489 ms |    2463 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       3015.73 ±  36.92 ms | 1.4x       |  5318 ms |    2541 ms | 5.00 MB | not found | 14.01 MB   |

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

Add `-f extra_env="NAME=value ..."` to set env vars for all benchmark steps. For example, `SKIP_EXPORTS_KEY_CHECK=1` turns on the resolver experiment in the `@5759e7b` preview of rolldown#11234.

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
