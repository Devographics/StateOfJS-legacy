const ignoreFiles = ['**/wording.yml']

module.exports = {
    siteMetadata: {
        title: `The State Of JavaScript`
    },
    plugins: [
        'gatsby-transformer-yaml',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages/`,
                ignore: ignoreFiles
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data/`,
                ignore: ignoreFiles
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `translations`,
                path: `${__dirname}/src/translations/`,
                ignore: ignoreFiles
            }
        },
        `gatsby-transformer-remark`,
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-netlify'
    ]
}
