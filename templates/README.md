# Style Guide on Crusaders Quest Database's JSON Format

Welcome! If you are reading this, you probably decided that you want to help contribute with data-entry for Fergus. Here are some guidelines on how to contribute properly:

1. Read this entire document **first**.
1. Message me for a `@Contributor` role.
2. Check `#tasks` to avoid working on something that is already claimed by another `@Contributer`.
3. Navigate to the appropriate hero template and then click the `Raw` button. Copy-paste the text into your preferred text editor and proceed with the data-entry.
4. Once a hero entry is fully complete, send the .txt file via private message.
8. If you ever get confused, refer to sample.txt or message me directly.

All contributors will be credited, no matter the scale of the contribution. Everything counts!

**Let's Make Fergus Great Again!**

## Naming

```
{
	"THIS": {
		...
	},
	"THIS": {
		...
	},
}
```

This section concerns where it says `"THIS"`:

- Lowercase all names.
  * e.g. `"Mandy"` → `"mandy"`, `"Niven"` → `"niven"`
- Remove all spaces.
  * e.g. `"B. Sworden"` → `"b.sworden"`, `"No. 9"` → `"no.9"`
- Notice, symbols are fine.
  * e.g. `"D'Artagnan"` → `"d'artagnan"`
- Single letter names, while weird, are also fine.
  * e.g. `"V"` → `"v"`, `"R"` → `"r"`

## Percentages

```
"form": [
	{
		"critChance": [THIS],
		"critDamage": [THIS],
		"accuracy": [THIS],
		"evasion": [THIS],
	},
]
```

This section concerns where it says `THIS`:

- Put the above stats in decimal form.
  * e.g. Crit.Chance 11.7 → `0.117`, Crit.Damage 120 → `1.2`
- Place a leading 0.
  * e.g. `0.25`, NOT `.25`
- Don't place trailing 0s.
  * e.g. `0.1`, NOT `0.10`

## Text

```
"": {
	"skillDescription": "THIS",
	"form": [
		{
			"background": "THIS",
			"skill": {
				"level": 3,
				"passive": "THIS"
			},
		},
	]
}
```

This section concerns where it says `THIS`:

- Copy the in-game text **AS IS**. This means: include all typos, missing
punctuations, incorrect grammar, etc; don't put your own interpretation of the
text.
