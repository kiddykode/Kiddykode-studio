export interface ValidationRule {
  pattern: string;
  message: string;
  messageFr: string;
}

export interface SupermarketStep {
  id: string;
  title: string;
  titleFr: string;
  type: 'learning' | 'coding' | 'celebration' | 'review';
  content: StepContent;
  contentFr: StepContent;
}

export interface StepContent {
  introduction: string;
  starterCode?: string;
  codeHints?: string[];
  expectedLogic?: string[];
  validationRules?: ValidationRule[];
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
      validationRules: [
        { pattern: 'apple_price\\s*=\\s*\\d+', message: 'Set apple_price to a number (e.g., apple_price = 500)', messageFr: 'Définis apple_price avec un nombre (ex: apple_price = 500)' },
        { pattern: 'mambo_price\\s*=\\s*\\d+', message: 'Set mambo_price to a number (e.g., mambo_price = 200)', messageFr: 'Définis mambo_price avec un nombre (ex: mambo_price = 200)' },
        { pattern: 'cake_price\\s*=\\s*\\d+', message: 'Set cake_price to a number (e.g., cake_price = 1500)', messageFr: 'Définis cake_price avec un nombre (ex: cake_price = 1500)' },
        { pattern: 'print\\s*\\(', message: 'Add at least one print() statement', messageFr: 'Ajoute au moins un print()' }
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
# Exemple: apple_price = 500

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
      validationRules: [
        { pattern: 'apple_price\\s*=\\s*\\d+', message: 'Set apple_price to a number (e.g., apple_price = 500)', messageFr: 'Définis apple_price avec un nombre (ex: apple_price = 500)' },
        { pattern: 'mambo_price\\s*=\\s*\\d+', message: 'Set mambo_price to a number (e.g., mambo_price = 200)', messageFr: 'Définis mambo_price avec un nombre (ex: mambo_price = 200)' },
        { pattern: 'cake_price\\s*=\\s*\\d+', message: 'Set cake_price to a number (e.g., cake_price = 1500)', messageFr: 'Définis cake_price avec un nombre (ex: cake_price = 1500)' },
        { pattern: 'print\\s*\\(', message: 'Add at least one print() statement', messageFr: 'Ajoute au moins un print()' }
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
print("Your order:")
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
      validationRules: [
        { pattern: 'apple_qty\\s*=\\s*int\\s*\\(\\s*input\\s*\\(', message: 'Use int(input()) for apple_qty', messageFr: 'Utilise int(input()) pour apple_qty' },
        { pattern: 'mambo_qty\\s*=\\s*int\\s*\\(\\s*input\\s*\\(', message: 'Use int(input()) for mambo_qty', messageFr: 'Utilise int(input()) pour mambo_qty' },
        { pattern: 'cake_qty\\s*=\\s*int\\s*\\(\\s*input\\s*\\(', message: 'Use int(input()) for cake_qty', messageFr: 'Utilise int(input()) pour cake_qty' }
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
print("Ta commande:")
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
      validationRules: [
        { pattern: 'apple_qty\\s*=\\s*int\\s*\\(\\s*input\\s*\\(', message: 'Use int(input()) for apple_qty', messageFr: 'Utilise int(input()) pour apple_qty' },
        { pattern: 'mambo_qty\\s*=\\s*int\\s*\\(\\s*input\\s*\\(', message: 'Use int(input()) for mambo_qty', messageFr: 'Utilise int(input()) pour mambo_qty' },
        { pattern: 'cake_qty\\s*=\\s*int\\s*\\(\\s*input\\s*\\(', message: 'Use int(input()) for cake_qty', messageFr: 'Utilise int(input()) pour cake_qty' }
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
# STEP 3: CALCULATING SUBTOTALS 🧮
# ========================================

# Calculate the cost for each item
# Formula: cost = price * quantity

cost_of_apples = # Calculate apple cost
cost_of_mambo = # Calculate mambo cost
cost_of_cake = # Calculate cake cost

# Print the subtotals
print("Subtotals:")
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
      validationRules: [
        { pattern: 'cost_of_apples\\s*=\\s*apple_price\\s*\\*\\s*apple_qty', message: 'Calculate cost_of_apples = apple_price * apple_qty', messageFr: 'Calcule cost_of_apples = apple_price * apple_qty' },
        { pattern: 'cost_of_mambo\\s*=\\s*mambo_price\\s*\\*\\s*mambo_qty', message: 'Calculate cost_of_mambo = mambo_price * mambo_qty', messageFr: 'Calcule cost_of_mambo = mambo_price * mambo_qty' },
        { pattern: 'cost_of_cake\\s*=\\s*cake_price\\s*\\*\\s*cake_qty', message: 'Calculate cost_of_cake = cake_price * cake_qty', messageFr: 'Calcule cost_of_cake = cake_price * cake_qty' }
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
# ÉTAPE 3: CALCULER LES SOUS-TOTAUX 🧮
# ========================================

# Calcule le coût de chaque article
# Formule: coût = prix * quantité

cost_of_apples = # Calcule le coût des pommes
cost_of_mambo = # Calcule le coût des mambo
cost_of_cake = # Calcule le coût du gâteau

# Affiche les sous-totaux
print("Sous-totaux:")
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
      validationRules: [
        { pattern: 'cost_of_apples\\s*=\\s*apple_price\\s*\\*\\s*apple_qty', message: 'Calculate cost_of_apples = apple_price * apple_qty', messageFr: 'Calcule cost_of_apples = apple_price * apple_qty' },
        { pattern: 'cost_of_mambo\\s*=\\s*mambo_price\\s*\\*\\s*mambo_qty', message: 'Calculate cost_of_mambo = mambo_price * mambo_qty', messageFr: 'Calcule cost_of_mambo = mambo_price * mambo_qty' },
        { pattern: 'cost_of_cake\\s*=\\s*cake_price\\s*\\*\\s*cake_qty', message: 'Calculate cost_of_cake = cake_price * cake_qty', messageFr: 'Calcule cost_of_cake = cake_price * cake_qty' }
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
# STEP 4: CALCULATING TOTAL BILL 💰
# ========================================

# Add up all the subtotals to get the total bill
total_cost = # Add all three costs together

# Add up all the quantities
total_quantity = # Add all three quantities together

# Display the totals
print("=" * 40)
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
      validationRules: [
        { pattern: 'total_cost\\s*=', message: 'Define total_cost by adding all three costs together', messageFr: 'Définis total_cost en additionnant les trois coûts' },
        { pattern: 'total_quantity\\s*=', message: 'Define total_quantity by adding all three quantities together', messageFr: 'Définis total_quantity en additionnant les trois quantités' }
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
# ÉTAPE 4: CALCULER LA FACTURE TOTALE 💰
# ========================================

# Additionne tous les sous-totaux pour obtenir la facture totale
total_cost = # Additionne les trois coûts

# Additionne toutes les quantités
total_quantity = # Additionne les trois quantités

# Affiche les totaux
print("=" * 40)
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
      validationRules: [
        { pattern: 'total_cost\\s*=', message: 'Define total_cost by adding all three costs together', messageFr: 'Définis total_cost en additionnant les trois coûts' },
        { pattern: 'total_quantity\\s*=', message: 'Define total_quantity by adding all three quantities together', messageFr: 'Définis total_quantity en additionnant les trois quantités' }
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
      validationRules: [
        { pattern: 'print\\s*\\(.*[Ii]tem|print\\s*\\(.*[Aa]rticle', message: 'Print column headers (Item, Qty, Price, Total)', messageFr: 'Imprime les en-têtes des colonnes (Article, Qté, Prix, Total)' },
        { pattern: 'print\\s*\\(.*apple_qty|print\\s*\\(.*Apple|print\\s*\\(.*Pomme', message: 'Print details for each item (Apple, Mambo, Cake)', messageFr: 'Imprime les détails de chaque article' },
        { pattern: 'print\\s*\\(.*[Tt]otal|print\\s*\\(.*[Ff]acture', message: 'Print the TOTAL BILL line', messageFr: 'Imprime la ligne FACTURE TOTALE' }
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
      validationRules: [
        { pattern: 'print\\s*\\(.*[Ii]tem|print\\s*\\(.*[Aa]rticle', message: 'Print column headers (Item, Qty, Price, Total)', messageFr: 'Imprime les en-têtes des colonnes (Article, Qté, Prix, Total)' },
        { pattern: 'print\\s*\\(.*apple_qty|print\\s*\\(.*Apple|print\\s*\\(.*Pomme', message: 'Print details for each item (Apple, Mambo, Cake)', messageFr: 'Imprime les détails de chaque article' },
        { pattern: 'print\\s*\\(.*[Tt]otal|print\\s*\\(.*[Ff]acture', message: 'Print the TOTAL BILL line', messageFr: 'Imprime la ligne FACTURE TOTALE' }
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
      validationRules: [
        { pattern: 'customer_payment\\s*=\\s*int\\s*\\(\\s*input', message: 'Ask for payment using int(input())', messageFr: 'Demande le paiement avec int(input())' },
        { pattern: '\\bif\\b.*customer_payment|\\bif\\b.*total_cost', message: 'Use an if statement to check the payment', messageFr: 'Utilise un if pour vérifier le paiement' },
        { pattern: '\\belif\\b|\\belse\\b', message: 'Use elif or else for other payment cases', messageFr: 'Utilise elif ou else pour les autres cas' }
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
      validationRules: [
        { pattern: 'customer_payment\\s*=\\s*int\\s*\\(\\s*input', message: 'Ask for payment using int(input())', messageFr: 'Demande le paiement avec int(input())' },
        { pattern: '\\bif\\b.*customer_payment|\\bif\\b.*total_cost', message: 'Use an if statement to check the payment', messageFr: 'Utilise un if pour vérifier le paiement' },
        { pattern: '\\belif\\b|\\belse\\b', message: 'Use elif or else for other payment cases', messageFr: 'Utilise elif ou else pour les autres cas' }
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

This is it! The **last coding step**! Let's make your receipt look truly professional by adding:
- Payment information display
- Change display
- A thank you message
- A clean, structured layout

## Your Task:
Add the finishing touches to make your receipt look like it came from a **real supermarket**:
1. Print a divider line
2. Print "PAYMENT:" and the amount paid
3. Print "CHANGE:" and the change amount (if any)
4. Print a thank you message
5. Print the store's motto or slogan

When you're done, you'll have built the **brain of a supermarket cashier system**! 🧠`,
      starterCode: `# ========================================
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
        '💡 Add: print("PAYMENT:", customer_payment)',
        '💡 Add a thank you message like: print("Thank you for shopping with us!")',
        '💡 Add a fun slogan: print("Come back soon! 😊")'
      ],
      validationRules: [
        { pattern: 'print\\s*\\(.*[Pp]ayment|print\\s*\\(.*[Pp]aiement', message: 'Print the payment amount', messageFr: 'Affiche le montant du paiement' },
        { pattern: 'print\\s*\\(.*[Tt]hank|print\\s*\\(.*[Mm]erci', message: 'Add a thank you message', messageFr: 'Ajoute un message de remerciement' }
      ],
      whatYouLearned: '🎯 You learned how to build a **complete program** from start to finish by combining: variables, input, math, formatting, and conditionals!',
      successCheck: '✅ Your full supermarket receipt system runs from start to finish!',
      motivation: '🚀 Almost there! One more step to see your complete masterpiece!',
      celebration: 'Step 7 Complete! Your receipt footer is perfect! 🎉'
    },
    contentFr: {
      introduction: `# 🎉 Étape 7: Le Reçu Professionnel Final!

C'est le moment! La **dernière étape de code**! Rendons ton reçu vraiment professionnel en ajoutant:
- L'affichage du paiement
- L'affichage de la monnaie
- Un message de remerciement
- Une mise en page propre et structurée

## Ta Mission:
Ajoute les touches finales pour que ton reçu ressemble à celui d'un **vrai supermarché**:
1. Imprime une ligne de séparation
2. Imprime "PAIEMENT:" et le montant payé
3. Imprime "MONNAIE:" et le montant de la monnaie (si applicable)
4. Imprime un message de remerciement
5. Imprime le slogan du magasin

Quand tu auras fini, tu auras construit le **cerveau d'un système de caisse de supermarché**! 🧠`,
      starterCode: `# ========================================
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
        '💡 Ajoute: print("PAIEMENT:", customer_payment)',
        '💡 Ajoute un message de remerciement: print("Merci pour vos achats!")',
        '💡 Ajoute un slogan amusant: print("À bientôt! 😊")'
      ],
      validationRules: [
        { pattern: 'print\\s*\\(.*[Pp]ayment|print\\s*\\(.*[Pp]aiement', message: 'Print the payment amount', messageFr: 'Affiche le montant du paiement' },
        { pattern: 'print\\s*\\(.*[Tt]hank|print\\s*\\(.*[Mm]erci', message: 'Add a thank you message', messageFr: 'Ajoute un message de remerciement' }
      ],
      whatYouLearned: '🎯 Tu as appris à construire un **programme complet** du début à la fin en combinant: variables, entrées, calculs, formatage et conditions!',
      successCheck: '✅ Ton système complet de reçu de supermarché fonctionne du début à la fin!',
      motivation: '🚀 Presque fini! Encore une étape pour voir ton chef-d\'œuvre complet!',
      celebration: 'Étape 7 Terminée! Ton pied de page est parfait! 🎉'
    }
  },
  {
    id: 'step-8',
    title: 'Step 8 – Your Complete Program!',
    titleFr: 'Étape 8 – Ton Programme Complet!',
    type: 'review',
    content: {
      introduction: `# 🎉 Your Complete Supermarket Program!

**Congratulations!** Here is the **full program** you built step by step!

Review your code below — this is YOUR creation! Every line was written by YOU!

Click **"Run My Program"** to see your complete supermarket cashier system in action!

🧠 **You have just built the brain of a supermarket cashier system!**`,
      whatYouLearned: `🎯 You built a **complete program** from scratch using:
- **Variables** to store prices
- **input()** to get user data
- **Math** to calculate costs
- **Formatting** to create a receipt
- **Conditionals** to handle payments

You are now a real programmer! 🧠💻`,
      successCheck: '✅ Your full supermarket receipt system runs from start to finish!',
      motivation: '🎉 **YOU HAVE JUST BUILT THE BRAIN OF A SUPERMARKET CASHIER SYSTEM!** You are a coding superstar! ⭐',
      celebration: '🎉 PROJECT COMPLETE! You built a real supermarket cashier system from scratch! You are a coding superstar! ⭐'
    },
    contentFr: {
      introduction: `# 🎉 Ton Programme Complet de Supermarché!

**Félicitations!** Voici le **programme complet** que tu as construit étape par étape!

Regarde ton code ci-dessous — c'est TA création! Chaque ligne a été écrite par TOI!

Clique sur **"Exécuter Mon Programme"** pour voir ton système de caisse complet en action!

🧠 **Tu viens de construire le cerveau d'un système de caisse de supermarché!**`,
      whatYouLearned: `🎯 Tu as construit un **programme complet** à partir de zéro en utilisant:
- Des **variables** pour stocker les prix
- **input()** pour obtenir des données
- Les **maths** pour calculer les coûts
- Le **formatage** pour créer un reçu
- Les **conditions** pour gérer les paiements

Tu es maintenant un vrai programmeur! 🧠💻`,
      successCheck: '✅ Ton système complet de reçu de supermarché fonctionne du début à la fin!',
      motivation: '🎉 **TU VIENS DE CONSTRUIRE LE CERVEAU D\'UN SYSTÈME DE CAISSE DE SUPERMARCHÉ!** Tu es une superstar du code! ⭐',
      celebration: '🎉 PROJET TERMINÉ! Tu as construit un vrai système de caisse de supermarché à partir de zéro! Tu es une superstar du code! ⭐'
    }
  }
];

supermarketProject.phases = supermarketSteps;
