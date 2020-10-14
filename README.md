# guac-is-extra
This is a simple Node app with an Express API for returning taco recipes.

## Project setup
```bash
yarn install
```

## Running the application
```bash
node server.js
```

## Running the tests
```bash
yarn test
```

## Functionality

This API only has a single GET request at the root `/`. This will return all the recipe data.

### Filter recipes by name
To filter recipes by name, use the `name` query parameter

```
GET /?name="fish tacos"
```

### Filter recipes by included ingredients
To filter recipes by included ingredients, use the `includeIngredients` query parameter

```
GET /?includeIngredients="pork"
```

To filter by more than one ingredient, comma separate them. Note: this does an OR query returning recipes that have any of the comma separated ingredients.

```
GET /?includeIngredients="pork,bacon,ham"
```

### Filter recipes by excluded ingredients
To filter recipes by excluded ingredients, use the `excludeIngredients` query parameter. This will return recipes that do not included the filtered ingredient.

```
GET /?excludeIngredients="pork"
```

To filter by more than one ingredient, comma separate them. Note: this does an OR query returning recipes that don't have one or more of the comma separated ingredients.

```
GET /?excludeIngredients="pork,bacon,ham"
```

## Adding recipes
To add recipes, add an object to the array of data in the `recipes.json` file with the following shape
```json
{
  "name": "name of the recipe",
  "ingredients": [
    {
      "quantity": "quantity of ingredient, ex. 1 cup, 1/2 tablespoon, etc.",
      "name": "name of ingredient",
      "preparation": "preparation if it exists, ex. chopped, minced, etc."
    },
    //... more ingredients as needed
  ],
  "directions": [
    "step by step",
    "instructions to prepare",
    "this taco recipe
  ]
}
```

## Deploying an update
This application is deployed to Heroku

Make sure you are logged into the Tandem team account in the CLI
```bash
heroku login -i
```

Check that you have Heroku's remote setup for the app
```bash
heroku git:remote -a guac-is-extra
```

Push the updated code to Heroku
```bash
git push heroku main
```

And make sure you don't forget to push your changes to the Github remote as well 🤗
```bash
git push origin head
```

## Technologies used
- [Express](https://expressjs.com/)
- [Mocha](https://mochajs.org/)
- [expect.js](https://github.com/Automattic/expect.js)