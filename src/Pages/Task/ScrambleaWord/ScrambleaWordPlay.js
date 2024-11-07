import React, { useEffect, useState } from "react";
import "./ScrambleaWordPlay.css";
import logo from "../../../assets/images/coinlogo.png";
import { userGameRewards } from "../../../apis/user";
import useUserInfo from "../../../Hooks/useUserInfo";
import cancelIcon from "../../../assets/Task/cancelicon.png";
import scramble from "./ScrambleaWord";

const gameData = [
  {
    word: "DOLPHIN",
    letters: ["P", "O", "H", "L", "N", "D", "I"],
    hint: "AN INTELLIGENT MARINE MAMMAL",
    answer: "DOLPHIN",
  },
  {
    word: "MOUNTAIN",
    letters: ["U", "M", "O", "T", "A", "N", "I", "N"],
    hint: "A LARGE LAND ELEVATION",
    answer: "MOUNTAIN",
  },
  {
    word: "RAINBOW",
    letters: ["N", "I", "B", "O", "R", "W", "A"],
    hint: "COLORFUL ARC IN THE SKY",
    answer: "RAINBOW",
  },
  {
    word: "AIRPLANE",
    letters: ["A", "I", "P", "R", "N", "L", "E", "A"],
    hint: "FLIES IN THE SKY",
    answer: "AIRPLANE",
  },
  {
    word: "ZEBRA",
    letters: ["Z", "A", "B", "R", "E"],
    hint: "ANIMAL WITH BLACK AND WHITE STRIPES",
    answer: "ZEBRA",
  },
  {
    word: "OCEAN",
    letters: ["N", "C", "E", "O", "A"],
    hint: "LARGE BODY OF SALTWATER",
    answer: "OCEAN",
  },
  {
    word: "MIRROR",
    letters: ["M", "R", "R", "I", "O", "R"],
    hint: "REFLECTIVE SURFACE",
    answer: "MIRROR",
  },
  {
    word: "SUNFLOWER",
    letters: ["S", "U", "F", "L", "N", "W", "O", "R", "E"],
    hint: "TALL YELLOW FLOWER",
    answer: "SUNFLOWER",
  },
  {
    word: "CAROUSEL",
    letters: ["C", "S", "L", "A", "E", "R", "O", "U"],
    hint: "MERRY-GO-ROUND",
    answer: "CAROUSEL",
  },
  {
    word: "CLOUD",
    letters: ["C", "L", "O", "U", "D"],
    hint: "FLUFFY SKY FORMATION",
    answer: "CLOUD",
  },
  {
    word: "GUITAR",
    letters: ["G", "I", "T", "R", "A", "U"],
    hint: "STRING INSTRUMENT",
    answer: "GUITAR",
  },
  {
    word: "JUNGLE",
    letters: ["J", "L", "U", "N", "G", "E"],
    hint: "DENSE FOREST",
    answer: "JUNGLE",
  },
  {
    word: "SUNSET",
    letters: ["S", "T", "N", "U", "S", "E"],
    hint: "EVENING SKY COLORATION",
    answer: "SUNSET",
  },
  {
    word: "CHERRY",
    letters: ["H", "R", "C", "E", "R", "Y"],
    hint: "SMALL RED FRUIT",
    answer: "CHERRY",
  },
  {
    word: "SATELLITE",
    letters: ["S", "A", "L", "T", "T", "E", "E", "I", "L"],
    hint: "ORBITS A PLANET",
    answer: "SATELLITE",
  },
  {
    word: "SPARROW",
    letters: ["P", "R", "S", "A", "R", "O", "W"],
    hint: "SMALL BIRD",
    answer: "SPARROW",
  },
  {
    word: "MARATHON",
    letters: ["M", "H", "A", "R", "N", "O", "A", "T"],
    hint: "LONG-DISTANCE RACE",
    answer: "MARATHON",
  },
  {
    word: "LANTERN",
    letters: ["L", "A", "N", "T", "R", "E", "N"],
    hint: "PORTABLE LIGHT",
    answer: "LANTERN",
  },
  {
    word: "CANDLE",
    letters: ["C", "L", "E", "A", "D", "N"],
    hint: "WAX LIGHT SOURCE",
    answer: "CANDLE",
  },
  {
    word: "UNICORN",
    letters: ["U", "I", "R", "C", "O", "N", "N"],
    hint: "MYTHICAL HORSE WITH A HORN",
    answer: "UNICORN",
  },
  {
    word: "BALLOON",
    letters: ["B", "L", "L", "N", "O", "O", "A"],
    hint: "FLOATING PARTY DECORATION",
    answer: "BALLOON",
  },
  {
    word: "BICYCLE",
    letters: ["B", "Y", "C", "L", "I", "C", "E"],
    hint: "TWO-WHEELED VEHICLE",
    answer: "BICYCLE",
  },
  {
    word: "ISLAND",
    letters: ["S", "A", "L", "N", "D", "I"],
    hint: "LAND SURROUNDED BY WATER",
    answer: "ISLAND",
  },
  {
    word: "DIAMOND",
    letters: ["D", "M", "I", "A", "O", "D", "N"],
    hint: "PRECIOUS GEMSTONE",
    answer: "DIAMOND",
  },
  {
    word: "MONSOON",
    letters: ["M", "O", "N", "N", "S", "O", "O"],
    hint: "SEASONAL RAINSTORM",
    answer: "MONSOON",
  },
  {
    word: "ORANGE",
    letters: ["R", "N", "G", "E", "A", "O"],
    hint: "CITRUS FRUIT",
    answer: "ORANGE",
  },
  {
    word: "DINOSAUR",
    letters: ["N", "O", "S", "D", "U", "A", "R", "I"],
    hint: "EXTINCT REPTILE",
    answer: "DINOSAUR",
  },
  {
    word: "BUTTERFLY",
    letters: ["B", "U", "T", "T", "R", "F", "L", "Y", "E"],
    hint: "INSECT WITH COLORFUL WINGS",
    answer: "BUTTERFLY",
  },
  {
    word: "FOUNTAIN",
    letters: ["T", "N", "O", "I", "F", "U", "A", "N"],
    hint: "WATER FEATURE",
    answer: "FOUNTAIN",
  },
  {
    word: "TREASURE",
    letters: ["R", "S", "A", "T", "R", "U", "E", "E"],
    hint: "VALUABLE ITEMS",
    answer: "TREASURE",
  },
  {
    word: "SNOWFLAKE",
    letters: ["S", "N", "O", "W", "F", "A", "L", "K", "E"],
    hint: "UNIQUE ICE CRYSTAL",
    answer: "SNOWFLAKE",
  },
  {
    word: "CANYON",
    letters: ["C", "N", "A", "O", "Y", "N"],
    hint: "DEEP VALLEY",
    answer: "CANYON",
  },
  {
    word: "SUNSHINE",
    letters: ["S", "U", "N", "S", "I", "E", "H", "N"],
    hint: "LIGHT FROM THE SUN",
    answer: "SUNSHINE",
  },
  {
    word: "SCORPION",
    letters: ["P", "I", "R", "S", "O", "N", "C", "O"],
    hint: "ARACHNID WITH A STINGER",
    answer: "SCORPION",
  },
  {
    word: "LADDER",
    letters: ["D", "E", "A", "L", "D", "R"],
    hint: "CLIMBING TOOL",
    answer: "LADDER",
  },
  {
    word: "WIZARD",
    letters: ["W", "I", "R", "A", "Z", "D"],
    hint: "SPELLCASTER",
    answer: "WIZARD",
  },
  {
    word: "PARROT",
    letters: ["P", "O", "R", "T", "R", "A"],
    hint: "COLORFUL TALKING BIRD",
    answer: "PARROT",
  },
  {
    word: "MERMAID",
    letters: ["M", "E", "D", "A", "I", "R", "M"],
    hint: "HALF-WOMAN, HALF-FISH",
    answer: "MERMAID",
  },
  {
    word: "ROCKET",
    letters: ["O", "R", "E", "C", "T", "K"],
    hint: "SPACE VEHICLE",
    answer: "ROCKET",
  },
  {
    word: "DRAGON",
    letters: ["D", "A", "G", "R", "N", "O"],
    hint: "FIRE-BREATHING CREATURE",
    answer: "DRAGON",
  },
  {
    word: "TIGER",
    letters: ["T", "G", "R", "E", "I"],
    hint: "STRIPED BIG CAT",
    answer: "TIGER",
  },
  {
    word: "SCULPTURE",
    letters: ["S", "R", "U", "E", "P", "T", "L", "C", "U"],
    hint: "ART IN 3D FORM",
    answer: "SCULPTURE",
  },
  {
    word: "MYSTERY",
    letters: ["M", "Y", "S", "T", "E", "R", "Y"],
    hint: "UNSOLVED PUZZLE",
    answer: "MYSTERY",
  },
  {
    word: "HELICOPTER",
    letters: ["H", "C", "L", "E", "R", "T", "P", "I", "O", "E"],
    hint: "FLYING VEHICLE WITH ROTORS",
    answer: "HELICOPTER",
  },
  {
    word: "LIGHTHOUSE",
    letters: ["G", "H", "T", "H", "U", "L", "I", "S", "E", "O"],
    hint: "COASTAL WARNING BEACON",
    answer: "LIGHTHOUSE",
  },
  {
    word: "SEAHORSE",
    letters: ["E", "R", "H", "O", "E", "S", "A", "S"],
    hint: "SMALL MARINE FISH",
    answer: "SEAHORSE",
  },
  {
    word: "ASTRONAUT",
    letters: ["A", "T", "O", "T", "S", "R", "U", "N", "A"],
    hint: "SPACE TRAVELER",
    answer: "ASTRONAUT",
  },
  {
    word: "FERRIS",
    letters: ["R", "R", "F", "S", "E", "I"],
    hint: "WHEEL AT A CARNIVAL",
    answer: "FERRIS",
  },
  {
    word: "PEACOCK",
    letters: ["C", "O", "A", "K", "E", "C", "P"],
    hint: "BIRD WITH EYE-SPOTTED TAIL",
    answer: "PEACOCK",
  },
  {
    word: "METEOR",
    letters: ["M", "O", "T", "R", "E", "E"],
    hint: "SHOOTING STAR",
    answer: "METEOR",
  },
  {
    word: "PYTHON",
    letters: ["P", "N", "Y", "O", "T", "H"],
    hint: "LARGE CONSTRICTOR SNAKE",
    answer: "PYTHON",
  },
  {
    word: "BUNGALOW",
    letters: ["B", "A", "N", "G", "O", "L", "U", "W"],
    hint: "SINGLE-STORY HOUSE",
    answer: "BUNGALOW",
  },
  {
    word: "GOBLIN",
    letters: ["G", "L", "O", "B", "I", "N"],
    hint: "MISCHIEVOUS CREATURE",
    answer: "GOBLIN",
  },
  {
    word: "MUSEUM",
    letters: ["M", "S", "U", "M", "E", "U"],
    hint: "PLACE TO SEE ARTIFACTS",
    answer: "MUSEUM",
  },
  {
    word: "ROULETTE",
    letters: ["R", "T", "L", "E", "O", "E", "U", "T"],
    hint: "CASINO GAME",
    answer: "ROULETTE",
  },
  {
    word: "BALLET",
    letters: ["B", "E", "T", "L", "A", "L"],
    hint: "CLASSICAL DANCE",
    answer: "BALLET",
  },
  {
    word: "JUPITER",
    letters: ["U", "I", "J", "T", "P", "E", "R"],
    hint: "LARGEST PLANET",
    answer: "JUPITER",
  },
  {
    word: "CIRCUS",
    letters: ["C", "R", "I", "C", "S", "U"],
    hint: "ENTERTAINMENT TENT",
    answer: "CIRCUS",
  },
  {
    word: "TOURIST",
    letters: ["T", "U", "O", "R", "I", "S", "T"],
    hint: "TRAVELER ON VACATION",
    answer: "TOURIST",
  },
  {
    word: "ROBOT",
    letters: ["R", "B", "O", "O", "T"],
    hint: "MACHINE THAT PERFORMS TASKS",
    answer: "ROBOT",
  },
  {
    word: "PHOENIX",
    letters: ["P", "I", "X", "H", "E", "N", "O"],
    hint: "MYTHICAL BIRD THAT RISES FROM ASHES",
    answer: "PHOENIX",
  },
  {
    word: "PRINCESS",
    letters: ["S", "N", "R", "I", "P", "C", "E", "S", "S"],
    hint: "ROYAL FEMALE",
    answer: "PRINCESS",
  },
  {
    word: "CARNIVAL",
    letters: ["C", "I", "N", "A", "V", "R", "A", "L"],
    hint: "FAIR WITH RIDES AND GAMES",
    answer: "CARNIVAL",
  },
  {
    word: "EAGLE",
    letters: ["G", "E", "L", "A", "E"],
    hint: "BIRD OF PREY",
    answer: "EAGLE",
  },
  {
    word: "WILLOW",
    letters: ["L", "L", "O", "I", "W", "W"],
    hint: "TREE WITH DROOPING BRANCHES",
    answer: "WILLOW",
  },
  {
    word: "HORIZON",
    letters: ["Z", "O", "R", "O", "N", "I", "H"],
    hint: "WHERE EARTH MEETS SKY",
    answer: "HORIZON",
  },
  {
    word: "DRAGONFLY",
    letters: ["R", "O", "D", "G", "N", "L", "A", "Y", "F"],
    hint: "INSECT WITH LONG BODY AND WINGS",
    answer: "DRAGONFLY",
  },
  {
    word: "MANDARIN",
    letters: ["R", "A", "D", "M", "A", "N", "I", "N"],
    hint: "TYPE OF ORANGE",
    answer: "MANDARIN",
  },
  {
    word: "BLIZZARD",
    letters: ["B", "A", "Z", "L", "D", "I", "Z", "R"],
    hint: "SEVERE SNOWSTORM",
    answer: "BLIZZARD",
  },
  {
    word: "MYSTIC",
    letters: ["Y", "M", "T", "S", "C", "I"],
    hint: "ENIGMATIC, SPIRITUAL",
    answer: "MYSTIC",
  },
  {
    word: "NARWHAL",
    letters: ["N", "R", "H", "W", "A", "A", "L"],
    hint: "ARCTIC WHALE WITH A TUSK",
    answer: "NARWHAL",
  },
  {
    word: "SPHINX",
    letters: ["S", "X", "P", "H", "N", "I"],
    hint: "EGYPTIAN MYTHICAL CREATURE",
    answer: "SPHINX",
  },
  {
    word: "KOI",
    letters: ["K", "O", "I"],
    hint: "JAPANESE FISH",
    answer: "KOI",
  },
  {
    word: "GOBLET",
    letters: ["B", "L", "G", "O", "T", "E"],
    hint: "DRINKING VESSEL",
    answer: "GOBLET",
  },
  {
    word: "PYGMY",
    letters: ["G", "M", "Y", "Y", "P"],
    hint: "SHORT IN STATURE",
    answer: "PYGMY",
  },
  {
    word: "CUPID",
    letters: ["P", "C", "I", "D", "U"],
    hint: "MYTHICAL LOVE ARCHER",
    answer: "CUPID",
  },
  {
    word: "LAGOON",
    letters: ["L", "O", "O", "G", "N", "A"],
    hint: "SHALLOW BODY OF WATER",
    answer: "LAGOON",
  },
  {
    word: "TOUCAN",
    letters: ["O", "C", "T", "N", "A", "U"],
    hint: "BIRD WITH A LARGE BEAK",
    answer: "TOUCAN",
  },
  {
    word: "ZUCCHINI",
    letters: ["C", "H", "Z", "I", "U", "C", "N", "I"],
    hint: "GREEN VEGETABLE",
    answer: "ZUCCHINI",
  },
  {
    word: "ANCHOR",
    letters: ["N", "A", "O", "C", "H", "R"],
    hint: "KEEPS A SHIP IN PLACE",
    answer: "ANCHOR",
  },
  {
    word: "RUBY",
    letters: ["U", "Y", "R", "B"],
    hint: "RED GEMSTONE",
    answer: "RUBY",
  },
  {
    word: "BEEHIVE",
    letters: ["V", "H", "I", "B", "E", "E", "E"],
    hint: "HOME FOR HONEYMAKERS",
    answer: "BEEHIVE",
  },
  {
    word: "PIZZA",
    letters: ["Z", "Z", "P", "A", "I"],
    hint: "ITALIAN DISH WITH CHEESE AND SAUCE",
    answer: "PIZZA",
  },
  {
    word: "LION",
    letters: ["I", "L", "O", "N"],
    hint: "KING OF THE JUNGLE",
    answer: "LION",
  },
  {
    word: "TUNNEL",
    letters: ["N", "U", "E", "T", "N", "L"],
    hint: "UNDERGROUND PASSAGE",
    answer: "TUNNEL",
  },
  {
    word: "EQUATOR",
    letters: ["U", "T", "A", "O", "E", "Q", "R"],
    hint: "DIVIDES EARTH INTO TWO HEMISPHERES",
    answer: "EQUATOR",
  },
  {
    word: "PENGUIN",
    letters: ["G", "N", "P", "E", "U", "I", "N"],
    hint: "FLIGHTLESS ANTARCTIC BIRD",
    answer: "PENGUIN",
  },
  {
    word: "MOSQUITO",
    letters: ["O", "S", "T", "I", "M", "Q", "U", "O"],
    hint: "INSECT THAT BITES",
    answer: "MOSQUITO",
  },
  {
    word: "PUMPKIN",
    letters: ["K", "M", "I", "N", "P", "P", "U"],
    hint: "COMMONLY CARVED DURING HALLOWEEN",
    answer: "PUMPKIN",
  },
  {
    word: "COCONUT",
    letters: ["N", "O", "C", "C", "U", "O", "T"],
    hint: "TROPICAL FRUIT WITH HARD SHELL",
    answer: "COCONUT",
  },
  {
    word: "VIOLIN",
    letters: ["I", "O", "N", "V", "L", "I"],
    hint: "STRING INSTRUMENT PLAYED WITH A BOW",
    answer: "VIOLIN",
  },
  {
    word: "PINEAPPLE",
    letters: ["P", "P", "E", "L", "I", "N", "A", "P", "E"],
    hint: "TROPICAL FRUIT WITH SPIKY SKIN",
    answer: "PINEAPPLE",
  },
  {
    word: "SUBMARINE",
    letters: ["R", "A", "S", "B", "E", "N", "M", "U", "I"],
    hint: "VESSEL THAT TRAVELS UNDERWATER",
    answer: "SUBMARINE",
  },
  {
    word: "AVOCADO",
    letters: ["V", "O", "C", "O", "D", "A", "A"],
    hint: "CREAMY GREEN FRUIT",
    answer: "AVOCADO",
  },
  {
    word: "VAMPIRE",
    letters: ["V", "I", "M", "A", "P", "E", "R"],
    hint: "MYTHICAL CREATURE THAT DRINKS BLOOD",
    answer: "VAMPIRE",
  },
  {
    word: "PYRAMID",
    letters: ["Y", "P", "M", "D", "A", "R", "I"],
    hint: "ANCIENT STRUCTURE IN EGYPT",
    answer: "PYRAMID",
  },
  {
    word: "ORCHID",
    letters: ["C", "O", "I", "D", "H", "R"],
    hint: "EXOTIC BLOOMING PLANT",
    answer: "ORCHID",
  },
  {
    word: "SAPPHIRE",
    letters: ["R", "P", "A", "P", "S", "H", "I", "E"],
    hint: "PRECIOUS BLUE STONE",
    answer: "SAPPHIRE",
  },
  {
    word: "GAZELLE",
    letters: ["E", "L", "A", "Z", "L", "G", "E"],
    hint: "SWIFT ANTELOPE",
    answer: "GAZELLE",
  },
  {
    word: "SEQUOIA",
    letters: ["S", "U", "Q", "O", "I", "A", "E"],
    hint: "TALL REDWOOD TREE",
    answer: "SEQUOIA",
  },
  {
    word: "CROISSANT",
    letters: ["S", "C", "N", "O", "I", "R", "S", "A", "T"],
    hint: "FRENCH PASTRY",
    answer: "CROISSANT",
  },
  {
    word: "ALMOND",
    letters: ["L", "O", "N", "A", "D", "M"],
    hint: "NUT USED IN SNACKS AND MILK",
    answer: "ALMOND",
  },
  {
    word: "LIZARD",
    letters: ["D", "A", "R", "L", "Z", "I"],
    hint: "REPTILE WITH FOUR LEGS",
    answer: "LIZARD",
  },
  {
    word: "IGLOO",
    letters: ["G", "O", "L", "O", "I"],
    hint: "DOME-SHAPED SHELTER MADE OF ICE",
    answer: "IGLOO",
  },
  {
    word: "MYSTERY",
    letters: ["Y", "M", "T", "R", "E", "Y", "S"],
    hint: "SOMETHING THAT BAFFLES",
    answer: "MYSTERY",
  },
  {
    word: "JASMINE",
    letters: ["A", "E", "J", "M", "S", "I", "N"],
    hint: "FRAGRANT FLOWER",
    answer: "JASMINE",
  },
  {
    word: "CENTAUR",
    letters: ["N", "T", "C", "U", "A", "E", "R"],
    hint: "MYTHICAL CREATURE HALF-MAN, HALF-HORSE",
    answer: "CENTAUR",
  },
  {
    word: "CAMEL",
    letters: ["M", "A", "L", "C", "E"],
    hint: "DESERT-DWELLING ANIMAL WITH HUMP",
    answer: "CAMEL",
  },
  {
    word: "UMBRELLA",
    letters: ["L", "R", "A", "E", "U", "M", "B", "L"],
    hint: "KEEPS YOU DRY IN RAIN",
    answer: "UMBRELLA",
  },
  {
    word: "SNOWMAN",
    letters: ["S", "W", "N", "N", "A", "M", "O"],
    hint: "WINTER FIGURE MADE OF FROZEN WATER",
    answer: "SNOWMAN",
  },
  {
    word: "TRICERATOPS",
    letters: ["T", "R", "C", "E", "T", "P", "O", "R", "A", "S", "I"],
    hint: "THREE-HORNED DINOSAUR",
    answer: "TRICERATOPS",
  },
  {
    word: "KITE",
    letters: ["K", "T", "I", "E"],
    hint: "FLIES HIGH IN THE SKY",
    answer: "KITE",
  },
  {
    word: "PISTACHIO",
    letters: ["C", "P", "S", "I", "A", "T", "H", "O", "I"],
    hint: "GREEN NUT WITH HARD SHELL",
    answer: "PISTACHIO",
  },
  {
    word: "DINGO",
    letters: ["O", "I", "N", "D", "G"],
    hint: "WILD DOG OF AUSTRALIA",
    answer: "DINGO",
  },
  {
    word: "NEPTUNE",
    letters: ["E", "T", "N", "U", "P", "E", "N"],
    hint: "ROMAN GOD OF THE SEA",
    answer: "NEPTUNE",
  },
  {
    word: "VENUS",
    letters: ["S", "U", "E", "N", "V"],
    hint: "PLANET KNOWN AS THE MORNING STAR",
    answer: "VENUS",
  },
  {
    word: "AMETHYST",
    letters: ["A", "M", "T", "S", "Y", "E", "T", "H"],
    hint: "PURPLE GEMSTONE",
    answer: "AMETHYST",
  },
  {
    word: "WALNUT",
    letters: ["T", "N", "L", "A", "U", "W"],
    hint: "NUT USED IN BAKING AND COOKING",
    answer: "WALNUT",
  },
  {
    word: "BUFFALO",
    letters: ["F", "L", "A", "U", "F", "B", "O"],
    hint: "LARGE, HEAVY CATTLE-LIKE ANIMAL",
    answer: "BUFFALO",
  },
  {
    word: "STEGOSAURUS",
    letters: ["S", "T", "S", "E", "G", "U", "O", "A", "S", "R", "U"],
    hint: "DINOSAUR WITH PLATES ON ITS BACK",
    answer: "STEGOSAURUS",
  },
  {
    word: "MANGROVE",
    letters: ["R", "A", "G", "M", "O", "E", "V", "N"],
    hint: "COASTAL TREE WITH ROOTS ABOVE WATER",
    answer: "MANGROVE",
  },
  {
    word: "RACCOON",
    letters: ["N", "R", "C", "A", "O", "O", "C"],
    hint: "NOCTURNAL ANIMAL WITH A MASK-LIKE FACE",
    answer: "RACCOON",
  },
  {
    word: "BARNACLE",
    letters: ["B", "E", "N", "A", "R", "L", "A", "C"],
    hint: "SMALL SEA CREATURE THAT ATTACHES TO SURFACES",
    answer: "BARNACLE",
  },
  {
    word: "LADYBUG",
    letters: ["A", "G", "B", "L", "U", "Y", "D"],
    hint: "SMALL RED BEETLE WITH BLACK SPOTS",
    answer: "LADYBUG",
  },
  {
    word: "OYSTER",
    letters: ["T", "R", "S", "E", "O", "Y"],
    hint: "BIVALVE THAT MAKES PEARLS",
    answer: "OYSTER",
  },
  {
    word: "PLATYPUS",
    letters: ["U", "P", "A", "T", "S", "L", "Y", "P"],
    hint: "AUSTRALIAN MAMMAL THAT LAYS EGGS",
    answer: "PLATYPUS",
  },
  {
    word: "WOLVERINE",
    letters: ["N", "O", "V", "I", "R", "E", "L", "E", "W"],
    hint: "POWERFUL, FIERCE MAMMAL",
    answer: "WOLVERINE",
  },
  {
    word: "ANACONDA",
    letters: ["C", "N", "O", "D", "A", "A", "N", "A"],
    hint: "LARGE SOUTH AMERICAN SNAKE",
    answer: "ANACONDA",
  },
  {
    word: "GORILLA",
    letters: ["L", "I", "O", "R", "L", "A", "G"],
    hint: "LARGEST LIVING PRIMATE",
    answer: "GORILLA",
  },
  {
    word: "SHARK",
    letters: ["A", "K", "S", "H", "R"],
    hint: "FIERCE PREDATOR OF THE OCEAN",
    answer: "SHARK",
  },
  {
    word: "NARWHAL",
    letters: ["A", "R", "L", "W", "N", "A", "H"],
    hint: "MARINE MAMMAL WITH A TUSK",
    answer: "NARWHAL",
  },
  {
    word: "QUICKSAND",
    letters: ["S", "U", "C", "K", "A", "N", "I", "D", "Q"],
    hint: "TRAP OF LOOSE, WATER-SATURATED SAND",
    answer: "QUICKSAND",
  },
  {
    word: "KANGAROO",
    letters: ["O", "K", "G", "R", "A", "O", "A", "N"],
    hint: "ANIMAL KNOWN FOR HOPPING",
    answer: "KANGAROO",
  },
  {
    word: "TORTOISE",
    letters: ["I", "T", "S", "O", "R", "O", "T", "E"],
    hint: "SLOW-MOVING REPTILE",
    answer: "TORTOISE",
  },
  {
    word: "RAVEN",
    letters: ["R", "N", "A", "E", "V"],
    hint: "LARGE BLACK BIRD",
    answer: "RAVEN",
  },
  {
    word: "MUSHROOM",
    letters: ["O", "H", "M", "M", "U", "R", "S", "O"],
    hint: "FUNGI OFTEN USED IN COOKING",
    answer: "MUSHROOM",
  },
  {
    word: "QUARTZ",
    letters: ["A", "T", "R", "U", "Z", "Q"],
    hint: "HARD MINERAL USED IN JEWELRY",
    answer: "QUARTZ",
  },
  {
    word: "BATTERY",
    letters: ["A", "Y", "E", "B", "T", "T", "R"],
    hint: "POWER SOURCE FOR ELECTRONIC DEVICES",
    answer: "BATTERY",
  },
  {
    word: "FIREPLACE",
    letters: ["P", "R", "I", "A", "L", "C", "E", "E", "F"],
    hint: "STRUCTURE USED TO CONTAIN FIRE",
    answer: "FIREPLACE",
  },
  {
    word: "CACTUS",
    letters: ["C", "S", "U", "T", "C", "A"],
    hint: "SPINY PLANT FOUND IN DESERTS",
    answer: "CACTUS",
  },
  {
    word: "OCTAGON",
    letters: ["T", "O", "O", "C", "G", "N", "A"],
    hint: "EIGHT-SIDED SHAPE",
    answer: "OCTAGON",
  },
  {
    word: "WHISTLE",
    letters: ["T", "I", "H", "E", "L", "S", "W"],
    hint: "DEVICE THAT MAKES A SHARP SOUND",
    answer: "WHISTLE",
  },
  {
    word: "CORAL",
    letters: ["O", "L", "R", "C", "A"],
    hint: "MARINE ORGANISM THAT FORMS REEFS",
    answer: "CORAL",
  },
  {
    word: "RABBIT",
    letters: ["A", "R", "B", "I", "B", "T"],
    hint: "HOPPING ANIMAL WITH LONG EARS",
    answer: "RABBIT",
  },
  {
    word: "SQUIRREL",
    letters: ["Q", "U", "R", "I", "S", "E", "R", "L"],
    hint: "RODENT THAT STORES NUTS",
    answer: "SQUIRREL",
  },
  {
    word: "KITTEN",
    letters: ["K", "N", "E", "T", "I", "T"],
    hint: "YOUNG CAT",
    answer: "KITTEN",
  },
  {
    word: "RHINOCEROS",
    letters: ["H", "O", "R", "C", "R", "N", "O", "E", "I", "S"],
    hint: "ANIMAL WITH A HORNED SNOUT",
    answer: "RHINOCEROS",
  },
  {
    word: "VOLCANO",
    letters: ["C", "O", "A", "V", "N", "L", "O"],
    hint: "MOUNTAIN THAT ERUPTS",
    answer: "VOLCANO",
  },
  {
    word: "BANANA",
    letters: ["N", "A", "A", "N", "B", "A"],
    hint: "YELLOW FRUIT WITH PEEL",
    answer: "BANANA",
  },
  {
    word: "JELLYFISH",
    letters: ["F", "J", "I", "L", "L", "S", "E", "Y", "H"],
    hint: "GELATINOUS SEA CREATURE",
    answer: "JELLYFISH",
  },
  {
    word: "FERRARI",
    letters: ["R", "R", "R", "E", "F", "A", "I"],
    hint: "LUXURY ITALIAN SPORTS CAR",
    answer: "FERRARI",
  },
  {
    word: "EQUINOX",
    letters: ["Q", "I", "N", "O", "U", "X", "E"],
    hint: "DAY WITH EQUAL DAY AND NIGHT",
    answer: "EQUINOX",
  },
  {
    word: "BARRACUDA",
    letters: ["B", "C", "R", "R", "U", "A", "A", "A", "D"],
    hint: "FIERCE PREDATORY FISH",
    answer: "BARRACUDA",
  },
  {
    word: "PIRANHA",
    letters: ["N", "H", "I", "R", "A", "A", "P"],
    hint: "SHARP-TOOTHED FISH IN THE AMAZON",
    answer: "PIRANHA",
  },
  {
    word: "AARDVARK",
    letters: ["D", "A", "R", "A", "V", "K", "R", "A"],
    hint: "NOCTURNAL ANTEATER FROM AFRICA",
    answer: "AARDVARK",
  },
  {
    word: "ARMADILLO",
    letters: ["A", "M", "L", "O", "I", "D", "A", "R", "L"],
    hint: "ARMOR-PLATED MAMMAL",
    answer: "ARMADILLO",
  },
  {
    word: "FLAMINGO",
    letters: ["F", "M", "O", "N", "A", "G", "I", "L"],
    hint: "PINK WADING BIRD",
    answer: "FLAMINGO",
  },
  {
    word: "HUMMINGBIRD",
    letters: ["M", "U", "H", "N", "B", "I", "I", "R", "D", "G"],
    hint: "SMALL BIRD THAT HOVERS",
    answer: "HUMMINGBIRD",
  },
  {
    word: "ORCA",
    letters: ["O", "R", "C", "A"],
    hint: "KILLER WHALE",
    answer: "ORCA",
  },
  {
    word: "MACAW",
    letters: ["C", "W", "A", "A", "M"],
    hint: "COLORFUL PARROT",
    answer: "MACAW",
  },
  {
    word: "CANARY",
    letters: ["A", "N", "C", "R", "A", "Y"],
    hint: "YELLOW SINGING BIRD",
    answer: "CANARY",
  },
  {
    word: "CHEETAH",
    letters: ["H", "T", "A", "E", "E", "H", "C"],
    hint: "FASTEST LAND ANIMAL",
    answer: "CHEETAH",
  },
  {
    word: "GECKO",
    letters: ["G", "K", "O", "E", "C"],
    hint: "SMALL LIZARD THAT CAN CLIMB WALLS",
    answer: "GECKO",
  },
  {
    word: "PANTHER",
    letters: ["P", "R", "T", "H", "N", "E", "A"],
    hint: "BIG CAT WITH DARK FUR",
    answer: "PANTHER",
  },
  {
    word: "ANEMONE",
    letters: ["M", "A", "E", "N", "O", "N", "E"],
    hint: "MARINE ANIMAL WITH STINGING TENTACLES",
    answer: "ANEMONE",
  },
  {
    word: "IBIS",
    letters: ["B", "I", "I", "S"],
    hint: "WADING BIRD WITH LONG LEGS AND BEAK",
    answer: "IBIS",
  },
  {
    word: "ALGAE",
    letters: ["G", "A", "E", "A", "L"],
    hint: "PLANTLIKE ORGANISM IN WATER",
    answer: "ALGAE",
  },
  {
    word: "FROG",
    letters: ["F", "O", "G", "R"],
    hint: "AMPHIBIAN THAT JUMPS",
    answer: "FROG",
  },
  {
    word: "HERMIT",
    letters: ["T", "M", "R", "I", "H", "E"],
    hint: "SOMEONE WHO LIVES ALONE",
    answer: "HERMIT",
  },
  {
    word: "HYDRA",
    letters: ["R", "Y", "A", "D", "H"],
    hint: "MYTHICAL MULTI-HEADED SERPENT",
    answer: "HYDRA",
  },
  {
    word: "PANDA",
    letters: ["P", "D", "A", "N", "A"],
    hint: "BLACK AND WHITE BEAR",
    answer: "PANDA",
  },
  {
    word: "MANTA RAY",
    letters: ["M", "T", "R", "N", "A", "Y", "A", "A"],
    hint: "LARGE FLAT FISH",
    answer: "MANTA RAY",
  },
  {
    word: "DODO",
    letters: ["D", "O", "D", "O"],
    hint: "EXTINCT FLIGHTLESS BIRD",
    answer: "DODO",
  },
  {
    word: "ANT",
    letters: ["N", "T", "A"],
    hint: "SMALL INSECT THAT LIVES IN COLONIES",
    answer: "ANT",
  },
  {
    word: "GOPHER",
    letters: ["P", "R", "O", "G", "H", "E"],
    hint: "BURROWING RODENT",
    answer: "GOPHER",
  },
  {
    word: "LOBSTER",
    letters: ["B", "S", "T", "E", "O", "L", "R"],
    hint: "SHELLFISH WITH LARGE CLAWS",
    answer: "LOBSTER",
  },
  {
    word: "YAK",
    letters: ["K", "A", "Y"],
    hint: "LARGE LONG-HAIRED BOVINE",
    answer: "YAK",
  },
  {
    word: "CRANE",
    letters: ["R", "C", "A", "N", "E"],
    hint: "LARGE WADING BIRD",
    answer: "CRANE",
  },
  {
    word: "CHIMPANZEE",
    letters: ["Z", "M", "A", "P", "C", "H", "I", "N", "E", "E"],
    hint: "INTELLIGENT PRIMATE",
    answer: "CHIMPANZEE",
  },
  {
    word: "IBEX",
    letters: ["I", "X", "B", "E"],
    hint: "WILD GOAT WITH CURVED HORNS",
    answer: "IBEX",
  },
  {
    word: "HAMSTER",
    letters: ["H", "S", "A", "T", "R", "E", "M"],
    hint: "SMALL RODENT KEPT AS A PET",
    answer: "HAMSTER",
  },
  {
    word: "ANTELOPE",
    letters: ["E", "P", "T", "A", "L", "O", "E", "N"],
    hint: "FAST-HOOFED MAMMAL",
    answer: "ANTELOPE",
  },
  {
    word: "STINGRAY",
    letters: ["R", "S", "I", "A", "N", "T", "G", "Y"],
    hint: "FLAT SEA CREATURE WITH A STINGER",
    answer: "STINGRAY",
  },
  {
    word: "RHINO",
    letters: ["I", "N", "R", "H", "O"],
    hint: "LARGE ANIMAL WITH A HORNED NOSE",
    answer: "RHINO",
  },
  {
    word: "OTTER",
    letters: ["T", "O", "R", "T", "E"],
    hint: "PLAYFUL AQUATIC MAMMAL",
    answer: "OTTER",
  },
  {
    word: "HYENA",
    letters: ["Y", "N", "H", "E", "A"],
    hint: "CARNIVORE THAT LAUGHS",
    answer: "HYENA",
  },
  {
    word: "BEAVER",
    letters: ["V", "R", "A", "E", "E", "B"],
    hint: "DAM-BUILDING ANIMAL",
    answer: "BEAVER",
  },
  {
    word: "BAT",
    letters: ["T", "B", "A"],
    hint: "FLYING MAMMAL",
    answer: "BAT",
  },
  {
    word: "STORK",
    letters: ["O", "T", "R", "K", "S"],
    hint: "LARGE BIRD KNOWN FOR DELIVERING BABIES IN FOLKLORE",
    answer: "STORK",
  },
  {
    word: "MOLE",
    letters: ["M", "O", "L", "E"],
    hint: "BURROWING MAMMAL",
    answer: "MOLE",
  },
  {
    word: "HIPPOPOTAMUS",
    letters: ["H", "I", "P", "O", "P", "O", "T", "M", "U", "A", "S"],
    hint: "LARGE SEMIAQUATIC MAMMAL",
    answer: "HIPPOPOTAMUS",
  },
  {
    word: "PIRATE",
    letters: ["P", "I", "T", "R", "E", "A"],
    hint: "SAILOR WHO PLUNDERS",
    answer: "PIRATE",
  },
  {
    word: "HURRICANE",
    letters: ["H", "U", "R", "C", "A", "R", "I", "N", "E"],
    hint: "POWERFUL TROPICAL STORM",
    answer: "HURRICANE",
  },
  {
    word: "GUPPY",
    letters: ["G", "U", "P", "P", "Y"],
    hint: "SMALL TROPICAL FISH",
    answer: "GUPPY",
  },
  {
    word: "WOMBAT",
    letters: ["W", "O", "M", "B", "A", "T"],
    hint: "AUSTRALIAN MARSUPIAL",
    answer: "WOMBAT",
  },
  {
    word: "MONGOOSE",
    letters: ["M", "O", "N", "G", "O", "O", "S", "E"],
    hint: "SNAKE-EATING MAMMAL",
    answer: "MONGOOSE",
  },
  {
    word: "COYOTE",
    letters: ["C", "Y", "O", "T", "E", "O"],
    hint: "WILD CANINE",
    answer: "COYOTE",
  },
  {
    word: "MOUSE",
    letters: ["M", "O", "U", "S", "E"],
    hint: "SMALL RODENT",
    answer: "MOUSE",
  },
  {
    word: "IGUANA",
    letters: ["I", "G", "A", "U", "N", "A"],
    hint: "TROPICAL LIZARD",
    answer: "IGUANA",
  },
  {
    word: "POLAR BEAR",
    letters: ["P", "L", "O", "A", "R", "A", "B", "E", "R"],
    hint: "WHITE BEAR OF THE ARCTIC",
    answer: "POLAR BEAR",
  },
  {
    word: "COBRA",
    letters: ["C", "O", "B", "R", "A"],
    hint: "VENOMOUS SNAKE",
    answer: "COBRA",
  },
  {
    word: "OSTRICH",
    letters: ["O", "S", "T", "R", "I", "C", "H"],
    hint: "LARGEST BIRD",
    answer: "OSTRICH",
  },
  {
    word: "CHAMELEON",
    letters: ["C", "H", "A", "M", "E", "L", "E", "O", "N"],
    hint: "LIZARD THAT CHANGES COLOR",
    answer: "CHAMELEON",
  },
  {
    word: "GRIZZLY",
    letters: ["G", "R", "I", "Z", "L", "Z", "Y"],
    hint: "LARGE BEAR",
    answer: "GRIZZLY",
  },
  {
    word: "VULTURE",
    letters: ["V", "U", "L", "T", "U", "R", "E"],
    hint: "BIRD THAT FEEDS ON CARRION",
    answer: "VULTURE",
  },
  {
    word: "PORPOISE",
    letters: ["P", "O", "R", "P", "O", "I", "S", "E"],
    hint: "SMALL WHALE",
    answer: "PORPOISE",
  },
  {
    word: "ALBATROSS",
    letters: ["A", "L", "B", "A", "T", "R", "O", "S", "S"],
    hint: "SEABIRD WITH A LARGE WINGSPAN",
    answer: "ALBATROSS",
  },
  {
    word: "DINGO",
    letters: ["D", "I", "N", "G", "O"],
    hint: "WILD DOG OF AUSTRALIA",
    answer: "DINGO",
  },
  {
    word: "SQUID",
    letters: ["S", "Q", "U", "I", "D"],
    hint: "MARINE CREATURE WITH TENTACLES",
    answer: "SQUID",
  },
  {
    word: "HAMMERHEAD",
    letters: ["H", "A", "M", "M", "E", "R", "H", "E", "A", "D"],
    hint: "SHARK WITH A WIDE HEAD",
    answer: "HAMMERHEAD",
  },
  {
    word: "ELEPHANT",
    letters: ["E", "L", "P", "H", "A", "N", "T", "E"],
    hint: "MAMMAL WITH A TRUNK",
    answer: "ELEPHANT",
  },
  {
    word: "SLOTH",
    letters: ["S", "L", "O", "T", "H"],
    hint: "VERY SLOW ANIMAL",
    answer: "SLOTH",
  },
  {
    word: "NARWHAL",
    letters: ["N", "A", "R", "W", "H", "A", "L"],
    hint: "WHALE WITH A TUSK",
    answer: "NARWHAL",
  },
  {
    word: "BISON",
    letters: ["B", "I", "S", "O", "N"],
    hint: "LARGE HERBIVORE OF THE PLAINS",
    answer: "BISON",
  },
  {
    word: "ALLIGATOR",
    letters: ["A", "L", "L", "I", "G", "A", "T", "O", "R"],
    hint: "REPTILE WITH A BROAD SNOUT",
    answer: "ALLIGATOR",
  },
  {
    word: "JAGUAR",
    letters: ["J", "A", "G", "U", "A", "R"],
    hint: "BIG CAT WITH SPOTS",
    answer: "JAGUAR",
  },
  {
    word: "HERON",
    letters: ["H", "E", "R", "O", "N"],
    hint: "LONG-LEGGED WADING BIRD",
    answer: "HERON",
  },
  {
    word: "WALRUS",
    letters: ["W", "A", "L", "R", "U", "S"],
    hint: "MARINE MAMMAL WITH TUSKS",
    answer: "WALRUS",
  },
  {
    word: "PANGOLIN",
    letters: ["P", "A", "N", "G", "O", "L", "I", "N"],
    hint: "ARMOR-PLATED MAMMAL",
    answer: "PANGOLIN",
  },
  {
    word: "KOALA",
    letters: ["K", "O", "A", "L", "A"],
    hint: "MARSUPIAL THAT EATS EUCALYPTUS",
    answer: "KOALA",
  },
  {
    word: "SNAKE",
    letters: ["S", "N", "A", "K", "E"],
    hint: "REPTILE THAT SLITHERS",
    answer: "SNAKE",
  },
  {
    word: "ORANGUTAN",
    letters: ["O", "R", "A", "N", "G", "U", "T", "A", "N"],
    hint: "APE WITH LONG ARMS",
    answer: "ORANGUTAN",
  },
  {
    word: "WHALE",
    letters: ["W", "H", "A", "L", "E"],
    hint: "LARGEST MARINE MAMMAL",
    answer: "WHALE",
  },
  {
    word: "MONKEY",
    letters: ["M", "O", "N", "K", "E", "Y"],
    hint: "PRIMATE KNOWN FOR SWINGING FROM TREES",
    answer: "MONKEY",
  },
  {
    word: "PUMA",
    letters: ["P", "U", "M", "A"],
    hint: "LARGE WILD CAT ALSO KNOWN AS A COUGAR",
    answer: "PUMA",
  },
  {
    word: "PELICAN",
    letters: ["P", "E", "L", "I", "C", "A", "N"],
    hint: "WATER BIRD WITH A LARGE BEAK",
    answer: "PELICAN",
  },
  {
    word: "PORCUPINE",
    letters: ["P", "O", "R", "C", "U", "P", "I", "N", "E"],
    hint: "RODENT WITH SHARP QUILLS",
    answer: "PORCUPINE",
  },
  {
    word: "CROCODILE",
    letters: ["C", "R", "O", "C", "O", "D", "I", "L", "E"],
    hint: "LARGE AQUATIC REPTILE",
    answer: "CROCODILE",
  },
  {
    word: "PIRANHA",
    letters: ["P", "I", "R", "A", "N", "H", "A"],
    hint: "FRESHWATER FISH WITH SHARP TEETH",
    answer: "PIRANHA",
  },
  {
    word: "OCTOPUS",
    letters: ["O", "C", "T", "O", "P", "U", "S"],
    hint: "SEA CREATURE WITH EIGHT ARMS",
    answer: "OCTOPUS",
  },
  {
    word: "EMPEROR PENGUIN",
    letters: ["E", "M", "P", "E", "R", "O", "R", "P", "N", "U", "I", "N", "G"],
    hint: "TALL ANTARCTIC BIRD",
    answer: "EMPEROR PENGUIN",
  },
  {
    word: "GRIZZLY BEAR",
    letters: ["G", "R", "I", "Z", "Z", "L", "Y", "B", "E", "A", "R"],
    hint: "POWERFUL NORTH AMERICAN BEAR",
    answer: "GRIZZLY BEAR",
  },
  {
    word: "TURTLE",
    letters: ["T", "U", "R", "T", "L", "E"],
    hint: "REPTILE WITH A HARD SHELL",
    answer: "TURTLE",
  },
  {
    word: "LIONFISH",
    letters: ["L", "I", "O", "N", "F", "I", "S", "H"],
    hint: "VENOMOUS MARINE FISH",
    answer: "LIONFISH",
  },
  {
    word: "MOOSE",
    letters: ["M", "O", "O", "S", "E"],
    hint: "LARGE ANTLERED ANIMAL",
    answer: "MOOSE",
  },
  {
    word: "BEE",
    letters: ["B", "E", "E"],
    hint: "INSECT THAT MAKES HONEY",
    answer: "BEE",
  },
  {
    word: "LEMUR",
    letters: ["L", "E", "M", "U", "R"],
    hint: "PRIMATE FROM MADAGASCAR",
    answer: "LEMUR",
  },
  {
    word: "EMERALD",
    letters: ["E", "M", "E", "R", "A", "L", "D"],
    hint: "GREEN GEMSTONE",
    answer: "EMERALD",
  },
  {
    word: "TURKEY",
    letters: ["T", "U", "R", "K", "E", "Y"],
    hint: "BIRD COMMONLY EATEN ON THANKSGIVING",
    answer: "TURKEY",
  },
  {
    word: "OCELOT",
    letters: ["O", "C", "E", "L", "O", "T"],
    hint: "SMALL WILD CAT",
    answer: "OCELOT",
  },
  {
    word: "FALCON",
    letters: ["F", "A", "L", "C", "O", "N"],
    hint: "BIRD OF PREY KNOWN FOR SPEED",
    answer: "FALCON",
  },
  {
    word: "QUOKKA",
    letters: ["Q", "U", "O", "K", "K", "A"],
    hint: "SMALL MARSUPIAL KNOWN FOR SMILING",
    answer: "QUOKKA",
  },
  {
    word: "GIRAFFE",
    letters: ["G", "I", "R", "A", "F", "F", "E"],
    hint: "ANIMAL WITH A LONG NECK",
    answer: "GIRAFFE",
  },
  {
    word: "HIPPO",
    letters: ["H", "I", "P", "P", "O"],
    hint: "LARGE SEMIAQUATIC MAMMAL",
    answer: "HIPPO",
  },
  {
    word: "SALAMANDER",
    letters: ["S", "A", "L", "A", "M", "A", "N", "D", "E", "R"],
    hint: "AMPHIBIAN THAT CAN REGENERATE LIMBS",
    answer: "SALAMANDER",
  },
  {
    word: "TARANTULA",
    letters: ["T", "A", "R", "A", "N", "T", "U", "L", "A"],
    hint: "LARGE HAIRY SPIDER",
    answer: "TARANTULA",
  },
];
const ScrambleaWordPlay = ({ day }) => {
  const startIndex = (day - 1) * 5;
  const endIndex = startIndex + 5;
  const dayGameData = gameData.slice(startIndex, endIndex);
  const { userDetails, updateUserInfo } = useUserInfo();
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [chancesOver, setChancesOver] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);

  useEffect(() => {
    const savedScrambleIndex =
      parseInt(localStorage.getItem(`scrambleIndex_day${day}`)) || 0;
    setScrambleIndex(savedScrambleIndex);
    const savedPoints = parseInt(localStorage.getItem(`points_day${day}`)) || 0;
    setPoints(savedPoints);
  }, [day]);

  useEffect(() => {
    if (scrambleIndex >= 5) {
      setChancesOver(true);
      setShowCompletionPopup(true); // Trigger the completion pop-up
      localStorage.setItem(`scrambleIndex_day${day}`, 5);
    } else {
      localStorage.setItem(`scrambleIndex_day${day}`, scrambleIndex);
    }
    localStorage.setItem(`points_day${day}`, points);
  }, [scrambleIndex, points, day]);

  const handleLetterClick = (letter, index) => {
    if (isChecked || chancesOver) return;
    if (disabledLetters.includes(index)) {
      const letterIndex = selectedLetters.indexOf(letter);
      if (letterIndex > -1) {
        const newSelectedLetters = [...selectedLetters];
        newSelectedLetters.splice(letterIndex, 1);
        const newInputValue =
          inputValue.slice(0, letterIndex) + inputValue.slice(letterIndex + 1);
        setSelectedLetters(newSelectedLetters);
        setDisabledLetters(disabledLetters.filter((i) => i !== index));
        setInputValue(newInputValue);
      }
    } else {
      setSelectedLetters([...selectedLetters, letter]);
      setDisabledLetters([...disabledLetters, index]);
      setInputValue(inputValue + letter);
    }
  };

  const checkWord = async () => {
    if (chancesOver) return;
    var gamePoints;
    setIsChecked(true);
    if (inputValue === dayGameData[scrambleIndex].word) {
      const newPoints = points + 2500;
      gamePoints = 2500;
      setPoints(newPoints);
      setMessage("** Correct! You earned 2500 points **");
      setMessageColor("grey");
      setShowAnswer(false);
    } else {
      gamePoints = 500;
      const newPoints = points + 500;
      setPoints(newPoints);
      setMessage("** Incorrect! You earned 500 points **");
      setMessageColor("red");
      setShowAnswer(true);
    }

    const apiData = {
      telegramId: String(userDetails.userDetails?.telegramId),
      gamePoints: String(gamePoints),
      // boosters: currentResult.boosts,
    };

    await userGameRewards(apiData);

    if (scrambleIndex >= 5) {
      setChancesOver(true);
      setShowCompletionPopup(true); // Trigger the completion pop-up
      localStorage.setItem(`scrambleIndex_day${day}`, 5);
    } else {
      localStorage.setItem(`scrambleIndex_day${day}`, scrambleIndex + 1);
    }
    localStorage.setItem(`points_day${day}`, points);
  };

  const nextScramble = () => {
    var gamePoints;
    if (!isChecked) {
      setMessage("** Please check the word first **");
      setMessageColor("red");
      return;
    }
    if (scrambleIndex >= 4) {
      setChancesOver(true);
      setShowCompletionPopup(true); // Show the pop-up after the last word is completed
      localStorage.setItem(`scrambleIndex_day${day}`, 5);
      return;
    }

    setSelectedLetters([]);
    setDisabledLetters([]);
    setInputValue("");
    setIsChecked(false);
    setScrambleIndex(scrambleIndex + 1);
    setMessage("");
    setShowAnswer(false);
  };

  const toogleMenu = () => {
    updateUserInfo((prev) => ({
      ...prev,
      isPlay: false,
      currentComponent: scramble,
      currentComponentText: "scramble",
      lastComponent: userDetails?.userDetails.currentComponent,
      lastComponentText: userDetails?.userDetails.currentComponentText,
      isMenu: true,
      menuCount: userDetails?.userDetails?.menuCount + 1,
    }));
  };

  return (
    <div className="quiz-play-task">
      <img
        onClick={() => {
          toogleMenu();
        }}
        src={cancelIcon}
        className="cancel-imgpoints"
        style={{ cursor: "pointer" }}
      />
      <div className="ScrambleaWordPlay">
        <h1 className="text-heading">WORD SCRAMBLE</h1>
        <h3 className="scramble-count">
          YOU HAVE {5 - scrambleIndex}/5 SCRAMBLE
        </h3>
      </div>
      <div>
        <div className="custom-search">
          <input
            type="text"
            className="custom-search-input"
            placeholder="Enter a valid word"
            value={inputValue}
            readOnly
          />
          <button
            className="custom-search-botton"
            type="button"
            onClick={checkWord}
            disabled={
              inputValue.length !== dayGameData[scrambleIndex].word.length
            }
          >
            Check Word
          </button>
        </div>
      </div>
      <div className="scramble-wordbox-container">
        {dayGameData[scrambleIndex].letters.map((letter, index) => (
          <div
            key={index}
            className={`scramble-wordbox ${
              disabledLetters.includes(index) ? "disabled" : ""
            }`}
            onClick={() => handleLetterClick(letter, index)}
          >
            <p className="word-s">{letter}</p>
          </div>
        ))}
      </div>
      <div className="margin">
        <h2 className="hint-text">Hint</h2>
        <h2 className="first-cryptocurrency">
          {dayGameData[scrambleIndex].hint}
        </h2>
      </div>
      {message && (
        <p className="message" style={{ color: messageColor }}>
          {message}
        </p>
      )}
      {showAnswer && (
        <p className="answer">
          Correct Answer: {dayGameData[scrambleIndex].answer}
        </p>
      )}
      <button className="quitz-btn" onClick={nextScramble}>
        Next
      </button>
      {chancesOver && showCompletionPopup && (
        <div className={`popup ${showCompletionPopup ? "show" : ""}`}>
          <div className="popup-content">
            <h2 className="epic">Epic Win!</h2>
            <div className="row text-center">
              <div className="col-12">
                <div className="epic-div">
                  <p className="pointsLabel">POINTS EARNED</p>
                  <div className="pointsValue1">
                    <img src={logo} alt="logo" />
                    <p className="pointsNumber">{points}</p>
                  </div>
                </div>
                <p className="bottom-text">
                  Play daily to boost your score and rack up more points!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ScrambleaWordPlay;
