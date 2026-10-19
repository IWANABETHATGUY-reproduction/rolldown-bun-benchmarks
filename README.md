# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39267497729). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@17f48fe`.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1105.26 ±  35.86 ms | 1.0x       |  1669 ms |     646 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.85a0ecd |       1864.73 ±  21.51 ms | 1.7x       |  4075 ms |     229 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.85a0ecd |       1974.99 ±  18.33 ms | 1.8x       |  4383 ms |     510 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1993.44 ±  69.54 ms | 1.8x       |  4404 ms |     525 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.85a0ecd |       2008.12 ±  26.16 ms | 1.8x       |  4510 ms |     514 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |        837.85 ±  78.05 ms | 1.0x       |   997 ms |     748 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.85a0ecd |       1715.18 ± 137.62 ms | 2.0x       |  2856 ms |     369 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.85a0ecd |       1805.50 ± 202.84 ms | 2.2x       |  2886 ms |    1022 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1970.66 ± 170.39 ms | 2.4x       |  3031 ms |    1133 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.85a0ecd |       2108.15 ± 194.61 ms | 2.5x       |  3049 ms |    1072 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1731.20 ±  71.27 ms | 1.0x       |  1854 ms |    1937 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache | 1.2.14+commit.85a0ecd |       2183.30 ±  35.46 ms | 1.3x       |  4035 ms |    1072 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       2649.97 ±  90.71 ms | 1.5x       |  4470 ms |    2244 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview             | 1.2.14+commit.85a0ecd |       2669.08 ±  43.76 ms | 1.5x       |  4629 ms |    2194 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.85a0ecd |       2696.74 ±  22.91 ms | 1.6x       |  4785 ms |    2248 ms | 5.00 MB | not found | 14.01 MB   |

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
