export interface SupermarketStep {
  id: string;
  title: string;
  titleFr: string;
  type: 'learning' | 'coding' | 'celebration';
  content: StepContent;
  contentFr: StepContent;
}

export interface StepContent {
  introduction: string;
  starterCode?: string;
  codeHints?: string[];
  expectedLogic?: string[];
  whatYouLearned?: string;
  successCheck?: string;
  motivation?: string;
  celebration?: string;
}

export const supermarketProject = {
  title: 'What Happens Behind the Supermarket Computer?',
  titleFr: 'Que se passe-t-il derrière l\'ordinateur du supermarché?',
  subtitle: 'Build a receipt system step by step 🛒',
  subtitleFr: 'Construis un système de reçu étape par étape 🛒',
  estimatedTime: '45-60 min',
  level: 'beginner' as const,
  phases: [] as SupermarketStep[],
};

const supermarketSteps: SupermarketStep[] = [
  {
    id: 'step-1',
    title: 'Step 1 – Setting Up the Store',
    titleFr: 'Étape 1 – Préparer le Magasin',
    type: 'coding',
    content: {
      introduction: `# 🏪 Step 1: Setting Up the Store

Welcome to your very first step! Imagine you are the person who **programs** the computer at a supermarket. Cool, right?

## What You'll Do:
- Create **variables** to store the price of each item
- Print a **welcome message** to greet customers

## What is a Variable?
A variable is like a **labeled box** where you store information. For example:
\`\`\`python
apple_price = 500
\`\`\`
This means: "Put the number 500 into a box labeled apple_price."

## Your Task:
1. Set the price for **apples** (e.g., 500)
2. Set the price for **mambo** sweets (e.g., 200)
3. Set the price for **cake** (e.g., 1500)
4. Print a welcome message for your store!

**Complete this step before unlocking Step 2.**`,
      starterCode: `# ========================================
# STEP 1: SETTING UP THE STORE 🏪
# ========================================

# Set the price for each item (in your currency)
# Example: apple_price = 500

apple_price = # Write the price here
mambo_price = # Write the price here
cake_price = # Write the price here

# Print a welcome message
# Example: print("Welcome to my store!")

print("Welcome to _____ Supermarket!")
print("Here are our prices:")
print("Apple:", apple_price)
print("Mambo:", mambo_price)
print("Cake:", cake_price)
`,
      codeHints: [
        '💡 A variable stores a value. Example: apple_price = 500',
        '💡 Use integers (whole numbers) for prices - no decimals!',
        '💡 print() displays text on the screen',
        '💡 You can print text and variables together: print("Apple:", apple_price)'
      ],
      expectedLogic: [
        'Set apple_price to an integer value',
        'Set mambo_price to an integer value',
        'Set cake_price to an integer value',
        'Print a welcome message with all prices'
      ],
      whatYouLearned: '🎯 You learned how to create **variables** and use **print()** to display information!',
      successCheck: '✅ Your program shows a welcome message with all three prices.',
      motivation: '🚀 Amazing start! You just set up your very own supermarket! The computer now knows all the prices!',
      celebration: 'Step 1 Complete! Your store is open for business! 🏪'
    },
    contentFr: {
      introduction: `# 🏪 Étape 1: Préparer le Magasin

Bienvenue dans ta toute première étape! Imagine que tu es la personne qui **programme** l'ordinateur d'un supermarché. Cool, non?

## Ce que tu vas faire:
- Créer des **variables** pour stocker le prix de chaque article
- Afficher un **message de bienvenue** pour accueillir les clients

## Qu'est-ce qu'une Variable?
Une variable est comme une **boîte étiquetée** où tu ranges des informations. Par exemple:
\`\`\`python
prix_pomme = 500
\`\`\`
Cela signifie: "Mets le nombre 500 dans une boîte étiquetée prix_pomme."

## Ta Mission:
1. Fixe le prix des **pommes** (ex: 500)
2. Fixe le prix des **bonbons mambo** (ex: 200)
3. Fixe le prix du **gâteau** (ex: 1500)
4. Affiche un message de bienvenue pour ton magasin!

**Complète cette étape avant de débloquer l'Étape 2.**`,
      starterCode: `# ========================================
# ÉTAPE 1: PRÉPARER LE MAGASIN 🏪
# ========================================

# Fixe le prix de chaque article (dans ta monnaie)
# Exemple: prix_pomme = 500

apple_price = # Écris le prix ici
mambo_price = # Écris le prix ici
cake_price = # Écris le prix ici

# Affiche un message de bienvenue
# Exemple: print("Bienvenue dans mon magasin!")

print("Bienvenue au Supermarché _____!")
print("Voici nos prix:")
print("Pomme:", apple_price)
print("Mambo:", mambo_price)
print("Gâteau:", cake_price)
`,
      codeHints: [
        '💡 Une variable stocke une valeur. Exemple: apple_price = 500',
        '💡 Utilise des entiers (nombres entiers) pour les prix - pas de décimales!',
        '💡 print() affiche du texte à l\'écran',
        '💡 Tu peux afficher du texte et des variables ensemble: print("Pomme:", apple_price)'
      ],
      expectedLogic: [
        'Définir apple_price avec un entier',
        'Définir mambo_price avec un entier',
        'Définir cake_price avec un entier',
        'Afficher un message de bienvenue avec tous les prix'
      ],
      whatYouLearned: '🎯 Tu as appris à créer des **variables** et à utiliser **print()** pour afficher des informations!',
      successCheck: '✅ Ton programme affiche un message de bienvenue avec les trois prix.',
      motivation: '🚀 Super début! Tu viens de créer ton propre supermarché! L\'ordinateur connaît maintenant tous les prix!',
      celebration: 'Étape 1 Terminée! Ton magasin est ouvert! 🏪'
    }
  },
  {
    id: 'step-2',
    title: 'Step 2 – Taking Customer Orders',
    titleFr: 'Étape 2 – Prendre les Commandes',
    type: 'coding',
    content: {
      introduction: `# 🛒 Step 2: Taking Customer Orders

A customer walks in! Now your computer needs to **ask** how many of each item they want to buy.

## What You'll Learn:
- How to use **input()** to ask the user a question
- How to convert text to a number using **int()**

## Why int()?
When someone types a number, Python sees it as text (a "string"). We need to convert it to a real number so we can do math later!
\`\`\`python
apple_qty = int(input("How many apples? "))
\`\`\`

## Your Task:
Add code to ask the customer:
1. How many **apples** they want
2. How many **mambo** sweets they want
3. How many **cakes** they want

**Complete this step before unlocking Step 3.**`,
      starterCode: `# ========================================
# STEP 1: SETTING UP THE STORE 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Welcome to KiddyKode Supermarket!")
print("Here are our prices:")
print("Apple:", apple_price)
print("Mambo:", mambo_price)
print("Cake:", cake_price)
print("")

# ========================================
# STEP 2: TAKING CUSTOMER ORDERS 🛒
# ========================================

# Ask the customer how many of each item they want
# Use input() to ask a question
# Use int() to convert the answer to a number

# Example: apple_qty = int(input("How many apples? "))

apple_qty = # Ask how many apples
mambo_qty = # Ask how many mambo
cake_qty = # Ask how many cakes

# Show what the customer ordered
print("\\nYour order:")
print("Apples:", apple_qty)
print("Mambo:", mambo_qty)
print("Cake:", cake_qty)
`,
      codeHints: [
        '💡 input() asks the user to type something',
        '💡 int() converts text to a whole number',
        '💡 Combine them: int(input("Your question here: "))',
        '💡 The text inside input() is what the customer sees'
      ],
      expectedLogic: [
        'Use int(input()) for apple_qty',
        'Use int(input()) for mambo_qty',
        'Use int(input()) for cake_qty',
        'Print the order summary'
      ],
      whatYouLearned: '🎯 You learned how to use **input()** to get information from users and **int()** to convert text to numbers!',
      successCheck: '✅ Your program asks for quantities and shows the order.',
      motivation: '🚀 Your cashier computer can now take orders! Real supermarkets do exactly this!',
      celebration: 'Step 2 Complete! Your computer can take orders! 🛒'
    },
    contentFr: {
      introduction: `# 🛒 Étape 2: Prendre les Commandes

Un client arrive! Maintenant ton ordinateur doit **demander** combien de chaque article il veut acheter.

## Ce que tu vas apprendre:
- Comment utiliser **input()** pour poser une question
- Comment convertir du texte en nombre avec **int()**

## Pourquoi int()?
Quand quelqu'un tape un nombre, Python le voit comme du texte. On doit le convertir en vrai nombre pour faire des calculs!
\`\`\`python
qte_pommes = int(input("Combien de pommes? "))
\`\`\`

## Ta Mission:
Ajoute du code pour demander au client:
1. Combien de **pommes** il veut
2. Combien de **bonbons mambo** il veut
3. Combien de **gâteaux** il veut

**Complète cette étape avant de débloquer l'Étape 3.**`,
      starterCode: `# ========================================
# ÉTAPE 1: PRÉPARER LE MAGASIN 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Bienvenue au Supermarché KiddyKode!")
print("Voici nos prix:")
print("Pomme:", apple_price)
print("Mambo:", mambo_price)
print("Gâteau:", cake_price)
print("")

# ========================================
# ÉTAPE 2: PRENDRE LES COMMANDES 🛒
# ========================================

# Demande au client combien de chaque article il veut
# Utilise input() pour poser une question
# Utilise int() pour convertir la réponse en nombre

# Exemple: apple_qty = int(input("Combien de pommes? "))

apple_qty = # Demande combien de pommes
mambo_qty = # Demande combien de mambo
cake_qty = # Demande combien de gâteaux

# Montre la commande du client
print("\\nTa commande:")
print("Pommes:", apple_qty)
print("Mambo:", mambo_qty)
print("Gâteau:", cake_qty)
`,
      codeHints: [
        '💡 input() demande à l\'utilisateur de taper quelque chose',
        '💡 int() convertit du texte en nombre entier',
        '💡 Combine-les: int(input("Ta question ici: "))',
        '💡 Le texte dans input() est ce que le client voit'
      ],
      expectedLogic: [
        'Utiliser int(input()) pour apple_qty',
        'Utiliser int(input()) pour mambo_qty',
        'Utiliser int(input()) pour cake_qty',
        'Afficher le résumé de la commande'
      ],
      whatYouLearned: '🎯 Tu as appris à utiliser **input()** pour obtenir des informations et **int()** pour convertir du texte en nombres!',
      successCheck: '✅ Ton programme demande les quantités et affiche la commande.',
      motivation: '🚀 Ton ordinateur de caisse peut maintenant prendre des commandes! Les vrais supermarchés font exactement ça!',
      celebration: 'Étape 2 Terminée! Ton ordinateur prend les commandes! 🛒'
    }
  },
  {
    id: 'step-3',
    title: 'Step 3 – Calculating Subtotals',
    titleFr: 'Étape 3 – Calculer les Sous-totaux',
    type: 'coding',
    content: {
      introduction: `# 🧮 Step 3: Calculating Subtotals

Now that you know the price and quantity, your computer needs to **calculate** how much each item costs!

## How Does a Cashier Calculate?
It's simple multiplication:
\`\`\`
Cost = Price × Quantity
\`\`\`

For example, if apples cost 500 each and the customer wants 3:
\`\`\`python
cost_of_apples = apple_price * apple_qty  # 500 * 3 = 1500
\`\`\`

## Your Task:
Calculate the cost for:
1. **Apples** (price × quantity)
2. **Mambo** (price × quantity)
3. **Cake** (price × quantity)

**Complete this step before unlocking Step 4.**`,
      starterCode: `# ========================================
# STEP 1: SETTING UP THE STORE 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Welcome to KiddyKode Supermarket!")
print("Here are our prices:")
print("Apple:", apple_price)
print("Mambo:", mambo_price)
print("Cake:", cake_price)
print("")

# ========================================
# STEP 2: TAKING CUSTOMER ORDERS 🛒
# ========================================
apple_qty = int(input("How many apples? "))
mambo_qty = int(input("How many mambo? "))
cake_qty = int(input("How many cakes? "))

print("\\nYour order:")
print("Apples:", apple_qty)
print("Mambo:", mambo_qty)
print("Cake:", cake_qty)

# ========================================
# STEP 3: CALCULATING SUBTOTALS 🧮
# ========================================

# Calculate the cost for each item
# Formula: cost = price * quantity

cost_of_apples = # Calculate apple cost
cost_of_mambo = # Calculate mambo cost
cost_of_cake = # Calculate cake cost

# Print the subtotals
print("\\nSubtotals:")
print("Apples:", cost_of_apples)
print("Mambo:", cost_of_mambo)
print("Cake:", cost_of_cake)
`,
      codeHints: [
        '💡 Multiplication in Python uses the * symbol',
        '💡 cost_of_apples = apple_price * apple_qty',
        '💡 Each subtotal = price of that item × how many the customer wants',
        '💡 Store each result in a new variable!'
      ],
      expectedLogic: [
        'Calculate cost_of_apples = apple_price * apple_qty',
        'Calculate cost_of_mambo = mambo_price * mambo_qty',
        'Calculate cost_of_cake = cake_price * cake_qty',
        'Print all subtotals'
      ],
      whatYouLearned: '🎯 You learned how to use **multiplication (*)** and store results in **variables**!',
      successCheck: '✅ Your program shows the correct cost for each item.',
      motivation: '🚀 Your computer can now calculate prices just like a real cash register!',
      celebration: 'Step 3 Complete! Your calculator is working! 🧮'
    },
    contentFr: {
      introduction: `# 🧮 Étape 3: Calculer les Sous-totaux

Maintenant que tu connais le prix et la quantité, ton ordinateur doit **calculer** combien coûte chaque article!

## Comment un caissier calcule?
C'est une simple multiplication:
\`\`\`
Coût = Prix × Quantité
\`\`\`

Par exemple, si les pommes coûtent 500 chacune et le client en veut 3:
\`\`\`python
cout_pommes = apple_price * apple_qty  # 500 * 3 = 1500
\`\`\`

## Ta Mission:
Calcule le coût pour:
1. Les **pommes** (prix × quantité)
2. Les **mambo** (prix × quantité)
3. Le **gâteau** (prix × quantité)

**Complète cette étape avant de débloquer l'Étape 4.**`,
      starterCode: `# ========================================
# ÉTAPE 1: PRÉPARER LE MAGASIN 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Bienvenue au Supermarché KiddyKode!")
print("Voici nos prix:")
print("Pomme:", apple_price)
print("Mambo:", mambo_price)
print("Gâteau:", cake_price)
print("")

# ========================================
# ÉTAPE 2: PRENDRE LES COMMANDES 🛒
# ========================================
apple_qty = int(input("Combien de pommes? "))
mambo_qty = int(input("Combien de mambo? "))
cake_qty = int(input("Combien de gâteaux? "))

print("\\nTa commande:")
print("Pommes:", apple_qty)
print("Mambo:", mambo_qty)
print("Gâteau:", cake_qty)

# ========================================
# ÉTAPE 3: CALCULER LES SOUS-TOTAUX 🧮
# ========================================

# Calcule le coût de chaque article
# Formule: coût = prix * quantité

cost_of_apples = # Calcule le coût des pommes
cost_of_mambo = # Calcule le coût des mambo
cost_of_cake = # Calcule le coût du gâteau

# Affiche les sous-totaux
print("\\nSous-totaux:")
print("Pommes:", cost_of_apples)
print("Mambo:", cost_of_mambo)
print("Gâteau:", cost_of_cake)
`,
      codeHints: [
        '💡 La multiplication en Python utilise le symbole *',
        '💡 cost_of_apples = apple_price * apple_qty',
        '💡 Chaque sous-total = prix de l\'article × combien le client en veut',
        '💡 Stocke chaque résultat dans une nouvelle variable!'
      ],
      expectedLogic: [
        'Calculer cost_of_apples = apple_price * apple_qty',
        'Calculer cost_of_mambo = mambo_price * mambo_qty',
        'Calculer cost_of_cake = cake_price * cake_qty',
        'Afficher tous les sous-totaux'
      ],
      whatYouLearned: '🎯 Tu as appris à utiliser la **multiplication (*)** et stocker les résultats dans des **variables**!',
      successCheck: '✅ Ton programme affiche le bon coût pour chaque article.',
      motivation: '🚀 Ton ordinateur peut maintenant calculer les prix comme une vraie caisse enregistreuse!',
      celebration: 'Étape 3 Terminée! Ta calculatrice fonctionne! 🧮'
    }
  },
  {
    id: 'step-4',
    title: 'Step 4 – Calculating Total Bill',
    titleFr: 'Étape 4 – Calculer la Facture Totale',
    type: 'coding',
    content: {
      introduction: `# 💰 Step 4: Calculating the Total Bill

Now let's add everything up! The cashier computer needs to show:
- The **total cost** of all items
- The **total number** of items bought

## How to Add Things Together:
\`\`\`python
total_cost = cost_of_apples + cost_of_mambo + cost_of_cake
\`\`\`

## Your Task:
1. Calculate the **total cost** (add all subtotals)
2. Calculate the **total quantity** (add all quantities)
3. Display both totals

**Complete this step before unlocking Step 5.**`,
      starterCode: `# ========================================
# STEP 1: SETTING UP THE STORE 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Welcome to KiddyKode Supermarket!")
print("Here are our prices:")
print("Apple:", apple_price)
print("Mambo:", mambo_price)
print("Cake:", cake_price)
print("")

# ========================================
# STEP 2: TAKING CUSTOMER ORDERS 🛒
# ========================================
apple_qty = int(input("How many apples? "))
mambo_qty = int(input("How many mambo? "))
cake_qty = int(input("How many cakes? "))

# ========================================
# STEP 3: CALCULATING SUBTOTALS 🧮
# ========================================
cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

# ========================================
# STEP 4: CALCULATING TOTAL BILL 💰
# ========================================

# Add up all the subtotals to get the total bill
total_cost = # Add all three costs together

# Add up all the quantities
total_quantity = # Add all three quantities together

# Display the totals
print("\\n" + "=" * 40)
print("TOTAL ITEMS:", total_quantity)
print("TOTAL BILL:", total_cost)
print("=" * 40)
`,
      codeHints: [
        '💡 Addition in Python uses the + symbol',
        '💡 total_cost = cost_of_apples + cost_of_mambo + cost_of_cake',
        '💡 total_quantity = apple_qty + mambo_qty + cake_qty',
        '💡 "=" * 40 creates a line of 40 equal signs – it makes things look neat!'
      ],
      expectedLogic: [
        'Calculate total_cost by adding all subtotals',
        'Calculate total_quantity by adding all quantities',
        'Display both totals with formatting'
      ],
      whatYouLearned: '🎯 You learned how to use **addition (+)** to combine results and display a summary!',
      successCheck: '✅ Your program shows the total items and total bill correctly.',
      motivation: '🚀 Your computer now knows the full bill! Just like a real supermarket screen!',
      celebration: 'Step 4 Complete! You can calculate the total bill! 💰'
    },
    contentFr: {
      introduction: `# 💰 Étape 4: Calculer la Facture Totale

Maintenant additionnons tout! L'ordinateur de caisse doit montrer:
- Le **coût total** de tous les articles
- Le **nombre total** d'articles achetés

## Comment additionner:
\`\`\`python
cout_total = cost_of_apples + cost_of_mambo + cost_of_cake
\`\`\`

## Ta Mission:
1. Calcule le **coût total** (additionne tous les sous-totaux)
2. Calcule la **quantité totale** (additionne toutes les quantités)
3. Affiche les deux totaux

**Complète cette étape avant de débloquer l'Étape 5.**`,
      starterCode: `# ========================================
# ÉTAPE 1: PRÉPARER LE MAGASIN 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Bienvenue au Supermarché KiddyKode!")
print("Voici nos prix:")
print("Pomme:", apple_price)
print("Mambo:", mambo_price)
print("Gâteau:", cake_price)
print("")

# ========================================
# ÉTAPE 2: PRENDRE LES COMMANDES 🛒
# ========================================
apple_qty = int(input("Combien de pommes? "))
mambo_qty = int(input("Combien de mambo? "))
cake_qty = int(input("Combien de gâteaux? "))

# ========================================
# ÉTAPE 3: CALCULER LES SOUS-TOTAUX 🧮
# ========================================
cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

# ========================================
# ÉTAPE 4: CALCULER LA FACTURE TOTALE 💰
# ========================================

# Additionne tous les sous-totaux pour obtenir la facture totale
total_cost = # Additionne les trois coûts

# Additionne toutes les quantités
total_quantity = # Additionne les trois quantités

# Affiche les totaux
print("\\n" + "=" * 40)
print("TOTAL ARTICLES:", total_quantity)
print("FACTURE TOTALE:", total_cost)
print("=" * 40)
`,
      codeHints: [
        '💡 L\'addition en Python utilise le symbole +',
        '💡 total_cost = cost_of_apples + cost_of_mambo + cost_of_cake',
        '💡 total_quantity = apple_qty + mambo_qty + cake_qty',
        '💡 "=" * 40 crée une ligne de 40 signes égal – ça rend les choses plus jolies!'
      ],
      expectedLogic: [
        'Calculer total_cost en additionnant tous les sous-totaux',
        'Calculer total_quantity en additionnant toutes les quantités',
        'Afficher les deux totaux avec formatage'
      ],
      whatYouLearned: '🎯 Tu as appris à utiliser l\'**addition (+)** pour combiner des résultats et afficher un résumé!',
      successCheck: '✅ Ton programme affiche le total des articles et la facture correctement.',
      motivation: '🚀 Ton ordinateur connaît maintenant la facture complète! Comme un vrai écran de supermarché!',
      celebration: 'Étape 4 Terminée! Tu sais calculer la facture totale! 💰'
    }
  },
  {
    id: 'step-5',
    title: 'Step 5 – Printing a Simple Receipt',
    titleFr: 'Étape 5 – Imprimer un Reçu Simple',
    type: 'coding',
    content: {
      introduction: `# 🧾 Step 5: Printing a Simple Receipt

Now let's make it look like a **real receipt** you get at a store! We'll print a nicely formatted table.

## Formatting Tricks:
- Use \`"=" * 40\` to create divider lines
- Print headers for each column
- Organize information in rows

## Your Task:
Create a receipt that shows:
1. A **header** with the store name
2. A **table** with: Item | Qty | Price | Total
3. A **divider line** at the bottom
4. The **TOTAL BILL**

**Complete this step before unlocking Step 6.**`,
      starterCode: `# ========================================
# STEP 1: SETTING UP THE STORE 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Welcome to KiddyKode Supermarket!")
print("")

# ========================================
# STEP 2: TAKING CUSTOMER ORDERS 🛒
# ========================================
apple_qty = int(input("How many apples? "))
mambo_qty = int(input("How many mambo? "))
cake_qty = int(input("How many cakes? "))

# ========================================
# STEP 3: CALCULATING SUBTOTALS 🧮
# ========================================
cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

# ========================================
# STEP 4: CALCULATING TOTAL BILL 💰
# ========================================
total_cost = cost_of_apples + cost_of_mambo + cost_of_cake
total_quantity = apple_qty + mambo_qty + cake_qty

# ========================================
# STEP 5: PRINTING A RECEIPT 🧾
# ========================================

# Print the receipt header
# Use "=" * 40 to create a nice divider line
print("=" * 40)
print("   KIDDYKODE SUPERMARKET")
print("   Your Friendly Store!")
print("=" * 40)

# Print the column headers
# Hint: print("Item", "Qty", "Price", "Total")
# Write your column headers here

# Print each item's details
# Example: print("Apple", apple_qty, apple_price, cost_of_apples)
# Write the details for all 3 items here

# Print the total
print("=" * 40)
# Write the TOTAL BILL line here
print("=" * 40)
print("Thank you for shopping with us!")
`,
      codeHints: [
        '💡 Use print() with multiple items separated by commas',
        '💡 Example: print("Apple", apple_qty, apple_price, cost_of_apples)',
        '💡 "=" * 40 makes a divider: ========================================',
        '💡 Don\'t forget column headers: Item, Qty, Price, Total'
      ],
      expectedLogic: [
        'Print receipt header with store name',
        'Print column headers (Item, Qty, Price, Total)',
        'Print details for apples, mambo, and cake',
        'Print total bill with divider lines'
      ],
      whatYouLearned: '🎯 You learned how to **format output** to make it look professional and organized!',
      successCheck: '✅ Your receipt shows a header, item table, and total bill.',
      motivation: '🚀 WOW! That looks like a real receipt! You are becoming a true programmer!',
      celebration: 'Step 5 Complete! Your receipt looks amazing! 🧾'
    },
    contentFr: {
      introduction: `# 🧾 Étape 5: Imprimer un Reçu Simple

Maintenant, faisons en sorte que ça ressemble à un **vrai reçu** comme au magasin! On va imprimer un joli tableau formaté.

## Astuces de formatage:
- Utilise \`"=" * 40\` pour créer des lignes de séparation
- Imprime des en-têtes pour chaque colonne
- Organise les informations en lignes

## Ta Mission:
Crée un reçu qui montre:
1. Un **en-tête** avec le nom du magasin
2. Un **tableau** avec: Article | Qté | Prix | Total
3. Une **ligne de séparation** en bas
4. La **FACTURE TOTALE**

**Complète cette étape avant de débloquer l'Étape 6.**`,
      starterCode: `# ========================================
# ÉTAPE 1: PRÉPARER LE MAGASIN 🏪
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Bienvenue au Supermarché KiddyKode!")
print("")

# ========================================
# ÉTAPE 2: PRENDRE LES COMMANDES 🛒
# ========================================
apple_qty = int(input("Combien de pommes? "))
mambo_qty = int(input("Combien de mambo? "))
cake_qty = int(input("Combien de gâteaux? "))

# ========================================
# ÉTAPE 3: CALCULER LES SOUS-TOTAUX 🧮
# ========================================
cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

# ========================================
# ÉTAPE 4: CALCULER LA FACTURE TOTALE 💰
# ========================================
total_cost = cost_of_apples + cost_of_mambo + cost_of_cake
total_quantity = apple_qty + mambo_qty + cake_qty

# ========================================
# ÉTAPE 5: IMPRIMER UN REÇU 🧾
# ========================================

# Imprime l'en-tête du reçu
print("=" * 40)
print("   SUPERMARCHÉ KIDDYKODE")
print("   Ton Magasin Préféré!")
print("=" * 40)

# Imprime les en-têtes des colonnes
# Indice: print("Article", "Qté", "Prix", "Total")
# Écris tes en-têtes ici

# Imprime les détails de chaque article
# Exemple: print("Pomme", apple_qty, apple_price, cost_of_apples)
# Écris les détails des 3 articles ici

# Imprime le total
print("=" * 40)
# Écris la ligne FACTURE TOTALE ici
print("=" * 40)
print("Merci pour vos achats!")
`,
      codeHints: [
        '💡 Utilise print() avec plusieurs éléments séparés par des virgules',
        '💡 Exemple: print("Pomme", apple_qty, apple_price, cost_of_apples)',
        '💡 "=" * 40 crée un séparateur: ========================================',
        '💡 N\'oublie pas les en-têtes: Article, Qté, Prix, Total'
      ],
      expectedLogic: [
        'Imprimer l\'en-tête du reçu avec le nom du magasin',
        'Imprimer les en-têtes des colonnes',
        'Imprimer les détails des pommes, mambo et gâteau',
        'Imprimer la facture totale avec les lignes de séparation'
      ],
      whatYouLearned: '🎯 Tu as appris à **formater la sortie** pour la rendre professionnelle et organisée!',
      successCheck: '✅ Ton reçu montre un en-tête, un tableau d\'articles et la facture totale.',
      motivation: '🚀 WOW! Ça ressemble à un vrai reçu! Tu deviens un vrai programmeur!',
      celebration: 'Étape 5 Terminée! Ton reçu est magnifique! 🧾'
    }
  },
  {
    id: 'step-6',
    title: 'Step 6 – Processing Payment',
    titleFr: 'Étape 6 – Traiter le Paiement',
    type: 'coding',
    content: {
      introduction: `# 💳 Step 6: Processing Payment

The customer has their receipt. Now they need to **pay**! Your computer must:
- Ask how much money the customer is paying
- Check if it's **enough**, **exact**, or **not enough**
- Calculate the **change** if they paid more

## Conditional Statements (if / elif / else):
\`\`\`python
if payment > total_cost:
    print("Here is your change!")
elif payment == total_cost:
    print("Exact payment!")
else:
    print("Not enough money!")
\`\`\`

## Your Task:
1. Ask for the **customer's payment** (integer)
2. Use **if / elif / else** to check the payment
3. Calculate and show the **change**

**Complete this step before unlocking Step 7.**`,
      starterCode: `# ========================================
# STEPS 1-5: PREVIOUS CODE 🏪🛒🧮💰🧾
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Welcome to KiddyKode Supermarket!")
print("")

apple_qty = int(input("How many apples? "))
mambo_qty = int(input("How many mambo? "))
cake_qty = int(input("How many cakes? "))

cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

total_cost = cost_of_apples + cost_of_mambo + cost_of_cake
total_quantity = apple_qty + mambo_qty + cake_qty

# Receipt
print("=" * 40)
print("   KIDDYKODE SUPERMARKET")
print("=" * 40)
print("Item", "Qty", "Price", "Total")
print("-" * 40)
print("Apple", apple_qty, apple_price, cost_of_apples)
print("Mambo", mambo_qty, mambo_price, cost_of_mambo)
print("Cake", cake_qty, cake_price, cost_of_cake)
print("=" * 40)
print("TOTAL BILL:", total_cost)
print("=" * 40)

# ========================================
# STEP 6: PROCESSING PAYMENT 💳
# ========================================

# Ask for the customer's payment
# Use int(input()) just like in Step 2!
customer_payment = # Ask how much the customer is paying

# Check the payment using if / elif / else
# If payment is MORE than total: calculate change
# If payment EQUALS total: say "Exact payment!"
# If payment is LESS than total: say "Not enough!"

# Write your if/elif/else code here:

`,
      codeHints: [
        '💡 Use int(input("How much are you paying? ")) to get payment',
        '💡 Compare with: > (greater than), == (equal to), < (less than)',
        '💡 Change = customer_payment - total_cost',
        '💡 Use if/elif/else to handle all three cases'
      ],
      expectedLogic: [
        'Get customer_payment using int(input())',
        'Use if to check if payment > total_cost',
        'Use elif to check if payment == total_cost',
        'Use else for insufficient payment',
        'Calculate and display change when overpaid'
      ],
      whatYouLearned: '🎯 You learned **conditional statements (if/elif/else)** and how to compare values!',
      successCheck: '✅ Your program handles all three payment scenarios correctly.',
      motivation: '🚀 Your cashier system is almost complete! You\'re handling money like a pro!',
      celebration: 'Step 6 Complete! Payment processing works! 💳'
    },
    contentFr: {
      introduction: `# 💳 Étape 6: Traiter le Paiement

Le client a son reçu. Maintenant il doit **payer**! Ton ordinateur doit:
- Demander combien d'argent le client paie
- Vérifier si c'est **assez**, **exact**, ou **pas assez**
- Calculer la **monnaie** s'il a payé plus

## Instructions Conditionnelles (if / elif / else):
\`\`\`python
if paiement > cout_total:
    print("Voici votre monnaie!")
elif paiement == cout_total:
    print("Paiement exact!")
else:
    print("Pas assez d'argent!")
\`\`\`

## Ta Mission:
1. Demande le **paiement du client** (entier)
2. Utilise **if / elif / else** pour vérifier le paiement
3. Calcule et affiche la **monnaie**

**Complète cette étape avant de débloquer l'Étape 7.**`,
      starterCode: `# ========================================
# ÉTAPES 1-5: CODE PRÉCÉDENT 🏪🛒🧮💰🧾
# ========================================
apple_price = 500
mambo_price = 200
cake_price = 1500

print("Bienvenue au Supermarché KiddyKode!")
print("")

apple_qty = int(input("Combien de pommes? "))
mambo_qty = int(input("Combien de mambo? "))
cake_qty = int(input("Combien de gâteaux? "))

cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

total_cost = cost_of_apples + cost_of_mambo + cost_of_cake
total_quantity = apple_qty + mambo_qty + cake_qty

# Reçu
print("=" * 40)
print("   SUPERMARCHÉ KIDDYKODE")
print("=" * 40)
print("Article", "Qté", "Prix", "Total")
print("-" * 40)
print("Pomme", apple_qty, apple_price, cost_of_apples)
print("Mambo", mambo_qty, mambo_price, cost_of_mambo)
print("Gâteau", cake_qty, cake_price, cost_of_cake)
print("=" * 40)
print("FACTURE TOTALE:", total_cost)
print("=" * 40)

# ========================================
# ÉTAPE 6: TRAITER LE PAIEMENT 💳
# ========================================

# Demande le paiement du client
# Utilise int(input()) comme à l'Étape 2!
customer_payment = # Demande combien le client paie

# Vérifie le paiement avec if / elif / else
# Si paiement PLUS que total: calcule la monnaie
# Si paiement ÉGAL au total: dis "Paiement exact!"
# Si paiement MOINS que total: dis "Pas assez!"

# Écris ton code if/elif/else ici:

`,
      codeHints: [
        '💡 Utilise int(input("Combien payez-vous? ")) pour obtenir le paiement',
        '💡 Compare avec: > (supérieur), == (égal), < (inférieur)',
        '💡 Monnaie = customer_payment - total_cost',
        '💡 Utilise if/elif/else pour gérer les trois cas'
      ],
      expectedLogic: [
        'Obtenir customer_payment avec int(input())',
        'Utiliser if pour vérifier si paiement > total_cost',
        'Utiliser elif pour vérifier si paiement == total_cost',
        'Utiliser else pour paiement insuffisant',
        'Calculer et afficher la monnaie si trop payé'
      ],
      whatYouLearned: '🎯 Tu as appris les **instructions conditionnelles (if/elif/else)** et comment comparer des valeurs!',
      successCheck: '✅ Ton programme gère correctement les trois scénarios de paiement.',
      motivation: '🚀 Ton système de caisse est presque complet! Tu gères l\'argent comme un pro!',
      celebration: 'Étape 6 Terminée! Le traitement du paiement fonctionne! 💳'
    }
  },
  {
    id: 'step-7',
    title: 'Step 7 – Final Professional Receipt',
    titleFr: 'Étape 7 – Reçu Professionnel Final',
    type: 'coding',
    content: {
      introduction: `# 🎉 Step 7: The Final Professional Receipt!

This is it! The **last step**! Let's make your receipt look truly professional by adding:
- Payment information
- Change display
- A thank you message
- A clean, structured layout

## Your Task:
Put it all together into one beautiful, complete program! Add the finishing touches to make your receipt look like it came from a **real supermarket**.

When you're done, you'll have built the **brain of a supermarket cashier system**! 🧠`,
      starterCode: `# ========================================
#    KIDDYKODE SUPERMARKET SYSTEM
#    The Complete Cashier Program! 🏪
# ========================================

# STEP 1: Store Prices
apple_price = 500
mambo_price = 200
cake_price = 1500

print("=" * 40)
print("  Welcome to KiddyKode Supermarket!")
print("         Your Friendly Store!")
print("=" * 40)
print("\\nToday's Prices:")
print("  Apple:", apple_price)
print("  Mambo:", mambo_price)
print("  Cake:", cake_price)
print("")

# STEP 2: Customer Orders
apple_qty = int(input("How many apples? "))
mambo_qty = int(input("How many mambo? "))
cake_qty = int(input("How many cakes? "))

# STEP 3: Subtotals
cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

# STEP 4: Total
total_cost = cost_of_apples + cost_of_mambo + cost_of_cake
total_quantity = apple_qty + mambo_qty + cake_qty

# STEP 5: Receipt
print("\\n" + "=" * 40)
print("      KIDDYKODE SUPERMARKET")
print("        OFFICIAL RECEIPT")
print("=" * 40)
print("Item      Qty    Price    Total")
print("-" * 40)
print("Apple    ", apple_qty, "   ", apple_price, "   ", cost_of_apples)
print("Mambo    ", mambo_qty, "   ", mambo_price, "   ", cost_of_mambo)
print("Cake     ", cake_qty, "   ", cake_price, "   ", cost_of_cake)
print("-" * 40)
print("Total Items:", total_quantity)
print("TOTAL BILL:", total_cost)
print("=" * 40)

# STEP 6: Payment
customer_payment = int(input("\\nPayment amount: "))

if customer_payment > total_cost:
    change = customer_payment - total_cost
    print("Payment received:", customer_payment)
    print("Your change:", change)
elif customer_payment == total_cost:
    print("Payment received:", customer_payment)
    print("Exact payment - no change needed!")
else:
    shortfall = total_cost - customer_payment
    print("Not enough! You still owe:", shortfall)

# ========================================
# STEP 7: FINAL TOUCHES 🎉
# ========================================

# Add a professional footer to the receipt:
# 1. Print a divider line
# 2. Print "PAYMENT:" and the amount paid
# 3. Print "CHANGE:" and the change amount (if any)
# 4. Print a thank you message
# 5. Print the store's motto or slogan

# Write your final receipt footer here:

`,
      codeHints: [
        '💡 Use print("=" * 40) to create clean dividers',
        '💡 Add a thank you message like: print("Thank you for shopping with us!")',
        '💡 Add a fun slogan: print("Come back soon! 😊")',
        '💡 Make it look clean and professional!'
      ],
      expectedLogic: [
        'Print payment information section',
        'Print change information',
        'Print thank you message',
        'Print store slogan or closing message'
      ],
      whatYouLearned: '🎯 You learned how to build a **complete program** from start to finish by combining: variables, input, math, formatting, and conditionals!',
      successCheck: '✅ Your full supermarket receipt system runs from start to finish!',
      motivation: '🎉 **YOU HAVE JUST BUILT THE BRAIN OF A SUPERMARKET CASHIER SYSTEM!** You are now a real programmer! 🧠💻',
      celebration: '🎉 PROJECT COMPLETE! You built a real supermarket cashier system from scratch! You are a coding superstar! ⭐'
    },
    contentFr: {
      introduction: `# 🎉 Étape 7: Le Reçu Professionnel Final!

C'est le moment! La **dernière étape**! Rendons ton reçu vraiment professionnel en ajoutant:
- Les informations de paiement
- L'affichage de la monnaie
- Un message de remerciement
- Une mise en page propre et structurée

## Ta Mission:
Assemble tout en un seul beau programme complet! Ajoute les touches finales pour que ton reçu ressemble à celui d'un **vrai supermarché**.

Quand tu auras fini, tu auras construit le **cerveau d'un système de caisse de supermarché**! 🧠`,
      starterCode: `# ========================================
#    SUPERMARCHÉ KIDDYKODE
#    Le Programme de Caisse Complet! 🏪
# ========================================

# ÉTAPE 1: Prix du Magasin
apple_price = 500
mambo_price = 200
cake_price = 1500

print("=" * 40)
print("  Bienvenue au Supermarché KiddyKode!")
print("       Ton Magasin Préféré!")
print("=" * 40)
print("\\nPrix du jour:")
print("  Pomme:", apple_price)
print("  Mambo:", mambo_price)
print("  Gâteau:", cake_price)
print("")

# ÉTAPE 2: Commandes du Client
apple_qty = int(input("Combien de pommes? "))
mambo_qty = int(input("Combien de mambo? "))
cake_qty = int(input("Combien de gâteaux? "))

# ÉTAPE 3: Sous-totaux
cost_of_apples = apple_price * apple_qty
cost_of_mambo = mambo_price * mambo_qty
cost_of_cake = cake_price * cake_qty

# ÉTAPE 4: Total
total_cost = cost_of_apples + cost_of_mambo + cost_of_cake
total_quantity = apple_qty + mambo_qty + cake_qty

# ÉTAPE 5: Reçu
print("\\n" + "=" * 40)
print("      SUPERMARCHÉ KIDDYKODE")
print("        REÇU OFFICIEL")
print("=" * 40)
print("Article   Qté    Prix    Total")
print("-" * 40)
print("Pomme    ", apple_qty, "   ", apple_price, "   ", cost_of_apples)
print("Mambo    ", mambo_qty, "   ", mambo_price, "   ", cost_of_mambo)
print("Gâteau   ", cake_qty, "   ", cake_price, "   ", cost_of_cake)
print("-" * 40)
print("Total Articles:", total_quantity)
print("FACTURE TOTALE:", total_cost)
print("=" * 40)

# ÉTAPE 6: Paiement
customer_payment = int(input("\\nMontant du paiement: "))

if customer_payment > total_cost:
    change = customer_payment - total_cost
    print("Paiement reçu:", customer_payment)
    print("Votre monnaie:", change)
elif customer_payment == total_cost:
    print("Paiement reçu:", customer_payment)
    print("Paiement exact - pas de monnaie!")
else:
    shortfall = total_cost - customer_payment
    print("Pas assez! Vous devez encore:", shortfall)

# ========================================
# ÉTAPE 7: TOUCHES FINALES 🎉
# ========================================

# Ajoute un pied de page professionnel au reçu:
# 1. Imprime une ligne de séparation
# 2. Imprime "PAIEMENT:" et le montant payé
# 3. Imprime "MONNAIE:" et le montant de la monnaie (si applicable)
# 4. Imprime un message de remerciement
# 5. Imprime le slogan du magasin

# Écris ton pied de page final ici:

`,
      codeHints: [
        '💡 Utilise print("=" * 40) pour créer des séparateurs propres',
        '💡 Ajoute un message de remerciement: print("Merci pour vos achats!")',
        '💡 Ajoute un slogan amusant: print("À bientôt! 😊")',
        '💡 Fais en sorte que ce soit propre et professionnel!'
      ],
      expectedLogic: [
        'Imprimer la section information de paiement',
        'Imprimer l\'information de la monnaie',
        'Imprimer un message de remerciement',
        'Imprimer un slogan ou message de clôture'
      ],
      whatYouLearned: '🎯 Tu as appris à construire un **programme complet** du début à la fin en combinant: variables, entrées, calculs, formatage et conditions!',
      successCheck: '✅ Ton système complet de reçu de supermarché fonctionne du début à la fin!',
      motivation: '🎉 **TU VIENS DE CONSTRUIRE LE CERVEAU D\'UN SYSTÈME DE CAISSE DE SUPERMARCHÉ!** Tu es maintenant un vrai programmeur! 🧠💻',
      celebration: '🎉 PROJET TERMINÉ! Tu as construit un vrai système de caisse de supermarché à partir de zéro! Tu es une superstar du code! ⭐'
    }
  }
];

supermarketProject.phases = supermarketSteps;
