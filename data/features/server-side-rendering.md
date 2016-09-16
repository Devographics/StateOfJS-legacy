The whole point of building JavaScript apps is to let the browser do the work, instead of requiring a round trip to the server every time you want to request new content. 

But as it turns out, the server can have its own role to play, too. **Server-side rendering** lets you generate your markup on the server and send a fully formed page to the client to speed up that critical first load, and it's also useful for SEO and accessibility. 

That being said, server-side rendering is most critical for public-facing sites (like this one!), rather than apps that sit behind a log-in screen for which SEO isn't such a big worry. Which might explain why most developers only see it as a nice-to-have. 