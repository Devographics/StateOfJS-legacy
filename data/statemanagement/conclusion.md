### Conclusion

State management is an interesting category and I personally don't think the whole story has been told yet. I think there's a lot of experimentation to come, but given the numbers we see here, perhaps a large part of that will be built on *top* of Redux, rather than in opposition to it. 

In fact [Apollo](http://apollostack.com) (the cross-platform GraphQL client we are working on at [Meteor](http://meteor.com)) follows this exact strategy, building its state management capability directly on top of a Redux store. 

We think this makes sense, because it means the growing wealth of Redux tools (debuggers, developer tools, integrations) can be used with Apollo with no effort on our part. So it wouldn't surprise me if many more end up following this pattern.