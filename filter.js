function byName(recipes, name) {
  return recipes.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()));
}

function byIncludedIngredients(recipes, ingredients) {
  return recipes.filter((r) => {
    const ingredientNames = r.ingredients.map((i) => i.name.toLowerCase());
    return ingredients.find((i) => ingredientNames.find((name) => name.includes(i.toLowerCase())));
  });
}

function byExcludedIngredients(recipes, ingredients) {
  return recipes.filter((r) => {
    const ingredientNames = r.ingredients.map((i) => i.name.toLowerCase());
    return ingredients.find((i) => !ingredientNames.find((name) => name.includes(i.toLowerCase())));
  });
}

module.exports = {
  byName,
  byIncludedIngredients,
  byExcludedIngredients,
};
