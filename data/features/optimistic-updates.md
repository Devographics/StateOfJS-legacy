A lot of the complexity of JavaScript apps come from handling client-server interactions, and this pattern is a perfect example of this. 

Rather than wait for the server whenever the client performs an operation, **optimistic updates** let you simulate the result on the client and display it immediately, fixing any conflicts later on in case the server operation ends up returning a different answer. 

While nice in theory, the complexities involved in setting this up properly with most frameworks make it a relatively low-popularity feature. 