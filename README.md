# State of JS

[![Travis CI][travis-image]][travis-url]

- [structure](#structure)
- [development](#development)
    - [requirements](#requirements)
    - [installation](#installation)
    - [coding style](#coding-style)
    - [captures](#captures)
- [deployment](#deployment)
    - [build](#build)
    - [deploy](#deploy)
- [authors](#authors)   

## Structure

The project is split by surveys, each one has its own folder containing
the dedicated website (`website` folder) and data processing logic
(`data_processing` folder).

You also have a dedicated folder for the homepage `home`.

- `home` is used for [stateofjs.com](https://stateofjs.com)
- `surveys/2016/website` is used for [2016.stateofjs.com](https://2016.stateofjs.com)
- `surveys/2017/website` is used for [2017.stateofjs.com](https://2017.stateofjs.com)
- …

## Development

If you're in a hurry, you can run `make`. It will list all the available commands
used to work on the project.

### Requirements

- [Node.js](https://nodejs.org/) >= 8.3.0
- [Yarn](https://yarnpkg.com/)
- docker and docker-compose to be able to run the data processing tools
- GNU Make

### Installation

> Please make sure to use yarn if you go for manual install
as we only provide lock files for this tool.

You have several options to install project dependencies, either by installing them manually via standard `yarn install` inside the various
directories you're planning to work on, or by using custom make targets.

Another option is to install all dependencies using the following command:

```bash
make install
```

And if you only want to work on a specific survey, you can run:

```bash
make survey_install_2018
```

### Coding style

This project uses prettier, which you can run using this command:

```bash
make fmt
```

There's another command which only checks if the code was formatted as expected:

```bash
make fmt_check
```

The project also uses ESLint to enforce good practice and consistency,
the configuration is common to the whole project, to run it:

```bash
make lint
```

> `make fmt_check` and `make lint` both run on CI (travis).

### Captures

In order to improve sharing on social networks, we generate screenshots
of the charts, to generate those screenshots for a specific survey,
you can run the following command:

```bash
make survey_capture_2018
```

This will take screenshots according to the config
defined in `surveys/2018/config/captures.yml`.

> Please make sure that the target survey's development server is running
prior to running this command, using `make survey_dev_2018` for example.

## Deployment

### Build

As for install, you have several ways to build the websites and homepage.

You can build all using:

```bash
make build
```

or just build the home:

```bash
make home_build
```

or a specific survey's website:

```bash
make survey_build_2018
```

### Deploy

@todo

## Authors

StateOfJS is Made by:

- **Sacha Greif** Author of Discover Meteor and creator of VulcanJS,
  a React+GraphQL open-source framework.
- **Raphaël Benitte** Creator of the Nivo JavaScript data visualization library
  as well as Mozaik, a tool for building beautiful dashboards.
- **Michael Rambeau** Creator of Best of JavaScript, a platform that provides
  insights and resources about JavaScript libraries.

[travis-image]: https://img.shields.io/travis/StateOfJS/StateOfJS.svg?style=flat-square
[travis-url]: https://travis-ci.org/StateOfJS/StateOfJS
