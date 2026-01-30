// Test Mode Data - Debugging, Flash Cards, MCQs

export interface DebuggingChallenge {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  buggyCode: string;
  correctCode: string;
  hint: string;
  hintFr: string;
  explanation: string;
  explanationFr: string;
}

export interface FlashCard {
  id: string;
  question: string;
  questionFr: string;
  answer: string;
  answerFr: string;
  options: string[];
  optionsFr: string[];
  correctIndex: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface MCQQuestion {
  id: string;
  question: string;
  questionFr: string;
  options: string[];
  optionsFr: string[];
  correctIndex: number;
  explanation: string;
  explanationFr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface DebuggingSet {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  challenges: DebuggingChallenge[];
}

export interface FlashCardSet {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cards: FlashCard[];
}

export interface MCQSet {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: MCQQuestion[];
}

export const debuggingSets: DebuggingSet[] = [
  {
    id: 'debug-basics',
    title: 'Bug Hunt: Basics',
    titleFr: 'Chasse aux Bugs: Bases',
    description: 'Find and fix simple print errors!',
    descriptionFr: 'Trouve et corrige les erreurs simples!',
    difficulty: 'beginner',
    challenges: [
      {
        id: 'debug-1',
        title: 'Missing Quotes',
        titleFr: 'Guillemets Manquants',
        description: 'This print statement has a bug!',
        descriptionFr: 'Cette instruction print a un bug!',
        difficulty: 'beginner',
        buggyCode: 'print(Hello World)',
        correctCode: 'print("Hello World")',
        hint: 'Text needs to be wrapped in something...',
        hintFr: 'Le texte doit être entouré de quelque chose...',
        explanation: 'Strings need quotation marks around them!',
        explanationFr: 'Les chaînes ont besoin de guillemets!',
      },
      {
        id: 'debug-2',
        title: 'Wrong Parenthesis',
        titleFr: 'Mauvaise Parenthèse',
        description: 'Something is wrong with the brackets!',
        descriptionFr: 'Quelque chose ne va pas avec les parenthèses!',
        difficulty: 'beginner',
        buggyCode: 'print("Hello"',
        correctCode: 'print("Hello")',
        hint: 'Every opening bracket needs a...',
        hintFr: 'Chaque parenthèse ouvrante a besoin d\'une...',
        explanation: 'Always close your parentheses!',
        explanationFr: 'Ferme toujours tes parenthèses!',
      },
      {
        id: 'debug-3',
        title: 'Typo in Print',
        titleFr: 'Faute de Frappe',
        description: 'The function name is wrong!',
        descriptionFr: 'Le nom de la fonction est incorrect!',
        difficulty: 'beginner',
        buggyCode: 'pritn("Hello")',
        correctCode: 'print("Hello")',
        hint: 'Check the spelling of the function name...',
        hintFr: 'Vérifie l\'orthographe du nom de la fonction...',
        explanation: 'Python functions must be spelled correctly!',
        explanationFr: 'Les fonctions Python doivent être bien orthographiées!',
      },
    ],
  },
  {
    id: 'debug-variables',
    title: 'Bug Hunt: Variables',
    titleFr: 'Chasse aux Bugs: Variables',
    description: 'Fix variable-related bugs!',
    descriptionFr: 'Corrige les bugs liés aux variables!',
    difficulty: 'beginner',
    challenges: [
      {
        id: 'debug-var-1',
        title: 'Undefined Variable',
        titleFr: 'Variable Non Définie',
        description: 'This variable is not defined!',
        descriptionFr: 'Cette variable n\'est pas définie!',
        difficulty: 'beginner',
        buggyCode: 'print(name)',
        correctCode: 'name = "Alex"\nprint(name)',
        hint: 'The variable needs to be created first...',
        hintFr: 'La variable doit d\'abord être créée...',
        explanation: 'Always define variables before using them!',
        explanationFr: 'Définis toujours les variables avant de les utiliser!',
      },
      {
        id: 'debug-var-2',
        title: 'Wrong Variable Name',
        titleFr: 'Mauvais Nom de Variable',
        description: 'The variable names don\'t match!',
        descriptionFr: 'Les noms de variables ne correspondent pas!',
        difficulty: 'beginner',
        buggyCode: 'age = 10\nprint(Age)',
        correctCode: 'age = 10\nprint(age)',
        hint: 'Python cares about uppercase and lowercase...',
        hintFr: 'Python fait attention aux majuscules et minuscules...',
        explanation: 'Variable names are case-sensitive!',
        explanationFr: 'Les noms de variables sont sensibles à la casse!',
      },
    ],
  },
  {
    id: 'debug-loops',
    title: 'Bug Hunt: Loops',
    titleFr: 'Chasse aux Bugs: Boucles',
    description: 'Debug loop-related errors!',
    descriptionFr: 'Débugue les erreurs de boucles!',
    difficulty: 'intermediate',
    challenges: [
      {
        id: 'debug-loop-1',
        title: 'Missing Colon',
        titleFr: 'Deux-points Manquants',
        description: 'The loop is missing something!',
        descriptionFr: 'Il manque quelque chose à la boucle!',
        difficulty: 'intermediate',
        buggyCode: 'for i in range(5)\n    print(i)',
        correctCode: 'for i in range(5):\n    print(i)',
        hint: 'What comes after the for statement?',
        hintFr: 'Qu\'est-ce qui vient après l\'instruction for?',
        explanation: 'For loops need a colon at the end!',
        explanationFr: 'Les boucles for ont besoin de deux-points à la fin!',
      },
      {
        id: 'debug-loop-2',
        title: 'Indentation Error',
        titleFr: 'Erreur d\'Indentation',
        description: 'The code inside the loop is wrong!',
        descriptionFr: 'Le code dans la boucle est incorrect!',
        difficulty: 'intermediate',
        buggyCode: 'for i in range(3):\nprint(i)',
        correctCode: 'for i in range(3):\n    print(i)',
        hint: 'Code inside loops needs to be moved to the right...',
        hintFr: 'Le code dans les boucles doit être décalé vers la droite...',
        explanation: 'Use 4 spaces to indent code inside loops!',
        explanationFr: 'Utilise 4 espaces pour indenter le code dans les boucles!',
      },
    ],
  },
];

export const flashCardSets: FlashCardSet[] = [
  {
    id: 'fc-basics',
    title: 'Python Basics',
    titleFr: 'Bases de Python',
    description: 'Learn fundamental Python concepts!',
    descriptionFr: 'Apprends les concepts fondamentaux de Python!',
    difficulty: 'beginner',
    cards: [
      {
        id: 'fc-1',
        question: 'What function displays text on the screen?',
        questionFr: 'Quelle fonction affiche du texte à l\'écran?',
        answer: 'print()',
        answerFr: 'print()',
        options: ['print()', 'display()', 'show()', 'output()'],
        optionsFr: ['print()', 'display()', 'show()', 'output()'],
        correctIndex: 0,
        category: 'basics',
        difficulty: 'beginner',
      },
      {
        id: 'fc-2',
        question: 'What symbol is used for comments in Python?',
        questionFr: 'Quel symbole est utilisé pour les commentaires en Python?',
        answer: '# (hashtag)',
        answerFr: '# (dièse)',
        options: ['# (hashtag)', '// (double slash)', '/* */', '-- (double dash)'],
        optionsFr: ['# (dièse)', '// (double slash)', '/* */', '-- (double tiret)'],
        correctIndex: 0,
        category: 'basics',
        difficulty: 'beginner',
      },
      {
        id: 'fc-3',
        question: 'What are quotes used for in Python?',
        questionFr: 'À quoi servent les guillemets en Python?',
        answer: 'To create text strings',
        answerFr: 'Pour créer des chaînes de texte',
        options: ['To create text strings', 'To create numbers', 'To create comments', 'To create variables'],
        optionsFr: ['Pour créer des chaînes de texte', 'Pour créer des nombres', 'Pour créer des commentaires', 'Pour créer des variables'],
        correctIndex: 0,
        category: 'basics',
        difficulty: 'beginner',
      },
      {
        id: 'fc-4',
        question: 'What is a string?',
        questionFr: 'Qu\'est-ce qu\'une chaîne?',
        answer: 'A sequence of characters (text)',
        answerFr: 'Une séquence de caractères (texte)',
        options: ['A sequence of characters (text)', 'A whole number', 'A decimal number', 'A true/false value'],
        optionsFr: ['Une séquence de caractères (texte)', 'Un nombre entier', 'Un nombre décimal', 'Une valeur vrai/faux'],
        correctIndex: 0,
        category: 'basics',
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'fc-variables',
    title: 'Variables & Data',
    titleFr: 'Variables & Données',
    description: 'Master variable concepts!',
    descriptionFr: 'Maîtrise les concepts de variables!',
    difficulty: 'beginner',
    cards: [
      {
        id: 'fc-var-1',
        question: 'What is a variable?',
        questionFr: 'Qu\'est-ce qu\'une variable?',
        answer: 'A container that stores data',
        answerFr: 'Un conteneur qui stocke des données',
        options: ['A container that stores data', 'A type of loop', 'A function name', 'A comment'],
        optionsFr: ['Un conteneur qui stocke des données', 'Un type de boucle', 'Un nom de fonction', 'Un commentaire'],
        correctIndex: 0,
        category: 'variables',
        difficulty: 'beginner',
      },
      {
        id: 'fc-var-2',
        question: 'How do you create a variable named "age" with value 10?',
        questionFr: 'Comment créer une variable nommée "age" avec la valeur 10?',
        answer: 'age = 10',
        answerFr: 'age = 10',
        options: ['age = 10', 'var age = 10', '10 = age', 'let age = 10'],
        optionsFr: ['age = 10', 'var age = 10', '10 = age', 'let age = 10'],
        correctIndex: 0,
        category: 'variables',
        difficulty: 'beginner',
      },
      {
        id: 'fc-var-3',
        question: 'What is an integer?',
        questionFr: 'Qu\'est-ce qu\'un entier?',
        answer: 'A whole number (no decimals)',
        answerFr: 'Un nombre entier (sans décimales)',
        options: ['A whole number (no decimals)', 'A number with decimals', 'A text string', 'A true/false value'],
        optionsFr: ['Un nombre entier (sans décimales)', 'Un nombre avec des décimales', 'Une chaîne de texte', 'Une valeur vrai/faux'],
        correctIndex: 0,
        category: 'variables',
        difficulty: 'beginner',
      },
      {
        id: 'fc-var-4',
        question: 'What is a float?',
        questionFr: 'Qu\'est-ce qu\'un float?',
        answer: 'A number with decimals',
        answerFr: 'Un nombre avec des décimales',
        options: ['A number with decimals', 'A whole number', 'A text string', 'A list of items'],
        optionsFr: ['Un nombre avec des décimales', 'Un nombre entier', 'Une chaîne de texte', 'Une liste d\'éléments'],
        correctIndex: 0,
        category: 'variables',
        difficulty: 'beginner',
      },
    ],
  },
  {
    id: 'fc-loops',
    title: 'Loops & Iteration',
    titleFr: 'Boucles & Itération',
    description: 'Understand how loops work!',
    descriptionFr: 'Comprends comment fonctionnent les boucles!',
    difficulty: 'intermediate',
    cards: [
      {
        id: 'fc-loop-1',
        question: 'What does a for loop do?',
        questionFr: 'Que fait une boucle for?',
        answer: 'Repeats code a specific number of times',
        answerFr: 'Répète le code un nombre spécifique de fois',
        options: ['Repeats code a specific number of times', 'Runs code once', 'Stops the program', 'Creates a variable'],
        optionsFr: ['Répète le code un nombre spécifique de fois', 'Exécute le code une fois', 'Arrête le programme', 'Crée une variable'],
        correctIndex: 0,
        category: 'loops',
        difficulty: 'intermediate',
      },
      {
        id: 'fc-loop-2',
        question: 'What does range(5) produce?',
        questionFr: 'Que produit range(5)?',
        answer: 'Numbers 0, 1, 2, 3, 4',
        answerFr: 'Les nombres 0, 1, 2, 3, 4',
        options: ['Numbers 0, 1, 2, 3, 4', 'Numbers 1, 2, 3, 4, 5', 'Numbers 0, 1, 2, 3, 4, 5', 'The number 5'],
        optionsFr: ['Les nombres 0, 1, 2, 3, 4', 'Les nombres 1, 2, 3, 4, 5', 'Les nombres 0, 1, 2, 3, 4, 5', 'Le nombre 5'],
        correctIndex: 0,
        category: 'loops',
        difficulty: 'intermediate',
      },
      {
        id: 'fc-loop-3',
        question: 'What symbol must come after "for i in range(5)"?',
        questionFr: 'Quel symbole doit venir après "for i in range(5)"?',
        answer: 'A colon (:)',
        answerFr: 'Deux-points (:)',
        options: ['A colon (:)', 'A semicolon (;)', 'A comma (,)', 'A period (.)'],
        optionsFr: ['Deux-points (:)', 'Point-virgule (;)', 'Virgule (,)', 'Point (.)'],
        correctIndex: 0,
        category: 'loops',
        difficulty: 'intermediate',
      },
    ],
  },
];

export const mcqSets: MCQSet[] = [
  {
    id: 'mcq-basics',
    title: 'Python Basics Quiz',
    titleFr: 'Quiz Bases de Python',
    description: 'Test your basic Python knowledge!',
    descriptionFr: 'Teste tes connaissances de base en Python!',
    difficulty: 'beginner',
    questions: [
      {
        id: 'mcq-1',
        question: 'What will print("Hello") display?',
        questionFr: 'Qu\'affichera print("Hello")?',
        options: ['Hello', '"Hello"', 'print("Hello")', 'Nothing'],
        optionsFr: ['Hello', '"Hello"', 'print("Hello")', 'Rien'],
        correctIndex: 0,
        explanation: 'print() displays the text without the quotes!',
        explanationFr: 'print() affiche le texte sans les guillemets!',
        difficulty: 'beginner',
        category: 'basics',
      },
      {
        id: 'mcq-2',
        question: 'Which is a valid variable name?',
        questionFr: 'Quel est un nom de variable valide?',
        options: ['my-name', '2name', 'my_name', 'my name'],
        optionsFr: ['my-name', '2name', 'my_name', 'my name'],
        correctIndex: 2,
        explanation: 'Variable names can use underscores but not spaces or dashes!',
        explanationFr: 'Les noms de variables peuvent utiliser des underscores mais pas des espaces ou des tirets!',
        difficulty: 'beginner',
        category: 'basics',
      },
      {
        id: 'mcq-3',
        question: 'What type of value is 42?',
        questionFr: 'Quel type de valeur est 42?',
        options: ['String', 'Float', 'Integer', 'Boolean'],
        optionsFr: ['Chaîne', 'Float', 'Entier', 'Booléen'],
        correctIndex: 2,
        explanation: '42 is a whole number, making it an integer!',
        explanationFr: '42 est un nombre entier!',
        difficulty: 'beginner',
        category: 'basics',
      },
      {
        id: 'mcq-4',
        question: 'What does # mean in Python?',
        questionFr: 'Que signifie # en Python?',
        options: ['Multiply', 'Comment', 'String', 'Error'],
        optionsFr: ['Multiplier', 'Commentaire', 'Chaîne', 'Erreur'],
        correctIndex: 1,
        explanation: '# starts a comment that Python ignores!',
        explanationFr: '# commence un commentaire que Python ignore!',
        difficulty: 'beginner',
        category: 'basics',
      },
    ],
  },
  {
    id: 'mcq-variables',
    title: 'Variables Quiz',
    titleFr: 'Quiz Variables',
    description: 'Test your variable knowledge!',
    descriptionFr: 'Teste tes connaissances sur les variables!',
    difficulty: 'beginner',
    questions: [
      {
        id: 'mcq-var-1',
        question: 'What is the result of: x = 5; y = 3; print(x + y)',
        questionFr: 'Quel est le résultat de: x = 5; y = 3; print(x + y)',
        options: ['8', '53', 'x + y', 'Error'],
        optionsFr: ['8', '53', 'x + y', 'Erreur'],
        correctIndex: 0,
        explanation: 'Python adds the numeric values: 5 + 3 = 8',
        explanationFr: 'Python additionne les valeurs numériques: 5 + 3 = 8',
        difficulty: 'beginner',
        category: 'variables',
      },
      {
        id: 'mcq-var-2',
        question: 'What does name = "Alex" create?',
        questionFr: 'Que crée name = "Alex"?',
        options: ['A number', 'A string variable', 'An error', 'A list'],
        optionsFr: ['Un nombre', 'Une variable chaîne', 'Une erreur', 'Une liste'],
        correctIndex: 1,
        explanation: 'Text in quotes creates a string variable!',
        explanationFr: 'Le texte entre guillemets crée une variable chaîne!',
        difficulty: 'beginner',
        category: 'variables',
      },
    ],
  },
  {
    id: 'mcq-loops',
    title: 'Loops Quiz',
    titleFr: 'Quiz Boucles',
    description: 'Test your loop knowledge!',
    descriptionFr: 'Teste tes connaissances sur les boucles!',
    difficulty: 'intermediate',
    questions: [
      {
        id: 'mcq-loop-1',
        question: 'How many times will "for i in range(3):" loop?',
        questionFr: 'Combien de fois "for i in range(3):" va boucler?',
        options: ['2 times', '3 times', '4 times', '1 time'],
        optionsFr: ['2 fois', '3 fois', '4 fois', '1 fois'],
        correctIndex: 1,
        explanation: 'range(3) gives 0, 1, 2 - that\'s 3 iterations!',
        explanationFr: 'range(3) donne 0, 1, 2 - ça fait 3 itérations!',
        difficulty: 'intermediate',
        category: 'loops',
      },
      {
        id: 'mcq-loop-2',
        question: 'What is the first number in range(5)?',
        questionFr: 'Quel est le premier nombre dans range(5)?',
        options: ['1', '0', '5', '-1'],
        optionsFr: ['1', '0', '5', '-1'],
        correctIndex: 1,
        explanation: 'range() always starts at 0 by default!',
        explanationFr: 'range() commence toujours à 0 par défaut!',
        difficulty: 'intermediate',
        category: 'loops',
      },
      {
        id: 'mcq-loop-3',
        question: 'What will this print: for i in range(2): print("Hi")',
        questionFr: 'Qu\'affichera: for i in range(2): print("Hi")',
        options: ['Hi', 'Hi Hi', 'Hi\\nHi', '2'],
        optionsFr: ['Hi', 'Hi Hi', 'Hi\\nHi', '2'],
        correctIndex: 2,
        explanation: 'It prints "Hi" twice, each on a new line!',
        explanationFr: 'Ça affiche "Hi" deux fois, chacun sur une nouvelle ligne!',
        difficulty: 'intermediate',
        category: 'loops',
      },
    ],
  },
];
