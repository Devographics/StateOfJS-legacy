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
                path: `${__dirname}/src/pages/`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `data`,
                path: `${__dirname}/src/data/`
                //ignore: [`**/\.*`], // ignore files starting with a dot
            }
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-netlify'
        // 'gatsby-plugin-eslint',
    ]
}
