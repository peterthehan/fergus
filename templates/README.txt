*******************************************************************************
STYLE GUIDE ON CRUSADERS QUEST DATABASE'S JSON FORMAT
*******************************************************************************
Resources can be found: https://github.com/Johj/fergus/tree/master/templates

If you're going to help with doing data-entry, do the following:
1.  Read through the rest of this short document first before doing anything.
    If you ever get confused, refer to sample.txt or message me directly.
2.  Check #tasks to make sure you didn't choose a hero already claimed by
    another @Contributor.

Click the desired hero template and then click the "Raw" button. Copy-paste the
text into your desired text editor and proceed to enter data.

Please send me an attached txt file through private message only after you
fully complete a hero entry. I will double-check the data before adding it to
the database.

I will make sure to credit all contributors, no matter how small the
contribution.

Let's Make Fergus Great Again!

*******************************************************************************
This section concerns where it says THIS:
{
	"THIS": {
	...
	},
}

Lowercase all names.
e.g. "Mandy" -> "mandy"

Remove all spaces.
e.g. "B. Sworden" -> "b.sworden", "No. 9" -> "no.9"

Notice, symbols are fine.
e.g. "D'Artagnan" -> "d'artagnan"

Single letter names, while weird, are also fine.
e.g. "V" -> "v", "R" -> "r"

*******************************************************************************
This section concerns where it says THIS:
"form": [
	{
		...
		"critChance": [THIS],
		"critDamage": [THIS],
		"accuracy": [THIS],
		"evasion": [THIS],
		...
	},
]

Put the above stats in decimal form.
e.g. 11.7 crit. chance -> 0.117, 120 crit. damage -> 1.2

Place a leading 0.
e.g. 0.25, NOT .25

Don't place trailing 0s.
e.g. 0.1, NOT 0.10

*******************************************************************************
This section concerns where it says THIS:
"": {
	...
	"skillDescription": "THIS",
	...
	"form": [
		{
			...
			"background": "THIS",
			"skill": {
				"level": 3,
				"passive": "THIS"
			},
			...
		},
		...
	]
}

Copy the ingame text "AS IS". This means: include all typos, missing
punctuations, incorrect grammar, etc; don't put your own interpretation of the
text.

*******************************************************************************
