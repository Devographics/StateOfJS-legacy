'use strict'

exports.experience = {
    "I've never heard of it": 'not_heard',
    "I've HEARD of it, and am NOT interested": 'heard_not_interested',
    "I've HEARD of it, and WOULD like to learn it": 'heard_would_learn',
    "I've USED it before, and would NOT use it again": 'used_would_not_use',
    "I've USED it before, and WOULD use it again": 'used_would_use',
}

exports.feature = [
    "I don't know what that is",
    'Not needed',
    'Nice-to-have, but not important',
    'Major feature',
    'Vital feature',
]

const castNumber = value => Number(value)

const ignore = [
    ' ',
    '\n',
    '\n\n',
    '/',
    '\\',
    '*',
    '+',
    '-',
    '—',
    'n/a',
    'N/A',
    'NA',
    'None',
    'none',
    'no',
]
const cleanupFreeValue = value => (ignore.includes(value) ? null : value)

/**
 * Normalize value according to given set of rules.
 * Rules is an array of patterns & normalized values.
 *
 * @param {Array.<Array>} rules
 * @return {Function} Normalize function bound to given rules
 */
const normalize = rules => _value => {
    // exclude empty values
    const value = cleanupFreeValue(_value)
    if (value === null) return null

    // loop over rules and return normalized value if some matches
    for (let rule of rules) {
        const [pattern, normalized] = rule
        if (value.match(pattern) !== null) {
            //console.log(`normalized ${value} to ${normalized}`)
            return normalized
        }
    }

    // returns original value if not empty and does not match any rule
    return value
}

