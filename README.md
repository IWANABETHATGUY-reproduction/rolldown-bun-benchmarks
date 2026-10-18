# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-18 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39109654349). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@8b887ec`.

All rows ran with `SKIP_EXPORTS_KEY_CHECK=1`. Stock rolldown and bun ignore these variables.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1092.50 ±  47.87 ms | 1.0x       |  1662 ms |     647 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.803d6a0 |       1296.26 ±  17.40 ms | 1.2x       |  2390 ms |     230 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.803d6a0 |       1389.29 ±  18.02 ms | 1.3x       |  2599 ms |     534 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.803d6a0 |       1444.12 ±  33.15 ms | 1.3x       |  2756 ms |     525 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1991.05 ±  23.01 ms | 1.8x       |  4432 ms |     505 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1387.43 ± 212.01 ms | 1.0x       |  1471 ms |    1356 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.803d6a0 |       2092.62 ± 314.41 ms | 1.5x       |  2265 ms |     564 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.803d6a0 |       2702.83 ± 580.69 ms | 1.9x       |  2861 ms |    1934 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.803d6a0 |       2911.02 ± 299.83 ms | 2.1x       |  2410 ms |    1581 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       3463.18 ± 501.04 ms | 2.5x       |  4551 ms |    1889 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| rolldown preview, warm cache | 1.2.14+commit.803d6a0 |       1601.84 ±  16.08 ms | 1.0x       |  2389 ms |    1035 ms | 5.00 MB | not found | 14.01 MB   |
| bun                          | 1.4.3                 |       1700.63 ±  65.42 ms | 1.1x       |  1772 ms |    1863 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview             | 1.2.14+commit.803d6a0 |       1978.20 ±  17.81 ms | 1.2x       |  2731 ms |    2046 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.803d6a0 |       2106.89 ±  37.64 ms | 1.3x       |  2940 ms |    2145 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       2590.65 ±  19.96 ms | 1.6x       |  4586 ms |    2040 ms | 5.00 MB | not found | 14.01 MB   |

<!-- BENCHMARK_END -->

## Rows

CI benchmarks `apps/10000` on Ubuntu, macOS and Windows:

- `rolldown`: the npm release in the root `package.json`.
- `rolldown preview`: the build in `tools/rolldown-preview`, by default the pkg.pr.new build of [rolldown#11234](https://github.com/rolldown/rolldown/pull/11234).
- `rolldown preview, warm cache` and `rolldown preview, cold cache`: the same build with the fs cache of rolldown#11234 turned on by `apps/10000/fs-cache.mjs`. Previews before `@8b887ec` have a unix-only cache, so on Windows these rows equal the no-cache row.
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
