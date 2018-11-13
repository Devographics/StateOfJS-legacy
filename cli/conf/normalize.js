exports.globalOpinionsSubjectNormalizers = {
    'JavaScript is moving in the right direction': 'js_moving_in_right_direction',
    'Building JavaScript apps is overly complex right now': 'building_js_apps_overly_complex',
    'JavaScript is over-used online': 'js_over_used_online',
    'I enjoy building JavaScript apps': 'enjoy_building_js_apps',
    'I would like JavaScript to be my main programming language': 'would_like_js_to_be_main_lang',
    'The JavaScript ecosystem is changing too fast': 'js_ecosystem_changing_to_fast',
    'This survey is too damn long!': 'survey_too_long',
}

exports.sourceNormalizers = [
    // twitter
    [/twii?t/i, 'twitter'],
    [/twee?t/i, 'twitter'],

    // email
    [/e?mail/i, 'email'],
    [/e-mail/i, 'email'],
    [/subscribed/i, 'email'],
    [/subscription/i, 'email'],
    // assuming people who did it before fall into the 'email' category
    [/(previous|last|every) (year|survey)/i, 'email'],
    [/it before/i, 'email'],

    // stateofjs
    [/state ?of ?js/i, 'stateofjs'],

    // bestofjs
    [/best ?of ?\.?js/i, 'bestofjs'],

    // js weekly
    [/javascript ?weekly/i, 'js_weekly'],
    [/js ?weekly/i, 'js_weekly'],

    // ionic newsletter
    [/ionic/i, 'ionic_newsletter'],

    // freecodecamp
    [/free ?code ?camp/i, 'freecodecamp'],

    // newsletter
    [/newsletter/i, 'newsletter'],

    // reddit
    [/redd?it/i, 'reddit'],
    [/r3dd1t/i, 'reddit'],
    [/\/?r\/(javascript|clojure|reactjs|angular|webdev|programming)/i, 'reddit'],
    [/\/?r\/clojure/i, 'reddit'],

    // hacker news
    [/hacker ?news/i, 'hn'],
    [/hacknews/i, 'hn'],
    [/hckrnews/i, 'hn'],
    [/hn/i, 'hn'],
    [/ycombinator/i, 'hn'],

    // medium
    [/med(iu|ui)m/i, 'medium'],

    // work
    [/work/i, 'work'],
    [/cto/i, 'work'],
    [/coworkers?/i, 'work'],
    [/co workers?/i, 'work'],
    [/co-workers?/i, 'work'],
    [/coll?ea?gu?a?es?/i, 'work'],
    [/fellow/i, 'work'],
    [/company/i, 'work'],

    // post
    [/post/i, 'post'],
    [/blog/i, 'post'],
    [/article/i, 'post'],

    // wesbos
    [/we(s|b) ?br?o(s|z)/i, 'wesbos'],
    [/wes the bos/i, 'wesbos'],
    [/^wes$/i, 'wesbos'],

    // codrops
    [/codrops/i, 'codrops'],
    [/codedrops/i, 'codrops'],
    [/tympanus/i, 'codrops'],

    // elm slack
    [/elm/i, 'elm_slack'],

    // facebook
    [/facebook/i, 'facebook'],
    [/fb/i, 'facebook'],

    [/slack/i, 'slack'],
    [/telegram/i, 'telegram'],
    [/friends?/i, 'friend'],
    [/slashdot/i, 'slashdot'],
]
