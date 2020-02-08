

STEP 2
i create a mongo db where the sheet looks like this

sheet {
team_name: "bobs burgers"
team_members: [
"honkiss",
"emaw",
"rangerfain"
],
tiles: [
	{
		boss_name: zulrah
		boss_image: zulrah.jpg
		tile_challenge: "get 3 unique zulrah drops"
		submission: {
			playername: Honkito
			date :123
			url: imgur.com/dicks
		}
	}
]
}

STEP 3 
Create endpoints to create sheets, update sheets, delete sheets
Create endpoint to update a tile in a sheet, (use id of sheet to access a private page)


STEP 4 
Create frontend and route of id thats given to players, will fetch their sheet and display it + submission form

STEP 5 
Create public frontend that displays all sheets/teams, in order of tiles completed.
Glorify the #1 spot and put the last spot in a poopoo corner.
make sure this scales at least somewhat but fuck mobile


STEP 6 
figure out how to host it cheap 