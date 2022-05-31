jRecently, I wrote a blog post about validating your http responses using
Typescript. After a lengthy discussion with some colleagues, I came to the 
conclusion that this should only be done in exceptional cases.

The main reasoning NOT to validate all of your http-responses was that there are 
other ways to make sure your incoming data is correct AND that it's generally
better to reduce the amount of code shipped to the client. 
Other ways to handle http-response validation is to use contract testing or to 
build a backend-for-frontend and handle validations there. 