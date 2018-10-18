const ignoreFiles = ['**/charts.yml', '**/nav.yaml', '**/wording.yml']

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
                //ignore: [`**/\.*`], // ignore files starting with a dot
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `content`,
                path: `${__dirname}/src/content/`,
                ignore: ignoreFiles
                //ignore: [`**/\.*`], // ignore files starting with a dot
            }
        },
        `gatsby-transformer-remark`,
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-netlify'
        // 'gatsby-plugin-eslint',
    ]
}
