import React from 'react'

export function CreateIngredientPopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popupInner">
        <h3>Créer un ingrédient</h3>
        <input type="text" name="newIngredientName" placeholder="Cheddar" onChange={(event) => props.setNewIngredient(event.target.value)} />
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
