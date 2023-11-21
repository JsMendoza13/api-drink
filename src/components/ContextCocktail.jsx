import { useEffect, useState } from "react";
import "../index.css";

export function ContextCocktail() {
  const [cocktail, setCocktail] = useState(null);

  const getRandomCocktail = async () => {
    try {
      const response = await fetch(
        "https://thecocktaildb.com/api/json/v1/1/random.php"
      );
      if (!response.ok) {
        throw new Error(`Error fetching data. Status: ${response.status}`);
      }

      const data = await response.json();
      setCocktail(data.drinks[0]);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i < 16; i++) {
      if (!cocktail || cocktail[`strIngredient${i}`] === null) {
        break;
      }
      ingredients.push(
        <li key={i}>
          {cocktail[`strMeasure${i}`]}: {cocktail[`strIngredient${i}`]}
        </li>
      );
    }
    return ingredients;
  };

  return (
    <section id="drink-section">
      {cocktail && (
        <>
          <div className="div__cocktail__card">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <div className="overlay">
              <div className="overlay__cocktail_info">
                <h2>{cocktail.strDrink}</h2>
                <h3>Ingredients: 🥝</h3>
                <ul> {renderIngredients()}</ul>
                <h3>Get it ready: 🤩</h3>
                <p>{cocktail.strInstructions}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
