# State of JS data pipeline

Extracts results from the state of JS surveys,
inject the fetched results inside an elasticsearch index and
compute various aggregations which are persisted in json files.

## Prerequisites

### Tools

- Node `>=8.3.0`
- Yarn - [install](https://yarnpkg.com/en/docs/install)
- Docker - [mac install](https://docs.docker.com/docker-for-mac/install/)
- Docker Compose (included with docker for mac)

### TypeForm

In order to access the TypeForm API, you must set an API token, to do so,
simply rename `.env.template` to `.env` and change values with real ones.
