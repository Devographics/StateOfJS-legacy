import React, { Component } from 'react'
import shuffle from 'lodash/shuffle'
import { Repeat } from 'react-feather'
import comments from '../data/comments.json'

const getRandomComment = () => shuffle(comments)[0]

export default class RandomComment extends Component {
    state = {
        comment: getRandomComment()
    }

    shuffle = () => {
        this.setState({
            comment: getRandomComment()
        })
    }

    render() {
        const { comment } = this.state

        let location
        if (comment.city && comment.city !== 'undefined') {
            location = comment.city
        } else if (comment.location && comment.location !== 'undefined') {
            location = comment.location
        }

        return (
            <div>
                <h3 className="RandomComment__Title">
                    Random Comments
                    <span onClick={this.shuffle} className="noSelect RandomComment__Shuffle">
                        <Repeat size={20} />
                    </span>
                </h3>
                <div className="RandomComment">
                    <div className="RandomComment__Content">{comment.content}</div>
                </div>
                {location !== undefined && (
                    <div className="RandomComment__Location">from {location}</div>
                )}
            </div>
        )
    }
}
