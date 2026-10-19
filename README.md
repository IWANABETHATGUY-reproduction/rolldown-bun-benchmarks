# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39261271493). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@726b3fb`.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1075.45 ±  12.44 ms | 1.0x       |  1681 ms |     664 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.65e17e5 |       1783.19 ±   8.19 ms | 1.7x       |  3936 ms |     221 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.65e17e5 |       1920.31 ±  23.13 ms | 1.8x       |  4323 ms |     505 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1931.64 ±  11.07 ms | 1.8x       |  4345 ms |     505 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.65e17e5 |       1939.59 ±  20.22 ms | 1.8x       |  4413 ms |     502 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |        928.68 ±  93.45 ms | 1.0x       |  1086 ms |     824 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.65e17e5 |       1819.25 ± 358.17 ms | 2.0x       |  3002 ms |     389 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       2210.50 ± 271.80 ms | 2.4x       |  3426 ms |    1354 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.65e17e5 |       2430.38 ± 530.07 ms | 2.6x       |  3578 ms |    1437 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.65e17e5 |       2560.51 ± 395.60 ms | 2.8x       |  3622 ms |    1199 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       2118.55 ±  79.87 ms | 1.0x       |  2249 ms |    2194 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache | 1.2.14+commit.65e17e5 |       2551.18 ±  25.99 ms | 1.2x       |  4890 ms |    1294 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       3019.75 ±  26.83 ms | 1.4x       |  5307 ms |    2506 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview             | 1.2.14+commit.65e17e5 |       3070.60 ±  38.25 ms | 1.4x       |  5515 ms |    2398 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.65e17e5 |       3139.67 ±  21.77 ms | 1.5x       |  5613 ms |    2630 ms | 5.00 MB | not found | 14.01 MB   |

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
