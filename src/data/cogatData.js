import { createPracticeTests } from '../utils/practiceTests.js';
import { VERBAL_EXPANSION } from './verbalExpansion.js';
import { QUANTITATIVE_EXPANSION } from './quantitativeExpansion.js';
import { NONVERBAL_EXPANSION } from './nonverbalExpansion.js';
import { alignQuantitativeQuestions } from './quantitativeAlignment.js';
import { SPATIAL_ALIGNMENT } from './spatialAlignment.js';
import { PAPER_CUTTING_ALIGNMENT } from './paperCuttingAlignment.js';

/** Grade 2 practice content. Independent samples, not standardized test forms. */

export const GRADE_LEVELS = [
  {
    "id": "2",
    "name": "Grade 2",
    "level": "Level 8",
    "primary": true
  }
];

export const BATTERIES = [
  {
    "id": "all",
    "name": "All Batteries",
    "description": "Practice questions from all three batteries",
    "icon": "Brain",
    "color": "sky"
  },
  {
    "id": "verbal",
    "name": "Verbal Battery",
    "description": "Practice relationships between pictures and meaning in spoken sentences",
    "icon": "MessageSquare",
    "color": "emerald",
    "subtests": [
      "picture_analogies",
      "sentence_completion",
      "picture_classification"
    ]
  },
  {
    "id": "quantitative",
    "name": "Quantitative Battery",
    "description": "Practice relationships between quantities and number patterns",
    "icon": "Calculator",
    "color": "amber",
    "subtests": [
      "number_analogies",
      "number_puzzles",
      "number_series"
    ]
  },
  {
    "id": "nonverbal",
    "name": "Nonverbal Battery",
    "description": "Practice relationships between figures, spatial changes, and shared visual features",
    "icon": "Shapes",
    "color": "purple",
    "subtests": [
      "figure_matrices",
      "paper_folding",
      "figure_classification"
    ]
  }
];

export const SUBTESTS = {
  "picture_analogies": {
    "id": "picture_analogies",
    "batteryId": "verbal",
    "name": "Picture Analogies",
    "type": "visual_analogy",
    "primaryOnly": true
  },
  "sentence_completion": {
    "id": "sentence_completion",
    "batteryId": "verbal",
    "name": "Sentence Completion",
    "type": "sentence_pic",
    "primaryOnly": true
  },
  "picture_classification": {
    "id": "picture_classification",
    "batteryId": "verbal",
    "name": "Picture Classification",
    "type": "pic_classification",
    "primaryOnly": true
  },
  "number_analogies": {
    "id": "number_analogies",
    "batteryId": "quantitative",
    "name": "Number Analogies",
    "type": "num_analogy"
  },
  "number_puzzles": {
    "id": "number_puzzles",
    "batteryId": "quantitative",
    "name": "Number Puzzles",
    "type": "balance_puzzle"
  },
  "number_series": {
    "id": "number_series",
    "batteryId": "quantitative",
    "name": "Number Series",
    "type": "num_series"
  },
  "figure_matrices": {
    "id": "figure_matrices",
    "batteryId": "nonverbal",
    "name": "Figure Matrices",
    "type": "fig_matrix"
  },
  "paper_folding": {
    "id": "paper_folding",
    "batteryId": "nonverbal",
    "name": "Paper Folding",
    "type": "paper_fold"
  },
  "figure_classification": {
    "id": "figure_classification",
    "batteryId": "nonverbal",
    "name": "Figure Classification",
    "type": "fig_classification"
  }
};

