ScoreCenter

Author: McCall Bliss
Created: 3/31/13
Last Modified: 3/31/13

1. Correctly Implented:
	- 

2. Worked With:
	- 

3. Time Spent:
	-

OBJECTIVES

1. Develop a server-side web application using Heroku, Node.js, and the Express web framework.
2. Enable and use Cross-Origin Resource Sharing (CORS).
3. Read and write data to a Mongo database.
4. Build a JSON-based API.

REQUIREMENTS

1. A POST API /submit.json - Allows any HTML5 game on any web domain to send high scores to your web application. The mandatory fields and exact field names for this API are game_title, username, and score. Cross-origin resource sharing must be enabled for this API else an HTML5 game from another domain cannot send score.

2. A GET API /highscores.json - Returns the top 10 scores in descending order and as a JSON string (array of objects) for a specified game. The mandatory parameter for this API is game_title. 

Example: /highscores.json?game_title=frogger returns the top 10 scores in descending order for the game "frogger". 
Example output: 
[{"gametitle":"frogger","username":"batman","score":"86","created_at":"Sun Mar 24 2013 23:51:58 GMT-0400 (EDT)","_id":"514fc9deb7cda6f604000003"},{"gametitle":"frogger","username":"batman","score":"46","created_at":"Sun Mar 24 2013 22:56:43 GMT-0400 (EDT)","_id":"514fbceb8a831df401000009"},{"gametitle":"frogger","username":"batman","score":"32","created_at":"Sun Mar 24 2013 22:52:01 GMT-0400 (EDT)","_id":"514fbbd18a831df401000006"}]. Cross-origin resource sharing must be enabled for this API else an HTML5 game from another domain cannot retrieve high scores.

3. / - Home, the root, the index. Accessing http://yourappname.heroku.com on a web browser shall display list of all the scores for all games. You are free to design this section however you desire.

4. /usersearch - Search for a username. This page shall have at (at the very least) one textbox to enter username and a submit button. Clicking on the submit button will display a list of all the high scores for all games for the specified username. List of scores for username can either be displayed on the same page as the textbox or on a new page. You are free to design this section however you desire.