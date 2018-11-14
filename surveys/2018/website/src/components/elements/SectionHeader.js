import React from 'react'
// import PeriodicTableElementHtml from '../elements/PeriodicTableElementHtml'
import withPageData from '../../helpers/withPageData'

const SectionHeader = ({ currentPage, showIntro = false }) => (
    <div className="SectionHeader">
        {/*
        <div>
            <PeriodicTableElementHtml
                size={150}
                name={currentPage.section.label}
                symbol={"Fe"}
                number={7}
            />
        </div>
        */}
        {currentPage && (
            <div>
                <div className="SectionHeader__Header">
                    <h2 className="SectionHeader__Title">{currentPage.title}</h2>
                </div>
                {showIntro && <div dangerouslySetInnerHTML={{ __html: currentPage.intro }} />}
            </div>
        )}
    </div>
)

export default withPageData(SectionHeader)
