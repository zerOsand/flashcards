# Tag-Based Flashcards

## Introduction

[Video](https://youtu.be/3lISPV7zsWs)

Tag-Based Flashcards is a project designed for CS520: Theory of Software Engineering class at the University of Massachusetts Amherst. In this project, we create a flashcard system that utilizes tags instead of decks.
In this program, users can add, delete, or update any flashcards they create. For each flashcard, the user can add any tags they wish to identify each flashcard. To make the process easier for the user, after adding tags to a flashcard and saving the flashcard, our system stores the previously used tags for the users to seamlessly create new cards without the need to update their tags each time.

After creating a set of cards, users can use our robust filtering system to filter out cards with logical operations such as NOT (`!`), AND (`%`), OR (`|`), and XOR (`^`). If users have more advanced search queries, our filter system also supports the use of paretheses.

Once a user has filtered their flashcards by their tags, they may click the `PRACTICE` button to practice the flashcards they filtered for. While practicing, users can `FLIP` the card to reveal the back of the card accompanied by the front of the card in red text. From here, users can use our flashcard feedback system by pressing the `AGAIN` or `GOOD` buttons at the bottom right of the practice screen. Clicking the `AGAIN` or `GOOD` buttons updates the flashcard's mastery level. A low enough mastery level will add a protected **learning** tag that the user cannot remove or add to any other card.

Users may also `EXPORT` or `IMPORT` their flashcards by clicking the arrow buttons to the left of the filter bar.

The purpose of using a tag-based system versus the traditional deck-based system arises from the flexibility that the tag-based system provides. Instead of being limited to fixed categories, tags allow users to organize and categorize their flashcards in multiple, intersecting ways. This enables a more dynamic and personalized approach to flashcard management, where users can apply and filter by any combination of tags to best suit their learning needs. Additionally, this system supports better scalability, allowing users to easily add and manage a vast number of flashcards without the constraints of predefined decks.

## Installation Instructions

1. Navigate to the **Flashcards/** directory in your terminal
2. Install the dependencies by running `npm install`.
3. Build the client with `npm run build` and follow the instructions provided.
4. After building the client and following the instructions after the previous terminal command, you should be able to run `serve -s build` to create a local server.
5. After running `serve -s build` to create a local server with the default port 3000, follow or paste the localhost link in your browser http://localhost:3000/ to access the homepage. 
6. To close the server, press CTRL+C in your terminal.

Note if the above does not work for you, consider running the development server:
`npm run start`

## Test The Client

To test the client, simply run the following command in your terminal after navigating to **Flashcards/**: `npm run test`.

See `/TESTS.ORG` for information on tests.

## Demo Flashcard Set

Here is a sample flashcard set that you can save as a JSON file.

```
[
  {
    "id": 5,
    "front": "Thor",
    "back": "The Norse God of Thunder and son of Odin, Thor wields the enchanted hammer Mjolnir, which grants him the ability to control lightning and fly. He is a powerful warrior and member of the Avengers, defending Earth from cosmic threats.",
    "tags": [
      "Asgard",
      "Avenger",
      "Hammer",
      "Marvel",
      "Warrior"
    ],
    "master": 0
  },
  {
    "id": 4,
    "front": "Black Panther",
    "back": "T'Challa is the king of Wakanda and the Black Panther, a warrior who possesses enhanced strength, agility, and senses from a heart-shaped herb. He also uses advanced technology, including the Vibranium suit, to protect his nation and the world.",
    "tags": [
      "Avenger",
      "Claws",
      "Marvel",
      "Masked",
      "Wakanda",
      "Warrior"
    ],
    "master": 0
  },
  {
    "id": 3,
    "front": "Captain America",
    "back": "Steve Rogers is a super-soldier enhanced by the \"Super Soldier Serum\" during World War II. He wields a vibranium shield and fights for justice, liberty, and the American way. He is a leader and key member of the Avengers.",
    "tags": [
      "Avenger",
      "Marvel",
      "NewYork",
      "Shield",
      "Warrior"
    ],
    "master": 0
  },
  {
    "id": 2,
    "front": "Iron Man",
    "back": "Tony Stark, a genius billionaire inventor, creates a suit of armor to escape captivity and uses it to fight against threats. His suit grants him enhanced strength, flight, and advanced weaponry. He is one of the founding members of the Avengers.",
    "tags": [
      "Avenger",
      "Lasers",
      "Marvel",
      "Masked",
      "NewYork"
    ],
    "master": 0
  },
  {
    "id": 1,
    "front": "Spider-Man",
    "back": "A teenager named Peter Parker gains superpowers after being bitten by a radioactive spider. His powers include wall-crawling, super agility, and a \"spider-sense\" for danger. He uses his intelligence to create web-shooters to swing through New York City.",
    "tags": [
      "Avenger",
      "Marvel",
      "Masked",
      "NewYork",
      "Webs"
    ],
    "master": 0
  }
]
```
