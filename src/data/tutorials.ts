export interface Tutorial {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'basics' | 'variables' | 'loops' | 'conditionals' | 'turtle' | 'functions';
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  titleFr: string;
  instruction: string;
  instructionFr: string;
  starterCode: string;
  expectedOutput?: string;
  hint: string;
  hintFr: string;
}

export const tutorials: Tutorial[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    titleFr: 'Bonjour le Monde',
    description: 'Learn to print your first message!',
    descriptionFr: 'Apprends à afficher ton premier message!',
    difficulty: 'beginner',
    category: 'basics',
    lessons: [
      {
        id: 'print-intro',
        title: 'Your First Print',
        titleFr: 'Ton Premier Affichage',
        instruction: `Welcome to Python! 🎉

The **print()** function displays text on the screen.

Try running this code to see what happens:

\`\`\`python
print("Hello, World!")
\`\`\`

Then try changing the message to say your name!`,
        instructionFr: `Bienvenue en Python! 🎉

La fonction **print()** affiche du texte à l'écran.

Essaie d'exécuter ce code pour voir ce qui se passe:

\`\`\`python
print("Bonjour, le Monde!")
\`\`\`

Ensuite, essaie de changer le message pour dire ton nom!`,
        starterCode: 'print("Hello, World!")',
        expectedOutput: 'Hello, World!',
        hint: 'Make sure to put your text inside the quotation marks ""',
        hintFr: 'Assure-toi de mettre ton texte entre les guillemets ""',
      },
      {
        id: 'multiple-prints',
        title: 'Multiple Messages',
        titleFr: 'Plusieurs Messages',
        instruction: `Great job! 🌟

You can print many lines by using print() multiple times.

Try this:

\`\`\`python
print("I am learning Python!")
print("This is so fun!")
print("I'm going to be a coder!")
\`\`\``,
        instructionFr: `Excellent travail! 🌟

Tu peux afficher plusieurs lignes en utilisant print() plusieurs fois.

Essaie ceci:

\`\`\`python
print("J'apprends Python!")
print("C'est trop amusant!")
print("Je vais devenir un codeur!")
\`\`\``,
        starterCode: `print("Line 1")
print("Line 2")
print("Line 3")`,
        hint: 'Each print() shows on a new line!',
        hintFr: 'Chaque print() s\'affiche sur une nouvelle ligne!',
      },
    ],
  },
  {
    id: 'variables-fun',
    title: 'Fun with Variables',
    titleFr: "S'amuser avec les Variables",
    description: 'Learn to store and use information!',
    descriptionFr: 'Apprends à stocker et utiliser des informations!',
    difficulty: 'beginner',
    category: 'variables',
    lessons: [
      {
        id: 'variable-intro',
        title: 'What are Variables?',
        titleFr: 'Que sont les Variables?',
        instruction: `Variables are like labeled boxes that store information! 📦

\`\`\`python
name = "Alex"
age = 10

print("My name is", name)
print("I am", age, "years old")
\`\`\`

Try changing the values to your own name and age!`,
        instructionFr: `Les variables sont comme des boîtes étiquetées qui stockent des informations! 📦

\`\`\`python
nom = "Alex"
age = 10

print("Mon nom est", nom)
print("J'ai", age, "ans")
\`\`\`

Essaie de changer les valeurs avec ton propre nom et âge!`,
        starterCode: `name = "Alex"
age = 10

print("My name is", name)
print("I am", age, "years old")`,
        hint: 'Text goes in quotes, numbers don\'t need quotes!',
        hintFr: 'Le texte va entre guillemets, les nombres n\'ont pas besoin de guillemets!',
      },
      {
        id: 'variable-math',
        title: 'Math with Variables',
        titleFr: 'Maths avec les Variables',
        instruction: `You can do math with variables! 🔢

\`\`\`python
apples = 5
bananas = 3
total = apples + bananas

print("I have", total, "fruits!")
\`\`\`

Try adding more fruits to the calculation!`,
        instructionFr: `Tu peux faire des maths avec les variables! 🔢

\`\`\`python
pommes = 5
bananes = 3
total = pommes + bananes

print("J'ai", total, "fruits!")
\`\`\`

Essaie d'ajouter plus de fruits au calcul!`,
        starterCode: `apples = 5
bananas = 3
total = apples + bananas

print("I have", total, "fruits!")`,
        hint: 'You can use + - * / for math operations!',
        hintFr: 'Tu peux utiliser + - * / pour les opérations mathématiques!',
      },
    ],
  },
  {
    id: 'loops-intro',
    title: 'Looping Fun',
    titleFr: 'Plaisir des Boucles',
    description: 'Make things repeat automatically!',
    descriptionFr: 'Fais répéter les choses automatiquement!',
    difficulty: 'beginner',
    category: 'loops',
    lessons: [
      {
        id: 'for-loop',
        title: 'For Loops',
        titleFr: 'Boucles For',
        instruction: `Loops repeat code for you! 🔄

\`\`\`python
for i in range(5):
    print("Counting:", i)
\`\`\`

This prints numbers 0 to 4. Try changing 5 to a different number!`,
        instructionFr: `Les boucles répètent le code pour toi! 🔄

\`\`\`python
for i in range(5):
    print("Comptage:", i)
\`\`\`

Cela affiche les nombres de 0 à 4. Essaie de changer 5 par un autre nombre!`,
        starterCode: `for i in range(5):
    print("Counting:", i)`,
        hint: 'range(5) means 0, 1, 2, 3, 4 (5 numbers starting from 0)',
        hintFr: 'range(5) signifie 0, 1, 2, 3, 4 (5 nombres à partir de 0)',
      },
      {
        id: 'loop-patterns',
        title: 'Pattern Making',
        titleFr: 'Création de Motifs',
        instruction: `Let's make a cool pattern! ⭐

\`\`\`python
for i in range(5):
    print("*" * (i + 1))
\`\`\`

This creates a triangle of stars! What other patterns can you make?`,
        instructionFr: `Créons un motif cool! ⭐

\`\`\`python
for i in range(5):
    print("*" * (i + 1))
\`\`\`

Cela crée un triangle d'étoiles! Quels autres motifs peux-tu créer?`,
        starterCode: `for i in range(5):
    print("*" * (i + 1))`,
        hint: 'The * operator repeats text! "ha" * 3 = "hahaha"',
        hintFr: 'L\'opérateur * répète le texte! "ha" * 3 = "hahaha"',
      },
    ],
  },
  {
    id: 'conditionals-intro',
    title: 'Making Decisions',
    titleFr: 'Prendre des Décisions',
    description: 'Teach your code to make choices!',
    descriptionFr: 'Apprends à ton code à faire des choix!',
    difficulty: 'intermediate',
    category: 'conditionals',
    lessons: [
      {
        id: 'if-else',
        title: 'If and Else',
        titleFr: 'Si et Sinon',
        instruction: `Computers can make decisions too! 🤔

\`\`\`python
age = 10

if age >= 8:
    print("You can use KiddyKode!")
else:
    print("Ask a grown-up for help!")
\`\`\`

Try changing the age to see different results!`,
        instructionFr: `Les ordinateurs peuvent aussi prendre des décisions! 🤔

\`\`\`python
age = 10

if age >= 8:
    print("Tu peux utiliser KiddyKode!")
else:
    print("Demande l'aide d'un adulte!")
\`\`\`

Essaie de changer l'âge pour voir différents résultats!`,
        starterCode: `age = 10

if age >= 8:
    print("You can use KiddyKode!")
else:
    print("Ask a grown-up for help!")`,
        hint: '>= means "greater than or equal to"',
        hintFr: '>= signifie "supérieur ou égal à"',
      },
    ],
  },
  {
    id: 'turtle-art',
    title: 'Turtle Art',
    titleFr: 'Art avec Turtle',
    description: 'Draw amazing pictures with code!',
    descriptionFr: 'Dessine des images incroyables avec du code!',
    difficulty: 'intermediate',
    category: 'turtle',
    lessons: [
      {
        id: 'turtle-basics',
        title: 'Meet the Turtle',
        titleFr: 'Rencontre la Tortue',
        instruction: `The turtle is your drawing friend! 🐢

\`\`\`python
import turtle

t = turtle.Turtle()
t.forward(100)
t.right(90)
t.forward(100)
\`\`\`

This draws two lines! The turtle moves forward and turns.

(Note: Turtle graphics show in a separate window)`,
        instructionFr: `La tortue est ton amie pour dessiner! 🐢

\`\`\`python
import turtle

t = turtle.Turtle()
t.forward(100)
t.right(90)
t.forward(100)
\`\`\`

Cela dessine deux lignes! La tortue avance et tourne.

(Note: Les graphiques turtle s'affichent dans une fenêtre séparée)`,
        starterCode: `# Turtle Drawing
# This simulates turtle graphics

print("🐢 Drawing commands:")
print("→ Forward 100 pixels")
print("↻ Turn right 90 degrees")
print("→ Forward 100 pixels")
print("")
print("Result: An L-shaped line!")`,
        hint: 'forward() moves, right() and left() turn the turtle!',
        hintFr: 'forward() déplace, right() et left() font tourner la tortue!',
      },
      {
        id: 'turtle-shapes',
        title: 'Drawing Shapes',
        titleFr: 'Dessiner des Formes',
        instruction: `Let's draw a square! 🟧

\`\`\`python
import turtle

t = turtle.Turtle()
for i in range(4):
    t.forward(100)
    t.right(90)
\`\`\`

Loops + turtle = amazing shapes! Try making a triangle (hint: use 3 and 120 degrees).`,
        instructionFr: `Dessinons un carré! 🟧

\`\`\`python
import turtle

t = turtle.Turtle()
for i in range(4):
    t.forward(100)
    t.right(90)
\`\`\`

Boucles + tortue = formes incroyables! Essaie de faire un triangle (indice: utilise 3 et 120 degrés).`,
        starterCode: `# Turtle Square Drawing
print("🐢 Drawing a square:")
print("")
for i in range(4):
    print(f"Side {i+1}: → Forward 100, ↻ Right 90°")
print("")
print("Result: A perfect square! 🟧")`,
        hint: 'For any shape: 360 ÷ sides = turning angle',
        hintFr: 'Pour toute forme: 360 ÷ côtés = angle de rotation',
      },
    ],
  },
];

