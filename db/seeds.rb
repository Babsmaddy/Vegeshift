# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Cleaning the db"
Ingredient.destroy_all
Recipe.destroy_all
RecipeIngredient.destroy_all

# Seed ingredients with CO2 data (fictitious)
ingredients = [
{ name: "Abricot", co2: 20 },
{ name: "Ail", co2: 5 },
{ name: "Amandes", co2: 150 },
{ name: "Ananas", co2: 60 },
{ name: "Artichaut", co2: 40 },
{ name: "Asperge", co2: 25 },
{ name: "Aubergine", co2: 20 },
{ name: "Avocat", co2: 180 },
{ name: "Banane", co2: 80 },
{ name: "Basilic", co2: 10 },
{ name: "Betterave", co2: 30 },
{ name: "Beurre", co2: 120 },
{ name: "Blette", co2: 15 },
{ name: "Boeuf", co2: 300 },
{ name: "Brocoli", co2: 25 },
{ name: "Carambole", co2: 50 },
{ name: "Carotte", co2: 25 },
{ name: "Cassis", co2: 40 },
{ name: "Céleri", co2: 20 },
{ name: "Cerise", co2: 60 },
{ name: "Champignon", co2: 15 },
{ name: "Châtaigne", co2: 50 },
{ name: "Cheddar", co2: 200 },
{ name: "Chou", co2: 15 },
{ name: "Chou de Bruxelles", co2: 25 },
{ name: "Chou fleur", co2: 20 },
{ name: "Clémentine", co2: 35 },
{ name: "Concombre", co2: 10 },
{ name: "Courge", co2: 30 },
{ name: "Courgette", co2: 15 },
{ name: "Cresson", co2: 10 },
{ name: "Curry", co2: 70 },
{ name: "Datte", co2: 150 },
{ name: "Échalote", co2: 10 },
{ name: "Épices", co2: 100 },
{ name: "Épinard", co2: 10 },
{ name: "Farine", co2: 70 },
{ name: "Fenouil", co2: 20 },
{ name: "Fraise", co2: 60 },
{ name: "Framboise", co2: 60 },
{ name: "Fromage", co2: 200 },
{ name: "Fruit de la passion", co2: 80 },
{ name: "Grenade", co2: 70 },
{ name: "Groseille", co2: 50 },
{ name: "Haricot vert", co2: 20 },
{ name: "Haricots rouges", co2: 80 },
{ name: "Kaki", co2: 60 },
{ name: "Kiwi", co2: 50 },
{ name: "Lait", co2: 60 },
{ name: "Laitue", co2: 15 },
{ name: "Lentilles", co2: 50 },
{ name: "Mâche", co2: 10 },
{ name: "Mandarine", co2: 35 },
{ name: "Mangue", co2: 70 },
{ name: "Melon", co2: 40 },
{ name: "Myrtilles", co2: 80 },
{ name: "Navet", co2: 20 },
{ name: "Noisette", co2: 200 },
{ name: "Noix de cajou", co2: 250 },
{ name: "Noix de coco", co2: 70 },
{ name: "Noix de pécan", co2: 200 },
{ name: "Oeufs", co2: 60 },
{ name: "Oignon", co2: 15 },
{ name: "Pamplemousse", co2: 40 },
{ name: "Panais", co2: 25 },
{ name: "Pastèque", co2: 15 },
{ name: "Pâtes", co2: 50 },
{ name: "Pêche", co2: 30 },
{ name: "Petit pois", co2: 40 },
{ name: "Poire", co2: 30 },
{ name: "Poireau", co2: 20 },
{ name: "Pois chiches", co2: 70 },
{ name: "Poisson", co2: 250 },
{ name: "Poivron", co2: 20 },
{ name: "Pomme", co2: 25 },
{ name: "Pomme de terre", co2: 30 },
{ name: "Potiron", co2: 20 },
{ name: "Poulet", co2: 200 },
{ name: "Radis", co2: 10 },
{ name: "Rhubarbe", co2: 25 },
{ name: "Riz", co2: 80 },
{ name: "Salsifis", co2: 30 },
{ name: "Skyr", co2: 80 },
{ name: "Sucre", co2: 90 },
{ name: "Tofu", co2: 40 },
{ name: "Tomate", co2: 20 },
{ name: "Topinambour", co2: 25 },
{ name: "Veau", co2: 250 },
{ name: "Yaourt", co2: 60 }
]

