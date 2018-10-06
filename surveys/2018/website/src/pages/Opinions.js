import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import getPageTitle from '../helpers/getPageTitle'
import opinionsData from '../data/opinions.json'
import OpinionBar from '../components/charts/OpinionBar'
import Layout from '../components/common/Layout'

const text = `
To find out how developers view the current JavaScript ecosystem, we asked them how much
they agreed or disagreed with the following opinions. 
`

const Opinions = (props) => (
    <Layout {...props} title={getPageTitle('Opinions')}>
        <div>
            <TextBlock text={text} />
            {opinionsData.keys.map(opinion => (
                <div className="block block--chart" key={opinion}>
                    <h3 className="block__title">“{opinion}”</h3>
                    <OpinionBar opinion={opinion} />
                </div>
            ))}
        </div>
    </Layout>
)

export default Opinions