export const sampleProjects = [
  {
    id: 'hello-world-sample',
    name: 'Hello World',
    nameFr: 'Bonjour le Monde',
    code: `# My First Python Program
# Mon Premier Programme Python

print("Hello, World!")
print("Welcome to KiddyKode Studio!")
print("Let's code together! 🚀")`,
    category: 'basics',
  },
  {
    id: 'calculator',
    name: 'Simple Calculator',
    nameFr: 'Calculatrice Simple',
    code: `# Simple Calculator
# Calculatrice Simple

num1 = 10
num2 = 5

print("Numbers:", num1, "and", num2)
print("Addition:", num1 + num2)
print("Subtraction:", num1 - num2)
print("Multiplication:", num1 * num2)
print("Division:", num1 / num2)`,
    category: 'variables',
  },
  {
    id: 'countdown',
    name: 'Rocket Countdown',
    nameFr: 'Compte à Rebours Fusée',
    code: `# Rocket Countdown
# Compte à Rebours Fusée

print("🚀 Launching in...")

for i in range(10, 0, -1):
    print(i)

print("BLAST OFF! 🌟")`,
    category: 'loops',
  },
  {
    id: 'star-pattern',
    name: 'Star Pattern',
    nameFr: 'Motif Étoiles',
    code: `# Star Pattern
# Motif Étoiles

for i in range(1, 6):
    print("⭐" * i)

print("---")

for i in range(5, 0, -1):
    print("⭐" * i)`,
    category: 'loops',
  },
  {
    id: 'age-checker',
    name: 'Age Checker',
    nameFr: 'Vérificateur d\'Âge',
    code: `# Age Checker Game
# Jeu Vérificateur d'Âge

age = 12

if age < 8:
    print("You're a little explorer! 👶")
elif age < 13:
    print("You're a super coder! 🌟")
elif age < 18:
    print("You're a teen genius! 🚀")
else:
    print("You're a coding master! 👑")

print("Keep learning and growing!")`,
    category: 'conditionals',
  },
];
