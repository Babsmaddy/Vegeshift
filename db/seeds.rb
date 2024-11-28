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
  ingredient_create = Ingredient.create!(name: ingredient[:name], co2: ingredient[:co2])
end

puts "#{ingredients.size} ingrédients ont été créés avec succès !"


# # Seed recipes
recipes = [
  { name: "Tarte aux abricots", time: 30, difficulty: 1, cost: 3, vegetal: true, co2: 100, ingredients: [{ name: "abricot", quantity: 500 }, { name: "beurre", quantity: 100 }, { name: "farine", quantity: 200 }, { name: "sucre", quantity: 50 }], steps: [{ number: 1, content: "Préchauffez le four à 180°C." }, { number: 2, content: "Préparez une pâte brisée avec le beurre, la farine et un peu d'eau." }, { number: 3, content: "Étalez la pâte dans un moule et piquez le fond avec une fourchette." }, { number: 4, content: "Disposez les abricots coupés en deux sur la pâte." }, { number: 5, content: "Saupoudrez de sucre et enfournez pendant 30 minutes." }] },
  { name: "Poulet aux carottes", time: 45, difficulty: 1, cost: 1, vegetal: false, co2: 600, ingredients: [{ name: "poulet", quantity: 300 }, { name: "carotte", quantity: 200 }, { name: "ail", quantity: 10 }, { name: "épices", quantity: 5 }], steps: [{ number: 1, content: "Épluchez et coupez les carottes en rondelles." }, { number: 2, content: "Faites revenir le poulet dans une cocotte avec un peu d'huile." }, { number: 3, content: "Ajoutez l'ail émincé et les carottes." }, { number: 4, content: "Saupoudrez d'épices et mélangez bien." }, { number: 5, content: "Couvrez et laissez mijoter pendant 30 minutes." }] },
  { name: "Velouté de courgettes", time: 20, difficulty: 2, cost: 2, vegetal: true, co2: 80, ingredients: [{ name: "courgettes", quantity: 400 }, { name: "basilic", quantity: 10 }, { name: "lait", quantity: 250 }], steps: [{ number: 1, content: "Lavez et coupez les courgettes en morceaux." }, { number: 2, content: "Faites-les cuire dans une casserole avec un peu d'eau." }, { number: 3, content: "Ajoutez le basilic et mixez le tout." }, { number: 4, content: "Incorporez le lait et mélangez." }, { number: 5, content: "Servez chaud avec un peu de basilic frais en décoration." }] },
  { name: "Ratatouille", time: 10, difficulty: 1, cost: 1, vegetal: true, co2: 120, ingredients: [{ name: "aubergine", quantity: 300 }, { name: "courgette", quantity: 300 }, { name: "poivron", quantity: 200 }, { name: "tomate", quantity: 400 }], steps: [{ number: 1, content: "Coupez tous les légumes en dés." }, { number: 2, content: "Faites chauffer de l'huile dans une poêle." }, { number: 3, content: "Ajoutez les légumes et faites-les revenir." }, { number: 4, content: "Assaisonnez avec du sel, du poivre et des herbes de Provence." }, { number: 5, content: "Laissez mijoter à feu doux pendant 20 minutes." }] },
  { name: "Gratin de brocolis", time: 30, difficulty: 3, cost: 2, vegetal: true, co2: 100, ingredients: [{ name: "brocolis", quantity: 500 }, { name: "fromage", quantity: 150 }, { name: "crème", quantity: 200 }], steps: [{ number: 1, content: "Préchauffez le four à 200°C." }, { number: 2, content: "Faites cuire les brocolis à la vapeur." }, { number: 3, content: "Disposez les brocolis dans un plat à gratin." }, { number: 4, content: "Ajoutez la crème et le fromage râpé." }, { number: 5, content: "Enfournez pendant 20 minutes jusqu'à ce que le dessus soit doré." }] },
  { name: "Curry de pois chiches", time: 45, difficulty: 2, cost: 1, vegetal: true, co2: 200, ingredients: [{ name: "pois chiches", quantity: 400 }, { name: "lait de coco", quantity: 250 }, { name: "curry", quantity: 10 }], steps: [{ number: 1, content: "Égouttez les pois chiches et rincez-les." }, { number: 2, content: "Faites chauffer un peu d'huile dans une casserole." }, { number: 3, content: "Ajoutez le curry et faites-le revenir brièvement." }, { number: 4, content: "Incorporez les pois chiches et le lait de coco." }, { number: 5, content: "Laissez mijoter à feu doux pendant 20 minutes." }] },
  { name: "Salade d'avocat et grenade", time: 20, difficulty: 3, cost: 3, vegetal: true, co2: 200, ingredients: [{ name: "avocat", quantity: 200 }, { name: "grenade", quantity: 150 }, { name: "laitue", quantity: 100 }], steps: [{ number: 1, content: "Lavez la laitue et essorez-la." }, { number: 2, content: "Coupez les avocats en tranches." }, { number: 3, content: "Égrenez la grenade." }, { number: 4, content: "Mélangez le tout dans un saladier." }, { number: 5, content: "Ajoutez une vinaigrette selon votre goût." }] },
  { name: "Soupe de carottes", time: 10, difficulty: 1, cost: 1, vegetal: true, co2: 30, ingredients: [{ name: "carotte", quantity: 300 }, { name: "oignon", quantity: 100 }, { name: "épices", quantity: 5 }], steps: [{ number: 1, content: "Épluchez et coupez les carottes en morceaux." }, { number: 2, content: "Émincez l'oignon." }, { number: 3, content: "Faites revenir l'oignon dans une casserole." }, { number: 4, content: "Ajoutez les carottes et couvrez d'eau." }, { number: 5, content: "Laissez cuire, puis mixez la soupe." }] },
  { name: "Pizza aux légumes", time: 60, difficulty: 3, cost: 2, vegetal: true, co2: 100, ingredients: [{ name: "aubergine", quantity: 200 }, { name: "courgette", quantity: 200 }, { name: "tomate", quantity: 300 }, { name: "fromage", quantity: 150 }], steps: [{ number: 1, content: "Préchauffez le four à 220°C." }, { number: 2, content: "Étalez la pâte à pizza sur une plaque." }, { number: 3, content: "Garnissez la pizza avec les légumes tranchés." }, { number: 4, content: "Ajoutez le fromage râpé." }, { number: 5, content: "Enfournez pendant 20 minutes." }] },
  { name: "Poêlée de champignons et épinards", time: 120, difficulty: 2, cost: 3, vegetal: true, co2: 60, ingredients: [{ name: "champignon", quantity: 300 }, { name: "épinard", quantity: 200 }, { name: "ail", quantity: 10 }], steps: [{ number: 1, content: "Lavez les épinards et émincez l'ail." }, { number: 2, content: "Faites chauffer un peu d'huile dans une poêle." }, { number: 3, content: "Ajoutez les champignons tranchés et faites-les revenir." }, { number: 4, content: "Incorporez les épinards et l'ail." }, { number: 5, content: "Laissez cuire jusqu'à ce que les épinards soient tendres." }] },
  { name: "Poulet au curry", time: 45, difficulty: 2, cost: 1, vegetal: false, co2: 550, ingredients: [{ name: "poulet", quantity: 300 }, { name: "curry", quantity: 10 }, { name: "lait de coco", quantity: 250 }], steps: [{ number: 1, content: "Coupez le poulet en morceaux." }, { number: 2, content: "Faites chauffer un peu d'huile dans une poêle." }, { number: 3, content: "Ajoutez le curry et faites-le revenir brièvement." }, { number: 4, content: "Incorporez le poulet et faites-le dorer." }, { number: 5, content: "Ajoutez le lait de coco et laissez mijoter 25 minutes." }] }
]



recipes.each do |recipe|
  recipe_obj = Recipe.create!(
    name: recipe[:name],
    time: recipe[:time],
    difficulty: recipe[:difficulty],
    cost: recipe[:cost],
    vegetal: recipe[:vegetal],
    co2: recipe[:co2]
  )

  recipe[:steps].each do |step|
    Step.create!(
      number: step[:number],
      content: step[:content],
      recipe: recipe_obj
    )
  end
  recipe[:ingredients].each do |ingredient|
    ingredient_obj = Ingredient.where("name ILIKE ?", ingredient[:name]).first_or_create(name: ingredient[:name])
    RecipeIngredient.create!(
      recipe: recipe_obj,
      ingredient: ingredient_obj,
      quantity: ingredient[:quantity]
    )
  end
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
