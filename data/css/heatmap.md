Although it might seem like Plain CSS comes out on top, we find something interesting when we look at the correlation values of the heatmap.

According to the chart, there's a strong correlation between using plain CSS and not using a JavaScript framework for your client-side code; and conversely, using SASS means you're more likely to also use a front-end frameworks.

### CSS in React

React stands out from its competition as it offers the most options when it comes to writing CSS. Apart from CSS Modules, there's also newcomer Aphrodite, a clean way to write CSS in JavaScript and embed styles in individual UI components. This method was popularized by React Native and early frameworks like Radium.

Of course, React developers always have the choice of falling back on more standard frameworks like SASS. But things get complicated for developers who build tools and libraries for React.

For example, we sometimes have a hard time with CSS when building [React Storybook](https://github.com/kadirahq/react-storybook), an open-source UI component dev environment for React.

Storybook allow developers to choose their own CSS framework by simply adding a new webpack loader. But for Storybook itself, it can't rely on a CSS framework since it doesn't know which framework the user is going to use. So the CSS used to style the app is based on "CSS in JS", since that works everywhere.

In short: if you want to build portable React components that can be used in any React app, CSS in JavaScript is your best bet.
