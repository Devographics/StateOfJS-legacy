# State of JS Collector

Extracts results from the state of JS survey,
inject the fetched results inside an elasticsearch index and
compute various aggregations which are persisted in json files.

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
- Make

### TypeForm

In order to access the TypeForm API, you must add form ID & API key, to do so,
simply rename `.env.sample` to `.env` and change values with real ones.

## Quick run

If you just want to see what the data look likes and have it ready to get used,
simply run this command:

```sh
make run
```

> Note that you'll have to wait a few minutes as the data retrieval is long enough.

Then you'll be able to access the sample App at `http://localhost:5000`.

## Makefile

To simplify the usage of this project, a Makefile is available, it's self documented,
to see available commands, run:

```sh
make help
```

The main advantages of it are documentation, auto-completion and not having to `cd` to specific dir,
but most of the commands are also available via `yarn` scripts or the [CLI](#cli) application.

## Setup

If you already ran `make run`, this step is not necessary.

```sh
make setup
```

Now you've got all CLI dependencies installed.

## CLI

This project provides a CLI to fetch survey data from TypeForm API & populate the elastic index.

Elastic search is exposed on port `9200` on localhost.

Generated reports (mostly elastic aggregations results) are stored in `ui/data` as json files.

If you want to see what are the CLI available commands:

```sh
./collector -h
```
