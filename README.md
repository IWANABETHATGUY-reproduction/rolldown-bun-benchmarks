# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39269785300). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@17f48fe`.

`rolldown preview B` is `https://pkg.pr.new/rolldown/rolldown@8a58adf`.

### Ubuntu

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       1107.55 ±  26.14 ms | 1.0x       |  1682 ms |     660 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       1796.21 ±  10.88 ms | 1.6x       |  3965 ms |     216 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.85a0ecd |       1802.81 ±  11.88 ms | 1.6x       |  3972 ms |     225 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       1926.18 ±  15.20 ms | 1.7x       |  4311 ms |     510 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.85a0ecd |       1931.94 ±  18.25 ms | 1.7x       |  4334 ms |     512 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       1940.94 ±  18.08 ms | 1.8x       |  4338 ms |     509 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       1963.93 ±  19.92 ms | 1.8x       |  4466 ms |     501 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.85a0ecd |       1964.29 ±  16.74 ms | 1.8x       |  4469 ms |     505 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       1180.40 ± 119.85 ms | 1.0x       |  1830 ms |     220 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.85a0ecd |       1187.26 ± 269.22 ms | 1.0x       |  2061 ms |     271 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       1243.44 ± 126.54 ms | 1.1x       |  1931 ms |     650 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       1280.44 ±  94.72 ms | 1.1x       |  1911 ms |     618 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.85a0ecd |       1317.86 ± 113.18 ms | 1.1x       |  1991 ms |     716 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.85a0ecd |       1414.50 ± 245.14 ms | 1.2x       |  2200 ms |     715 ms | 5.00 MB | not found | 13.59 MB   |
| bun                            | 1.4.3                 |       1521.50 ± 140.76 ms | 1.3x       |  1530 ms |    1500 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       2571.23 ± 536.59 ms | 2.2x       |  3704 ms |    1367 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       2275.47 ± 274.75 ms | 1.0x       |  2251 ms |    2125 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.85a0ecd |       2661.80 ±  18.20 ms | 1.2x       |  5118 ms |    1193 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       2669.12 ±  20.77 ms | 1.2x       |  5058 ms |    1251 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                       | 1.2.14                |       3139.79 ±  16.03 ms | 1.4x       |  5582 ms |    2348 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview               | 1.2.14+commit.85a0ecd |       3142.46 ±  24.87 ms | 1.4x       |  5679 ms |    2304 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       3165.20 ±  22.64 ms | 1.4x       |  5643 ms |    2270 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.85a0ecd |       3236.27 ±  28.57 ms | 1.4x       |  5762 ms |    2529 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       3291.30 ± 172.36 ms | 1.4x       |  5874 ms |    2476 ms | 5.00 MB | not found | 14.01 MB   |

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
