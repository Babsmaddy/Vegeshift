# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require "csv"

puts "Cleaning the db"
Ingredient.destroy_all
Recipe.destroy_all
RecipeIngredient.destroy_all
User.destroy_all

#get ingredients from Ademe database (csv 444 ingredients / 3 columns : name, co2_kg, co2_gr)
filepath = "db/bdd_carbone.csv"

# CSV.foreach(filepath, headers: :first_row) do |row|
#   puts "#{row['name']} #{row['co2_kg']} #{row['co2_gr']}"
# end

user = User.create!(
  username: "Frisbee",
  email: "frisbee@gmail.com",
  password: "azerty",
  created_at: (Date.today - 400)
)

photo = "frisbee.jpg"

file_path = File.open("app/assets/images/#{photo}")
user.photo.attach(io: file_path, filename: "Photo de profil de #{user.username}", content_type: "image/png")
user.save

puts "#{User.count} utilisateur(s) créé(s)"



CSV.foreach(filepath) do |ingredient|
  Ingredient.create!(name: ingredient[0], co2_kg: ingredient[1], co2_gr: ingredient[2])
end

puts "#{Ingredient.count} ingrédients ont été créés avec succès !"


# ingredients.each do |ingredient|
#   ingredient_create = Ingredient.create!(name: ingredient[:name], co2: ingredient[:co2])
# end

# puts "#{ingredients.size} ingrédients ont été créés avec succès !"


