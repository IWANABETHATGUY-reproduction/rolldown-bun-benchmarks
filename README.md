# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39265341834). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@17f48fe`.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1072.01 ±  26.24 ms | 1.0x       |  1636 ms |     646 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.85a0ecd |       1761.08 ±   8.36 ms | 1.6x       |  3915 ms |     208 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.85a0ecd |       1882.09 ±  14.71 ms | 1.8x       |  4247 ms |     493 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.85a0ecd |       1924.65 ±   9.54 ms | 1.8x       |  4385 ms |     515 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1945.59 ± 107.32 ms | 1.8x       |  4299 ms |     520 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |        757.72 ± 130.57 ms | 1.0x       |   928 ms |     645 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown                     | 1.2.14                |       1928.20 ± 572.09 ms | 2.5x       |  2952 ms |    1153 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, warm cache | 1.2.14+commit.85a0ecd |       2159.27 ± 381.49 ms | 2.8x       |  3428 ms |     542 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.85a0ecd |       2904.00 ± 858.50 ms | 3.8x       |  4197 ms |    1884 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.85a0ecd |       3217.64 ± 812.86 ms | 4.2x       |  4074 ms |    1870 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       2098.04 ±  74.95 ms | 1.0x       |  2212 ms |    2288 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache | 1.2.14+commit.85a0ecd |       2536.39 ±  22.70 ms | 1.2x       |  4883 ms |    1283 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       3035.96 ±  19.29 ms | 1.4x       |  5312 ms |    2583 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview             | 1.2.14+commit.85a0ecd |       3074.82 ±  26.95 ms | 1.5x       |  5500 ms |    2583 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.85a0ecd |       3151.56 ±  35.79 ms | 1.5x       |  5681 ms |    2681 ms | 5.00 MB | not found | 14.01 MB   |

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
