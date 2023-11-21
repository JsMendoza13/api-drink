import { useEffect, useState } from "react";
import "../index.css";

export function ContextCocktail() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    getRandomCocktails();
  }, []);

  function getRandomCocktails() {
    fetch("https://thecocktaildb.com/api/json/v1/1/random.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        displayRandomCocktails(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }

  function displayRandomCocktails(cocktailData) {
    const newDrinks = cocktailData.drinks.slice(0, 10).map((drink) => ({
      id: drink.idDrink,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
    }));

    setDrinks(newDrinks);
  }

  return (
    <>
      <section id="drink-section">
        {drinks.map((drink) => (
          <div key={drink.id}>
            <img src={drink.image} alt={drink.name} className="img__drink" />
          </div>
        ))}
      </section>
    </>
  );
}
