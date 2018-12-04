import React from 'react'
import Award from './Award'
import staticAwards from 'data/static_awards.yml'

const AwardsBlock = ({ data }) => {
    const highestSatisfaction = data.find(d => d.type === 'highest_satisfaction')
    const highestInterest = data.find(d => d.type === 'highest_interest')
    const highestUsage = data.find(d => d.type === 'highest_usage')
    const mostMentioned = data.find(d => d.type === 'most_mentioned')

    return (
        <div className="Block Block--Awards Awards__Block">
            <Award type="highest_satisfaction" tools={highestSatisfaction.tools} />
            <Award type="highest_interest" tools={highestInterest.tools} />
            <Award type="most_mentioned" tools={mostMentioned.tools} />
            <Award type="highest_usage" tools={highestUsage.tools} />
            <Award type="prediction" tools={staticAwards.prediction} />
            <Award type="special" tools={staticAwards.special} />
        </div>
    )
}

export default AwardsBlock
