export interface Story {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  icon: string;
  requiredLessons: number;
  chapters: StoryChapter[];
}

export interface StoryChapter {
  id: string;
  title: string;
  titleFr: string;
  narrative: string;
  narrativeFr: string;
  challenge: string;
  challengeFr: string;
  starterCode: string;
  solution: string;
}

export const stories: Story[] = [
  {
    id: 'legend-sundiata',
    title: 'The Code of Sundiata',
    titleFr: 'Le Code de Sundiata',
    description: 'Help the young prince unlock his destiny through the power of code!',
    descriptionFr: 'Aide le jeune prince à débloquer son destin grâce au pouvoir du code!',
    icon: '👑',
    requiredLessons: 3,
    chapters: [
      {
        id: 'ch1-prophecy',
        title: 'The Prophecy',
        titleFr: 'La Prophétie',
        narrative: `Long ago in the Mali Empire, a wise griot spoke of a prophecy: "A young prince named Sundiata will rise, but only if he learns the language of the ancients."

Young Sundiata could not walk, but his mind was sharp. The elders gave him a magical scroll that could only be read by those who understand code.

Help Sundiata decode the first message!`,
        narrativeFr: `Il y a longtemps dans l'Empire du Mali, un griot sage parla d'une prophétie: "Un jeune prince nommé Sundiata s'élèvera, mais seulement s'il apprend la langue des anciens."

Le jeune Sundiata ne pouvait pas marcher, mais son esprit était vif. Les anciens lui donnèrent un parchemin magique qui ne pouvait être lu que par ceux qui comprennent le code.

Aide Sundiata à décoder le premier message!`,
        challenge: 'Print the hidden message: "Rise, young lion!"',
        challengeFr: 'Affiche le message caché: "Lève-toi, jeune lion!"',
        starterCode: `# Help Sundiata reveal the prophecy
# Complete the code below

print(_____)`,
        solution: `print("Rise, young lion!")`,
      },
      {
        id: 'ch2-strength',
        title: 'Finding Strength',
        titleFr: 'Trouver la Force',
        narrative: `The message gave Sundiata courage! But to stand, he needed to count his steps.

The magic staff said: "Count from 1 to 7 - each number gives you strength!"

Use a loop to help Sundiata gain his power!`,
        narrativeFr: `Le message donna du courage à Sundiata! Mais pour se lever, il devait compter ses pas.

Le bâton magique dit: "Compte de 1 à 7 - chaque nombre te donne de la force!"

Utilise une boucle pour aider Sundiata à gagner son pouvoir!`,
        challenge: 'Create a loop that counts from 1 to 7',
        challengeFr: 'Crée une boucle qui compte de 1 à 7',
        starterCode: `# Help Sundiata count his steps to strength

for step in range(1, ___):
    print("Step", step, "- Growing stronger!")`,
        solution: `for step in range(1, 8):
    print("Step", step, "- Growing stronger!")`,
      },
    ],
  },
  {
    id: 'legend-anansi',
    title: 'Anansi\'s Web of Code',
    titleFr: 'La Toile de Code d\'Anansi',
    description: 'Join the clever spider on a journey of wit and wisdom!',
    descriptionFr: 'Rejoins l\'araignée rusée dans un voyage d\'esprit et de sagesse!',
    icon: '🕷️',
    requiredLessons: 5,
    chapters: [
      {
        id: 'ch1-web',
        title: 'Weaving the Web',
        titleFr: 'Tisser la Toile',
        narrative: `Anansi the spider was known throughout West Africa for his cleverness. One day, the Sky God Nyame promised to give Anansi all the stories in the world - but only if he could weave a magical web using code!

The web must have a beautiful pattern...`,
        narrativeFr: `Anansi l'araignée était connu dans toute l'Afrique de l'Ouest pour son intelligence. Un jour, le Dieu du Ciel Nyame promit de donner à Anansi toutes les histoires du monde - mais seulement s'il pouvait tisser une toile magique avec du code!

La toile doit avoir un beau motif...`,
        challenge: 'Create a triangle pattern with asterisks (*)',
        challengeFr: 'Crée un motif triangulaire avec des astérisques (*)',
        starterCode: `# Help Anansi weave his magic web

for i in range(1, 6):
    print("*" * ___)`,
        solution: `for i in range(1, 6):
    print("*" * i)`,
      },
    ],
  },
  {
    id: 'legend-mansa-musa',
    title: 'Mansa Musa\'s Golden Algorithm',
    titleFr: 'L\'Algorithme Doré de Mansa Musa',
    description: 'Calculate the wealth of the richest person in history!',
    descriptionFr: 'Calcule la richesse de la personne la plus riche de l\'histoire!',
    icon: '💰',
    requiredLessons: 8,
    chapters: [
      {
        id: 'ch1-treasure',
        title: 'Counting the Treasure',
        titleFr: 'Compter le Trésor',
        narrative: `Mansa Musa, the great king of Mali, was preparing for his legendary pilgrimage to Mecca. He needed to calculate how much gold to bring!

His treasurers counted:
- 100 camels carrying gold
- Each camel carries 300 pounds of gold
- Each pound is worth 1000 dinars

Help calculate the total!`,
        narrativeFr: `Mansa Musa, le grand roi du Mali, préparait son légendaire pèlerinage à La Mecque. Il devait calculer combien d'or emporter!

Ses trésoriers comptèrent:
- 100 chameaux portant de l'or
- Chaque chameau porte 300 livres d'or
- Chaque livre vaut 1000 dinars

Aide à calculer le total!`,
        challenge: 'Calculate and print the total value of gold',
        challengeFr: 'Calcule et affiche la valeur totale de l\'or',
        starterCode: `# Mansa Musa's Gold Calculator

camels = 100
gold_per_camel = 300  # pounds
value_per_pound = 1000  # dinars

total_gold = camels * gold_per_camel
total_value = total_gold * value_per_pound

print("Total gold:", ___, "pounds")
print("Total value:", ___, "dinars")
print("Mansa Musa is heading to Mecca! 🐪")`,
        solution: `camels = 100
gold_per_camel = 300
value_per_pound = 1000

total_gold = camels * gold_per_camel
total_value = total_gold * value_per_pound

print("Total gold:", total_gold, "pounds")
print("Total value:", total_value, "dinars")
print("Mansa Musa is heading to Mecca! 🐪")`,
      },
    ],
  },
];
