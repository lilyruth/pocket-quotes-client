# Pocket Quotes!!

This React Native project retrieves quotes from the quotable.io API. I am very grateful for this service. I also want to apologize for the one time I did the API call without useEffect just to see what would happen and for 5 seconds your server got spammed. Thank you for not IP banning me. I promise I caught it as quickly as I could. It was also a very memorable demonstration as to why useEffect is needed.

I have not yet added token authentication to the project. There is hashing and salting in the backend for registration and login, so no actual passwords are stored anywhere. 

I'm attempting to use best practices but I threw this together in a week with very little sleep so it's sloppy as hell. Working on improving it. I use Redux Toolkit to manage if the user is logged in or not for the protected routes and adding favorites. 

Formik is used to manage form inputs. I learned more about writing API calls through both using Formik and reading documentation and then simply writing the API calls with fetch. Again, the code is messy.  

Favorite quotes can be added to a user's account and this is managed through MongoDB. I hate that everything is an iteration of the to-do list. I want more variety than that. But it is an excellent metaphor for life so there's that.

I do think I want to release a version of this but I think for actual deployment perhaps using Redux Toolkit and local storage will make more sense than using Mongo since it's a small-scale project. This is something I have to continue to research. 

I would like to express my appreciation for To The Point Code, Net Ninja and Codedamn YouTube channels. These all helped a great deal in areas where I was struggling, which, let's be honest, was around 80% of the time. The times I wasn't struggling was because I was playing with colors or fonts. Those are a LOT of fun. Final shout-out goes to those who wrote all the fabulous documentation. My goal is to someday be amazing enough to write documentation like that. 

I'll practice by writing rambling READMEs after an intense week of project cramming. 

To sum up, I really did enjoy this project, and it's not over by a mile. I'm glad I went out of my comfort zone (pretty CSS & vanilla JavaScript). Doing this has really helped me have a better understanding of CRUD as well as development processes. Ideate, code then iterate. And when things go inexplicably wrong, breathe, and keep at it. And make to-do lists, even for the to-do lists. 

