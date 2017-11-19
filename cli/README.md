# State of JS CLI

Extracts results from the state of JS survey,
inject the fetched results inside an elasticsearch index and
compute various aggregations which are persisted in json files.

It's also able to capture screenshots using puppeteer.

- [prerequisites](#prerequisites)
- [Quick demo](#quick-demo)
- [Makefile](#makefile)
- [Setup](#setup)
- [CLI](#cli)

## Prerequisites

### Tools

- Node `>=8.3.0`
- Yarn - [install](https://yarnpkg.com/en/docs/install)
- Docker - [mac install](https://docs.docker.com/docker-for-mac/install/)
- Docker Compose (included with docker for mac)

### TypeForm

In order to access the TypeForm API, you must add form ID & API key, to do so,
simply rename `.env.sample` to `.env` and change values with real ones.

## CLI

This project provides a CLI to fetch survey data from TypeForm API & populate the elastic index.

Elastic search is exposed on port `9200` on localhost.

Generated reports (mostly elastic aggregations results) are stored in `ui/data` as json files.

If you want to see what are the CLI available commands:

```sh
./cli -h
```