ingredients.each do |ingredient|
  Ingredient.create!(name: ingredient[:name], co2: ingredient[:co2])
end

puts "#{ingredients.size} ingrédients ont été créés avec succès !"


# # Seed recipes
recipes = [
{ name:  "Tarte aux abricots", time: 30, difficulty: 1, cost: 3, vegetal: true, co2: 100, ingredients: ["abricots", "beurre", "farine", "sucre"] },
{ name:  "Poulet aux carottes", time: 45, difficulty: 1, cost: 1, vegetal: false, co2: 600, ingredients: ["poulet", " carottes", " ail", " épices"] },
{ name:  "Velouté de courgettes", time: 20, difficulty: 2, cost: 2, vegetal: true, co2: 80, ingredients: ["Courgettes", " basilic", " lait"] },
{ name:  "Ratatouille", time: 10, difficulty: 1, cost: 1, vegetal: true, co2: 120, ingredients: ["Aubergines", " courgettes", " poivrons", " tomates"] },
{ name:  "Gratin de brocolis", time: 30, difficulty: 3, cost: 2, vegetal: true, co2: 100, ingredients: ["Brocolis", " fromage", " crème"] },
{ name:  "Curry de pois chiches", time: 45, difficulty: 2, cost: 1, vegetal: true, co2: 200, ingredients: ["Pois chiches", " lait de coco", " curry"] },
{ name:  "Salade d'avocat et grenade", time: 20, difficulty: 3, cost: 3, vegetal: true, co2: 200, ingredients: ["Avocat", " grenade", " laitue"] },
{ name:  "Soupe de carottes", time: 10, difficulty: 1, cost: 1, vegetal: true, co2: 30, ingredients: ["Carottes", " oignon", " épices"] },
{ name:  "Pizza aux légumes", time: 60, difficulty: 3, cost: 2, vegetal: true, co2: 100, ingredients: ["Aubergines", " courgettes", " tomates", " fromage"] },
{ name:  "Poêlée de champignons et épinards", time: 120, difficulty: 2, cost: 3, vegetal: true, co2: 60, ingredients: ["Champignons", " épinards", " ail"] },
{ name:  "Poulet au curry", time: 45, difficulty: 2, cost: 1, vegetal: false, co2: 550, ingredients: ["Poulet", " curry", " lait de coco"] },
]

recipes.each do |recipe|
  Recipe.create!(
    name: recipe[:name],
    time: recipe[:time],
    difficulty: recipe[:difficulty],
    cost: recipe[:cost],
    vegetal: recipe[:vegetal],
    co2: recipe[:co2],
    )
end

puts "#{recipes.size} recettes ont été créées avec succès !"

# # Create ingredients
# ingredient_records = ingredients.map do |ingredient|
#   Ingredient.create!(ingredient)
# end

# recipes.each do |recipe_data|
#   # Extract recipe info
#   recipe_ingredients = recipe_data.delete(:ingredients)

  # # Create recipe
  # recipe = Recipe.create!(
  #   name: recipe_data[:name],
  #   step: recipe_data[:steps],
  #   time: recipe_data[:time],
  #   difficulty: recipe_data[:difficulty],
  #   cost: recipe_data[:cost],
  #   vegetal: recipe_data[:vegetal],
  #   co2: 0 # Placeholder, calculate below
  # )

  # # Associate ingredients and calculate CO2
  # total_co2 = 0
  # recipe_ingredients.each do |ingredient_name|
  #   ingredient = ingredient_records.find { |i| i.name == ingredient_name }
  #   quantity = rand(1.0..3.0).round(2) # Random quantity
  #   RecipeIngredient.create!(recipe: recipe, ingredient: ingredient, quantity: quantity)
  #   total_co2 += ingredient.co2 * quantity
  # end

  # Update
