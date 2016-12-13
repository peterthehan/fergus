*******************************************************************************
STYLE GUIDE ON CRUSADERS QUEST DATABASE (CQDB) JSON FORMAT
*******************************************************************************
Please read through this short document first before doing anything.
If you EVER get confused, refer to sample.txt or message me directly.

Please send me your data as an attached .txt file only after you fully complete
a hero entry. I will double-check before adding it to the database.

I will make sure to credit all contributors, no matter how small the
contribution. Let's Make Fergus Great Again!

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

Put these stats in decimal form.
e.g. Hero has 11.7 crit. chance -> 0.117
		 Hero has 120 crit. damage -> 1.2

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

Copy the text "AS IS". This means: include all typos, missing punctuations,
incorrect grammar, etc; don't put your own interpretation of the text.

*******************************************************************************
