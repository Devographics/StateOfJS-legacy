const fetch = require('node-fetch')

exports.normalizeGithubResource = res => {
    return {
        name: res.name,
        full_name: res.full_name,
        description: res.description,
        url: res.html_url,
        stars: res.stargazers_count,
        forks: res.forks,
        opened_issues: res.open_issues_count,
        homepage: res.homepage
    }
}

exports.fetchGithubResource = async ownerAndRepo => {
    try {
        const res = await fetch(`https://api.github.com/repos/${ownerAndRepo}`)
        const json = await res.json()

        return exports.normalizeGithubResource(json)
    } catch (error) {
        console.error(`an error occurred while fetching github resource`, error)
        throw error
    }
}
