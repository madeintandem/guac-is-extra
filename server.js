// create an express app
const express = require("express");
const app = express();

const recipes = require("./recipes.json");
const filter = require("./filter");

// use the express-static middleware
app.use(express.static("public"));

// define the first route
app.get("/", function (req, res) {
  let returnRecipes = [...recipes];
  const { name, includeIngredients, excludeIngredients } = req.query;
  if (!!name) {
    returnRecipes = filter.byName(returnRecipes, name);
  }

  if (!!includeIngredients) {
    parsedIngredients = includeIngredients.split(",");
    returnRecipes = filter.byIncludedIngredients(returnRecipes, parsedIngredients);
  }

  if (!!excludeIngredients) {
    parsedIngredients = includeIngredients.split(",");
    returnRecipes = filter.byExcludedIngredients(returnRecipes, parsedIngredients);
  }

  res.send(returnRecipes);
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
