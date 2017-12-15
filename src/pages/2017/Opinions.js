import React from 'react'
import DocumentTitle from 'react-document-title'
import Link from 'gatsby-link'
import TextBlock from '../../components/blocks/TextBlock'
import Newsletter from '../../components/common/Newsletter'
import getPageTitle from '../../helpers/getPageTitle'
import opinionsData from '../../data/opinions.json'
import OpinionBar from '../../components/charts/OpinionBar'

const text = `
To find out how developers view the current JavaScript ecosystem, we asked them how much
they agreed or disagreed with the following opinions. 
`

const Opinions = () => (
    <DocumentTitle title={getPageTitle('Opinions')}>
	    <div>
	        <TextBlock text={text} />
            {opinionsData.keys.map(opinion => (
                <div className="block block--chart" key={opinion}>
                    <h3 className="block__title">“{opinion}”</h3>
                    <OpinionBar opinion={opinion} />
                </div>
            ))}
	    </div>
    </DocumentTitle>
)

export default Opinions
