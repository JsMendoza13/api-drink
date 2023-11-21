import { useState } from "react";
import { ContextCocktail } from "./components/ContextCocktail";

function App() {
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";

  const handleSearch = () => {
    if (userInput.trim() === "") {
      setSearchResult(
        <h3 className="msg"> The input field cannot be empty</h3>
      );
    } else {
      fetch(url + userInput)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.error("Error en la solicitud:", error));
    }
  };

  return (
    <>
      <header>
        <h1 className="nav__title">API Cocktails 🍷</h1>
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Encuentra tu bebida..."
              id="search-inp"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button id="btn-search" onClick={handleSearch}>
              Buscar
            </button>
          </div>
        </div>
      </header>
      <section className="section__cocktail">
        <div id="result">{searchResult}</div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
        <div className="div__contextCocktail">
          <ContextCocktail />
        </div>
      </section>
    </>
  );
}

export default App;
