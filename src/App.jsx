function App() {
  return (
    <>
      <header>
        <h1 className="nav__title">Api Cocktails 🍷</h1>
        <div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Encuentra tu bebida..."
              id="search-inp"
            />
            <button id="btn-search">Buscar</button>
          </div>
        </div>
      </header>
      <section>
        <img
          src="https://images.pexels.com/photos/18988864/pexels-photo-18988864/free-photo-of-house-in-green-deep-forest.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/18800027/pexels-photo-18800027/free-photo-of-water-cascading-down-rock-in-forest.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/8836252/pexels-photo-8836252.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/19058510/pexels-photo-19058510/free-photo-of-flowers-on-meadow.jpeg"
          alt=""
        />
        <img
          src="https://images.pexels.com/photos/19164855/pexels-photo-19164855/free-photo-of-a-close-up-of-a-green-leaf-on-a-tree.jpeg"
          alt=""
        />
        <img src="" alt="" />
      </section>
    </>
  );
}

export default App;
