import React from 'react'
import Award from '../elements/Award'
import awards from '../../data/awards.yaml'

const AwardsBlock = () => (
    <div className="Block Block--Awards Awards__Block">
        {awards.map(award => (
            <Award key={award.heading} {...award} />
        ))}
    </div>
)

export default AwardsBlock
