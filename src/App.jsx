import { useState, useEffect } from "react";
import { RiArrowUpCircleFill, RiGithubFill } from "react-icons/ri";

function App() {
  const [userInput, setUserInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [errorSearch, setErrorSearch] = useState("");
  const [contextCocktails, setContextCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
  const urlRandom = "https://thecocktaildb.com/api/json/v1/1/random.php";

  //funcion de scroll del btn flecha del footer
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Se genera una funcion para guardar una key una en la Api
  const generateUniqueKey = () => {
    return new Date().getTime().toString();
  };

  const createIngredients = (myDrink) => {
    const ingredients = [];
    let count = 1;

    for (let i in myDrink) {
      let ingredient = "";
      let measure = "";

      if (i.startsWith("strIngredient") && myDrink[i]) {
        ingredient = myDrink[i];

        if (myDrink[`strMeasure${count}`]) {
          measure = myDrink[`strMeasure${count}`];
        } else {
          measure = "";
        }
        count += 1;
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    return ingredients;
  };

  const handleSearch = () => {
    if (userInput.trim() === "") {
      setContextCocktails([]);
      setSearchResult([]);
      setErrorSearch(
        <span className="msg">You must write the name of a cocktail...</span>
      );

      //al dar click al btn buscar se recarga la pagina a los 4s
      //  setTimeout(() => {
      //     window.location.reload();
      //   }, 4000);
    } else {
      setLoading(true);
      // Limpiar los cocteles antes de realizar la nueva búsqueda
      setContextCocktails([]);
      setSearchResult([]);
      setErrorSearch([]);

      const timeoutId = setTimeout(() => {
        fetch(url + userInput)
          .then((response) => response.json())
          .then((data) => {
            const myDrink = data.drinks[0];
            const ingredients = createIngredients(myDrink);

            setSearchResult(
              <>
                <div className="div__search_card">
                  <div className="div__SearchCocktail">
                    <img src={myDrink.strDrinkThumb} alt={myDrink.strDrink} />
                    <div className="overlay">
                      <div className="overlay__cocktail_info">
                        <h2>{myDrink.strDrink}</h2>
                        <div className="div__cocktail__ingre">
                          <h3>Ingredients: 🥝</h3>
                          <ul>
                            {ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                          <h3>Get it ready 🤩</h3>
                          <p>{myDrink.strInstructions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
          .catch((error) => {
            console.error("Error in the application:", error);
            setErrorSearch(
              <span className="msg">
                Error in the application. Please try again.
              </span>
            );
          })
          .finally(() => {
            clearTimeout(timeoutId);
            setLoading(false);
          });
      }, 1500);
    }
  };

  useEffect(() => {
    const usedKeys = new Set(); //En esta variable se guardan las Key que se estan usando de la API

    const fetchData = async () => {
      setLoading(true);

      try {
        const numberOfContextCocktails = 10;
        const newContextCocktails = await Promise.all(
          Array.from({ length: numberOfContextCocktails }, async () => {
            let newKey = generateUniqueKey();

            while (usedKeys.has(newKey)) {
              newKey = generateUniqueKey();
            }

            usedKeys.add(newKey);

            try {
              const cocktailResponse = await fetch(urlRandom);
              const cocktailData = await cocktailResponse.json();
              const myDrink = cocktailData.drinks[0];
              const ingredients = createIngredients(myDrink);
              // Aquí puedes pasar la información del cocktail como prop si es necesario
              return (
                <div key={newKey} className="div__contextCocktail">
                  <div className="div__SearchCocktail">
                    <img src={myDrink.strDrinkThumb} alt={myDrink.strDrink} />
                    <div className="overlay">
                      <div className="overlay__cocktail_info">
                        <h2>{myDrink.strDrink}</h2>
                        <div className="div__cocktail__ingre">
                          <h3>Ingredients: 🥝</h3>
                          <ul>
                            {ingredients.map((ingredient, index) => (
                              <li key={index}>{ingredient}</li>
                            ))}
                          </ul>
                          <h3>Get it ready 🤩</h3>
                          <p>{myDrink.strInstructions}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } catch (error) {
              console.error("Error fetching cocktail:", error);
              // Puedes decidir qué hacer en caso de error, como mostrar un mensaje de error.
              return null;
            }
          })
        );

        setContextCocktails(newContextCocktails);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 1850);

    return () => clearTimeout(timeoutId);
  }, []); // El array vacío este argumento asegura que este efecto solo se ejecute una vez al montar el componente

  return (
    <>
      <header>
        <a className="nav__title" href="/">
          API Cocktails 🍷
        </a>

        <div className="search-container">
          <input
            type="text"
            placeholder="Find your drink..."
            id="search-inp"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button id="btn-search" onClick={handleSearch}>
            Search
          </button>
        </div>
      </header>
      {loading && (
        <div className="div__loading">
          {" "}
          <span className="loader"></span>
        </div>
      )}
      <section className="section__cocktail">
        <div id="result">{searchResult}</div>
        {!loading && contextCocktails}
        {errorSearch}
      </section>
      <footer>
        <a
          href="https://github.com/JsMendoza13"
          target="_blank"
          rel="noreferrer"
        >
          <RiGithubFill className="RiGithubFill" />
        </a>
        <a href="#" onClick={handleScrollToTop}>
          <RiArrowUpCircleFill className="RiArrowUpCircleFill" />
        </a>
      </footer>
    </>
  );
}

export default App;
