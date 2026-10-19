# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39269807647). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@17f48fe`.

`rolldown preview B` is `https://pkg.pr.new/rolldown/rolldown@8a58adf`.

### Ubuntu

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       1044.92 ±   8.64 ms | 1.0x       |  1639 ms |     618 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.85a0ecd |       1790.51 ±  18.09 ms | 1.7x       |  3940 ms |     214 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       1796.19 ±  14.96 ms | 1.7x       |  3944 ms |     220 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       1913.84 ±   9.01 ms | 1.8x       |  4270 ms |     497 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.85a0ecd |       1919.15 ±  25.14 ms | 1.8x       |  4291 ms |     490 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       1923.62 ±  19.43 ms | 1.8x       |  4321 ms |     497 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.85a0ecd |       1934.03 ±  14.19 ms | 1.9x       |  4380 ms |     496 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       1943.85 ±  22.48 ms | 1.9x       |  4402 ms |     485 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       1351.64 ± 129.97 ms | 1.0x       |  1426 ms |    1285 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.85a0ecd |       2194.63 ± 330.05 ms | 1.6x       |  3369 ms |     454 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       2338.91 ± 343.37 ms | 1.7x       |  3423 ms |     451 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.85a0ecd |       2474.00 ± 196.23 ms | 1.8x       |  3648 ms |    1275 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       2499.21 ± 328.65 ms | 1.8x       |  3707 ms |    1464 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       2526.87 ± 283.52 ms | 1.9x       |  3557 ms |    1312 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.85a0ecd |       2585.65 ± 250.17 ms | 1.9x       |  3642 ms |    1425 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       3622.03 ± 899.59 ms | 2.7x       |  4249 ms |    1759 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       1726.12 ±  23.47 ms | 1.0x       |  1942 ms |    1863 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       2192.96 ±  17.72 ms | 1.3x       |  4307 ms |    1067 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.85a0ecd |       2224.11 ±  15.62 ms | 1.3x       |  4326 ms |    1090 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                       | 1.2.14                |       2726.98 ±  18.72 ms | 1.6x       |  4995 ms |    2128 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       2734.87 ±  20.00 ms | 1.6x       |  4965 ms |    2170 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview               | 1.2.14+commit.85a0ecd |       2768.31 ±  26.26 ms | 1.6x       |  4937 ms |    2245 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       2780.18 ±  25.04 ms | 1.6x       |  5038 ms |    2315 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.85a0ecd |       2783.18 ±  24.37 ms | 1.6x       |  5073 ms |    2279 ms | 5.00 MB | not found | 14.01 MB   |

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