const ORIGINAL_QUESTIONS = [
  {
    "id": "g2_t1_pa1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "verbal",
    "subtestId": "picture_analogies",
    "difficulty": "easy",
    "prompt": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "audioScript": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "rendererType": "picture_analogy",
    "data": {
      "topPair": [
        {
          "emoji": "🐦",
          "label": "Bird"
        },
        {
          "emoji": "🪹",
          "label": "Nest"
        }
      ],
      "bottomStimulus": {
        "emoji": "🐶",
        "label": "Dog"
      }
    },
    "options": [
      {
        "id": "A",
        "emoji": "🦴",
        "label": "Bone"
      },
      {
        "id": "B",
        "label": "Leash",
        "illustration": "leash"
      },
      {
        "id": "C",
        "label": "Doghouse",
        "illustration": "doghouse"
      },
      {
        "id": "D",
        "emoji": "🐈",
        "label": "Cat"
      }
    ],
    "correctAnswer": 2,
    "explanation": {
      "rule": "Animal to Home Shelter",
      "description": "A nest shelters a bird's eggs and chicks. A doghouse provides shelter for a dog.",
      "whyOthersWrong": "A bone is food, a leash is gear, and a cat is an animal.",
      "parentTip": "What shelter goes with each animal?"
    }
  },
  {
    "id": "g2_t1_pa2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "verbal",
    "subtestId": "picture_analogies",
    "difficulty": "medium",
    "prompt": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "audioScript": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "rendererType": "picture_analogy",
    "data": {
      "topPair": [
        {
          "emoji": "🧤",
          "label": "Glove"
        },
        {
          "emoji": "✋",
          "label": "Hand"
        }
      ],
      "bottomStimulus": {
        "emoji": "🧦",
        "label": "Sock"
      }
    },
    "options": [
      {
        "id": "A",
        "emoji": "🦶",
        "label": "Foot"
      },
      {
        "id": "B",
        "emoji": "👟",
        "label": "Shoe"
      },
      {
        "id": "C",
        "emoji": "👖",
        "label": "Pants"
      },
      {
        "id": "D",
        "emoji": "👂",
        "label": "Ear"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Clothing to Body Part",
      "description": "A glove covers a hand; a sock covers a foot.",
      "whyOthersWrong": "A shoe is clothing, not the body part covered by a sock.",
      "parentTip": "Gloves go on hands, socks go on feet!"
    }
  },
  {
    "id": "g2_t1_sc1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "verbal",
    "subtestId": "sentence_completion",
    "difficulty": "easy",
    "prompt": "Listen to the sentence. Which picture completes it?",
    "audioScript": "When dark storm clouds rolled in and rain poured down, Maya stayed dry by opening her blank. Which picture completes the sentence?",
    "rendererType": "sentence_completion",
    "data": {
      "sentence": "When dark storm clouds rolled in and rain poured down, Maya stayed dry by opening her ______."
    },
    "options": [
      {
        "id": "A",
        "emoji": "☂️",
        "label": "Umbrella"
      },
      {
        "id": "B",
        "emoji": "🎒",
        "label": "Backpack"
      },
      {
        "id": "C",
        "emoji": "📖",
        "label": "Book"
      },
      {
        "id": "D",
        "emoji": "🕶️",
        "label": "Sunglasses"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Rain Contextual Protection",
      "description": "An umbrella protects against pouring rain to stay dry.",
      "whyOthersWrong": "Sunglasses are for sun; books and backpacks do not protect from rain.",
      "parentTip": "Listen for clue words: \"rain\", \"stayed dry\", \"opening\"."
    }
  },
  {
    "id": "g2_t1_sc2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "verbal",
    "subtestId": "sentence_completion",
    "difficulty": "medium",
    "prompt": "Listen to the sentence. Which picture completes it?",
    "audioScript": "When Tommy had a checkup at the clinic, the doctor listened to his heartbeat using a blank. Which picture completes the sentence?",
    "rendererType": "sentence_completion",
    "data": {
      "sentence": "When Tommy had a checkup at the clinic, the doctor listened to his heartbeat using a ______."
    },
    "options": [
      {
        "id": "A",
        "emoji": "🩺",
        "label": "Stethoscope"
      },
      {
        "id": "B",
        "emoji": "🩹",
        "label": "Bandage"
      },
      {
        "id": "C",
        "emoji": "🌡️",
        "label": "Thermometer"
      },
      {
        "id": "D",
        "emoji": "🔦",
        "label": "Flashlight"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Medical Tool Function",
      "description": "A stethoscope is specifically designed to listen to heartbeats.",
      "whyOthersWrong": "A thermometer measures body temperature, not heart sounds.",
      "parentTip": "What tool does your pediatrician put on your chest?"
    }
  },
  {
    "id": "g2_t1_pc1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "verbal",
    "subtestId": "picture_classification",
    "difficulty": "easy",
    "prompt": "Look at the three pictures. Which choice belongs in the same group?",
    "audioScript": "Look at the three pictures. Which choice belongs in the same group?",
    "rendererType": "picture_classification",
    "data": {
      "items": [
        {
          "emoji": "🍎",
          "label": "Apple"
        },
        {
          "emoji": "🍌",
          "label": "Banana"
        },
        {
          "emoji": "🍇",
          "label": "Grapes"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "emoji": "🥕",
        "label": "Carrot"
      },
      {
        "id": "B",
        "emoji": "🍊",
        "label": "Orange"
      },
      {
        "id": "C",
        "emoji": "🥦",
        "label": "Broccoli"
      },
      {
        "id": "D",
        "emoji": "🍞",
        "label": "Bread"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Category: Fresh Fruits",
      "description": "Apple, Banana, Grapes, and Orange are all fruits.",
      "whyOthersWrong": "Carrots and broccoli are vegetables; bread is baked grain.",
      "parentTip": "They are all delicious fruits with seeds!"
    }
  },
  {
    "id": "g2_t1_pc2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "verbal",
    "subtestId": "picture_classification",
    "difficulty": "medium",
    "prompt": "Look at the three pictures. Which choice belongs in the same group?",
    "audioScript": "Look at the three pictures. Which choice belongs in the same group?",
    "rendererType": "picture_classification",
    "data": {
      "items": [
        {
          "emoji": "🚗",
          "label": "Car"
        },
        {
          "emoji": "🚌",
          "label": "Bus"
        },
        {
          "emoji": "🚚",
          "label": "Truck"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "emoji": "🏍️",
        "label": "Motorcycle"
      },
      {
        "id": "B",
        "emoji": "⛵",
        "label": "Sailboat"
      },
      {
        "id": "C",
        "emoji": "🚁",
        "label": "Helicopter"
      },
      {
        "id": "D",
        "emoji": "🛶",
        "label": "Canoe"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Land Wheeled Vehicles",
      "description": "Car, bus, truck, and motorcycle are land vehicles traveling on roads with wheels.",
      "whyOthersWrong": "Sailboats and canoes are watercraft; helicopters are aircraft.",
      "parentTip": "Which choice drives on roads with wheels?"
    }
  },
  {
    "id": "g2_t1_na1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "quantitative",
    "subtestId": "number_analogies",
    "difficulty": "easy",
    "prompt": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "audioScript": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "rendererType": "number_analogy",
    "data": {
      "topPair": {
        "left": 3,
        "right": 6
      },
      "bottomStimulus": {
        "left": 4
      }
    },
    "options": [
      {
        "id": "A",
        "text": "5",
        "label": "5",
        "quantity": 5
      },
      {
        "id": "B",
        "text": "10",
        "label": "10",
        "quantity": 10
      },
      {
        "id": "C",
        "text": "8",
        "label": "8",
        "quantity": 8
      },
      {
        "id": "D",
        "text": "9",
        "label": "9",
        "quantity": 9
      }
    ],
    "correctAnswer": 2,
    "explanation": {
      "rule": "Doubling (Multiply by 2)",
      "description": "3 × 2 = 6. 4 × 2 = 8.",
      "whyOthersWrong": "8 is 4 + 4.",
      "parentTip": "Double numbers: 2->4, 3->6, 4->8."
    }
  },
  {
    "id": "g2_t1_na2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "quantitative",
    "subtestId": "number_analogies",
    "difficulty": "medium",
    "prompt": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "audioScript": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "rendererType": "number_analogy",
    "data": {
      "topPair": {
        "left": 7,
        "right": 9
      },
      "bottomStimulus": {
        "left": 5
      }
    },
    "options": [
      {
        "id": "A",
        "text": "6",
        "label": "6",
        "quantity": 6
      },
      {
        "id": "B",
        "text": "7",
        "label": "7",
        "quantity": 7
      },
      {
        "id": "C",
        "text": "8",
        "label": "8",
        "quantity": 8
      },
      {
        "id": "D",
        "text": "10",
        "label": "10",
        "quantity": 10
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Add 2 (+2)",
      "description": "7 + 2 = 9. 5 + 2 = 7.",
      "whyOthersWrong": "5 + 2 = 7.",
      "parentTip": "Count up by 2: 5 plus 2 is 7!"
    }
  },
  {
    "id": "g2_t1_np1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "quantitative",
    "subtestId": "number_puzzles",
    "difficulty": "medium",
    "prompt": "Which choice makes the two trains carry the same total number of objects?",
    "audioScript": "Which choice makes the two trains carry the same total number of objects?",
    "rendererType": "balance_puzzle",
    "data": {
      "type": "object_trains",
      "topCars": [
        5,
        3
      ],
      "bottomCars": [
        6,
        "?"
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "1",
        "label": "1",
        "quantity": 1
      },
      {
        "id": "B",
        "text": "2",
        "label": "2",
        "quantity": 2
      },
      {
        "id": "C",
        "text": "3",
        "label": "3",
        "quantity": 3
      },
      {
        "id": "D",
        "text": "4",
        "label": "4",
        "quantity": 4
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Equal train totals",
      "description": "The first train carries 5 + 3 = 8 objects. The second train needs 6 + 2 = 8 objects.",
      "whyOthersWrong": "Adding 1 makes 7, adding 3 makes 9, and adding 4 makes 10. Only 2 makes the total equal 8.",
      "parentTip": "Count all the objects on the first train. How many more does the second train need?"
    }
  },
  {
    "id": "g2_t1_np2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "quantitative",
    "subtestId": "number_puzzles",
    "difficulty": "easy",
    "prompt": "Which choice makes the two trains carry the same total number of objects?",
    "audioScript": "Which choice makes the two trains carry the same total number of objects?",
    "rendererType": "balance_puzzle",
    "data": {
      "type": "object_trains",
      "topCars": [
        9
      ],
      "bottomCars": [
        4,
        "?"
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "4",
        "label": "4",
        "quantity": 4
      },
      {
        "id": "B",
        "text": "5",
        "label": "5",
        "quantity": 5
      },
      {
        "id": "C",
        "text": "6",
        "label": "6",
        "quantity": 6
      },
      {
        "id": "D",
        "text": "3",
        "label": "3",
        "quantity": 3
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Part-Whole Addition",
      "description": "4 + 5 = 9. Missing number is 5.",
      "whyOthersWrong": "4 + 5 = 9.",
      "parentTip": "Count up from 4 to 9: 5 fingers!"
    }
  },
  {
    "id": "g2_t1_ns1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "quantitative",
    "subtestId": "number_series",
    "difficulty": "easy",
    "prompt": "Look at the groups of beads. Which group comes next?",
    "audioScript": "Look at the groups of beads. Which group comes next?",
    "rendererType": "number_series",
    "data": {
      "seriesType": "beads",
      "items": [
        {
          "count": 2,
          "color": "#0284c7"
        },
        {
          "count": 4,
          "color": "#0284c7"
        },
        {
          "count": 6,
          "color": "#0284c7"
        },
        {
          "count": 8,
          "color": "#0284c7"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "9",
        "label": "9 beads",
        "quantity": 9
      },
      {
        "id": "B",
        "text": "10",
        "label": "10 beads",
        "quantity": 10
      },
      {
        "id": "C",
        "text": "11",
        "label": "11 beads",
        "quantity": 11
      },
      {
        "id": "D",
        "text": "12",
        "label": "12 beads",
        "quantity": 12
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Skip Counting by 2 (+2)",
      "description": "2, 4, 6, 8, 10.",
      "whyOthersWrong": "8 + 2 = 10 beads.",
      "parentTip": "2, 4, 6, 8, 10!"
    }
  },
  {
    "id": "g2_t1_ns2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "quantitative",
    "subtestId": "number_series",
    "difficulty": "medium",
    "prompt": "Look at the groups of beads. Which group comes next?",
    "audioScript": "Look at the groups of beads. Which group comes next?",
    "rendererType": "number_series",
    "data": {
      "seriesType": "beads",
      "items": [
        {
          "count": 1,
          "color": "#0284c7"
        },
        {
          "count": 3,
          "color": "#0284c7"
        },
        {
          "count": 5,
          "color": "#0284c7"
        },
        {
          "count": 7,
          "color": "#0284c7"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "8",
        "label": "8 beads",
        "quantity": 8
      },
      {
        "id": "B",
        "text": "9",
        "label": "9 beads",
        "quantity": 9
      },
      {
        "id": "C",
        "text": "10",
        "label": "10 beads",
        "quantity": 10
      },
      {
        "id": "D",
        "text": "11",
        "label": "11 beads",
        "quantity": 11
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Odd Numbers (+2)",
      "description": "1, 3, 5, 7, 9. Adding 2 to 7 gives 9.",
      "whyOthersWrong": "7 + 2 = 9.",
      "parentTip": "Odd numbers jump by 2!"
    }
  },
  {
    "id": "g2_t1_fm1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "nonverbal",
    "subtestId": "figure_matrices",
    "difficulty": "easy",
    "prompt": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "audioScript": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "rendererType": "figure_matrix",
    "data": {
      "topRow": {
        "left": {
          "shape": "circle",
          "fill": "none",
          "color": "#1e293b"
        },
        "right": {
          "shape": "circle",
          "fill": "solid",
          "color": "#1e293b"
        }
      },
      "bottomRow": {
        "left": {
          "shape": "triangle",
          "fill": "none",
          "color": "#1e293b"
        }
      }
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "triangle",
          "fill": "solid",
          "color": "#1e293b"
        },
        "label": "Solid Triangle"
      },
      {
        "id": "B",
        "shape": {
          "shape": "square",
          "fill": "solid",
          "color": "#1e293b"
        },
        "label": "Solid Square"
      },
      {
        "id": "C",
        "shape": {
          "shape": "triangle",
          "fill": "none",
          "color": "#1e293b"
        },
        "label": "Clear Triangle"
      },
      {
        "id": "D",
        "shape": {
          "shape": "circle",
          "fill": "solid",
          "color": "#1e293b"
        },
        "label": "Solid Circle"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Fill Transformation",
      "description": "Shape stays triangle; fill turns solid black.",
      "whyOthersWrong": "The correct choice keeps the triangle shape and fills it in.",
      "parentTip": "Shape stays the same, color fills in!"
    }
  },
  {
    "id": "g2_t1_fm2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "nonverbal",
    "subtestId": "figure_matrices",
    "difficulty": "medium",
    "prompt": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "audioScript": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "rendererType": "figure_matrix",
    "data": {
      "topRow": {
        "left": {
          "shape": "arrow_up",
          "rotation": 0,
          "fill": "semi",
          "color": "#0284c7"
        },
        "right": {
          "shape": "arrow_up",
          "rotation": 90,
          "fill": "semi",
          "color": "#0284c7"
        }
      },
      "bottomRow": {
        "left": {
          "shape": "arrow_up",
          "rotation": 180,
          "fill": "semi",
          "color": "#0284c7"
        }
      }
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "arrow_up",
          "rotation": 270,
          "fill": "semi",
          "color": "#0284c7"
        },
        "label": "Points Left"
      },
      {
        "id": "B",
        "shape": {
          "shape": "arrow_up",
          "rotation": 0,
          "fill": "semi",
          "color": "#0284c7"
        },
        "label": "Points Up"
      },
      {
        "id": "C",
        "shape": {
          "shape": "arrow_up",
          "rotation": 90,
          "fill": "semi",
          "color": "#0284c7"
        },
        "label": "Points Right"
      },
      {
        "id": "D",
        "shape": {
          "shape": "arrow_up",
          "rotation": 180,
          "fill": "semi",
          "color": "#0284c7"
        },
        "label": "Points Down"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "90° Clockwise Rotation",
      "description": "Clockwise quarter turn from down points to the left.",
      "whyOthersWrong": "Down turns to left.",
      "parentTip": "Like the hand of a clock!"
    }
  },
  {
    "id": "g2_t1_pf1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "nonverbal",
    "subtestId": "paper_folding",
    "difficulty": "medium",
    "prompt": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "audioScript": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "rendererType": "paper_folding",
    "data": {
      "folds": [
        "right"
      ],
      "punch": {
        "x": 75,
        "y": 25,
        "r": 5
      },
      "steps": [
        {
          "type": "fold",
          "foldDirection": "right",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              50,
              90
            ]
          ],
          "caption": "Fold left to right"
        },
        {
          "type": "punch",
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              50,
              90
            ]
          ],
          "hole": {
            "x": 75,
            "y": 25,
            "r": 5
          },
          "caption": "Punch through the folded paper"
        }
      ],
      "creases": [
        "vertical"
      ],
      "finalUnfoldedHoles": [
        {
          "x": 75,
          "y": 25,
          "r": 5
        },
        {
          "x": 25,
          "y": 25,
          "r": 5
        }
      ],
      "unfolding": [
        {
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              50,
              90
            ]
          ],
          "holes": [
            {
              "x": 75,
              "y": 25,
              "r": 5
            }
          ],
          "caption": "Start with the punched paper"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "holes": [
            {
              "x": 75,
              "y": 25,
              "r": 5
            },
            {
              "x": 25,
              "y": 25,
              "r": 5
            }
          ],
          "caption": "Undo fold 1"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "holes": [
          {
            "x": 75,
            "y": 25,
            "r": 5
          },
          {
            "x": 25,
            "y": 25,
            "r": 5
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "Two holes across top"
      },
      {
        "id": "B",
        "holes": [
          {
            "x": 75,
            "y": 25
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "Vertical pair"
      },
      {
        "id": "C",
        "holes": [
          {
            "x": 75,
            "y": 25
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "One hole"
      },
      {
        "id": "D",
        "holes": [
          {
            "x": 25,
            "y": 25
          },
          {
            "x": 75,
            "y": 25
          },
          {
            "x": 25,
            "y": 75
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "Four holes"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Vertical Crease Reflection",
      "description": "Undo the folds in reverse order and reflect the hole across each crease. This produces 2 separate holes in the positions shown.",
      "whyOthersWrong": "1 fold = 2 layers = 2 holes along the top.",
      "parentTip": "Use the crease as a mirror. Holes away from the crease make separate copies; holes centered on a crease can join when opened."
    }
  },
  {
    "id": "g2_t1_pf2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "nonverbal",
    "subtestId": "paper_folding",
    "difficulty": "medium",
    "prompt": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "audioScript": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "rendererType": "paper_folding",
    "data": {
      "folds": [
        "up"
      ],
      "punch": {
        "x": 25,
        "y": 25,
        "r": 5
      },
      "steps": [
        {
          "type": "fold",
          "foldDirection": "up",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "caption": "Fold bottom to top"
        },
        {
          "type": "punch",
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "hole": {
            "x": 25,
            "y": 25,
            "r": 5
          },
          "caption": "Punch through the folded paper"
        }
      ],
      "creases": [
        "horizontal"
      ],
      "finalUnfoldedHoles": [
        {
          "x": 25,
          "y": 25,
          "r": 5
        },
        {
          "x": 25,
          "y": 75,
          "r": 5
        }
      ],
      "unfolding": [
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "holes": [
            {
              "x": 25,
              "y": 25,
              "r": 5
            }
          ],
          "caption": "Start with the punched paper"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "holes": [
            {
              "x": 25,
              "y": 25,
              "r": 5
            },
            {
              "x": 25,
              "y": 75,
              "r": 5
            }
          ],
          "caption": "Undo fold 1"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "holes": [
          {
            "x": 25,
            "y": 25,
            "r": 5
          },
          {
            "x": 25,
            "y": 75,
            "r": 5
          }
        ],
        "creases": [
          "horizontal"
        ],
        "label": "Two holes stacked on left"
      },
      {
        "id": "B",
        "holes": [
          {
            "x": 25,
            "y": 25
          },
          {
            "x": 75,
            "y": 25
          }
        ],
        "creases": [
          "horizontal"
        ],
        "label": "Horizontal pair across top"
      },
      {
        "id": "C",
        "holes": [
          {
            "x": 25,
            "y": 25
          }
        ],
        "creases": [
          "horizontal"
        ],
        "label": "Single hole"
      },
      {
        "id": "D",
        "holes": [
          {
            "x": 25,
            "y": 25
          },
          {
            "x": 75,
            "y": 25
          },
          {
            "x": 25,
            "y": 75
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "horizontal"
        ],
        "label": "Four corners"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Horizontal Crease Reflection",
      "description": "Undo the folds in reverse order and reflect the hole across each crease. This produces 2 separate holes in the positions shown.",
      "whyOthersWrong": "A horizontal crease mirrors vertically.",
      "parentTip": "Use the crease as a mirror. Holes away from the crease make separate copies; holes centered on a crease can join when opened."
    }
  },
  {
    "id": "g2_t1_fc1",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "nonverbal",
    "subtestId": "figure_classification",
    "difficulty": "medium",
    "prompt": "Look at the three figures. Which choice belongs in the same group?",
    "audioScript": "Look at the three figures. Which choice belongs in the same group?",
    "rendererType": "figure_classification",
    "data": {
      "stimulusFigures": [
        {
          "shape": "square",
          "fill": "semi",
          "color": "#4f46e5"
        },
        {
          "shape": "diamond",
          "fill": "semi",
          "color": "#4f46e5"
        },
        {
          "shape": "trapezoid",
          "fill": "semi",
          "color": "#4f46e5"
        }
      ],
      "ruleDescription": "All figures have 4 straight sides (Quadrilaterals)"
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "triangle",
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Triangle (3 sides)"
      },
      {
        "id": "B",
        "shape": {
          "shape": "pentagon",
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Pentagon (5 sides)"
      },
      {
        "id": "C",
        "shape": {
          "shape": "square",
          "rotation": 45,
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Square (4 sides)"
      },
      {
        "id": "D",
        "shape": {
          "shape": "circle",
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Circle (0 straight sides)"
      }
    ],
    "correctAnswer": 2,
    "explanation": {
      "rule": "4 Straight Sides (Quadrilaterals)",
      "description": "All shapes have 4 straight sides. Square has 4 sides.",
      "whyOthersWrong": "Triangles have 3 sides; pentagons have 5 sides.",
      "parentTip": "Count the sides: 1, 2, 3, 4!"
    }
  },
  {
    "id": "g2_t1_fc2",
    "grade": "2",
    "testId": "test_1",
    "batteryId": "nonverbal",
    "subtestId": "figure_classification",
    "difficulty": "medium",
    "prompt": "Look at the three figures. Which choice belongs in the same group?",
    "audioScript": "Look at the three figures. Which choice belongs in the same group?",
    "rendererType": "figure_classification",
    "data": {
      "stimulusFigures": [
        {
          "shape": "circle",
          "fill": "none",
          "color": "#0284c7",
          "dots": 1
        },
        {
          "shape": "square",
          "fill": "none",
          "color": "#0284c7",
          "dots": 1
        },
        {
          "shape": "triangle",
          "fill": "none",
          "color": "#0284c7",
          "dots": 1
        }
      ],
      "ruleDescription": "All figures contain exactly 1 center dot"
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "diamond",
          "fill": "none",
          "color": "#0284c7",
          "dots": 1
        }
      },
      {
        "id": "B",
        "shape": {
          "shape": "diamond",
          "fill": "none",
          "color": "#0284c7",
          "dots": 2
        }
      },
      {
        "id": "C",
        "shape": {
          "shape": "diamond",
          "fill": "solid",
          "color": "#0284c7",
          "dots": 0
        }
      },
      {
        "id": "D",
        "shape": {
          "shape": "star",
          "fill": "none",
          "color": "#0284c7",
          "dots": 0
        }
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Invariant: Exactly 1 Center Dot",
      "description": "Every shape in the group has exactly one dot located in its center. The correct choice also has exactly one dot in its center.",
      "whyOthersWrong": "The diamond with two dots has one dot too many. The solid diamond and the star have no dots. The matching figure must have exactly one central dot.",
      "parentTip": "Look at the center of each shape: count the dots!"
    }
  },
  {
    "id": "g2_t2_pa1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "verbal",
    "subtestId": "picture_analogies",
    "difficulty": "medium",
    "prompt": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "audioScript": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "rendererType": "picture_analogy",
    "data": {
      "topPair": [
        {
          "emoji": "🐛",
          "label": "Caterpillar"
        },
        {
          "emoji": "🦋",
          "label": "Butterfly"
        }
      ],
      "bottomStimulus": {
        "label": "Tadpole",
        "illustration": "tadpole"
      }
    },
    "options": [
      {
        "id": "A",
        "emoji": "🐸",
        "label": "Frog"
      },
      {
        "id": "B",
        "emoji": "🐢",
        "label": "Turtle"
      },
      {
        "id": "C",
        "emoji": "🦆",
        "label": "Duck"
      },
      {
        "id": "D",
        "emoji": "🦈",
        "label": "Shark"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Metamorphosis / Life Cycle",
      "description": "A tadpole grows legs and lungs to become a frog.",
      "whyOthersWrong": "Tadpoles grow into frogs.",
      "parentTip": "Think about animal life cycles!"
    }
  },
  {
    "id": "g2_t2_pa2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "verbal",
    "subtestId": "picture_analogies",
    "difficulty": "medium",
    "prompt": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "audioScript": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "rendererType": "picture_analogy",
    "data": {
      "topPair": [
        {
          "emoji": "🐝",
          "label": "Bee"
        },
        {
          "emoji": "🍯",
          "label": "Honey"
        }
      ],
      "bottomStimulus": {
        "emoji": "🐄",
        "label": "Cow"
      }
    },
    "options": [
      {
        "id": "A",
        "emoji": "🥛",
        "label": "Milk"
      },
      {
        "id": "B",
        "emoji": "🌾",
        "label": "Hay"
      },
      {
        "id": "C",
        "emoji": "🚜",
        "label": "Tractor"
      },
      {
        "id": "D",
        "label": "Barn",
        "illustration": "barn"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Animal to Product Made",
      "description": "Bees produce honey; cows produce milk.",
      "whyOthersWrong": "Hay is food eaten, not what the animal produces.",
      "parentTip": "What does the cow give us?"
    }
  },
  {
    "id": "g2_t2_sc1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "verbal",
    "subtestId": "sentence_completion",
    "difficulty": "medium",
    "prompt": "Listen to the sentence. Which picture completes it?",
    "audioScript": "The baker mixed the dough, shaped it into loaves, and put it into the hot blank so it would bake into fresh bread. Which picture completes the sentence?",
    "rendererType": "sentence_completion",
    "data": {
      "sentence": "The baker mixed the dough, shaped it into loaves, and put it into the hot ______ so it would bake into fresh bread."
    },
    "options": [
      {
        "id": "A",
        "label": "Freezer",
        "illustration": "freezer"
      },
      {
        "id": "B",
        "label": "Oven",
        "illustration": "oven"
      },
      {
        "id": "C",
        "emoji": "🥣",
        "label": "Bowl"
      },
      {
        "id": "D",
        "emoji": "🧺",
        "label": "Basket"
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Baking Context",
      "description": "An oven is hot and bakes bread.",
      "whyOthersWrong": "Freezers are cold; baskets do not cook.",
      "parentTip": "Look for \"hot\" and \"bake\"."
    }
  },
  {
    "id": "g2_t2_sc2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "verbal",
    "subtestId": "sentence_completion",
    "difficulty": "hard",
    "prompt": "Listen to the sentence. Which picture completes it?",
    "audioScript": "With its sharp teeth, the busy beaver cut down tree branches and built a sturdy blank across the river. Which picture completes the sentence?",
    "rendererType": "sentence_completion",
    "data": {
      "sentence": "With its sharp teeth, the busy beaver cut down tree branches and built a sturdy ______ across the river."
    },
    "options": [
      {
        "id": "A",
        "label": "Dam",
        "illustration": "dam"
      },
      {
        "id": "B",
        "emoji": "🪺",
        "label": "Nest"
      },
      {
        "id": "C",
        "emoji": "⛺",
        "label": "Tent"
      },
      {
        "id": "D",
        "emoji": "🏰",
        "label": "Castle"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Animal Architecture",
      "description": "Beavers build dams across rivers using logs and branches.",
      "whyOthersWrong": "Birds build nests; humans pitch tents.",
      "parentTip": "What do beavers build in water? A dam!"
    }
  },
  {
    "id": "g2_t2_pc1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "verbal",
    "subtestId": "picture_classification",
    "difficulty": "medium",
    "prompt": "Look at the three pictures. Which choice belongs in the same group?",
    "audioScript": "Look at the three pictures. Which choice belongs in the same group?",
    "rendererType": "picture_classification",
    "data": {
      "items": [
        {
          "emoji": "🎸",
          "label": "Guitar"
        },
        {
          "emoji": "🎻",
          "label": "Violin"
        },
        {
          "emoji": "🪕",
          "label": "Banjo"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "emoji": "🥁",
        "label": "Drum"
      },
      {
        "id": "B",
        "emoji": "🎺",
        "label": "Trumpet"
      },
      {
        "id": "C",
        "label": "Harp",
        "illustration": "harp"
      },
      {
        "id": "D",
        "emoji": "🔔",
        "label": "Bell"
      }
    ],
    "correctAnswer": 2,
    "explanation": {
      "rule": "String Musical Instruments",
      "description": "Guitar, violin, banjo, and harp all have strings.",
      "whyOthersWrong": "Drums and bells are struck; trumpets are blown.",
      "parentTip": "They all have vibrating strings!"
    }
  },
  {
    "id": "g2_t2_pc2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "verbal",
    "subtestId": "picture_classification",
    "difficulty": "medium",
    "prompt": "Look at the three pictures. Which choice belongs in the same group?",
    "audioScript": "Look at the three pictures. Which choice belongs in the same group?",
    "rendererType": "picture_classification",
    "data": {
      "items": [
        {
          "emoji": "🦁",
          "label": "Lion"
        },
        {
          "emoji": "🐯",
          "label": "Tiger"
        },
        {
          "emoji": "🐆",
          "label": "Leopard"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "emoji": "🐈",
        "label": "Cat"
      },
      {
        "id": "B",
        "emoji": "🐺",
        "label": "Wolf"
      },
      {
        "id": "C",
        "emoji": "🐻",
        "label": "Bear"
      },
      {
        "id": "D",
        "emoji": "🦊",
        "label": "Fox"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Cat family",
      "description": "Lions, tigers, leopards, and domestic cats belong to the cat family.",
      "whyOthersWrong": "Wolves and foxes belong to the dog family. Bears do not belong to the cat family.",
      "parentTip": "Compare the animals and ask which belong to the same animal family."
    }
  },
  {
    "id": "g2_t2_na1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "quantitative",
    "subtestId": "number_analogies",
    "difficulty": "medium",
    "prompt": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "audioScript": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "rendererType": "number_analogy",
    "data": {
      "topPair": {
        "left": 8,
        "right": 5
      },
      "bottomStimulus": {
        "left": 9
      }
    },
    "options": [
      {
        "id": "A",
        "text": "6",
        "label": "6",
        "quantity": 6
      },
      {
        "id": "B",
        "text": "7",
        "label": "7",
        "quantity": 7
      },
      {
        "id": "C",
        "text": "4",
        "label": "4",
        "quantity": 4
      },
      {
        "id": "D",
        "text": "12",
        "label": "12",
        "quantity": 12
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Subtract 3 (-3)",
      "description": "8 - 3 = 5. 9 - 3 = 6.",
      "whyOthersWrong": "9 - 3 = 6.",
      "parentTip": "Count backward by 3!"
    }
  },
  {
    "id": "g2_t2_na2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "quantitative",
    "subtestId": "number_analogies",
    "difficulty": "hard",
    "prompt": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "audioScript": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "rendererType": "number_analogy",
    "data": {
      "topPair": {
        "left": 2,
        "right": 6
      },
      "bottomStimulus": {
        "left": 3
      }
    },
    "options": [
      {
        "id": "A",
        "text": "11",
        "label": "11",
        "quantity": 11
      },
      {
        "id": "B",
        "text": "8",
        "label": "8",
        "quantity": 8
      },
      {
        "id": "C",
        "text": "9",
        "label": "9",
        "quantity": 9
      },
      {
        "id": "D",
        "text": "12",
        "label": "12",
        "quantity": 12
      }
    ],
    "correctAnswer": 2,
    "explanation": {
      "rule": "Multiply by 3 (Tripling)",
      "description": "2 × 3 = 6. 3 × 3 = 9.",
      "whyOthersWrong": "3 + 3 + 3 = 9.",
      "parentTip": "3 groups of 3 is 9!"
    }
  },
  {
    "id": "g2_t2_np1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "quantitative",
    "subtestId": "number_puzzles",
    "difficulty": "medium",
    "prompt": "Which choice makes the two trains carry the same total number of objects?",
    "audioScript": "Which choice makes the two trains carry the same total number of objects?",
    "rendererType": "balance_puzzle",
    "data": {
      "type": "object_trains",
      "topCars": [
        7,
        4
      ],
      "bottomCars": [
        8,
        "?"
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "2",
        "label": "2",
        "quantity": 2
      },
      {
        "id": "B",
        "text": "3",
        "label": "3",
        "quantity": 3
      },
      {
        "id": "C",
        "text": "4",
        "label": "4",
        "quantity": 4
      },
      {
        "id": "D",
        "text": "5",
        "label": "5",
        "quantity": 5
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Equivalence: 11 = 11",
      "description": "7 + 4 = 11. 8 + 3 = 11.",
      "whyOthersWrong": "8 + 3 = 11.",
      "parentTip": "Count up from 8 to 11: 3 fingers!"
    }
  },
  {
    "id": "g2_t2_np2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "quantitative",
    "subtestId": "number_puzzles",
    "difficulty": "medium",
    "prompt": "Which choice makes the two trains carry the same total number of objects?",
    "audioScript": "Which choice makes the two trains carry the same total number of objects?",
    "rendererType": "balance_puzzle",
    "data": {
      "type": "object_trains",
      "topCars": [
        12
      ],
      "bottomCars": [
        8,
        "?"
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "3",
        "label": "3",
        "quantity": 3
      },
      {
        "id": "B",
        "text": "4",
        "label": "4",
        "quantity": 4
      },
      {
        "id": "C",
        "text": "5",
        "label": "5",
        "quantity": 5
      },
      {
        "id": "D",
        "text": "6",
        "label": "6",
        "quantity": 6
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Conservation of Total (12)",
      "description": "8 + 4 = 12.",
      "whyOthersWrong": "8 + 4 = 12.",
      "parentTip": "8 plus what equals 12? Four!"
    }
  },
  {
    "id": "g2_t2_ns1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "quantitative",
    "subtestId": "number_series",
    "difficulty": "medium",
    "prompt": "Look at the groups of beads. Which group comes next?",
    "audioScript": "Look at the groups of beads. Which group comes next?",
    "rendererType": "number_series",
    "data": {
      "seriesType": "beads",
      "items": [
        {
          "count": 15,
          "color": "#0284c7"
        },
        {
          "count": 12,
          "color": "#0284c7"
        },
        {
          "count": 9,
          "color": "#0284c7"
        },
        {
          "count": 6,
          "color": "#0284c7"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "4",
        "label": "4",
        "quantity": 4
      },
      {
        "id": "B",
        "text": "3",
        "label": "3",
        "quantity": 3
      },
      {
        "id": "C",
        "text": "2",
        "label": "2",
        "quantity": 2
      },
      {
        "id": "D",
        "text": "1",
        "label": "1",
        "quantity": 1
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Subtract 3 (-3)",
      "description": "6 - 3 = 3.",
      "whyOthersWrong": "6 minus 3 is 3.",
      "parentTip": "Count down: 6 minus 3 is 3!"
    }
  },
  {
    "id": "g2_t2_ns2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "quantitative",
    "subtestId": "number_series",
    "difficulty": "medium",
    "prompt": "Look at the groups of beads. Which group comes next?",
    "audioScript": "Look at the groups of beads. Which group comes next?",
    "rendererType": "number_series",
    "data": {
      "seriesType": "beads",
      "items": [
        {
          "count": 3,
          "color": "#0284c7"
        },
        {
          "count": 6,
          "color": "#0284c7"
        },
        {
          "count": 9,
          "color": "#0284c7"
        },
        {
          "count": 12,
          "color": "#0284c7"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "14",
        "label": "14 beads",
        "quantity": 14
      },
      {
        "id": "B",
        "text": "15",
        "label": "15 beads",
        "quantity": 15
      },
      {
        "id": "C",
        "text": "16",
        "label": "16 beads",
        "quantity": 16
      },
      {
        "id": "D",
        "text": "18",
        "label": "18 beads",
        "quantity": 18
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Skip Counting by 3 (+3)",
      "description": "12 + 3 = 15.",
      "whyOthersWrong": "12 + 3 is 15.",
      "parentTip": "Count by 3s: 3, 6, 9, 12, 15!"
    }
  },
  {
    "id": "g2_t2_fm1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "nonverbal",
    "subtestId": "figure_matrices",
    "difficulty": "medium",
    "prompt": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "audioScript": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "rendererType": "figure_matrix",
    "data": {
      "topRow": {
        "left": {
          "shape": "square",
          "fill": "none",
          "color": "#0f766e",
          "dots": 1
        },
        "right": {
          "shape": "square",
          "fill": "none",
          "color": "#0f766e",
          "dots": 2
        }
      },
      "bottomRow": {
        "left": {
          "shape": "triangle",
          "fill": "none",
          "color": "#0f766e",
          "dots": 2
        }
      }
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "triangle",
          "fill": "none",
          "color": "#0f766e",
          "dots": 3
        },
        "label": "Triangle with 3 dots"
      },
      {
        "id": "B",
        "shape": {
          "shape": "square",
          "fill": "none",
          "color": "#0f766e",
          "dots": 3
        },
        "label": "Square with 3 dots"
      },
      {
        "id": "C",
        "shape": {
          "shape": "triangle",
          "fill": "solid",
          "color": "#0f766e",
          "dots": 2
        },
        "label": "Solid triangle"
      },
      {
        "id": "D",
        "shape": {
          "shape": "circle",
          "fill": "none",
          "color": "#0f766e",
          "dots": 3
        },
        "label": "Circle with 3 dots"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Add 1 Inner Dot (+1)",
      "description": "The shape gains one extra dot: 2 dots + 1 = 3 dots.",
      "whyOthersWrong": "Triangle with 3 dots.",
      "parentTip": "Count the dots inside!"
    }
  },
  {
    "id": "g2_t2_fm2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "nonverbal",
    "subtestId": "figure_matrices",
    "difficulty": "hard",
    "prompt": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "audioScript": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "rendererType": "figure_matrix",
    "data": {
      "topRow": {
        "left": {
          "shape": "arrow_up",
          "rotation": 90,
          "fill": "semi",
          "color": "#4f46e5"
        },
        "right": {
          "shape": "arrow_up",
          "rotation": 270,
          "fill": "semi",
          "color": "#4f46e5"
        }
      },
      "bottomRow": {
        "left": {
          "shape": "arrow_up",
          "rotation": 0,
          "fill": "semi",
          "color": "#4f46e5"
        }
      }
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "arrow_up",
          "rotation": 180,
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Points Down"
      },
      {
        "id": "B",
        "shape": {
          "shape": "arrow_up",
          "rotation": 90,
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Points Right"
      },
      {
        "id": "C",
        "shape": {
          "shape": "arrow_up",
          "rotation": 0,
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Points Up"
      },
      {
        "id": "D",
        "shape": {
          "shape": "arrow_up",
          "rotation": 270,
          "fill": "semi",
          "color": "#4f46e5"
        },
        "label": "Points Left"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Half-turn rotation",
      "description": "The top arrow turns halfway around, from right to left. The bottom arrow also turns halfway around, from up to down.",
      "whyOthersWrong": "A half-turn from up points down. The other arrows point up, right, or left.",
      "parentTip": "Think about opposites: Up flips to Down!"
    }
  },
  {
    "id": "g2_t2_pf1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "nonverbal",
    "subtestId": "paper_folding",
    "difficulty": "hard",
    "prompt": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "audioScript": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "rendererType": "paper_folding",
    "data": {
      "folds": [
        "up",
        "right"
      ],
      "punch": {
        "x": 75,
        "y": 25,
        "r": 5
      },
      "steps": [
        {
          "type": "fold",
          "foldDirection": "up",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "caption": "Fold bottom to top"
        },
        {
          "type": "fold",
          "foldDirection": "right",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              50,
              50
            ]
          ],
          "caption": "Fold left to right"
        },
        {
          "type": "punch",
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              50,
              50
            ]
          ],
          "hole": {
            "x": 75,
            "y": 25,
            "r": 5
          },
          "caption": "Punch through the folded paper"
        }
      ],
      "creases": [
        "horizontal",
        "vertical"
      ],
      "finalUnfoldedHoles": [
        {
          "x": 75,
          "y": 25,
          "r": 5
        },
        {
          "x": 25,
          "y": 25,
          "r": 5
        },
        {
          "x": 75,
          "y": 75,
          "r": 5
        },
        {
          "x": 25,
          "y": 75,
          "r": 5
        }
      ],
      "unfolding": [
        {
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              50,
              50
            ]
          ],
          "holes": [
            {
              "x": 75,
              "y": 25,
              "r": 5
            }
          ],
          "caption": "Start with the punched paper"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "holes": [
            {
              "x": 75,
              "y": 25,
              "r": 5
            },
            {
              "x": 25,
              "y": 25,
              "r": 5
            }
          ],
          "caption": "Undo fold 2"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "holes": [
            {
              "x": 75,
              "y": 25,
              "r": 5
            },
            {
              "x": 25,
              "y": 25,
              "r": 5
            },
            {
              "x": 75,
              "y": 75,
              "r": 5
            },
            {
              "x": 25,
              "y": 75,
              "r": 5
            }
          ],
          "caption": "Undo fold 1"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "holes": [
          {
            "x": 75,
            "y": 25,
            "r": 5
          },
          {
            "x": 25,
            "y": 25,
            "r": 5
          },
          {
            "x": 75,
            "y": 75,
            "r": 5
          },
          {
            "x": 25,
            "y": 75,
            "r": 5
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "Four corner holes"
      },
      {
        "id": "B",
        "holes": [
          {
            "x": 50,
            "y": 50,
            "r": 9
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "One center hole"
      },
      {
        "id": "C",
        "holes": [
          {
            "x": 50,
            "y": 25
          },
          {
            "x": 50,
            "y": 75
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "Two edge holes"
      },
      {
        "id": "D",
        "holes": [
          {
            "x": 75,
            "y": 25
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "Two right holes"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Quarter Fold Outer Corner Reflection",
      "description": "Undo the folds in reverse order and reflect the hole across each crease. This produces 4 separate holes in the positions shown.",
      "whyOthersWrong": "Outer punch creates 4 corner holes.",
      "parentTip": "Use the crease as a mirror. Holes away from the crease make separate copies; holes centered on a crease can join when opened."
    }
  },
  {
    "id": "g2_t2_pf2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "nonverbal",
    "subtestId": "paper_folding",
    "difficulty": "medium",
    "prompt": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "audioScript": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "rendererType": "paper_folding",
    "data": {
      "folds": [
        "right"
      ],
      "punch": {
        "x": 50,
        "y": 50,
        "r": 5
      },
      "steps": [
        {
          "type": "fold",
          "foldDirection": "right",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              50,
              90
            ]
          ],
          "caption": "Fold left to right"
        },
        {
          "type": "punch",
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              50,
              90
            ]
          ],
          "hole": {
            "x": 50,
            "y": 50,
            "r": 5
          },
          "caption": "Punch through the folded paper"
        }
      ],
      "creases": [
        "vertical"
      ],
      "finalUnfoldedHoles": [
        {
          "x": 50,
          "y": 50,
          "r": 5
        }
      ],
      "unfolding": [
        {
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              50,
              90
            ]
          ],
          "holes": [
            {
              "x": 50,
              "y": 50,
              "r": 5
            }
          ],
          "caption": "Start with the punched paper"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "holes": [
            {
              "x": 50,
              "y": 50,
              "r": 5
            }
          ],
          "caption": "Undo fold 1"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "holes": [
          {
            "x": 50,
            "y": 50,
            "r": 5
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "One hole in middle crease"
      },
      {
        "id": "B",
        "holes": [
          {
            "x": 25,
            "y": 50
          },
          {
            "x": 75,
            "y": 50
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "Two holes on sides"
      },
      {
        "id": "C",
        "holes": [
          {
            "x": 50,
            "y": 25
          },
          {
            "x": 50,
            "y": 75
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "Two holes top and bottom"
      },
      {
        "id": "D",
        "holes": [
          {
            "x": 25,
            "y": 25
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "vertical"
        ],
        "label": "Two diagonal holes"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Crease Line Punch",
      "description": "The punch is centered exactly on the crease. The two half circles join into one circular hole.",
      "whyOthersWrong": "A half-circle punch on the crease opens to one full circle.",
      "parentTip": "Use the crease as a mirror. Holes away from the crease make separate copies; holes centered on a crease can join when opened."
    }
  },
  {
    "id": "g2_t2_fc1",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "nonverbal",
    "subtestId": "figure_classification",
    "difficulty": "hard",
    "prompt": "Look at the three figures. Which choice belongs in the same group?",
    "audioScript": "Look at the three figures. Which choice belongs in the same group?",
    "rendererType": "figure_classification",
    "data": {
      "stimulusFigures": [
        {
          "shape": "circle",
          "fill": "none",
          "color": "#0f766e",
          "dots": 2
        },
        {
          "shape": "square",
          "fill": "none",
          "color": "#0f766e",
          "dots": 2
        },
        {
          "shape": "triangle",
          "fill": "none",
          "color": "#0f766e",
          "dots": 2
        }
      ],
      "ruleDescription": "All figures contain exactly 2 inner dots"
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "diamond",
          "fill": "none",
          "color": "#0f766e",
          "dots": 2
        },
        "label": "Diamond with 2 dots"
      },
      {
        "id": "B",
        "shape": {
          "shape": "diamond",
          "fill": "none",
          "color": "#0f766e",
          "dots": 1
        },
        "label": "Diamond with 1 dot"
      },
      {
        "id": "C",
        "shape": {
          "shape": "pentagon",
          "fill": "none",
          "color": "#0f766e",
          "dots": 3
        },
        "label": "Pentagon with 3 dots"
      },
      {
        "id": "D",
        "shape": {
          "shape": "circle",
          "fill": "solid",
          "color": "#0f766e",
          "dots": 0
        },
        "label": "Solid circle no dots"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Exactly 2 Inner Dots",
      "description": "The invariant rule is having 2 dots inside.",
      "whyOthersWrong": "The other figures have one dot, three dots, or no dots. Only the matching figure has exactly two dots.",
      "parentTip": "Count the dots inside!"
    }
  },
  {
    "id": "g2_t2_fc2",
    "grade": "2",
    "testId": "test_2",
    "batteryId": "nonverbal",
    "subtestId": "figure_classification",
    "difficulty": "medium",
    "prompt": "Look at the three figures. Which choice belongs in the same group?",
    "audioScript": "Look at the three figures. Which choice belongs in the same group?",
    "rendererType": "figure_classification",
    "data": {
      "stimulusFigures": [
        {
          "shape": "circle",
          "lines": "vertical",
          "fill": "none",
          "color": "#7c3aed"
        },
        {
          "shape": "square",
          "lines": "vertical",
          "fill": "none",
          "color": "#7c3aed"
        },
        {
          "shape": "triangle",
          "lines": "vertical",
          "fill": "none",
          "color": "#7c3aed"
        }
      ],
      "ruleDescription": "All figures have a vertical division line"
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "diamond",
          "lines": "vertical",
          "fill": "none",
          "color": "#7c3aed"
        },
        "label": "Diamond with vertical line"
      },
      {
        "id": "B",
        "shape": {
          "shape": "diamond",
          "lines": "horizontal",
          "fill": "none",
          "color": "#7c3aed"
        },
        "label": "Diamond with horizontal line"
      },
      {
        "id": "C",
        "shape": {
          "shape": "diamond",
          "fill": "solid",
          "color": "#7c3aed"
        },
        "label": "Solid diamond"
      },
      {
        "id": "D",
        "shape": {
          "shape": "star",
          "fill": "none",
          "color": "#7c3aed"
        },
        "label": "Empty star"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Vertical dividing line",
      "description": "All stimulus shapes are split by a vertical line.",
      "whyOthersWrong": "The other diamond has a horizontal line, the solid diamond has no dividing line, and the star has no dividing line. The matching figure has a vertical line.",
      "parentTip": "Check the line direction: top to bottom (vertical)!"
    }
  },
  {
    "id": "g2_t3_pa1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "verbal",
    "subtestId": "picture_analogies",
    "difficulty": "hard",
    "prompt": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "audioScript": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "rendererType": "picture_analogy",
    "data": {
      "topPair": [
        {
          "emoji": "🧑‍🎨",
          "label": "Painter"
        },
        {
          "emoji": "🖌️",
          "label": "Paintbrush"
        }
      ],
      "bottomStimulus": {
        "emoji": "👨‍🍳",
        "label": "Chef"
      }
    },
    "options": [
      {
        "id": "A",
        "emoji": "🥄",
        "label": "Spoon"
      },
      {
        "id": "B",
        "emoji": "🔨",
        "label": "Hammer"
      },
      {
        "id": "C",
        "emoji": "🩺",
        "label": "Stethoscope"
      },
      {
        "id": "D",
        "emoji": "🚒",
        "label": "Fire Truck"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Worker to Primary Hand Tool",
      "description": "A painter uses a paintbrush; a chef uses a spoon for stirring.",
      "whyOthersWrong": "A hammer is for carpentry, stethoscope is for doctors.",
      "parentTip": "What tool does the chef hold in their hand?"
    }
  },
  {
    "id": "g2_t3_pa2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "verbal",
    "subtestId": "picture_analogies",
    "difficulty": "hard",
    "prompt": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "audioScript": "Look at the top pair of pictures. Which choice goes with the bottom picture in the same way?",
    "rendererType": "picture_analogy",
    "data": {
      "topPair": [
        {
          "emoji": "⛵",
          "label": "Boat"
        },
        {
          "emoji": "🌊",
          "label": "Water"
        }
      ],
      "bottomStimulus": {
        "emoji": "✈️",
        "label": "Airplane"
      }
    },
    "options": [
      {
        "id": "A",
        "emoji": "☁️",
        "label": "Sky"
      },
      {
        "id": "B",
        "emoji": "🛤️",
        "label": "Railroad Tracks"
      },
      {
        "id": "C",
        "emoji": "🛣️",
        "label": "Highway Road"
      },
      {
        "id": "D",
        "emoji": "🏔️",
        "label": "Mountain"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Vehicle to Travel Medium",
      "description": "Boats travel on water; airplanes travel in the sky.",
      "whyOthersWrong": "Airplanes fly in the sky/air.",
      "parentTip": "Where does each vehicle travel?"
    }
  },
  {
    "id": "g2_t3_sc1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "verbal",
    "subtestId": "sentence_completion",
    "difficulty": "hard",
    "prompt": "Listen to the sentence. Which picture completes it?",
    "audioScript": "The astronaut put on his spacesuit and boarded the blank to travel to the space station. Which picture completes the sentence?",
    "rendererType": "sentence_completion",
    "data": {
      "sentence": "The astronaut put on his spacesuit and boarded the ______ to travel to the space station."
    },
    "options": [
      {
        "id": "A",
        "emoji": "🚀",
        "label": "Rocket"
      },
      {
        "id": "B",
        "emoji": "⛵",
        "label": "Sailboat"
      },
      {
        "id": "C",
        "emoji": "🚂",
        "label": "Train"
      },
      {
        "id": "D",
        "emoji": "🚁",
        "label": "Helicopter"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Spacecraft Domain",
      "description": "Of these choices, a rocket can carry an astronaut into space.",
      "whyOthersWrong": "Sailboats and trains cannot travel to space.",
      "parentTip": "Which vehicle flies all the way to outer space?"
    }
  },
  {
    "id": "g2_t3_sc2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "verbal",
    "subtestId": "sentence_completion",
    "difficulty": "medium",
    "prompt": "Listen to the sentence. Which picture completes it?",
    "audioScript": "The gardener planted flower seeds in the rich soil and used a blank to water them every morning. Which picture completes the sentence?",
    "rendererType": "sentence_completion",
    "data": {
      "sentence": "The gardener planted flower seeds in the rich soil and used a ______ to water them every morning."
    },
    "options": [
      {
        "id": "A",
        "label": "Watering Can",
        "illustration": "watering_can"
      },
      {
        "id": "B",
        "emoji": "✂️",
        "label": "Scissors"
      },
      {
        "id": "C",
        "emoji": "🧹",
        "label": "Broom"
      },
      {
        "id": "D",
        "label": "Paint Roller",
        "illustration": "paint_roller"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Gardening Tool Function",
      "description": "A watering can holds water to nourish growing seeds.",
      "whyOthersWrong": "Brooms sweep and scissors cut.",
      "parentTip": "Look for the clue word \"water them\"."
    }
  },
  {
    "id": "g2_t3_pc1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "verbal",
    "subtestId": "picture_classification",
    "difficulty": "hard",
    "prompt": "Look at the three pictures. Which choice belongs in the same group?",
    "audioScript": "Look at the three pictures. Which choice belongs in the same group?",
    "rendererType": "picture_classification",
    "data": {
      "items": [
        {
          "emoji": "🦅",
          "label": "Eagle"
        },
        {
          "emoji": "🦉",
          "label": "Owl"
        },
        {
          "emoji": "🦜",
          "label": "Parrot"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "emoji": "🦆",
        "label": "Duck"
      },
      {
        "id": "B",
        "emoji": "🦇",
        "label": "Bat"
      },
      {
        "id": "C",
        "emoji": "🐟",
        "label": "Fish"
      },
      {
        "id": "D",
        "emoji": "🦋",
        "label": "Butterfly"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Birds",
      "description": "Eagles, owls, parrots, and ducks are birds. They all have feathers and beaks.",
      "whyOthersWrong": "A bat is a mammal, a fish has fins and gills, and a butterfly is an insect. Flying alone does not make an animal a bird.",
      "parentTip": "Ask what all three birds have in common. Can an animal fly without being a bird?"
    }
  },
  {
    "id": "g2_t3_pc2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "verbal",
    "subtestId": "picture_classification",
    "difficulty": "medium",
    "prompt": "Look at the three pictures. Which choice belongs in the same group?",
    "audioScript": "Look at the three pictures. Which choice belongs in the same group?",
    "rendererType": "picture_classification",
    "data": {
      "items": [
        {
          "emoji": "👢",
          "label": "Boots"
        },
        {
          "emoji": "👟",
          "label": "Sneakers"
        },
        {
          "emoji": "👡",
          "label": "Sandals"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "emoji": "🥿",
        "label": "Flat Shoe"
      },
      {
        "id": "B",
        "emoji": "🧤",
        "label": "Gloves"
      },
      {
        "id": "C",
        "emoji": "🧢",
        "label": "Hat"
      },
      {
        "id": "D",
        "emoji": "🧣",
        "label": "Scarf"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Category: Footwear (Shoes)",
      "description": "Boots, sneakers, sandals, and flat shoes are footwear worn on feet.",
      "whyOthersWrong": "Gloves go on hands, hats on heads, scarves on necks.",
      "parentTip": "Which choice is shoes for your feet?"
    }
  },
  {
    "id": "g2_t3_na1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "quantitative",
    "subtestId": "number_analogies",
    "difficulty": "hard",
    "prompt": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "audioScript": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "rendererType": "number_analogy",
    "data": {
      "topPair": {
        "left": 5,
        "right": 15
      },
      "bottomStimulus": {
        "left": 4
      }
    },
    "options": [
      {
        "id": "A",
        "text": "12",
        "label": "12",
        "quantity": 12
      },
      {
        "id": "B",
        "text": "10",
        "label": "10",
        "quantity": 10
      },
      {
        "id": "C",
        "text": "16",
        "label": "16",
        "quantity": 16
      },
      {
        "id": "D",
        "text": "7",
        "label": "7",
        "quantity": 7
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Multiply by 3 (Tripling)",
      "description": "5 × 3 = 15. 4 × 3 = 12.",
      "whyOthersWrong": "4 + 4 + 4 = 12.",
      "parentTip": "Add 4 three times: 4, 8, 12!"
    }
  },
  {
    "id": "g2_t3_na2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "quantitative",
    "subtestId": "number_analogies",
    "difficulty": "hard",
    "prompt": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "audioScript": "Look at the top pair of quantities. Which choice completes the bottom pair using the same rule?",
    "rendererType": "number_analogy",
    "data": {
      "topPair": {
        "left": 10,
        "right": 6
      },
      "bottomStimulus": {
        "left": 11
      }
    },
    "options": [
      {
        "id": "A",
        "text": "7",
        "label": "7",
        "quantity": 7
      },
      {
        "id": "B",
        "text": "8",
        "label": "8",
        "quantity": 8
      },
      {
        "id": "C",
        "text": "6",
        "label": "6",
        "quantity": 6
      },
      {
        "id": "D",
        "text": "5",
        "label": "5",
        "quantity": 5
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Subtract 4 (-4)",
      "description": "10 - 4 = 6. 11 - 4 = 7.",
      "whyOthersWrong": "11 - 4 = 7.",
      "parentTip": "Count down 4 from 11!"
    }
  },
  {
    "id": "g2_t3_np1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "quantitative",
    "subtestId": "number_puzzles",
    "difficulty": "hard",
    "prompt": "Which choice makes the two trains carry the same total number of objects?",
    "audioScript": "Which choice makes the two trains carry the same total number of objects?",
    "rendererType": "balance_puzzle",
    "data": {
      "type": "object_trains",
      "topCars": [
        9,
        5
      ],
      "bottomCars": [
        8,
        "?"
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "5",
        "label": "5",
        "quantity": 5
      },
      {
        "id": "B",
        "text": "6",
        "label": "6",
        "quantity": 6
      },
      {
        "id": "C",
        "text": "7",
        "label": "7",
        "quantity": 7
      },
      {
        "id": "D",
        "text": "8",
        "label": "8",
        "quantity": 8
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Equal train totals",
      "description": "9 + 5 = 14. 8 + 6 = 14.",
      "whyOthersWrong": "8 + 6 = 14.",
      "parentTip": "9 + 5 = 14. Count from 8 up to 14: 6!"
    }
  },
  {
    "id": "g2_t3_np2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "quantitative",
    "subtestId": "number_puzzles",
    "difficulty": "hard",
    "prompt": "Which choice makes the two trains carry the same total number of objects?",
    "audioScript": "Which choice makes the two trains carry the same total number of objects?",
    "rendererType": "balance_puzzle",
    "data": {
      "type": "object_trains",
      "topCars": [
        6,
        6
      ],
      "bottomCars": [
        7,
        "?"
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "4",
        "label": "4",
        "quantity": 4
      },
      {
        "id": "B",
        "text": "5",
        "label": "5",
        "quantity": 5
      },
      {
        "id": "C",
        "text": "6",
        "label": "6",
        "quantity": 6
      },
      {
        "id": "D",
        "text": "3",
        "label": "3",
        "quantity": 3
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Equivalence: 12 = 12",
      "description": "6 + 6 = 12. 7 + 5 = 12.",
      "whyOthersWrong": "7 + 5 = 12.",
      "parentTip": "12 minus 7 is 5!"
    }
  },
  {
    "id": "g2_t3_ns1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "quantitative",
    "subtestId": "number_series",
    "difficulty": "medium",
    "prompt": "Look at the groups of beads. Which group comes next?",
    "audioScript": "Look at the groups of beads. Which group comes next?",
    "rendererType": "number_series",
    "data": {
      "seriesType": "beads",
      "items": [
        {
          "count": 5,
          "color": "#0284c7"
        },
        {
          "count": 10,
          "color": "#0284c7"
        },
        {
          "count": 15,
          "color": "#0284c7"
        },
        {
          "count": 20,
          "color": "#0284c7"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "22",
        "label": "22",
        "quantity": 22
      },
      {
        "id": "B",
        "text": "25",
        "label": "25",
        "quantity": 25
      },
      {
        "id": "C",
        "text": "30",
        "label": "30",
        "quantity": 30
      },
      {
        "id": "D",
        "text": "24",
        "label": "24",
        "quantity": 24
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Counting by Fives (+5)",
      "description": "5, 10, 15, 20, 25.",
      "whyOthersWrong": "20 + 5 = 25.",
      "parentTip": "5, 10, 15, 20, 25!"
    }
  },
  {
    "id": "g2_t3_ns2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "quantitative",
    "subtestId": "number_series",
    "difficulty": "hard",
    "prompt": "Look at the groups of beads. Which group comes next?",
    "audioScript": "Look at the groups of beads. Which group comes next?",
    "rendererType": "number_series",
    "data": {
      "seriesType": "beads",
      "items": [
        {
          "count": 20,
          "color": "#0284c7"
        },
        {
          "count": 18,
          "color": "#0284c7"
        },
        {
          "count": 16,
          "color": "#0284c7"
        },
        {
          "count": 14,
          "color": "#0284c7"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "text": "13",
        "label": "13",
        "quantity": 13
      },
      {
        "id": "B",
        "text": "12",
        "label": "12",
        "quantity": 12
      },
      {
        "id": "C",
        "text": "10",
        "label": "10",
        "quantity": 10
      },
      {
        "id": "D",
        "text": "11",
        "label": "11",
        "quantity": 11
      }
    ],
    "correctAnswer": 1,
    "explanation": {
      "rule": "Counting Backwards by 2 (-2)",
      "description": "14 - 2 = 12.",
      "whyOthersWrong": "14 - 2 = 12.",
      "parentTip": "Even numbers counting down: 16, 14, 12!"
    }
  },
  {
    "id": "g2_t3_fm1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "nonverbal",
    "subtestId": "figure_matrices",
    "difficulty": "hard",
    "prompt": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "audioScript": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "rendererType": "figure_matrix",
    "data": {
      "topRow": {
        "left": {
          "shape": "square",
          "fill": "none",
          "color": "#4f46e5"
        },
        "right": {
          "shape": "square",
          "fill": "none",
          "color": "#4f46e5",
          "innerShape": {
            "shape": "circle",
            "fill": "solid",
            "color": "#4f46e5"
          }
        }
      },
      "bottomRow": {
        "left": {
          "shape": "triangle",
          "fill": "none",
          "color": "#4f46e5"
        }
      }
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "triangle",
          "fill": "none",
          "color": "#4f46e5",
          "innerShape": {
            "shape": "circle",
            "fill": "solid",
            "color": "#4f46e5"
          }
        },
        "label": "Triangle with circle inside"
      },
      {
        "id": "B",
        "shape": {
          "shape": "circle",
          "fill": "solid",
          "color": "#4f46e5"
        },
        "label": "Solid circle"
      },
      {
        "id": "C",
        "shape": {
          "shape": "triangle",
          "fill": "solid",
          "color": "#4f46e5"
        },
        "label": "Solid triangle"
      },
      {
        "id": "D",
        "shape": {
          "shape": "square",
          "fill": "none",
          "color": "#4f46e5"
        },
        "label": "Empty square"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Inscribed Inner Shape",
      "description": "The outer triangle keeps its shape and gains a solid circle inside.",
      "whyOthersWrong": "The correct choice places the solid circle inside the triangle.",
      "parentTip": "Look at what was added inside!"
    }
  },
  {
    "id": "g2_t3_fm2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "nonverbal",
    "subtestId": "figure_matrices",
    "difficulty": "medium",
    "prompt": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "audioScript": "Look at how the top-left figure changes to the top-right figure. Which choice changes the bottom figure in the same way?",
    "rendererType": "figure_matrix",
    "data": {
      "topRow": {
        "left": {
          "shape": "square",
          "size": 60,
          "fill": "semi",
          "color": "#d97706"
        },
        "right": {
          "shape": "square",
          "size": 30,
          "fill": "semi",
          "color": "#d97706"
        }
      },
      "bottomRow": {
        "left": {
          "shape": "circle",
          "size": 60,
          "fill": "semi",
          "color": "#d97706"
        }
      }
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "circle",
          "size": 30,
          "fill": "semi",
          "color": "#d97706"
        },
        "label": "Small Circle"
      },
      {
        "id": "B",
        "shape": {
          "shape": "square",
          "size": 30,
          "fill": "semi",
          "color": "#d97706"
        },
        "label": "Small Square"
      },
      {
        "id": "C",
        "shape": {
          "shape": "circle",
          "size": 60,
          "fill": "solid",
          "color": "#d97706"
        },
        "label": "Large Solid Circle"
      },
      {
        "id": "D",
        "shape": {
          "shape": "circle",
          "size": 60,
          "fill": "semi",
          "color": "#d97706"
        },
        "label": "Unchanged Circle"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Scale Reduction (Shrinking)",
      "description": "The shape scales down to half its size. Large circle shrinks to small circle.",
      "whyOthersWrong": "The correct choice shrinks the circle.",
      "parentTip": "Big turns into small!"
    }
  },
  {
    "id": "g2_t3_pf1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "nonverbal",
    "subtestId": "paper_folding",
    "difficulty": "hard",
    "prompt": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "audioScript": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "rendererType": "paper_folding",
    "data": {
      "folds": [
        "up",
        "right"
      ],
      "punch": {
        "x": 50,
        "y": 50,
        "r": 5
      },
      "steps": [
        {
          "type": "fold",
          "foldDirection": "up",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "caption": "Fold bottom to top"
        },
        {
          "type": "fold",
          "foldDirection": "right",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              50,
              50
            ]
          ],
          "caption": "Fold left to right"
        },
        {
          "type": "punch",
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              50,
              50
            ]
          ],
          "hole": {
            "x": 50,
            "y": 50,
            "r": 5
          },
          "caption": "Punch through the folded paper"
        }
      ],
      "creases": [
        "horizontal",
        "vertical"
      ],
      "finalUnfoldedHoles": [
        {
          "x": 50,
          "y": 50,
          "r": 5
        }
      ],
      "unfolding": [
        {
          "polygon": [
            [
              50,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              50,
              50
            ]
          ],
          "holes": [
            {
              "x": 50,
              "y": 50,
              "r": 5
            }
          ],
          "caption": "Start with the punched paper"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              50
            ],
            [
              10,
              50
            ]
          ],
          "holes": [
            {
              "x": 50,
              "y": 50,
              "r": 5
            }
          ],
          "caption": "Undo fold 2"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "holes": [
            {
              "x": 50,
              "y": 50,
              "r": 5
            }
          ],
          "caption": "Undo fold 1"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "holes": [
          {
            "x": 50,
            "y": 50,
            "r": 5
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "One center hole"
      },
      {
        "id": "B",
        "holes": [
          {
            "x": 25,
            "y": 25
          },
          {
            "x": 75,
            "y": 25
          },
          {
            "x": 25,
            "y": 75
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "Four corner holes"
      },
      {
        "id": "C",
        "holes": [
          {
            "x": 50,
            "y": 25
          },
          {
            "x": 50,
            "y": 75
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "Two edge holes"
      },
      {
        "id": "D",
        "holes": [
          {
            "x": 75,
            "y": 25
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "horizontal",
          "vertical"
        ],
        "label": "Two right holes"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Folded Center Vertex Punch",
      "description": "The punch is centered exactly where the folds meet. The quarter circles join into one circular hole at the center.",
      "whyOthersWrong": "The 4 quarter-punches join at the center to form 1 round hole.",
      "parentTip": "Use the crease as a mirror. Holes away from the crease make separate copies; holes centered on a crease can join when opened."
    }
  },
  {
    "id": "g2_t3_pf2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "nonverbal",
    "subtestId": "paper_folding",
    "difficulty": "hard",
    "prompt": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "audioScript": "Follow the folds and the hole punch shown. Which choice shows the paper when it is completely opened?",
    "rendererType": "paper_folding",
    "data": {
      "folds": [
        "diagonal"
      ],
      "punch": {
        "x": 40,
        "y": 60,
        "r": 5
      },
      "steps": [
        {
          "type": "fold",
          "foldDirection": "diagonal",
          "before": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "polygon": [
            [
              10,
              10
            ],
            [
              10,
              10
            ],
            [
              90,
              90
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "caption": "Fold across the diagonal"
        },
        {
          "type": "punch",
          "polygon": [
            [
              10,
              10
            ],
            [
              10,
              10
            ],
            [
              90,
              90
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "hole": {
            "x": 40,
            "y": 60,
            "r": 5
          },
          "caption": "Punch through the folded paper"
        }
      ],
      "creases": [
        "diagonal-main"
      ],
      "finalUnfoldedHoles": [
        {
          "x": 40,
          "y": 60,
          "r": 5
        },
        {
          "x": 60,
          "y": 40,
          "r": 5
        }
      ],
      "unfolding": [
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              10,
              10
            ],
            [
              90,
              90
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "holes": [
            {
              "x": 40,
              "y": 60,
              "r": 5
            }
          ],
          "caption": "Start with the punched paper"
        },
        {
          "polygon": [
            [
              10,
              10
            ],
            [
              90,
              10
            ],
            [
              90,
              90
            ],
            [
              10,
              90
            ]
          ],
          "holes": [
            {
              "x": 40,
              "y": 60,
              "r": 5
            },
            {
              "x": 60,
              "y": 40,
              "r": 5
            }
          ],
          "caption": "Undo fold 1"
        }
      ]
    },
    "options": [
      {
        "id": "A",
        "holes": [
          {
            "x": 40,
            "y": 60,
            "r": 5
          },
          {
            "x": 60,
            "y": 40,
            "r": 5
          }
        ],
        "creases": [
          "diagonal-main"
        ],
        "label": "Two mirrored diagonal holes"
      },
      {
        "id": "B",
        "holes": [
          {
            "x": 25,
            "y": 25
          },
          {
            "x": 75,
            "y": 75
          }
        ],
        "creases": [
          "diagonal-main"
        ],
        "label": "Corner diagonal holes"
      },
      {
        "id": "C",
        "holes": [
          {
            "x": 40,
            "y": 60
          }
        ],
        "creases": [
          "diagonal-main"
        ],
        "label": "Single hole"
      },
      {
        "id": "D",
        "holes": [
          {
            "x": 25,
            "y": 75
          },
          {
            "x": 75,
            "y": 25
          }
        ],
        "creases": [
          "diagonal-main"
        ],
        "label": "Opposite corners"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Diagonal Symmetry Reflection",
      "description": "Undo the folds in reverse order and reflect the hole across each crease. This produces 2 separate holes in the positions shown.",
      "whyOthersWrong": "The hole mirrors across the diagonal crease line.",
      "parentTip": "Use the crease as a mirror. Holes away from the crease make separate copies; holes centered on a crease can join when opened."
    }
  },
  {
    "id": "g2_t3_fc1",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "nonverbal",
    "subtestId": "figure_classification",
    "difficulty": "hard",
    "prompt": "Look at the three figures. Which choice belongs in the same group?",
    "audioScript": "Look at the three figures. Which choice belongs in the same group?",
    "rendererType": "figure_classification",
    "data": {
      "stimulusFigures": [
        {
          "shape": "circle",
          "fill": "striped",
          "color": "#d97706"
        },
        {
          "shape": "square",
          "fill": "striped",
          "color": "#d97706"
        },
        {
          "shape": "triangle",
          "fill": "striped",
          "color": "#d97706"
        }
      ],
      "ruleDescription": "All figures have diagonal stripe patterns"
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "diamond",
          "fill": "striped",
          "color": "#d97706"
        },
        "label": "Diamond with diagonal stripes"
      },
      {
        "id": "B",
        "shape": {
          "shape": "diamond",
          "fill": "none",
          "color": "#d97706"
        },
        "label": "Empty diamond"
      },
      {
        "id": "C",
        "shape": {
          "shape": "diamond",
          "fill": "solid",
          "color": "#d97706"
        },
        "label": "Solid diamond"
      },
      {
        "id": "D",
        "shape": {
          "shape": "star",
          "fill": "none",
          "color": "#d97706"
        },
        "label": "Empty star"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Diagonal Stripe Fill Pattern",
      "description": "All stimulus figures have diagonal striped fills.",
      "whyOthersWrong": "The correct choice is the only figure with diagonal stripes.",
      "parentTip": "Look at the pattern inside: stripes!"
    }
  },
  {
    "id": "g2_t3_fc2",
    "grade": "2",
    "testId": "test_3",
    "batteryId": "nonverbal",
    "subtestId": "figure_classification",
    "difficulty": "hard",
    "prompt": "Look at the three figures. Which choice belongs in the same group?",
    "audioScript": "Look at the three figures. Which choice belongs in the same group?",
    "rendererType": "figure_classification",
    "data": {
      "stimulusFigures": [
        {
          "shape": "circle",
          "fill": "none",
          "color": "#2563eb",
          "innerShape": {
            "shape": "circle",
            "fill": "none",
            "color": "#2563eb"
          }
        },
        {
          "shape": "square",
          "fill": "none",
          "color": "#2563eb",
          "innerShape": {
            "shape": "square",
            "fill": "none",
            "color": "#2563eb"
          }
        },
        {
          "shape": "triangle",
          "fill": "none",
          "color": "#2563eb",
          "innerShape": {
            "shape": "triangle",
            "fill": "none",
            "color": "#2563eb"
          }
        }
      ],
      "ruleDescription": "All figures have an identical nested shape inside"
    },
    "options": [
      {
        "id": "A",
        "shape": {
          "shape": "diamond",
          "fill": "none",
          "color": "#2563eb",
          "innerShape": {
            "shape": "diamond",
            "fill": "none",
            "color": "#2563eb"
          }
        },
        "label": "Diamond inside diamond"
      },
      {
        "id": "B",
        "shape": {
          "shape": "square",
          "fill": "none",
          "color": "#2563eb",
          "innerShape": {
            "shape": "circle",
            "fill": "none",
            "color": "#2563eb"
          }
        },
        "label": "Circle inside square"
      },
      {
        "id": "C",
        "shape": {
          "shape": "circle",
          "fill": "solid",
          "color": "#2563eb"
        },
        "label": "Solid circle"
      },
      {
        "id": "D",
        "shape": {
          "shape": "triangle",
          "fill": "none",
          "color": "#2563eb"
        },
        "label": "Single triangle"
      }
    ],
    "correctAnswer": 0,
    "explanation": {
      "rule": "Matching inner and outer shapes",
      "description": "The inner shape must be identical in geometry to the outer shape.",
      "whyOthersWrong": "A circle inside a square has different inner and outer shapes. The solid circle and the single triangle have no inner shape. The matching choice has a diamond inside a diamond.",
      "parentTip": "Compare the shape on the outside with the smaller shape inside it. Are they the same kind of shape?"
    }
  }
];

// Reserved checks are separate content, never padding for a practice session.
export const BASE_QUESTIONS = [
  ...ORIGINAL_QUESTIONS.map(q => ({ ...q, purpose: 'practice', skillId: q.explanation.rule.toLowerCase().replace(/[^a-z0-9]+/g, '_'), skillName: q.explanation.rule })),
  ...VERBAL_EXPANSION, ...QUANTITATIVE_EXPANSION, ...NONVERBAL_EXPANSION
];
// Format alignment denotes the published task format, not official test equivalence.
export const QUESTIONS = [
  ...alignQuantitativeQuestions(BASE_QUESTIONS), ...SPATIAL_ALIGNMENT, ...PAPER_CUTTING_ALIGNMENT
].map(q => ({ alignment: 'test_format', alignmentReason: 'An original item using a published Level 8 subtest task format.', ...q }));
export const PRACTICE_QUESTIONS = QUESTIONS.filter(q => q.purpose === 'practice' && q.alignment === 'test_format');
export const CHECK_QUESTIONS = QUESTIONS.filter(q => q.purpose === 'check' && q.alignment === 'test_format');
export const ENRICHMENT_QUESTIONS = QUESTIONS.filter(q => q.alignment === 'enrichment');

// Student-facing tests partition the practice bank, independent of authoring collections.
export const PRACTICE_TESTS = createPracticeTests(PRACTICE_QUESTIONS);
export const ASSESSMENT_TESTS = [1, 2, 3].map(i => {
  const questionIds = CHECK_QUESTIONS.filter(q => q.testId === `check_${i}`).map(q => q.id);
  return { id: `check_${i}`, name: `Assessment ${i}`, purpose: 'check', questionIds, count: questionIds.length,
    badge: `${questionIds.length} questions`, description: 'Reserved questions across all nine subtests. Answers and explanations appear after submission.' };
});
export const EXTRA_ACTIVITIES = [
  { id: 'enrichment', name: 'Skill builders', purpose: 'enrichment', count: ENRICHMENT_QUESTIONS.length,
    description: 'Supporting activities, kept separate from test-format practice and assessments.' },
  { id: 'infinite', name: 'Generated practice', purpose: 'generated', count: 0,
    description: 'Extra quantitative and nonverbal skill practice; excluded from assessments.' }
];
export const SESSION_SETS = [...PRACTICE_TESTS, ...ASSESSMENT_TESTS, ...EXTRA_ACTIVITIES];
