import React from 'react'

export default class Newsletter extends React.Component {

  render () {
    return (
      <div className="newsletter">
        <div id="mc_embed_signup">
          <form action="//sachagreif.us2.list-manage.com/subscribe/post?u=b5af47765edbd2fc173dbf27a&amp;id=d8282e7e96" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <input type="email" placeholder="Your email" name="EMAIL" className="required email" id="mce-EMAIL"/>
            <input type="submit" value="Sign Up" name="subscribe" id="mc-embedded-subscribe" className="button"/>
          </form>
        </div>
      </div>
    )
  }
}
