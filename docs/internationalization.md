# Internationalization

How to help translating StateOfJS?

First, if you're reading this doc, you're probably willing to help reaching a broader audience,
and we're really grateful for that!
You're actually about to help making this survey more accurate :)

> Note: for now only the 2018 survey supports i18n.

- [Structure](#structure)
- [Adding a new locale](#adding-a-new-locale)
- [Guidelines](#guidelines)

## Structure

You'll find the website's translation inside
`/surveys/<SURVEY_YEAR>/website/src/translations`,
the translations are defined by locale, you'll find both a folder containing markdown files (`/surveys/<SURVEY_YEAR>/website/src/translations/en-US` for example) along with a yaml file (`/surveys/<SURVEY_YEAR>/website/src/translations/en-US.yml` for example).

The available locales are defined in `/surveys/<SURVEY_YEAR>/config/locales.yml`, and must conform to this structure:

```yaml
# /surveys/<SURVEY_YEAR>/config/locales.yml
- locale: en-US
  path:   default # default means it's the default one
                  # and won't appear in the path
  label:  🇬🇧 english

- locale: fr-FR
  path:   fr # means paths will be prefixed with /fr
  label:  🇫🇷 français
```

> You MUST set exactly ONE default locale using `path` key

Let's say we have the 2018 website translated in 2 languages (`en-US` & `fr-FR`), we'll have the following structure:

```
surveys/
    2018/
        config/
            locales.yml # both en-US & fr-FR must be defined
        website/
            src/
                translations/
                    en-US/    # contains en-US markdown files
                    fr-FR/    # contains fr-FR markdown files
                    en-US.yml # contains generic en-US translations
                    fr-FR.yml # contains generic fr-FR translations
```

## Adding a new locale

In order to add a new locale, you'll have to

1. Add it to `/surveys/<SURVEY_YEAR>/config/locales.yml`
2. Duplicate existing translations to start from,
`/surveys/<SURVEY_YEAR>/website/src/translations/<LOCALE>/` and `/surveys/<SURVEY_YEAR>/website/src/translations/<LOCALE>.yml`
3. Translate :)
    3.1. Change the value of `t` inside the `/surveys/<SURVEY_YEAR>/website/src/translations/<LOCALE>.yml` file
    3.2. Update the markdown files' content in `/surveys/<SURVEY_YEAR>/website/src/translations/<LOCALE>/`, and adjust frontmatter block `locale` property with the one you're working on
4. Submit a PR, which should be reviewed by another person mastering the language as the core team doesn't speak tens of languages :)

> When a PR is submitted it gets automatically deployed on Netlify, which might help to review.

## Guidelines

It can be tempting to add your own opinion while translating (consciously or unconsciously), please try to stay as close as possible to the original content.

When pronouns are used: `I`, `me`, … please use an equivalent.

Do not modify units (`$`, `%`, …).

Tool names shouldn't be translated.
