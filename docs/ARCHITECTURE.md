# MVP Phases
## 1: The barest of bones
* A list of exercises that can be accessed via a page that lists them, similar to the admin page that lists users
* Users have a form-like page for creating new cards
* Cards have a table (as defined below), and CRUD endpoints.
* API tests for all crud endpoints

## 2: A bit fleshed out
* Separate lists for guitar, piano, vocals can be accessed by website. Filters by "instrument" field
* There is a public card table, which users can publish to. In the future publishes to the public table will be vetted
* Each user has their own private card table that they can publish to indiscriminately
* Delete register endpoints or make them admin/moderator only. User accounts can only be created by hand. This measure will remain in place until some for of automated spam account prevention e.g. email verification is implemented
* All endpoints must require, at a minimum, user auth. For now, we're just going to gate off the entire api so that only people with hand-made acconts can use

## 3: More fleshed out
* Rmember logins for X days
* Variables can be defined and rendered in  a user-friendly way. They can reference default variables.

## The distant future
* Create a default account to share with, for example, interviewers interested in my project.
* Expose a select number of endpoints publicly so that homies can try the app out
* Cards can be backed up and loaded from a file
    - A default list of cards is loaded upon startup
* Verify email to prevent spam accounts
* Reasonable limits for stored data that can be accessed indiscriminately
    - 5k cards per user
* Rudimentary security functionality
    - DoS prevention
    - Fuzz testing for API
* Variables can reference other local varialbes. Need to check for circular dependencies here


# Card
| Name | Description | Example | Data Type |
| - | - | - | - |
| id | A unique alphanumeric ID | “card_id_12345” | string
| Title | A brief title of the exercise to be displayed in large letters above the content, as well as the title used when viewing  cards in a list |“Play a random scale” | string 
| Tags | An array of tags used to classify cards or as search keywords | [“scales”, “random”, “drills”] | enum[]
| Difficulty | An estimated difficulty of the card, used to get an initial figure for how hard it should be | “Beginner” | enum (Beginner, Intermediate, Advanced, Expert)
| User difficulty | A number dictating how hard this card is either predicted to be, or has historically been for the user | 9 | integer (1-10)
| Links | An array of strings that describe relationships with other cards. Syntax for an element: "UUID_OF_OTHER:relationship"] | ["1234:prerequisite", "1234:similar", "5678:similar"] | string[]
| Content | The text content of the card. Contains keywords, delimited by curly braces as such: '{VAR_NAME}', which refer to local or global variables. | “Play a {FOO} scale” | string
| Variables | An array of strings that contain the names and definitions of variables. The default syntax is "VAR_NAME:value_string" Note that variables can reference other varialbes, as long as there's no circular dependency. There is a default library of variables provided by the site, which are used as the building blocks of variables. The syntax for this is "VAR_NAME:{SOME_OTHER_VAR}, Some variables can take arguments, in which case the syntax is "VAR_NAME:{SOME_OTHER_VAR(arg1, arg2, ...argn)}| [”FOO:Zaphod Beeblebrox”, "BAR:{RANDOM_NATURAL_NOTE}", "BAZ:{RANDOM_FROM_LIST("A", "B", "C")}"] | string[]
| private | If false, this card will be exposed in a user's public collection of cards. Defaults to false for all entries in the public table.| true | boolean

| URL | Verb | Parameter(s) | Permissions | Description |
| - | - | - | - | - | 
| /api/card/public | GET | URL <ul><li>`criteria` (string, optional): Search criteria; will only cards whos names contain this string</li><li>`page` (int) Page number</li><li>`size` (int) Page size</li></ul> | User | Returns a list of all cards in the public table, which can optionally be searched and/or paginated
| /api/card/public/:id | GET | | User | Returns the card with the given UUID in the public table
| /api/card/public/ | POST | request.body <ul><li>`title` (string) </li><li>`tags` (enum[]) </li><li>`Difficulty` (enum)</li><li>`Links` (string[])</li><li>`Content` (string)</li><li>`Variables` (string[])</li><li>`Private` (boolean)</li></ul>  | Moderator | Adds this card to the public table
| /api/card/public/:id | DELETE | | Moderator | Deletes the card with the given UUID from the public table