exports.response = {
    properties: {
        // Hidden
        location: { type: 'keyword' },
        device: { type: 'keyword' },
        browser: { type: 'keyword' },
        version: { type: 'keyword' },
        os: { type: 'keyword' },
        city: { type: 'keyword' },
        referrer: { type: 'keyword' },

        // Front-End frameworks
        React: { type: 'keyword' },
        Angular: { type: 'keyword' },
        'Angular 2': { type: 'keyword' },
        Ember: { type: 'keyword' },
        Vue: { type: 'keyword' },
        Backbone: { type: 'keyword' },
        Polymer: { type: 'keyword' },
        Aurelia: { type: 'keyword' },
        'No Front-End Framework': { type: 'keyword' },
        'Other Front-End Frameworks': {
            type: 'keyword',
            transform: normalize([
                [/preact/i, 'Preact'],
                [/elm/i, 'elm'],
                [/cycle/i, 'Cycle.js'],
                [/knockout/i, 'Knockout'],
                [/jquery/i, 'jQuery'],
                [/mithril/i, 'Mithril'],
                [/inferno/i, 'Inferno'],
                [/(meteor|blaze)/i, 'Meteor'],
                [/riot/i, 'Riot'],
                [/ext/i, 'ext.js'],
                [/svelte/i, 'Svelte'],
                [/om/i, 'om'],
                [/choo/i, 'Choo'],
                [/hyperapp/i, 'hyperapp'],
                [/dojo/i, 'dojo'],
                [/reason/i, 'Reason'],
                [/alkali/i, 'alkali'],
                [/marionette/i, 'marionette'],
                [/kendo/i, 'Kendo'],
                [/marko/i, 'marko'],
                [/reagent/i, 'reagent'],
                [/haxe/i, 'haxe'],
                [/ampersand/i, 'ampersand'],
                [/rxjs/i, 'RxJS'],
                [/canjs/i, 'canjs'],
                [/prototype/i, 'prototype'],
                [/mootools/i, 'mootools'],
                [/glimmer/i, 'glimmer'],
                [/durandal/i, 'durandal'],
                [/moon/i, 'moon'],
                [/batman/i, 'batman'],
                [/flight/i, 'flight'],
                [/scala/i, 'scala'],
                [/webix/i, 'webix'],
                [/enyo/i, 'enyo'],
                [/quasar/i, 'quasar'],
                [/vanilla/i, 'vanilla javascript'],
                [/d3/i, 'd3'],
                [/three/i, 'ThreeJS'],
                [/cerebral/i, 'cerebral'],
                [/feathers/i, 'feathers'],
                [/angular/i, 'Angular'],
                [/underscore/i, 'underscore'],
                [/bootstrap/i, 'Bootstrap'],
            ]),
        },
        'On a scale of one to five cats, how happy are you with your current solution for the front-end?': {
            type: 'short',
            transform: castNumber,
        },

        // Flavors
        '"Plain" JavaScript (ES5)': { type: 'keyword' },
        ES6: { type: 'keyword' },
        TypeScript: { type: 'keyword' },
        Flow: { type: 'keyword' },
        Elm: { type: 'keyword' },
        ClojureScript: { type: 'keyword' },
        Reason: { type: 'keyword' },
        'On a scale of one to five dogs, how happy are you with your current flavor of JavaScript?': {
            type: 'short',
            transform: castNumber,
        },

        // State management
        'REST API': { type: 'keyword' },
        Redux: { type: 'keyword' },
        MobX: { type: 'keyword' },
        GraphQL: { type: 'keyword' },
        'Relay/Relay Modern': { type: 'keyword' },
        Falcor: { type: 'keyword' },
        Apollo: { type: 'keyword' },
        Firebase: { type: 'keyword' },
        'Other Data Management Solutions': {
            type: 'keyword',
            transform: normalize([
                [/vuex/i, 'VueX'],
                [/flux/i, 'Flux'],
                [/pouch/i, 'PouchDB'],
                [/ngrx/i, 'NgRx'],
                [/graph\.?cool/i, 'graph.cool'],
                [/rxjs/i, 'RxJS'],
                [/parse/i, 'Parse'],
                [/meteor/i, 'Meteor'],
                [/realm/i, 'realm'],
                [/gun/i, 'Gun.js'],
                [/cycle/i, 'Cycle.js'],
                [/couchbase/i, 'couchbase'],
                [/horizon/i, 'horizon'],
                [/elm/i, 'elm'],
                [/datomic/i, 'datomic'],
                [/deployd/i, 'deployd'],
                [/hood\.?ie/i, 'hoodie'],
                [/kinvey/i, 'kinvey'],
                [/immutable/i, 'ImmutableJS'],
                [/kinto/i, 'kinto'],
                [/cerebral/i, 'cerebral'],
                [/mongo/i, 'MongoDB'],
                [/contentful/i, 'Contentful'],
                [/mysql/i, 'MySQL'],
                [/redis/i, 'Redis'],
                [/ember( |-|\.)?data/i, 'Ember Data'],
                [/rethink/i, 'RethinkDB'],
            ]),
        },
        'On a scale of one to five thunderbolts, how happy are you with your current solution for state management?': {
            type: 'short',
            transform: castNumber,
        },

        // Back-end solutions
        Meteor: { type: 'keyword' },
        Express: { type: 'keyword' },
        Koa: { type: 'keyword' },
        Hapi: { type: 'keyword' },
        FeathersJS: { type: 'keyword' },
        Sails: { type: 'keyword' },
        Loopback: { type: 'keyword' },
        Keystone: { type: 'keyword' },
        'Other Back-End Tools': {
            type: 'keyword',
            transform: normalize([
                [/^node$|node\.?js|node js/i, 'Node.js'],
                [/asp\. ?net|c#|\.net|dotnet/i, '.NET'],
                [/django/i, 'django'],
                [/rails|ruby on rails/i, 'Rails'],
                [/php/i, 'PHP'],
                [/restify/i, 'restify'],
                [/adonis/i, 'adonis'],
                [/python/i, 'python'],
                [/^go$|golang/i, 'golang'],
                [/java/i, 'java'],
                [/laravel/i, 'laravel'],
                [/elixir/i, 'elixir'],
                [/next\.?js/i, 'next.js'],
                [/scala/i, 'Scala'],
                [/couchdb/i, 'CouchDB'],
                [/trails/i, 'trails'],
                [/kraken/i, 'Kraken'],
                [/serverless/i, 'serverless'],
                [/graphql/i, 'GraphQL'],
                [/clojure/i, 'clojure'],
                [/socket\.?io/i, 'socket.io'],
                [/micro/i, 'micro'],
                [/firebase/i, 'firebase'],
                [/haskell/i, 'haskell'],
            ]),
        },
        'On a scale of one to five trophies, how happy are you with your current back-end solution?': {
            type: 'short',
            transform: castNumber,
        },

        // Testing
        Mocha: { type: 'keyword' },
        Jasmine: { type: 'keyword' },
        Enzyme: { type: 'keyword' },
        Jest: { type: 'keyword' },
        Tape: { type: 'keyword' },
        Ava: { type: 'keyword' },
        'Other testing frameworks': {
            type: 'keyword',
            transform: normalize([
                [/qunit/i, 'Qunit'],
                [/karma/i, 'karma'],
                [/chai/i, 'chai'],
                [/protractor/i, 'protractor'],
                [/selenium/i, 'selenium'],
                [/nightwatch/i, 'nightwatch'],
                [/elm-test/i, 'elm-test'],
                [/tap/i, 'tap'],
                [/cucumber/i, 'cucumber'],
                [/sinon/i, 'sinon'],
                [/intern/i, 'intern'],
                [/ava/i, 'AVA'],
                [/lab/i, 'lab'],
                [/testcafe/i, 'testcafe'],
                [/junit/i, 'junit'],
                [/jest/i, 'jest'],
                [/cypress/i, 'cypress'],
                [/phantom/i, 'PhantomJS'],
            ]),
        },
        'On a scale of one to five severed hands, how happy are you with the current state of JavaScript testing?': {
            type: 'short',
            transform: castNumber,
        },

        // Styling
        'Plain CSS': { type: 'keyword' },
        'SASS/SCSS': { type: 'keyword' },
        Stylus: { type: 'keyword' },
        LESS: { type: 'keyword' },
        'CSS-in-JS': { type: 'keyword' },
        Bootstrap: { type: 'keyword' },
        Foundation: { type: 'keyword' },
        'Other CSS solutions': {
            type: 'keyword',
            transform: normalize([
                [/atomic/i, 'atomic design'],
                [/bem/i, 'BEM'],
                [/materialize/i, 'materialize'],
                [/post( |-|\.)?css/i, 'PostCSS'],
                [/bulma/i, 'Bulma'],
                [/semantic/i, 'semantic UI'],
                [/css( |\.|-)?modules/i, 'CSS modules'],
                [/tach\.+on/i, 'Tachyons'],
                [/material design/i, 'material design'],
                [/css\.?next/i, 'CSSnext'],
                [/pure\.?css/i, 'PureCSS'],
                [/skeleton/i, 'skeleton'],
                [/material\.?ui/i, 'Material UI'],
                [/styled\.?components/i, 'styled components'],
                [/bourbon/i, 'bourbon'],
                [/mill?igram/i, 'milligram'],
                [/uikit/i, 'uikit'],
                [/flexbox/i, 'flexbox'],
                [/topocoat/i, 'topocoat'],
                [/glamor/i, 'glamor'],
                [/radium/i, 'radium'],
                [/aphrodite/i, 'aphrodite'],
                [/styletron/i, 'styletron'],
                [/jss/i, 'JSS'],
                [/mdl/i, 'mdl'],
                [/vuetify/i, 'vuetify'],
                [/materiali(z|s)e/i, 'materialize'],
            ]),
        },
        'On a scale of one to five lightbulbs, how happy are you with the current state of CSS?': {
            type: 'short',
            transform: castNumber,
        },

        // Build
        Webpack: { type: 'keyword' },
        Grunt: { type: 'keyword' },
        Gulp: { type: 'keyword' },
        Browserify: { type: 'keyword' },
        NPM: { type: 'keyword' },
        Rollup: { type: 'keyword' },
        'Other build tools': {
            type: 'keyword',
            transform: normalize([
                [/yarn/i, 'yarn'],
                [/brunch/i, 'Brunch'],
                [/make/i, 'GNU Make'],
                [/broccoli|brocolli/i, 'Broccoli'],
                [/bower/i, 'Bower'],
                [/jspm/i, 'jspm'],
                [/fusebox/i, 'fusebox'],
                [/meteor/i, 'Meteor'],
                [/systemjs/i, 'SystemJS'],
                [/gradle/i, 'gradle'],
                [/stealjs/i, 'StealJS'],
                [/gulp/i, 'gulp'],
                [/babel/i, 'Babel'],
            ]),
        },
        'On a scale of one to five droplets, how happy are you with the current state of build tools?': {
            type: 'short',
            transform: castNumber,
        },

        // Mobile
        'Native Apps': { type: 'keyword' },
        'React Native': { type: 'keyword' },
        Ionic: { type: 'keyword' },
        'PhoneGap/Cordova': { type: 'keyword' },
        NativeScript: { type: 'keyword' },
        Electron: { type: 'keyword' },
        'On a scale of one to five pencils, how happy are you with the current state of mobile apps?': {
            type: 'short',
            transform: castNumber,
        },

        // Generic tools
        'Package Managers': {
            type: 'keyword',
            transform: normalize([
                [/yarn/i, 'yarn'],
                [/npm/i, 'npm'],
                [/nuget/i, 'Nuget'],
                [/composer/i, 'Composer'],
                [/elm/i, 'elm-package'],
                [/jspm/i, 'jspm'],
                [/pnpm/i, 'pnpm'],
                [/meteor/i, 'Meteor'],
                [/homebrew|brew/i, 'Homebrew'],
                [/leiningen/i, 'Leiningen'],
                [/maven/i, 'Maven'],
            ]),
        },
        'Utility Libraries': {
            type: 'keyword',
            transform: normalize([
                [/immutable/i, 'ImmutableJS'],
                [/lodash/i, 'lodash'],
                [/jquery/i, 'jQuery'],
                [/Moment/i, 'moment'],
                [/rxjs/i, 'RxJS'],
                [/underscore/i, 'underscore'],
                [/ramda/i, 'Ramda'],
                [/axios/i, 'axios'],
                [/recompose/i, 'recompose'],
                [/^react$/i, 'React'],
                [/zepto/i, 'Zepto'],
                [/async/i, 'async'],
            ]),
        },
        'Text Editors': {
            type: 'keyword',
            transform: normalize([
                [/atom/i, 'Atom'],
                [/webstorm/i, 'WebStorm'],
                [/phpstorm/i, 'PHPStorm'],
                [/intellij/i, 'IntelliJ'],
                [/sublime/i, 'Sublime Text'],
                [/vim/i, 'Vim'],
                [/emacs/i, 'Emacs'],
                [/brackets/i, 'Brackets'],
                [/Visual Studio/, 'Visual Studio'],
                [/notepad/i, 'Notepad++'],
                [/netbeans/i, 'Netbeans'],
                [/coda/i, 'Coda'],
            ]),
        },
        'Code Linters': {
            type: 'keyword',
            transform: normalize([
                [/prettier/i, 'Prettier'],
                [/eslint/i, 'eslint'],
                [/tslint/i, 'tslint'],
                [/stylelint/i, 'Stylelint'],
                [/jshint/i, 'JSHint'],
                [/standardjs/i, 'StandardJS'],
                [/jscs/i, 'JSCS'],
                [/jslint/i, 'JSLint'],
                [/xo/i, 'XO'],
            ]),
        },

        // Features
        'Server-Side Rendering': { type: 'keyword' },
        'Code Splitting': { type: 'keyword' },
        'Optimistic Updates': { type: 'keyword' },
        'Hot Module Reloading': { type: 'keyword' },
        'Time-Travel Debugging': { type: 'keyword' },
        'Real-Time Operations': { type: 'keyword' },
        'Dead Code Elimination': { type: 'keyword' },
        'Progressive Enhancement': { type: 'keyword' },
        'Service Workers': { type: 'keyword' },
        'Offline Usage': { type: 'keyword' },
        'Other Features': {
            type: 'keyword',
            transform: cleanupFreeValue,
        },

        // Opinions
        'JavaScript is moving in the right direction': {
            type: 'short',
            transform: castNumber,
        },
        'Building JavaScript apps is overly complex right now': {
            type: 'short',
            transform: castNumber,
        },
        'JavaScript is over-used online': {
            type: 'short',
            transform: castNumber,
        },
        'I enjoy building JavaScript apps': {
            type: 'short',
            transform: castNumber,
        },
        'I would like JavaScript to be my main programming language': {
            type: 'short',
            transform: castNumber,
        },
        'The JavaScript ecosystem is changing too fast': {
            type: 'short',
            transform: castNumber,
        },
        'This survey is too damn long!': {
            type: 'short',
            transform: castNumber,
        },

        'Years of Experience': {
            type: 'keyword',
        },
        'Company Size': {
            type: 'keyword',
        },
        'Yearly Salary': {
            type: 'keyword',
        },
        'Tabs or Spaces?': {
            type: 'keyword',
        },
        'Semicolons: Yes or No?': {
            type: 'keyword',
        },
        //'How did you find out about this survey?': {},
        //'Your Email': {},
        //'Other Comments': {},
    },
}
