import React from 'react'
import TextBlock from '../components/blocks/TextBlock'
import Newsletter from '../components/common/Newsletter'
import getPageTitle from '../helpers/getPageTitle'
import Layout from '../components/common/Layout'

const conclusionText = `
Believe it or not, we've only just scratched the surface. Each library and tool
mentioned here could easily be further sub-divided into lists of plugins, packages, 
add-ons, and other extensions. 

There's also more we could do with the data we already have. For example, we've yet to analyze
the results we collected on which app features devs value the most, and their opinions
about the general state of the language. We'll work on these extra results in the coming weeks and 
let you know as soon as they're ready. 

In any case, just like last year our overall conclusion remains the same: JavaScript keeps
improving and evolving at an ever-increasing pace. This is a bit scary, but it's also exciting: after all, you know that learning JavaScript
is never going to get boring!

So what will the future bring? Will typed JavaScript become mainstream? Will GraphQL really take 
over the world? Will JavaScript "flavors" like Reason or Elm become the default 
way of coding? There's only one way to find out: tune in next year for #StateOfJS 2018!

<span class="conclusion__byline">– Sacha, Raphaël, and Michael</span>
`

const newsletterText = `
If you'd like to know when we release additional results or announce next year's edition, just leave us your email below:
`

const Conclusion = (props) => (
    <Layout {...props} title={getPageTitle('Conclusion')}>
        <div>
            <TextBlock text={conclusionText} />

            <div className="block block--newsletter">
                <TextBlock title="Stay Tuned" text={newsletterText} />
                <Newsletter />
            </div>
        </div>
    </Layout>
)

export default Conclusion
