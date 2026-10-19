# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39271864656). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@8a58adf`.

`rolldown preview B` is `https://pkg.pr.new/rolldown/rolldown@17f48fe`.

### Ubuntu

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       1050.57 ±  26.02 ms | 1.0x       |  1436 ms |     719 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.85a0ecd |       1806.45 ±  11.48 ms | 1.7x       |  3944 ms |     205 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.fd587b2 |       1829.73 ±  16.90 ms | 1.7x       |  3976 ms |     201 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.85a0ecd |       1945.75 ±  22.97 ms | 1.9x       |  4221 ms |     590 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.fd587b2 |       1955.15 ±  19.30 ms | 1.9x       |  4231 ms |     572 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       1975.14 ±  31.72 ms | 1.9x       |  4265 ms |     583 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.fd587b2 |       1976.49 ±  27.86 ms | 1.9x       |  4346 ms |     581 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.85a0ecd |       1984.10 ±  28.75 ms | 1.9x       |  4334 ms |     581 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |        653.03 ±  29.35 ms | 1.0x       |   786 ms |     539 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.fd587b2 |       1020.21 ±  87.10 ms | 1.6x       |  1833 ms |     223 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.85a0ecd |       1033.12 ±  77.38 ms | 1.6x       |  1811 ms |     226 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.fd587b2 |       1199.10 ±  69.38 ms | 1.8x       |  1954 ms |     604 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.85a0ecd |       1210.51 ± 152.65 ms | 1.9x       |  1884 ms |     614 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.85a0ecd |       1245.23 ± 113.41 ms | 1.9x       |  1926 ms |     591 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.fd587b2 |       1278.37 ± 110.63 ms | 2.0x       |  2003 ms |     666 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       1328.31 ± 180.33 ms | 2.0x       |  1971 ms |     688 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       2144.19 ± 114.85 ms | 1.0x       |  2266 ms |    2365 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.85a0ecd |       2591.96 ±  13.64 ms | 1.2x       |  4991 ms |    1281 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.fd587b2 |       2816.22 ± 298.94 ms | 1.3x       |  5138 ms |    1368 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                       | 1.2.14                |       2963.61 ±  30.42 ms | 1.4x       |  5275 ms |    2482 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B             | 1.2.14+commit.85a0ecd |       3112.43 ±  24.75 ms | 1.5x       |  5552 ms |    2476 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.fd587b2 |       3139.22 ±  33.31 ms | 1.5x       |  5564 ms |    2729 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview               | 1.2.14+commit.fd587b2 |       3160.45 ± 218.52 ms | 1.5x       |  5452 ms |    2528 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.85a0ecd |       3217.28 ± 105.15 ms | 1.5x       |  5719 ms |    2657 ms | 5.00 MB | not found | 14.01 MB   |

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
