import React, { Component } from 'react'

export default class Opinions extends Component {
    render() {
        return (
            <div className="Section">
                <h2 className="SectionTitle">
                    <span>Opinions</span>
                </h2>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        className="description"
                        style={{
                            width: '47%',
                            marginBottom: 50,
                        }}
                    >
                        <p>
                            Cold, hard data is valuable, but sometimes you just want to know how
                            somebody feels.
                        </p>
                        <p>
                            This is why for this section, I asked developers if they disagreed (1),
                            were neutral (3), or agreed (5) with the following statements.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