# # Seed recipes
# recipes = [
#   { name: "Tarte aux abricots", time: 30, difficulty: 1, cost: 3, vegetal: true, co2: 100, ingredients: [{ name: "abricot", quantity: 500 }, { name: "beurre", quantity: 100 }, { name: "farine", quantity: 200 }, { name: "sucre", quantity: 50 }], steps: [{ number: 1, content: "Préchauffez le four à 180°C." }, { number: 2, content: "Préparez une pâte brisée avec le beurre, la farine et un peu d'eau." }, { number: 3, content: "Étalez la pâte dans un moule et piquez le fond avec une fourchette." }, { number: 4, content: "Disposez les abricots coupés en deux sur la pâte." }, { number: 5, content: "Saupoudrez de sucre et enfournez pendant 30 minutes." }] },
#   { name: "Poulet aux carottes", time: 45, difficulty: 1, cost: 1, vegetal: false, co2: 600, ingredients: [{ name: "poulet", quantity: 300 }, { name: "carotte", quantity: 200 }, { name: "ail", quantity: 10 }, { name: "épices", quantity: 5 }], steps: [{ number: 1, content: "Épluchez et coupez les carottes en rondelles." }, { number: 2, content: "Faites revenir le poulet dans une cocotte avec un peu d'huile." }, { number: 3, content: "Ajoutez l'ail émincé et les carottes." }, { number: 4, content: "Saupoudrez d'épices et mélangez bien." }, { number: 5, content: "Couvrez et laissez mijoter pendant 30 minutes." }] },
#   { name: "Velouté de courgettes", time: 20, difficulty: 2, cost: 2, vegetal: true, co2: 80, ingredients: [{ name: "courgettes", quantity: 400 }, { name: "basilic", quantity: 10 }, { name: "lait", quantity: 250 }], steps: [{ number: 1, content: "Lavez et coupez les courgettes en morceaux." }, { number: 2, content: "Faites-les cuire dans une casserole avec un peu d'eau." }, { number: 3, content: "Ajoutez le basilic et mixez le tout." }, { number: 4, content: "Incorporez le lait et mélangez." }, { number: 5, content: "Servez chaud avec un peu de basilic frais en décoration." }] },
#   { name: "Ratatouille", time: 10, difficulty: 1, cost: 1, vegetal: true, co2: 120, ingredients: [{ name: "aubergine", quantity: 300 }, { name: "courgette", quantity: 300 }, { name: "poivron", quantity: 200 }, { name: "tomate", quantity: 400 }], steps: [{ number: 1, content: "Coupez tous les légumes en dés." }, { number: 2, content: "Faites chauffer de l'huile dans une poêle." }, { number: 3, content: "Ajoutez les légumes et faites-les revenir." }, { number: 4, content: "Assaisonnez avec du sel, du poivre et des herbes de Provence." }, { number: 5, content: "Laissez mijoter à feu doux pendant 20 minutes." }] },
#   { name: "Gratin de brocolis", time: 30, difficulty: 3, cost: 2, vegetal: true, co2: 100, ingredients: [{ name: "brocolis", quantity: 500 }, { name: "fromage", quantity: 150 }, { name: "crème", quantity: 200 }], steps: [{ number: 1, content: "Préchauffez le four à 200°C." }, { number: 2, content: "Faites cuire les brocolis à la vapeur." }, { number: 3, content: "Disposez les brocolis dans un plat à gratin." }, { number: 4, content: "Ajoutez la crème et le fromage râpé." }, { number: 5, content: "Enfournez pendant 20 minutes jusqu'à ce que le dessus soit doré." }] },
#   { name: "Curry de pois chiches", time: 45, difficulty: 2, cost: 1, vegetal: true, co2: 200, ingredients: [{ name: "pois chiches", quantity: 400 }, { name: "lait de coco", quantity: 250 }, { name: "curry", quantity: 10 }], steps: [{ number: 1, content: "Égouttez les pois chiches et rincez-les." }, { number: 2, content: "Faites chauffer un peu d'huile dans une casserole." }, { number: 3, content: "Ajoutez le curry et faites-le revenir brièvement." }, { number: 4, content: "Incorporez les pois chiches et le lait de coco." }, { number: 5, content: "Laissez mijoter à feu doux pendant 20 minutes." }] },
#   { name: "Salade d'avocat et grenade", time: 20, difficulty: 3, cost: 3, vegetal: true, co2: 200, ingredients: [{ name: "avocat", quantity: 200 }, { name: "grenade", quantity: 150 }, { name: "laitue", quantity: 100 }], steps: [{ number: 1, content: "Lavez la laitue et essorez-la." }, { number: 2, content: "Coupez les avocats en tranches." }, { number: 3, content: "Égrenez la grenade." }, { number: 4, content: "Mélangez le tout dans un saladier." }, { number: 5, content: "Ajoutez une vinaigrette selon votre goût." }] },
#   { name: "Soupe de carottes", time: 10, difficulty: 1, cost: 1, vegetal: true, co2: 30, ingredients: [{ name: "carotte", quantity: 300 }, { name: "oignon", quantity: 100 }, { name: "épices", quantity: 5 }], steps: [{ number: 1, content: "Épluchez et coupez les carottes en morceaux." }, { number: 2, content: "Émincez l'oignon." }, { number: 3, content: "Faites revenir l'oignon dans une casserole." }, { number: 4, content: "Ajoutez les carottes et couvrez d'eau." }, { number: 5, content: "Laissez cuire, puis mixez la soupe." }] },
#   { name: "Pizza aux légumes", time: 60, difficulty: 3, cost: 2, vegetal: true, co2: 100, ingredients: [{ name: "aubergine", quantity: 200 }, { name: "courgette", quantity: 200 }, { name: "tomate", quantity: 300 }, { name: "fromage", quantity: 150 }], steps: [{ number: 1, content: "Préchauffez le four à 220°C." }, { number: 2, content: "Étalez la pâte à pizza sur une plaque." }, { number: 3, content: "Garnissez la pizza avec les légumes tranchés." }, { number: 4, content: "Ajoutez le fromage râpé." }, { number: 5, content: "Enfournez pendant 20 minutes." }] },
#   { name: "Poêlée de champignons et épinards", time: 120, difficulty: 2, cost: 3, vegetal: true, co2: 60, ingredients: [{ name: "champignon", quantity: 300 }, { name: "épinard", quantity: 200 }, { name: "ail", quantity: 10 }], steps: [{ number: 1, content: "Lavez les épinards et émincez l'ail." }, { number: 2, content: "Faites chauffer un peu d'huile dans une poêle." }, { number: 3, content: "Ajoutez les champignons tranchés et faites-les revenir." }, { number: 4, content: "Incorporez les épinards et l'ail." }, { number: 5, content: "Laissez cuire jusqu'à ce que les épinards soient tendres." }] },
#   { name: "Poulet au curry", time: 45, difficulty: 2, cost: 1, vegetal: false, co2: 550, ingredients: [{ name: "poulet", quantity: 300 }, { name: "curry", quantity: 10 }, { name: "lait de coco", quantity: 250 }], steps: [{ number: 1, content: "Coupez le poulet en morceaux." }, { number: 2, content: "Faites chauffer un peu d'huile dans une poêle." }, { number: 3, content: "Ajoutez le curry et faites-le revenir brièvement." }, { number: 4, content: "Incorporez le poulet et faites-le dorer." }, { number: 5, content: "Ajoutez le lait de coco et laissez mijoter 25 minutes." }] }
# ]
recipes = [
  { name: "Quiche de polenta aux épinards et feta", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/11/recette-vegetarienne-quiche-polenta-epinards-feta.png", time: 40, difficulty: 2, cost: 1, vegetal: true, co2: 0, co2_traditional: 825, ingredients: [{ name: "Polenta", quantity: 300 }, { name: "Épinards frais", quantity: 200 }, { name: "Feta", quantity: 150 }, { name: "Œufs", quantity: 3 }, { name: "Crème fraîche", quantity: 100 }, { name: "Parmesan", quantity: 50 }, { name: "Oignon", quantity: 1 }, { name: "Ail", quantity: 2 }, { name: "Huile d'olive", quantity: 30 }], steps: [{ number: 1, content: "Préchauffez votre four à 180°C. Faites cuire la polenta selon les instructions du paquet." }, { number: 2, content: "Dans une poêle, faites chauffer l'huile d'olive et faites revenir l'oignon émincé et l'ail jusqu'à ce qu'ils soient dorés." }, { number: 3, content: "Ajoutez les épinards dans la poêle et faites-les revenir jusqu'à ce qu'ils soient tendres." }, { number: 4, content: "Dans un bol, battez les œufs avec la crème fraîche et le parmesan. Incorporez la polenta cuite, les épinards, la feta émiettée." }, { number: 5, content: "Versez le mélange dans un moule à tarte et faites cuire pendant 25 à 30 minutes jusqu'à ce que la quiche soit dorée." }, { number: 6, content: "Laissez refroidir légèrement avant de servir." }] },
  { name: "Salade turque de boulgour", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/11/recette-vegetarienne-salade-boulgour-turque.png", time: 35, difficulty: 1, cost: 1, vegetal: true, co2: 0, co2_traditional: 745, ingredients: [{ name: "Boulgour", quantity: 200 }, { name: "Tomates", quantity: 3 }, { name: "Concombre", quantity: 1 }, { name: "Poivron rouge", quantity: 1 }, { name: "Persil", quantity: 50 }, { name: "Coriandre", quantity: 20 }, { name: "Jus de citron", quantity: 40 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire le boulgour selon les instructions du paquet. Laissez-le refroidir." }, { number: 2, content: "Coupez les tomates, le concombre et le poivron en dés." }, { number: 3, content: "Hachez finement le persil et la coriandre." }, { number: 4, content: "Dans un grand saladier, mélangez le boulgour refroidi avec les légumes, les herbes, le jus de citron et l'huile d'olive." }, { number: 5, content: "Assaisonnez avec du sel et du poivre, puis mélangez à nouveau avant de servir." }] },
  { name: "Courges Jack be little farcies spéciales Halloween", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/10/recette-vegetarienne-courges-jack-be-little-farcies-halloween.png", time: 45, difficulty: 2, cost: 1, vegetal: true, co2: 0, co2_traditional: 1305, ingredients: [{ name: "Courges Jack be little", quantity: 4 }, { name: "Quinoa", quantity: 200 }, { name: "Tomates cerises", quantity: 150 }, { name: "Poivron jaune", quantity: 1 }, { name: "Ail", quantity: 2 }, { name: "Cumin", quantity: 5 }, { name: "Paprika", quantity: 5 }, { name: "Persil", quantity: 30 }, { name: "Huile d'olive", quantity: 30 }], steps: [{ number: 1, content: "Préchauffez votre four à 180°C. Coupez les courges Jack be little en deux et retirez les graines." }, { number: 2, content: "Faites cuire le quinoa selon les instructions du paquet." }, { number: 3, content: "Dans une poêle, faites revenir l'ail émincé et le poivron coupé en petits dés dans l'huile d'olive." }, { number: 4, content: "Ajoutez les tomates cerises coupées en deux, le cumin, et le paprika. Laissez mijoter 5 minutes." }, { number: 5, content: "Mélangez le quinoa cuit avec le mélange de légumes et assaisonnez avec du sel et du poivre." }, { number: 6, content: "Garnissez les courges avec cette préparation et faites cuire au four pendant 20 à 25 minutes." }] },
  { name: "Portobello farcis au blé crémeux", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/10/recette-vegetarienne-portobello-farcis.png", time: 40, difficulty: 2, cost: 1, vegetal: true, co2: 0, co2_traditional: 825, ingredients: [{ name: "Champignons Portobello", quantity: 4 }, { name: "Blé", quantity: 200 }, { name: "Crème de soja", quantity: 100 }, { name: "Ail", quantity: 2 }, { name: "Oignon", quantity: 1 }, { name: "Épinards frais", quantity: 150 }, { name: "Curry", quantity: 5 }, { name: "Graines de courge", quantity: 30 }, { name: "Parmesan", quantity: 50 }], steps: [{ number: 1, content: "Préchauffez votre four à 180°C. Faites cuire le blé dans de l'eau salée pendant 15 minutes." }, { number: 2, content: "Dans une poêle, faites revenir l'oignon et l'ail émincés dans l'huile d'olive." }, { number: 3, content: "Ajoutez les épinards frais et faites-les fondre." }, { number: 4, content: "Mélangez le blé cuit avec la crème de soja, le curry et les épinards." }, { number: 5, content: "Garnissez les champignons Portobello avec la préparation crémeuse et parsemez de parmesan." }, { number: 6, content: "Faites cuire au four pendant 15 à 20 minutes." }] },
  { name: "Quesadillas à la patate douce", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/09/recette-vegetarienne-quesadillas-patate-douce.png", time: 35, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Tortillas", quantity: 4 }, { name: "Patate douce", quantity: 300 }, { name: "Fromage râpé", quantity: 150 }, { name: "Oignon", quantity: 1 }, { name: "Coriandre", quantity: 20 }, { name: "Piment doux", quantity: 5 }, { name: "Ail", quantity: 2 }, { name: "Crème fraîche", quantity: 100 }], steps: [{ number: 1, content: "Pelez et coupez la patate douce en petits cubes. Faites-la cuire à la vapeur pendant 15 minutes." }, { number: 2, content: "Dans une poêle, faites revenir l'oignon émincé, l'ail et le piment doux dans un peu d'huile." }, { number: 3, content: "Écrasez la patate douce cuite et mélangez-la avec l'oignon, l'ail, et un peu de coriandre hachée." }, { number: 4, content: "Chauffez les tortillas et garnissez-les avec la purée de patate douce et le fromage râpé." }, { number: 5, content: "Pliez les tortillas et faites-les cuire à feu moyen dans une poêle jusqu'à ce qu'elles soient dorées des deux côtés." }] },
  { name: "Pâtes à la courge butternut rôtie", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/09/recette-vegetarienne-pates-courge-butternut.png", time: 40, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Pâtes", quantity: 300 }, { name: "Courge butternut", quantity: 400 }, { name: "Crème fraîche", quantity: 100 }, { name: "Parmesan", quantity: 50 }, { name: "Ail", quantity: 2 }, { name: "Huile d'olive", quantity: 30 }, { name: "Romarin", quantity: 5 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Préchauffez le four à 180°C. Coupez la courge butternut en cubes et disposez-les sur une plaque de cuisson." }, { number: 2, content: "Arrosez d'huile d'olive et saupoudrez de romarin, de sel et de poivre. Faites rôtir au four pendant 25-30 minutes." }, { number: 3, content: "Faites cuire les pâtes selon les instructions du paquet." }, { number: 4, content: "Dans une poêle, faites revenir l'ail haché dans un peu d'huile d'olive." }, { number: 5, content: "Ajoutez la courge rôtie, les pâtes cuites et la crème fraîche. Mélangez bien et laissez mijoter quelques minutes." }, { number: 6, content: "Servez chaud avec du parmesan râpé." }] },
  { name: "Salade de pois chiches au curry et brocoli", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/09/recette-vegetarienne-pois-chiches-brocoli-curry.png", time: 30, difficulty: 1, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Pois chiches", quantity: 400 }, { name: "Brocoli", quantity: 300 }, { name: "Yaourt nature", quantity: 100 }, { name: "Poudre de curry", quantity: 5 }, { name: "Ail", quantity: 2 }, { name: "Citron", quantity: 1 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire le brocoli à la vapeur pendant 5 à 10 minutes." }, { number: 2, content: "Dans un grand bol, mélangez les pois chiches égouttés, le brocoli cuit et l'ail émincé." }, { number: 3, content: "Ajoutez le yaourt nature, la poudre de curry, le jus de citron, l'huile d'olive, le sel et le poivre." }, { number: 4, content: "Mélangez bien et servez frais." }] },
  { name: "Orzo aux aubergines et tomates rôties", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/08/recette-vegetarienne-orzo-aubergines-tomates-roties.jpg", time: 40, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Orzo", quantity: 250 }, { name: "Aubergines", quantity: 2 }, { name: "Tomates", quantity: 4 }, { name: "Ail", quantity: 2 }, { name: "Huile d'olive", quantity: 30 }, { name: "Basilic", quantity: 20 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Préchauffez le four à 180°C. Coupez les aubergines et les tomates en dés." }, { number: 2, content: "Disposez-les sur une plaque, arrosez d'huile d'olive, assaisonnez de sel et de poivre, et faites rôtir pendant 25-30 minutes." }, { number: 3, content: "Faites cuire l'orzo selon les instructions du paquet." }, { number: 4, content: "Dans une poêle, faites revenir l'ail haché dans de l'huile d'olive." }, { number: 5, content: "Ajoutez l'orzo cuit et les légumes rôtis dans la poêle. Mélangez bien." }, { number: 6, content: "Ajoutez le basilic frais et servez." }] },
  { name: "Burger à l'halloumi", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/09/recette-vegetarienne-hamburger-halloumi.png", time: 30, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Pain à burger", quantity: 4 }, { name: "Halloumi", quantity: 200 }, { name: "Tomates", quantity: 2 }, { name: "Avocat", quantity: 1 }, { name: "Laitue", quantity: 50 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites chauffer une poêle avec un peu d'huile d'olive. Faites griller le halloumi coupé en tranches." }, { number: 2, content: "Coupez les tomates et l'avocat en tranches." }, { number: 3, content: "Faites griller les pains à burger." }, { number: 4, content: "Assemblez les burgers en déposant du halloumi, des tomates, de l'avocat et de la laitue dans chaque pain." }, { number: 5, content: "Servez chaud." }] },
  { name: "Salade d'épeautre aux fruits d'été", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/08/recette-vegetarienne-salade-epeautre-fruits-ete.png", time: 25, difficulty: 1, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Épeautre", quantity: 200 }, { name: "Fruits d'été", quantity: 300 }, { name: "Menthe", quantity: 20 }, { name: "Citron", quantity: 1 }, { name: "Huile d'olive", quantity: 30 }, { name: "Miel", quantity: 20 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire l'épeautre selon les instructions du paquet." }, { number: 2, content: "Coupez les fruits d'été en morceaux." }, { number: 3, content: "Dans un grand saladier, mélangez l'épeautre cuit, les fruits, la menthe hachée, le miel et le jus de citron." }, { number: 4, content: "Ajoutez l'huile d'olive, le sel et le poivre. Mélangez bien et servez frais." }] },
  { name: "Brochettes de gnocchis et légumes d'été", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/06/recette-vegetarienne-brochettes-gnocchis.png", time: 40, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Gnocchis", quantity: 300 }, { name: "Poivrons", quantity: 2 }, { name: "Courgettes", quantity: 2 }, { name: "Aubergines", quantity: 1 }, { name: "Tomates cerises", quantity: 100 }, { name: "Huile d'olive", quantity: 30 }, { name: "Herbes de Provence", quantity: 5 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Préchauffez le four à 200°C. Coupez les légumes en morceaux et les tomates cerises en deux." }, { number: 2, content: "Faites cuire les gnocchis selon les instructions du paquet." }, { number: 3, content: "Enfilez les gnocchis et légumes sur des brochettes." }, { number: 4, content: "Badigeonnez d'huile d'olive, assaisonnez avec les herbes, le sel et le poivre." }, { number: 5, content: "Faites cuire au four pendant 20-25 minutes." }] },
  { name: "Salade d'été crémeuse", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/05/recette-vegetarienne-salade-ete-cremeuse.jpg", time: 20, difficulty: 1, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Tomates", quantity: 3 }, { name: "Concombre", quantity: 1 }, { name: "Avocat", quantity: 1 }, { name: "Crème fraîche", quantity: 100 }, { name: "Ciboulette", quantity: 20 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Coupez les tomates, le concombre et l'avocat en dés." }, { number: 2, content: "Dans un bol, mélangez la crème fraîche avec la ciboulette hachée, le sel et le poivre." }, { number: 3, content: "Ajoutez les légumes coupés dans la sauce crémeuse et mélangez bien." }, { number: 4, content: "Servez frais." }] },
  { name: "Aubergines caprese au barbecue", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/05/recette-vegetarienne-aubergines-caprese-barbecue.jpg", time: 30, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Aubergines", quantity: 2 }, { name: "Tomates", quantity: 2 }, { name: "Mozzarella", quantity: 100 }, { name: "Basilic", quantity: 20 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Coupez les aubergines en tranches épaisses et badigeonnez-les d'huile d'olive." }, { number: 2, content: "Faites griller les aubergines sur le barbecue pendant 5-7 minutes de chaque côté." }, { number: 3, content: "Coupez les tomates et la mozzarella." }, { number: 4, content: "Garnissez les aubergines grillées de tomates, de mozzarella et de basilic." }, { number: 5, content: "Servez chaud." }] },
  { name: "Involtini de courgettes", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/05/recette-vegetarienne-involtini-courgette.jpg", time: 30, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Courgettes", quantity: 2 }, { name: "Ricotta", quantity: 100 }, { name: "Parmesan", quantity: 50 }, { name: "Herbes de Provence", quantity: 5 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Coupez les courgettes en fines tranches à l'aide d'une mandoline." }, { number: 2, content: "Faites revenir les tranches de courgettes dans l'huile d'olive." }, { number: 3, content: "Garnissez chaque tranche de ricotta et roulez-les." }, { number: 4, content: "Disposez les involtini dans un plat allant au four et parsemez de parmesan et d'herbes." }, { number: 5, content: "Faites cuire au four à 180°C pendant 15 minutes." }] },
  { name: "Spaghettis à l'halloumi, sauce tomates savoureuse", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/04/recette-vegetarienne-spaghettis-halloumi.jpg", time: 30, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Spaghettis", quantity: 250 }, { name: "Halloumi", quantity: 150 }, { name: "Tomates", quantity: 4 }, { name: "Oignon", quantity: 1 }, { name: "Ail", quantity: 2 }, { name: "Huile d'olive", quantity: 30 }, { name: "Basilic", quantity: 20 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire les spaghettis selon les instructions du paquet." }, { number: 2, content: "Dans une poêle, faites revenir l'ail et l'oignon hachés dans de l'huile d'olive." }, { number: 3, content: "Ajoutez les tomates coupées en dés et laissez mijoter 10 minutes." }, { number: 4, content: "Coupez le halloumi en tranches et faites-le griller dans une poêle." }, { number: 5, content: "Mélangez les spaghettis, la sauce tomate et le halloumi grillé." }, { number: 6, content: "Servez chaud avec du basilic frais." }] },
  { name: "Shakshuka aux fèves", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/04/recette-vegetarienne-shakshuka-feves.png", time: 35, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Fèves", quantity: 300 }, { name: "Tomates", quantity: 4 }, { name: "Œufs", quantity: 4 }, { name: "Ail", quantity: 2 }, { name: "Cumin", quantity: 5 }, { name: "Paprika", quantity: 5 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire les fèves dans de l'eau bouillante pendant 10 minutes." }, { number: 2, content: "Dans une poêle, faites revenir l'ail et les épices dans de l'huile d'olive." }, { number: 3, content: "Ajoutez les tomates coupées en dés et laissez mijoter 10 minutes." }, { number: 4, content: "Faites des petits puits dans la sauce tomate et cassez-y les œufs." }, { number: 5, content: "Laissez cuire jusqu'à ce que les œufs soient cuits à votre goût." }, { number: 6, content: "Servez avec des fèves et du pain." }] },
  { name: "Dips d'artichauts et épinards", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/03/recette-vegetarienne-dips-artchauts-epinards.jpg", time: 20, difficulty: 1, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Cœurs d'artichauts", quantity: 200 }, { name: "Épinards frais", quantity: 150 }, { name: "Yaourt nature", quantity: 100 }, { name: "Ail", quantity: 2 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire les épinards à la vapeur pendant 5 minutes." }, { number: 2, content: "Dans un mixeur, combinez les cœurs d'artichauts, les épinards, l'ail et le yaourt." }, { number: 3, content: "Mixez jusqu'à obtenir une texture lisse." }, { number: 4, content: "Assaisonnez avec de l'huile d'olive, du sel et du poivre." }, { number: 5, content: "Servez avec des légumes ou du pain." }] },
  { name: "Salade de petit épeautre et poivrons rôtis", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/05/recette-vegan-epeautre-poivrons.jpg", time: 30, difficulty: 1, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Petit épeautre", quantity: 200 }, { name: "Poivrons", quantity: 3 }, { name: "Huile d'olive", quantity: 30 }, { name: "Citron", quantity: 1 }, { name: "Menthe", quantity: 20 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire le petit épeautre selon les instructions du paquet." }, { number: 2, content: "Coupez les poivrons en lanières et faites-les rôtir au four pendant 20 minutes." }, { number: 3, content: "Dans un saladier, mélangez l'épeautre cuit, les poivrons rôtis et la menthe hachée." }, { number: 4, content: "Assaisonnez avec de l'huile d'olive, du citron, du sel et du poivre." }, { number: 5, content: "Servez frais." }] },
  { name: "Aubergines épicées, couscous perlé et pois chiches", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/04/recette-vegan-aubergines-epicees-couscous-pois-chiches.jpg", time: 40, difficulty: 2, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Aubergines", quantity: 2 }, { name: "Couscous perlé", quantity: 200 }, { name: "Pois chiches", quantity: 200 }, { name: "Paprika", quantity: 5 }, { name: "Cumin", quantity: 5 }, { name: "Ail", quantity: 2 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire les pois chiches et le couscous perlé selon les instructions." }, { number: 2, content: "Coupez les aubergines en tranches et faites-les cuire dans de l'huile d'olive." }, { number: 3, content: "Ajoutez l'ail et les épices, puis mélangez avec le couscous et les pois chiches." }, { number: 4, content: "Servez chaud." }] },
  { name: "Salade de quinoa, pois chiches marinés et concombre", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/03/recette-vegan-salade-quinoa-pois-chiches-concombre.jpg", time: 30, difficulty: 1, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Quinoa", quantity: 200 }, { name: "Pois chiches", quantity: 200 }, { name: "Concombre", quantity: 1 }, { name: "Citron", quantity: 1 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire le quinoa et les pois chiches." }, { number: 2, content: "Coupez le concombre en dés." }, { number: 3, content: "Dans un saladier, mélangez le quinoa, les pois chiches, le concombre, le citron et l'huile d'olive." }, { number: 4, content: "Assaisonnez avec du sel et du poivre." }, { number: 5, content: "Servez frais." }] },
  { name: "Salade de haricots blanc et radis", photo: "https://menu-vegetarien.com/wp-content/uploads/2024/03/recette-vegetarienne-salade-haricots-blancs-radis.jpg", time: 20, difficulty: 1, cost: 1, vegetal: true, co2: 0, ingredients: [{ name: "Haricots blancs", quantity: 200 }, { name: "Radis", quantity: 5 }, { name: "Citron", quantity: 1 }, { name: "Huile d'olive", quantity: 30 }, { name: "Sel", quantity: 5 }, { name: "Poivre", quantity: 5 }], steps: [{ number: 1, content: "Faites cuire les haricots blancs." }, { number: 2, content: "Coupez les radis en fines rondelles." }, { number: 3, content: "Dans un saladier, mélangez les haricots blancs, les radis, le citron et l'huile d'olive." }, { number: 4, content: "Assaisonnez avec du sel et du poivre." }, { number: 5, content: "Servez frais." }] },
]

recipes.each do |recipe|
  recipe_obj = Recipe.create!(
    name: recipe[:name],
    time: recipe[:time],
    difficulty: recipe[:difficulty],
    cost: recipe[:cost],
    vegetal: recipe[:vegetal],
    co2: recipe[:co2],
    co2_traditional: rand(720..1400)
  )
  photo = Cloudinary::Uploader.upload(recipe[:photo])
  file = URI.parse(photo["url"]).open
  recipe_obj.photo.attach(io: file, filename: "photo de la recette : #{recipe[:name]}", content_type: "image/png")

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
  recipe_obj.sum_total_co2
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
  recipes = Recipe.all
  dailies = [
    { recipe: recipes.sample, date: (Date.today - rand(2..10)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(2..10)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(2..10)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(2..10)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(2..10)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(2..10)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(2..10)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(10..30)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(31..90)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(91..250)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(250.350)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(250.350)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(250.350)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(250.350)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(250.350)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(250.350)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(350..399)), user: user },
    { recipe: recipes.sample, date: (Date.today - rand(350..399)), user: user },
  ]

  dailies.each do |daily|
     Daily.create!(
      recipe: daily[:recipe],
      date: daily[:date],
      user: daily[:user],
    )
  end

  puts "#{Daily.count} dailie(s) créée(s)"


5.times do
    Favorite.create!(
      recipe: recipes.sample,
      user: User.last
    )
end

puts "#{Favorite.count} favorie(s) créée"
