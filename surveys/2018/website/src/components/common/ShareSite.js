import React from 'react'
import { Twitter, Email, Facebook } from './ShareChart'

const link = 'https://2018.stateofjs.com'
const twitterText = `Discover the #StateOfJS 2018 results ${link}`
const subject = 'State Of JavaScript Survey Results'
const body = `Here are some interesting JavaScript survey results: ${link}`

const ShareSite = () => (
    <div className="ShareSite">
        <Twitter text={twitterText} />
        <Facebook link={link} />
        <Email subject={subject} body={body} />
    </div>
)

export default ShareSite
