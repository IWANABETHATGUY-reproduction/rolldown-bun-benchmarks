# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39269605212). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@8a58adf`.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1102.15 ±  51.16 ms | 1.0x       |  1684 ms |     658 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.fd587b2 |       1821.77 ±  31.15 ms | 1.7x       |  4002 ms |     224 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.fd587b2 |       1936.39 ±  24.43 ms | 1.8x       |  4354 ms |     504 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1948.62 ±  19.66 ms | 1.8x       |  4373 ms |     501 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.fd587b2 |       1952.39 ±  10.52 ms | 1.8x       |  4421 ms |     509 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |        730.73 ±  91.61 ms | 1.0x       |   894 ms |     640 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.fd587b2 |       1905.55 ± 174.35 ms | 2.6x       |  2959 ms |     434 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.fd587b2 |       2249.94 ± 231.55 ms | 3.1x       |  3329 ms |    1333 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.fd587b2 |       2496.46 ± 577.36 ms | 3.4x       |  3422 ms |    1363 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       2544.13 ± 557.22 ms | 3.5x       |  3759 ms |    1619 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1722.52 ±  89.20 ms | 1.0x       |  1805 ms |    1920 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache | 1.2.14+commit.fd587b2 |       2180.06 ±  13.60 ms | 1.3x       |  4150 ms |    1003 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       2623.97 ±  26.87 ms | 1.5x       |  4575 ms |    2200 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview             | 1.2.14+commit.fd587b2 |       2637.99 ±  22.06 ms | 1.5x       |  4574 ms |    2150 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.fd587b2 |       2699.00 ±  29.60 ms | 1.6x       |  4769 ms |    2189 ms | 5.00 MB | not found | 14.01 MB   |

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
