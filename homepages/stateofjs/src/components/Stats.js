import React from 'react'
import stats from '../../../data/stats.yaml'

const Stats = () => (
    <div className="section section-layout-b stats">
        <h2 className="stats-heading">A Few Numbers</h2>
        <div className="stats-inner">
            {stats.map((stat, i) => (
                <div key={i} className="stat">
                    <div className="stat-count">{stat.count}</div>
                    <div className="stat-text">{stat.text}</div>
                </div>
            ))}
        </div>
    </div>
)

export default Stats
