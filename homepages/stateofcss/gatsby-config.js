module.exports = {
    siteMetadata: {
        title: `The State Of CSS`
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'pages',
                path: `${__dirname}/src/pages`
            }
        },
        'gatsby-plugin-react-helmet',
        'gatsby-plugin-sass',
        'gatsby-plugin-netlify',
        'gatsby-plugin-eslint',
    ]
}
