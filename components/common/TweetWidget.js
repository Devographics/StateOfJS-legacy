import React from 'react'
import classNames from 'classnames'

export default class TweetWidget extends React.Component {

  constructor (props) {
    super(props)
    // subtract 23 because all twitter URLs take up 23 chars
    // subtract 3 to account for spaces and "#" sign
    this.state = ({
      charsLeft: (140 - 23 - props.text.length - props.hashtag.length - 3),
      isDanger: false,
      value: `${props.text} ${props.url} #${props.hashtag}`
    })
    this.handleChange = this.handleChange.bind(this)
    this.buildTwitterLink = this.buildTwitterLink.bind(this)
  }

  handleChange (event) {
    const input = event.target.value
    const extraChars = this.props.url.length - 23
    const charsRemaining = 140 + extraChars - input.length

    this.setState({
      charsLeft: charsRemaining,
      isDanger: charsRemaining <= 0,
      value: input,
    })
  }

  buildTwitterLink () {
    const referrer = encodeURIComponent('http://stateofjs.com')

    return `https://twitter.com/intent/tweet?original_referer=${referrer}&text=${encodeURIComponent(this.state.value)}`
  }

  render () {
    return (
      <div className="tweet-widget">
        <div className="tweet-widget-textarea">
          <textarea onChange={this.handleChange} value={this.state.value} />
          <span className={classNames('tweet-widget-count', { danger: this.state.isDanger })}>{this.state.charsLeft}</span>
        </div>
        <a href={this.buildTwitterLink()} className="button">Tweet It!</a>
      </div>
    )
  }
}

TweetWidget.propTypes = {
  text: React.PropTypes.string,
  url: React.PropTypes.string,
  hashtag: React.PropTypes.string,
}
