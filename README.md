# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39287111290). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@1fec7d0`.

`rolldown preview B` is `https://pkg.pr.new/rolldown/rolldown@8a58adf`.

### Ubuntu

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |       1078.31 ±  15.25 ms | 1.0x       |  1663 ms |     649 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.0899467 |       1306.30 ±   7.96 ms | 1.2x       |  2417 ms |     223 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.0899467 |       1420.68 ±  13.46 ms | 1.3x       |  2625 ms |     546 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.0899467 |       1451.08 ±   8.65 ms | 1.3x       |  2723 ms |     541 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       1829.25 ±  16.00 ms | 1.7x       |  3994 ms |     223 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       1968.67 ±  20.34 ms | 1.8x       |  4366 ms |     506 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       1974.38 ±  13.81 ms | 1.8x       |  4437 ms |     512 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       1999.77 ±  80.12 ms | 1.9x       |  4380 ms |     511 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                            | 1.4.3                 |        617.07 ±  17.03 ms | 1.0x       |   826 ms |     885 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache   | 1.2.14+commit.0899467 |        821.27 ±  54.41 ms | 1.3x       |  1301 ms |     288 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |        897.17 ±  80.91 ms | 1.5x       |  1846 ms |     257 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview               | 1.2.14+commit.0899467 |        928.01 ±  59.34 ms | 1.5x       |  1378 ms |     790 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |        965.25 ±  38.88 ms | 1.6x       |  1935 ms |     733 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       1022.86 ±  68.61 ms | 1.7x       |  1987 ms |     724 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.0899467 |       1026.15 ±  79.63 ms | 1.7x       |  1454 ms |     870 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                       | 1.2.14                |       1088.08 ±  74.89 ms | 1.8x       |  2131 ms |     843 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                           | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ------------------------------ | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| rolldown preview, warm cache   | 1.2.14+commit.0899467 |       1546.85 ±  26.85 ms | 1.0x       |  2252 ms |    1071 ms | 5.00 MB | not found | 14.01 MB   |
| bun                            | 1.4.3                 |       1671.07 ±  67.29 ms | 1.1x       |  1680 ms |    1987 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview               | 1.2.14+commit.0899467 |       1976.43 ±  83.37 ms | 1.3x       |  2674 ms |    1984 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache   | 1.2.14+commit.0899467 |       1983.06 ±  12.81 ms | 1.3x       |  2757 ms |    2159 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B, warm cache | 1.2.14+commit.fd587b2 |       2100.06 ±  40.38 ms | 1.4x       |  3955 ms |    1004 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                       | 1.2.14                |       2503.47 ±  20.90 ms | 1.6x       |  4339 ms |    2060 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B, cold cache | 1.2.14+commit.fd587b2 |       2588.45 ±  24.02 ms | 1.7x       |  4546 ms |    2248 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview B             | 1.2.14+commit.fd587b2 |       2632.22 ±  75.18 ms | 1.7x       |  4472 ms |    2117 ms | 5.00 MB | not found | 14.01 MB   |

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
