import React from 'react'
import { Twitter, Email, Facebook, LinkedIn } from './ShareChart'

const link = 'https://2018.stateofjs.com'
const title = 'Discover the StateOf JavaScript 2018 results'
const twitterText = `Discover the State Of JavaScript 2018 results ${link} #StateOfJS`
const subject = 'State Of JavaScript Survey Results'
const body = `Here are some interesting JavaScript survey results: ${link}`

const ShareSite = () => (
    <div className="ShareSite">
        <Twitter text={twitterText} />
        <Facebook link={link} />
        <LinkedIn link={link} title={title}/>
        <Email subject={subject} body={body} />
    </div>
)

export default ShareSite
