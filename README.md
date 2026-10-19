# rolldown-bun-benchmarks

A trimmed copy of [rolldown/benchmarks](https://github.com/rolldown/benchmarks) that keeps only rolldown and bun. One CI run takes minutes instead of hours, so it gives quick feedback on rolldown performance work.

## Results

Ubuntu gives the stable signal. GitHub's macOS runners are noisy, so compare rows inside one table and not numbers across runs.

<!-- BENCHMARK_START -->

Updated 2026-10-19 by [this workflow run](https://github.com/IWANABETHATGUY-reproduction/rolldown-bun-benchmarks/actions/runs/39263219735). `rolldown preview` is `https://pkg.pr.new/rolldown/rolldown@6b11bc0`.

### Ubuntu

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       1077.92 ±  31.80 ms | 1.0x       |  1627 ms |     648 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.9d21914 |       1772.98 ±   7.43 ms | 1.6x       |  3922 ms |     226 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.9d21914 |       1915.60 ±  15.00 ms | 1.8x       |  4275 ms |     523 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.9d21914 |       1928.11 ±  14.34 ms | 1.8x       |  4383 ms |     517 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1944.53 ±  22.69 ms | 1.8x       |  4345 ms |     509 ms | 5.00 MB | not found | 13.59 MB   |

### macOS

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |        642.67 ±  36.69 ms | 1.0x       |   832 ms |    1009 ms | 4.95 MB | not found | 12.39 MB   |
| rolldown preview, warm cache | 1.2.14+commit.9d21914 |        909.03 ±  47.88 ms | 1.4x       |  1993 ms |     277 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview, cold cache | 1.2.14+commit.9d21914 |        980.73 ±  59.37 ms | 1.5x       |  2014 ms |     753 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown preview             | 1.2.14+commit.9d21914 |       1011.39 ±  61.93 ms | 1.6x       |  2008 ms |     754 ms | 5.00 MB | not found | 13.59 MB   |
| rolldown                     | 1.2.14                |       1038.24 ±  38.26 ms | 1.6x       |  1996 ms |     782 ms | 5.00 MB | not found | 13.59 MB   |

### Windows

| Tool                         | Version               | Time (mean ± σ)           | Comparison | User CPU | System CPU | JS      | CSS       | Sourcemaps |
| ---------------------------- | --------------------- | ------------------------: | ---------- | -------: | ---------: | ------- | --------- | ---------- |
| bun                          | 1.4.3                 |       2181.41 ±  87.74 ms | 1.0x       |  2420 ms |    2238 ms | 4.95 MB | not found | 12.81 MB   |
| rolldown preview, warm cache | 1.2.14+commit.9d21914 |       2560.48 ±  36.44 ms | 1.2x       |  4895 ms |    1280 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown                     | 1.2.14                |       3044.44 ±  32.43 ms | 1.4x       |  5431 ms |    2426 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview             | 1.2.14+commit.9d21914 |       3092.53 ±  33.80 ms | 1.4x       |  5473 ms |    2510 ms | 5.00 MB | not found | 14.01 MB   |
| rolldown preview, cold cache | 1.2.14+commit.9d21914 |       3144.91 ±  46.21 ms | 1.4x       |  5729 ms |    2629 ms | 5.00 MB | not found | 14.01 MB   |

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
