export interface EcoPhase {
  id: string;
  title: string;
  titleFr: string;
  type: 'learning' | 'coding' | 'celebration';
  content: PhaseContent;
  contentFr: PhaseContent;
}

export interface PhaseContent {
  introduction: string;
  sections?: ContentSection[];
  codeProvided?: string;
  codeHints?: string[];
  starterCode?: string;
  expectedLogic?: string[];
  reflection?: string;
  celebration?: string;
}

export interface ContentSection {
  title: string;
  icon?: string;
  definition?: string;
  examples?: string[];
  explanation?: string;
}

export const ecoHelperPhases: EcoPhase[] = [
  {
    id: 'phase-0',
    title: 'Understanding the Problem',
    titleFr: 'Comprendre le Problème',
    type: 'learning',
    content: {
      introduction: `# 🌍 Welcome to Eco-Helper!

**Eco-Helper** is a program that helps people put waste in the correct bin.

Sorting waste keeps our environment clean and healthy. By building this project, you are helping your town and the planet!

You will become an **Eco-Helper** by building a real application!`,
      sections: [
        {
          title: '♻️ Recycle',
          icon: '♻️',
          definition: 'Waste that can be cleaned and used again to make new things.',
          examples: ['Plastic water bottles', 'Glass bottles', 'Tin cans', 'Old newspapers']
        },
        {
          title: '🌱 Compost',
          icon: '🌱',
          definition: 'Food and plant waste that breaks down naturally and helps plants grow.',
          examples: ['Banana peels', 'Orange peels', 'Vegetable waste', 'Dry leaves']
        },
        {
          title: '🗑️ Trash',
          icon: '🗑️',
          definition: 'Waste that cannot be reused or recycled.',
          examples: ['Used diapers', 'Broken slippers', 'Dirty plastic wrappers', 'Old sponges']
        }
      ],
      reflection: `## 🤔 Why Is This Important?

- ✅ Clean towns reduce sickness
- ✅ Proper waste sorting protects animals
- ✅ Compost helps farmers grow food
- ✅ Recycling reduces pollution

**Think about it:** How can sorting waste help your home or school?`,
      celebration: '🎉 Great job understanding the problem! You are ready to start building!'
    },
    contentFr: {
      introduction: `# 🌍 Bienvenue dans Éco-Helper!

**Éco-Helper** est un programme qui aide les gens à mettre les déchets dans la bonne poubelle.

Trier les déchets garde notre environnement propre et sain. En construisant ce projet, tu aides ta ville et la planète!

Tu deviendras un **Éco-Helper** en construisant une vraie application!`,
      sections: [
        {
          title: '♻️ Recyclage',
          icon: '♻️',
          definition: 'Déchets qui peuvent être nettoyés et réutilisés pour fabriquer de nouvelles choses.',
          examples: ['Bouteilles en plastique', 'Bouteilles en verre', 'Boîtes de conserve', 'Vieux journaux']
        },
        {
          title: '🌱 Compost',
          icon: '🌱',
          definition: 'Déchets alimentaires et végétaux qui se décomposent naturellement et aident les plantes à pousser.',
          examples: ['Peaux de banane', "Peaux d'orange", 'Déchets de légumes', 'Feuilles sèches']
        },
        {
          title: '🗑️ Poubelle',
          icon: '🗑️',
          definition: 'Déchets qui ne peuvent pas être réutilisés ou recyclés.',
          examples: ['Couches usagées', 'Sandales cassées', 'Emballages plastiques sales', 'Vieilles éponges']
        }
      ],
      reflection: `## 🤔 Pourquoi est-ce important?

- ✅ Les villes propres réduisent les maladies
- ✅ Le tri des déchets protège les animaux
- ✅ Le compost aide les agriculteurs à cultiver
- ✅ Le recyclage réduit la pollution

**Réfléchis:** Comment le tri des déchets peut-il aider ta maison ou ton école?`,
      celebration: '🎉 Bravo pour avoir compris le problème! Tu es prêt(e) à commencer à construire!'
    }
  },
  {
    id: 'phase-1',
    title: 'Project Introduction & Setup',
    titleFr: 'Introduction et Configuration du Projet',
    type: 'learning',
    content: {
      introduction: `# 🚀 Let's Build Eco-Helper!

## What Will Your App Do?
- Show different waste items
- Display three bins: Recycle, Compost, and Trash
- Let users choose the correct bin for each item
- Keep score of correct answers!

## How You Can Work:
- 👤 Work individually
- 👥 Or team up with a friend!

## Important to Know:
- ✅ The screen design (Tkinter code) is **already written for you**
- ✅ Your job is to **think and write Python logic**
- ✅ You will use: **lists, conditions, variables, and functions**`,
      celebration: '🎉 You understand the project! Let\'s see the Eco-Helper screen!'
    },
    contentFr: {
      introduction: `# 🚀 Construisons Éco-Helper!

## Que fera ton application?
- Montrer différents déchets
- Afficher trois poubelles: Recyclage, Compost et Poubelle
- Permettre aux utilisateurs de choisir la bonne poubelle pour chaque élément
- Compter les bonnes réponses!

## Comment tu peux travailler:
- 👤 Travaille seul(e)
- 👥 Ou fais équipe avec un(e) ami(e)!

## Important à savoir:
- ✅ Le design de l'écran (code Tkinter) est **déjà écrit pour toi**
- ✅ Ton travail est de **réfléchir et écrire la logique Python**
- ✅ Tu utiliseras: **listes, conditions, variables et fonctions**`,
      celebration: '🎉 Tu comprends le projet! Voyons l\'écran Éco-Helper!'
    }
  },
  {
    id: 'phase-2',
    title: 'Building the Eco-Helper Screen',
    titleFr: "Construction de l'Écran Éco-Helper",
    type: 'learning',
    content: {
      introduction: `# 🖥️ The Eco-Helper Screen

Here is the complete Tkinter code for your Eco-Helper screen. **This code is provided for you** - you don't need to write it!

Look at it to understand what the screen will show:
- 📋 App title at the top
- 🗑️ Three bins (Recycle, Compost, Trash)
- 📦 Area where items appear
- 📊 Score display`,
      codeProvided: `# ========================================
# ECO-HELPER SCREEN - PROVIDED FOR YOU
# ========================================
# DO NOT MODIFY THIS CODE
# Your job is to add Python logic below!

import tkinter as tk
from tkinter import messagebox
import random

# Create the main window
window = tk.Tk()
window.title("🌍 Eco-Helper - Sorting Waste to Save Our World!")
window.geometry("600x500")
window.configure(bg="#e8f5e9")

# Title Label
title_label = tk.Label(
    window, 
    text="🌍 Eco-Helper", 
    font=("Arial", 24, "bold"),
    bg="#e8f5e9", 
    fg="#2e7d32"
)
title_label.pack(pady=10)

# Subtitle
subtitle = tk.Label(
    window,
    text="Sort the waste into the correct bin!",
    font=("Arial", 12),
    bg="#e8f5e9",
    fg="#558b2f"
)
subtitle.pack()

# Current Item Display
item_frame = tk.Frame(window, bg="#fff9c4", padx=20, pady=20)
item_frame.pack(pady=20)

item_label = tk.Label(
    item_frame,
    text="🍌 Banana Peel",
    font=("Arial", 18, "bold"),
    bg="#fff9c4",
    fg="#33691e"
)
item_label.pack()

# Bins Frame
bins_frame = tk.Frame(window, bg="#e8f5e9")
bins_frame.pack(pady=20)

# Recycle Bin Button
recycle_btn = tk.Button(
    bins_frame,
    text="♻️\\nRecycle",
    font=("Arial", 14, "bold"),
    bg="#42a5f5",
    fg="white",
    width=10,
    height=3,
    command=lambda: check_answer("recycle")
)
recycle_btn.pack(side=tk.LEFT, padx=10)

# Compost Bin Button
compost_btn = tk.Button(
    bins_frame,
    text="🌱\\nCompost",
    font=("Arial", 14, "bold"),
    bg="#8bc34a",
    fg="white",
    width=10,
    height=3,
    command=lambda: check_answer("compost")
)
compost_btn.pack(side=tk.LEFT, padx=10)

# Trash Bin Button
trash_btn = tk.Button(
    bins_frame,
    text="🗑️\\nTrash",
    font=("Arial", 14, "bold"),
    bg="#ff7043",
    fg="white",
    width=10,
    height=3,
    command=lambda: check_answer("trash")
)
trash_btn.pack(side=tk.LEFT, padx=10)

# Score Display
score_label = tk.Label(
    window,
    text="Score: 0",
    font=("Arial", 16, "bold"),
    bg="#e8f5e9",
    fg="#1b5e20"
)
score_label.pack(pady=10)

# ========================================
# YOUR PYTHON LOGIC GOES BELOW HERE! ⬇️
# ========================================

# Phase 3: Define your waste item lists here


# Phase 4: Create the check_answer function here


# Phase 5: Add score tracking logic here


# ========================================
# DO NOT MODIFY BELOW THIS LINE
# ========================================
window.mainloop()`,
      celebration: '🎉 Your Eco-Helper screen is ready! Now let\'s add the Python logic!'
    },
    contentFr: {
      introduction: `# 🖥️ L'Écran Éco-Helper

Voici le code Tkinter complet pour ton écran Éco-Helper. **Ce code est fourni pour toi** - tu n'as pas besoin de l'écrire!

Regarde-le pour comprendre ce que l'écran montrera:
- 📋 Titre de l'application en haut
- 🗑️ Trois poubelles (Recyclage, Compost, Poubelle)
- 📦 Zone où les éléments apparaissent
- 📊 Affichage du score`,
      codeProvided: `# ========================================
# ÉCRAN ÉCO-HELPER - FOURNI POUR TOI
# ========================================
# NE MODIFIE PAS CE CODE
# Ton travail est d'ajouter la logique Python ci-dessous!

import tkinter as tk
from tkinter import messagebox
import random

# Créer la fenêtre principale
window = tk.Tk()
window.title("🌍 Éco-Helper - Trier les déchets pour sauver le monde!")
window.geometry("600x500")
window.configure(bg="#e8f5e9")

# Étiquette du titre
title_label = tk.Label(
    window, 
    text="🌍 Éco-Helper", 
    font=("Arial", 24, "bold"),
    bg="#e8f5e9", 
    fg="#2e7d32"
)
title_label.pack(pady=10)

# Sous-titre
subtitle = tk.Label(
    window,
    text="Trie les déchets dans la bonne poubelle!",
    font=("Arial", 12),
    bg="#e8f5e9",
    fg="#558b2f"
)
subtitle.pack()

# Affichage de l'élément actuel
item_frame = tk.Frame(window, bg="#fff9c4", padx=20, pady=20)
item_frame.pack(pady=20)

item_label = tk.Label(
    item_frame,
    text="🍌 Peau de banane",
    font=("Arial", 18, "bold"),
    bg="#fff9c4",
    fg="#33691e"
)
item_label.pack()

# Cadre des poubelles
bins_frame = tk.Frame(window, bg="#e8f5e9")
bins_frame.pack(pady=20)

# Bouton Recyclage
recycle_btn = tk.Button(
    bins_frame,
    text="♻️\\nRecyclage",
    font=("Arial", 14, "bold"),
    bg="#42a5f5",
    fg="white",
    width=10,
    height=3,
    command=lambda: check_answer("recycle")
)
recycle_btn.pack(side=tk.LEFT, padx=10)

# Bouton Compost
compost_btn = tk.Button(
    bins_frame,
    text="🌱\\nCompost",
    font=("Arial", 14, "bold"),
    bg="#8bc34a",
    fg="white",
    width=10,
    height=3,
    command=lambda: check_answer("compost")
)
compost_btn.pack(side=tk.LEFT, padx=10)

# Bouton Poubelle
trash_btn = tk.Button(
    bins_frame,
    text="🗑️\\nPoubelle",
    font=("Arial", 14, "bold"),
    bg="#ff7043",
    fg="white",
    width=10,
    height=3,
    command=lambda: check_answer("trash")
)
trash_btn.pack(side=tk.LEFT, padx=10)

# Affichage du score
score_label = tk.Label(
    window,
    text="Score: 0",
    font=("Arial", 16, "bold"),
    bg="#e8f5e9",
    fg="#1b5e20"
)
score_label.pack(pady=10)

# ========================================
# TA LOGIQUE PYTHON VA CI-DESSOUS! ⬇️
# ========================================

# Phase 3: Définis tes listes d'éléments de déchets ici


# Phase 4: Crée la fonction check_answer ici


# Phase 5: Ajoute la logique de suivi du score ici


# ========================================
# NE MODIFIE PAS EN DESSOUS DE CETTE LIGNE
# ========================================
window.mainloop()`,
      celebration: '🎉 Ton écran Éco-Helper est prêt! Maintenant ajoutons la logique Python!'
    }
  },
  {
    id: 'phase-3',
    title: 'Defining Waste Items',
    titleFr: 'Définir les Éléments de Déchets',
    type: 'coding',
    content: {
      introduction: `# 📝 Phase 3: Create Your Waste Lists

Now it's YOUR turn to write Python code!

## Your Task:
Create **three lists** to store waste items:
1. A list for **recycle** items
2. A list for **compost** items  
3. A list for **trash** items

## Remember:
- Each list should have at least 5 items
- Items should be strings (text in quotes)
- Think about real items you see at home!`,
      codeHints: [
        '💡 How do we store many related items in Python?',
        '💡 A list uses square brackets: [ ]',
        '💡 Items in a list are separated by commas',
        '💡 Text items need quotes around them'
      ],
      starterCode: `# ========================================
# PHASE 3: DEFINE YOUR WASTE ITEM LISTS
# ========================================

# Create a list of items that can be RECYCLED
# Hint: Think of plastic bottles, cans, paper...
recycle_items = [
    # Add your recycle items here!
    
]

# Create a list of items that can be COMPOSTED
# Hint: Think of food scraps, leaves, peels...
compost_items = [
    # Add your compost items here!
    
]

# Create a list of items that go in the TRASH
# Hint: Think of things that can't be reused...
trash_items = [
    # Add your trash items here!
    
]

# Test your lists by printing them!
print("Recycle items:", recycle_items)
print("Compost items:", compost_items)
print("Trash items:", trash_items)`,
      expectedLogic: [
        'Created recycle_items list with at least 5 items',
        'Created compost_items list with at least 5 items',
        'Created trash_items list with at least 5 items',
        'All items are strings in quotes'
      ],
      celebration: '🎉 Excellent! You created your waste item lists! Ready for the next challenge!'
    },
    contentFr: {
      introduction: `# 📝 Phase 3: Crée tes Listes de Déchets

Maintenant c'est TON tour d'écrire du code Python!

## Ta Mission:
Crée **trois listes** pour stocker les déchets:
1. Une liste pour les éléments à **recycler**
2. Une liste pour les éléments à **composter**
3. Une liste pour les éléments **poubelle**

## Rappelle-toi:
- Chaque liste doit avoir au moins 5 éléments
- Les éléments doivent être des chaînes (texte entre guillemets)
- Pense aux vrais objets que tu vois à la maison!`,
      codeHints: [
        '💡 Comment stocke-t-on plusieurs éléments liés en Python?',
        '💡 Une liste utilise des crochets: [ ]',
        '💡 Les éléments dans une liste sont séparés par des virgules',
        '💡 Les éléments texte ont besoin de guillemets'
      ],
      starterCode: `# ========================================
# PHASE 3: DÉFINIS TES LISTES DE DÉCHETS
# ========================================

# Crée une liste d'éléments qui peuvent être RECYCLÉS
# Indice: Pense aux bouteilles en plastique, canettes, papier...
elements_recyclage = [
    # Ajoute tes éléments de recyclage ici!
    
]

# Crée une liste d'éléments qui peuvent être COMPOSTÉS
# Indice: Pense aux restes de nourriture, feuilles, pelures...
elements_compost = [
    # Ajoute tes éléments de compost ici!
    
]

# Crée une liste d'éléments qui vont à la POUBELLE
# Indice: Pense aux choses qui ne peuvent pas être réutilisées...
elements_poubelle = [
    # Ajoute tes éléments poubelle ici!
    
]

# Teste tes listes en les affichant!
print("Éléments recyclage:", elements_recyclage)
print("Éléments compost:", elements_compost)
print("Éléments poubelle:", elements_poubelle)`,
      expectedLogic: [
        'Liste elements_recyclage créée avec au moins 5 éléments',
        'Liste elements_compost créée avec au moins 5 éléments',
        'Liste elements_poubelle créée avec au moins 5 éléments',
        'Tous les éléments sont des chaînes entre guillemets'
      ],
      celebration: '🎉 Excellent! Tu as créé tes listes de déchets! Prêt(e) pour le prochain défi!'
    }
  },
  {
    id: 'phase-4',
    title: 'Checking the Correct Bin',
    titleFr: 'Vérifier la Bonne Poubelle',
    type: 'coding',
    content: {
      introduction: `# 🎯 Phase 4: Check If the Answer is Correct

Now you need to create logic that checks if the user chose the right bin!

## Your Task:
Write **if/else** statements to:
1. Check if the item is in the recycle list
2. Check if the item is in the compost list
3. Check if the item is in the trash list
4. Show if the answer is correct or wrong

## Python Tip:
Use \`in\` to check if something is inside a list!`,
      codeHints: [
        '💡 How can Python check if something exists inside a list?',
        '💡 The "in" keyword checks membership: if item in my_list',
        '💡 What should happen if the answer is correct?',
        '💡 What should happen if the answer is wrong?'
      ],
      starterCode: `# ========================================
# PHASE 4: CHECK IF ANSWER IS CORRECT
# ========================================

# This variable stores the current waste item
current_item = "plastic bottle"

# This function is called when a bin is clicked
def check_answer(bin_chosen):
    # bin_chosen will be: "recycle", "compost", or "trash"
    
    # TODO: Check if current_item is in the correct list
    # Hint: Use "if" and "in" to check!
    
    # If bin_chosen is "recycle":
        # Check if current_item is in recycle_items
        # If yes, print "Correct!"
        # If no, print "Wrong bin!"
    
    # Write your if/else logic here:
    
    
    pass  # Remove this line when you add your code

# Test your function!
check_answer("recycle")`,
      expectedLogic: [
        'Used if/elif/else structure',
        'Checked if item is "in" the correct list',
        'Printed feedback for correct answer',
        'Printed feedback for wrong answer'
      ],
      celebration: '🎉 Amazing! Your Eco-Helper can now check answers! One more phase to go!'
    },
    contentFr: {
      introduction: `# 🎯 Phase 4: Vérifie si la Réponse est Correcte

Maintenant tu dois créer une logique qui vérifie si l'utilisateur a choisi la bonne poubelle!

## Ta Mission:
Écris des instructions **if/else** pour:
1. Vérifier si l'élément est dans la liste recyclage
2. Vérifier si l'élément est dans la liste compost
3. Vérifier si l'élément est dans la liste poubelle
4. Montrer si la réponse est correcte ou fausse

## Astuce Python:
Utilise \`in\` pour vérifier si quelque chose est dans une liste!`,
      codeHints: [
        '💡 Comment Python peut-il vérifier si quelque chose existe dans une liste?',
        '💡 Le mot-clé "in" vérifie l\'appartenance: if element in ma_liste',
        '💡 Que doit-il se passer si la réponse est correcte?',
        '💡 Que doit-il se passer si la réponse est fausse?'
      ],
      starterCode: `# ========================================
# PHASE 4: VÉRIFIE SI LA RÉPONSE EST CORRECTE
# ========================================

# Cette variable stocke l'élément de déchet actuel
element_actuel = "bouteille en plastique"

# Cette fonction est appelée quand une poubelle est cliquée
def verifier_reponse(poubelle_choisie):
    # poubelle_choisie sera: "recyclage", "compost", ou "poubelle"
    
    # TODO: Vérifie si element_actuel est dans la bonne liste
    # Indice: Utilise "if" et "in" pour vérifier!
    
    # Si poubelle_choisie est "recyclage":
        # Vérifie si element_actuel est dans elements_recyclage
        # Si oui, affiche "Correct!"
        # Si non, affiche "Mauvaise poubelle!"
    
    # Écris ta logique if/else ici:
    
    
    pass  # Supprime cette ligne quand tu ajoutes ton code

# Teste ta fonction!
verifier_reponse("recyclage")`,
      expectedLogic: [
        'Utilisé une structure if/elif/else',
        'Vérifié si l\'élément est "in" la bonne liste',
        'Affiché un retour pour la bonne réponse',
        'Affiché un retour pour la mauvaise réponse'
      ],
      celebration: '🎉 Incroyable! Ton Éco-Helper peut maintenant vérifier les réponses! Encore une phase!'
    }
  },
  {
    id: 'phase-5',
    title: 'Score & Feedback',
    titleFr: 'Score et Retour',
    type: 'coding',
    content: {
      introduction: `# 📊 Phase 5: Track the Score!

Your Eco-Helper is almost complete! Now add score tracking!

## Your Task:
1. Create a **variable** to store the score
2. **Increase** the score when the answer is correct
3. Show the **current score** after each answer

## Python Tip:
To increase a variable: \`score = score + 1\` or \`score += 1\``,
      codeHints: [
        '💡 What happens when we add 1 to a variable?',
        '💡 Where should the score start? (Hint: 0)',
        '💡 When should the score increase?',
        '💡 How do you show the updated score?'
      ],
      starterCode: `# ========================================
# PHASE 5: SCORE TRACKING
# ========================================

# TODO: Create a variable to store the score
# Hint: What number should the score start at?
score = ___

def check_answer(bin_chosen):
    global score  # This lets us change the score variable
    
    # Your Phase 4 logic goes here...
    # (checking if the answer is correct)
    
    # TODO: If the answer is correct:
    #   1. Increase the score by 1
    #   2. Print a happy message with the score
    
    # TODO: If the answer is wrong:
    #   1. Don't change the score
    #   2. Print the correct bin
    
    # Write your score logic here:
    
    
    pass  # Remove this line when you add your code

# Test multiple answers
check_answer("recycle")
check_answer("compost")
check_answer("trash")

# Show final score
print("Your final score:", score)`,
      expectedLogic: [
        'Created score variable starting at 0',
        'Increased score by 1 for correct answers',
        'Printed updated score after each answer',
        'Did not change score for wrong answers'
      ],
      celebration: '🎉 Fantastic! Your Eco-Helper is complete with score tracking!'
    },
    contentFr: {
      introduction: `# 📊 Phase 5: Suivi du Score!

Ton Éco-Helper est presque complet! Maintenant ajoute le suivi du score!

## Ta Mission:
1. Crée une **variable** pour stocker le score
2. **Augmente** le score quand la réponse est correcte
3. Montre le **score actuel** après chaque réponse

## Astuce Python:
Pour augmenter une variable: \`score = score + 1\` ou \`score += 1\``,
      codeHints: [
        '💡 Que se passe-t-il quand on ajoute 1 à une variable?',
        '💡 À quel nombre le score doit-il commencer? (Indice: 0)',
        '💡 Quand le score doit-il augmenter?',
        '💡 Comment afficher le score mis à jour?'
      ],
      starterCode: `# ========================================
# PHASE 5: SUIVI DU SCORE
# ========================================

# TODO: Crée une variable pour stocker le score
# Indice: À quel nombre le score doit-il commencer?
score = ___

def verifier_reponse(poubelle_choisie):
    global score  # Cela nous permet de modifier la variable score
    
    # Ta logique de Phase 4 va ici...
    # (vérifier si la réponse est correcte)
    
    # TODO: Si la réponse est correcte:
    #   1. Augmente le score de 1
    #   2. Affiche un message joyeux avec le score
    
    # TODO: Si la réponse est fausse:
    #   1. Ne change pas le score
    #   2. Affiche la bonne poubelle
    
    # Écris ta logique de score ici:
    
    
    pass  # Supprime cette ligne quand tu ajoutes ton code

# Teste plusieurs réponses
verifier_reponse("recyclage")
verifier_reponse("compost")
verifier_reponse("poubelle")

# Affiche le score final
print("Ton score final:", score)`,
      expectedLogic: [
        'Variable score créée commençant à 0',
        'Score augmenté de 1 pour les bonnes réponses',
        'Score mis à jour affiché après chaque réponse',
        'Score non modifié pour les mauvaises réponses'
      ],
      celebration: '🎉 Fantastique! Ton Éco-Helper est complet avec le suivi du score!'
    }
  },
  {
    id: 'phase-final',
    title: 'Celebration & Reflection',
    titleFr: 'Célébration et Réflexion',
    type: 'celebration',
    content: {
      introduction: `# 🎉🌍 Congratulations, Eco-Helper! 🌍🎉

## You Did It!

You have successfully built the **Eco-Helper** application!

## What You Learned:
- ✅ **Lists** - Storing many items together
- ✅ **Conditions** - Making decisions with if/else
- ✅ **Variables** - Keeping track of the score
- ✅ **Functions** - Organizing code into reusable pieces

## Your Impact:
By building this project, you learned how to:
- 🌱 Use code to help protect the environment
- 🧠 Think logically and solve problems
- 💻 Create a real, useful application

## What's Next?
- 📚 Teach someone else how to sort waste
- 🎨 Add more items to your lists
- 🏆 Challenge a friend to beat your high score!`,
      reflection: `## 🤔 Final Reflection

Think about these questions:
1. What was the hardest part of this project?
2. What are you most proud of?
3. How will you use what you learned?

**Remember:** You used code to help the planet. That makes you a real Eco-Helper! 🌍💚`,
      celebration: '🏆 You are now an official Eco-Helper! Keep coding, keep learning, keep protecting our world!'
    },
    contentFr: {
      introduction: `# 🎉🌍 Félicitations, Éco-Helper! 🌍🎉

## Tu as réussi!

Tu as construit avec succès l'application **Éco-Helper**!

## Ce que tu as appris:
- ✅ **Listes** - Stocker plusieurs éléments ensemble
- ✅ **Conditions** - Prendre des décisions avec if/else
- ✅ **Variables** - Suivre le score
- ✅ **Fonctions** - Organiser le code en morceaux réutilisables

## Ton Impact:
En construisant ce projet, tu as appris à:
- 🌱 Utiliser le code pour protéger l'environnement
- 🧠 Penser logiquement et résoudre des problèmes
- 💻 Créer une vraie application utile

## Et Maintenant?
- 📚 Apprends à quelqu'un d'autre comment trier les déchets
- 🎨 Ajoute plus d'éléments à tes listes
- 🏆 Défie un(e) ami(e) de battre ton meilleur score!`,
      reflection: `## 🤔 Réflexion Finale

Réfléchis à ces questions:
1. Quelle était la partie la plus difficile de ce projet?
2. De quoi es-tu le/la plus fier(e)?
3. Comment utiliseras-tu ce que tu as appris?

**Rappelle-toi:** Tu as utilisé le code pour aider la planète. Cela fait de toi un vrai Éco-Helper! 🌍💚`,
      celebration: '🏆 Tu es maintenant un(e) Éco-Helper officiel(le)! Continue à coder, apprendre et protéger notre monde!'
    }
  }
];

export const ecoHelperProject = {
  id: 'eco-helper',
  title: 'Eco-Helper Project',
  titleFr: 'Projet Éco-Helper',
  subtitle: 'Sorting Waste to Save Our World',
  subtitleFr: 'Trier les Déchets pour Sauver Notre Monde',
  difficulty: 'intermediate' as const,
  estimatedTime: '45-60 min',
  skills: ['Lists', 'Conditionals', 'Variables', 'Functions'],
  skillsFr: ['Listes', 'Conditions', 'Variables', 'Fonctions'],
  phases: ecoHelperPhases
};
