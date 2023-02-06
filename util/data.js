export const gameData = [
  {
    id: 1,
    category: "Cities",
    questions: [
      { question: "What is the Capital city of Singapore?", answer: "Singapore", point: 150 },
      { question: "What is the Capital city of Indonesia?", answer: "Jakarta", point: 100 },
      { question: "What is the Capital city of Thailand?", answer: "Bangkok", point: 150 },
    ],
    image: require("../images/cities.png"), isSelected: false,
  },
  {
    id: 2,
    category: "Animals",
    questions: [
      { question: "Which is the fastest animal?", answer: "Cheetah", point: 100  },
      { question: "What does a panda eat?", answer: "Bamboo", point: 100  },
      { question: "Which is the only mammal that can fly?", answer: "Bat", point: 100  },
      { question: "What is the largest mammal?", answer: "Whale", point: 100  },
    ],
    image: require("../images/animals.png"),
    isSelected: false,
  },
  {
    id: 3,
    category: "Food",
    questions: [
      { question: "Best Singapore food?", answer: "Laksa", point: 50  },
      { question: "Which fruit is banned across all types of public transport in Singapore because of its unpleasant odor?", answer: "Durian", point: 50  },
      { question: "Pizza and pasta originated from which country?", answer: "Italy", point: 100  },
      { question: "What is the main ingredient in cotton candy?", answer: "Sugar", point: 100  },
      { question: "Which food item does Popeye consume to gain strength?", answer: "Spinach", point: 100  },
    ],
    image: require("../images/food.png"),
    isSelected: false,
  },
];
