12/12/22
- feel that I am understanding CSS and React a lot better than last week from spending so much time trying to figure out how to apply them in this project. I need to make sure to practice coding regularly so that I don't forget what I had learned in previous modules. I also feel comfortable with git commands now.
- today, I worked on figuring out how to display 3 venue cards on a row depending on what data is available. For example, I created 4 venues so the cards should show up as three on one row with the fourth on the next row. It was showing up as a single column of cards. I reviewed three lectures and couldn't find the section I was looking for; I'm sure it was there but I was probably reviewing the wrong videos. I looked at Conference Go to see how I had implemented the cards, but I wanted to use simpler code instead of using a for loop. I finally found the answer by looking at the book demo code, and the venue cards showed up horizontally the way I wanted them to but on four columns. After more trial and error, I realized I had to remove d-flex from the card's div tag so that it wouldn't squish the all the cards onto one row.
- created the review unit test that tests the get_all_accounts function and got it to pass
- found a lone form tag on the ExplorePage that seemed out of place. I had moved up some code sometime last week so I looked back at Rosario's old commit to see what the code was before. I realized I had left off the form tag when moving up the search boxes so I was able to correct that mistake. The search box is now clickable whereas previously it was completely unresponsive.

12/11/22
- worked on CSS for accounts, admin, explore, and request files. I couldn't figure out how to remove the modal header and footer lines for quite some time. After tinkering with the files countless times, I finally got it to work and pushed the changes. I also got stuck on trying to center the explore search boxes. I tried so many things and then finally realized that I had turned the search box and cards into a grid by putting the CSS class name in the parent div tag. Putting the class name in only the search box div tag made this work finally.
- put all the components of the admin dashboard into the AdminDash file but the page isn't loading at all. The bug is still allowing the website to run so I pushed the changes for now.

12/08/22
- let the team know that I haven't been progressing on the reviews front-end, so I've agreed to take over CSS while the rest of the team work on wrapping up the front-end
- consulted Dalonte and Riley on how to approach fixing our website design, and I feel that I have a good grasp of what needs to be done
- working on getting the CSS styling down for the ExplorePage modals first so that I can apply them to the other components later. The text boxes are located at the top of the page, so I'll bring them down lower along with the cards.

12/07/22
- after discussing with the team, changing ReviewIn isn't necessary due to the fact that it will take in the venue_id through the venues modal instead of having a separate reviews URL path
- working through bugs to get the reviews front-end to show up
- still unable to get reviews working

12/06/22
- working on the reviews modal. pretty frustrating that it still isn't working
- have a feeling that I'll need to change the ReviewIn model so that it takes in the venue name on the form since users won't know what the corresponding venue_ids are
- pushed code that should be mostly correct. still working through the bugs

12/05/22
- added get all reviews for username, and it's working in FastAPI
- still unable to get reviews modal to show properly. Muhammad says that the best way to learn is to work through trial and error
- pushed some placeholder code that doesn't affect other people's sections but will still help me to work with it in my local branch

12/02/22
- Muhammad suggested working with Rosario to get all reviews for venue to work with Rosario's venue modal component
- been working in ReviewForm.js to figure out how to get the review modal working
- completed a React tutorial which did not help me understand how to approach my specific problem

12/01/22
- after discussing with the team, I'll be responsible for the CSS for the home page. I'm excited to get better at CSS and gain a better understanding how to make website look nice
- spent the day going over the React hooks exploration and reading documentation
- still unsure on what my Review Form needs to look like, but I've started with the inputs I need
- didn't get to modals today so I'll review them tomorrow

11/30/22
- started working on the front-end of reviews. I don't remember much about React hooks from the previous exploration so I spent part of the day refreshing my memory. I put placeholder code for now in ReviewForm.js
- wanted to get some more practice with React and CSS so I looked through some Codepen styling submissions for inspiration. Lena and Rosario started on the home page, so I commented out their code and used a Codepen template that I liked. The template uses flexbox, which I need to read more about after I get my reviews front-end working
- also need to learn about modals tomorrow to incorporate that on the reviews page

11/29/22
- changed various parts of the reviews queries code and got different errors, which I'm working through to understand. Got a validation error and a type error
- pairprogrammed with Muhammad and found that I had the wrong except block on the get_all_reviews query
- also found that I added an unnecessary comma after the last SQL query column. I also needed additional arguments in the get_one_review_for_venue query
- all of the review queries and routers are finally working in FastAPI, and I'm in disbelief. Hope it still works tomorrow

11/28/22
- gained a better understanding of what needs to be done for the review inner joins by pairprogramming with Muhammad; reviews will have an inner joins with accounts and venues through their ids
- using trial and error to test out the reviews code in FastAPI. I added more fields in the ReviewOut model and SQL queries but I'm not sure where the bug is. I keep getting a validation error
- ended the day with the reviews code still not working

11/23/22
- after pushing my changes this morning, I realized that my reviews methods are showing up on FastAPI. I'm not exactly sure what caused the changed, but it may be due to updating main.py to include the reviews router after speaking to the team
- after discussing with Muhammad, I added the placeholder for the get_all_reviews method so that we will be able to filter by city and state later in queries and routers folders
- I feel that I am understanding queries and routers much better today than I did earlier this week

11/22/22
- still not feeling well
- talked to Lena and gained a much better understanding what needs to be done
- had previously renamed variables that I changed back to match the table
- still ended the day with reviews not showing up on the FastAPI page. Will ask the team tomorrow for help with the bug

11/21/22
- feeling sick today so not able to work at 100%
- spent the day trying to understand what code needs to go under queries and routers
- watched a tutorial but still unsure
- ended the day with reviews still not showing up on the FastAPI page

11/18/22
- the team discussed using Postgres instead of MongoDB due to MongoDB potentially being unable to handle the relationships between our models
- we have divided the work to complete queries and routers files, and I've been assigned the reviews. I struggled for a while to get the port 8000 docker container to work, and it turns out that I had been using the wrong git command
- I plan to review the FastAPI videos again to gain a better understanding

11/17/22
- the team moved forward with MongoDB, and we split up the queries and routers files. We spent the day filling out our files while Muhammad set up models.py
- I'm still getting more familiarized with Mongo and Postres, but I think I'm getting the hang of git in a group setting
- Muhammad mentioned that we may need to go back to Postres so we will visit that tomorrow

11/16/22
- reviewed the Trello workspace with the team, and everyone agreed to use it for project management
- the team chose to use Postres but after further discussion we may go with MongoDB. We will consult an instructor tomorrow regarding this
- we worked on mapping out the models in Excalidraw and then created SQL tables based on those models
- need to learn more about MongoDB tonight

11/15/22
- the team discussed whether we should put Accounts in its own microservice. We concluded that we'd like to consult Dalonte for this tomorrow. We also discussed whether we should use Postgres or MongoDB, and we are leaning towards Postgres
- reviewed exploration materials for user stories and created a Trello workspace for Travel Squared that contains the user stories, bug tracker, and stand-up board we'll use daily. Each board has a sample post in case someone isn't sure what to write. I plan to review all of the boards and receive feedback from the team tomorrow

11/14/22
- in the D5 exploration, learned about user stories, Agile methodologies, and bug tracking
- reviewed our previous night's exploration on FastAPI
- tomorrow, we should agree on a project management system with bug tracking and how to prioritize our work
- last Thursday, I pushed my updates to doc/api-design.md
