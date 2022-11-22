export const CreateMeal = (props) => {
    return (
      <div className="createMeal">
        <h1>Créer un plat</h1>
        <form>
          <label>
            Nom du plat
            <input type="text" name="mealName" placeholder="Welsh" />
          </label>
          <br />
          <label>
            Temps de préparation
            <input type="text" name="cookTime" placeholder="45" />
          </label>
          <br />
          <label>
            Liste des ingrédients (travaux)
            <ul>
              <li>Ingrédient 1</li>
              <li>Ingrédient 2</li>
              <li>Ingrédient 3</li>
              <li>Ingrédient 4</li>
            </ul>
          </label>
          <label>
            Ajouter un ingrédient
            <br />
            <select>
                <option disabled selected value> Ingrédient </option>
              {props.ingredients.map((element) => {
                return (
                  <option key={element["INGREDIENT_NAME"]}>
                    {element["INGREDIENT_NAME"]}
                  </option>
                );
              })}
            </select>
            <input type="text" name="newIngredientQuantity" placeholder="Quantité"/>
            <select placeholder="Unité">
                <option disabled selected value> Unité </option>
              {props.units.map((element) => {
                return (
                  <option key={element["label"]}>
                    {element["label"]}
                  </option>
                );
              })}
            </select>
            <br />
          </label>
          <br />
          <label>
            Recette
            <br />
            <input
              type="text"
              name="receipe"
              placeholder="Déguster un bon Welsh !"
            />
          </label>
          <br />
          <input type="submit" value="Créer le plat" />
        </form>
      </div>
    );
}