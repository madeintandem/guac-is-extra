const expect = require("expect.js");
const filter = require("../filter");

describe("filter", function () {
  describe("#byName(recipes, name)", function () {
    let recipes = [{ name: "Al Pastor" }, { name: "Papas con Rajas" }];

    describe("when a recipe with a complete match exists", () => {
      it("returns the matching recipe", () => {
        let expected = [recipes[0]];
        let actual = filter.byName(recipes, recipes[0].name);
        expect(actual).to.eql(expected);
      });
    });

    describe("when a recipe with a partial match exists", () => {
      it("returns the matching recipe", () => {
        let expected = [recipes[1]];
        let actual = filter.byName(recipes, "Papas");
        expect(actual).to.eql(expected);
      });
    });

    describe("when no match exists", () => {
      it("returns an empty array", () => {
        let expected = [];
        let actual = filter.byName(recipes, "Fish Tacos");
        expect(actual).to.eql(expected);
      });
    });

    describe("when the casing differs", () => {
      it("returns the matching recipe", () => {
        let expected = [recipes[0]];
        let actual = filter.byName(recipes, recipes[0].name.toUpperCase());
        expect(actual).to.eql(expected);
      });
    });
  });

  describe("#byIncludedIngredients(recipes, ingredients)", function () {
    let recipes = [
      {
        name: "Al Pastor",
        ingredients: [
          { name: "pork shoulder" },
          { name: "pineapple" },
          { name: "onion" },
          { name: "cilantro" },
        ],
      },
      {
        name: "Papas con Rajas",
        ingredients: [
          { name: "potatoes" },
          { name: "rajas chipotle" },
          { name: "queso cotija" },
          { name: "onion" },
          { name: "cilantro" },
        ],
      },
    ];

    describe("when a recipe includes the ingredient as an exact match", () => {
      it("returns the recipe", () => {
        let expected = [recipes[1]];
        let actual = filter.byIncludedIngredients(recipes, ["potatoes"]);
        expect(actual).to.eql(expected);
      });
    });

    describe("when a recipe includes the ingredient as a partial match", () => {
      it("returns the recipe", () => {
        let expected = [recipes[0]];
        let actual = filter.byIncludedIngredients(recipes, ["pork"]);
        expect(actual).to.eql(expected);
      });
    });

    describe("when no recipes include the ingredient", () => {
      it("returns an empty array", () => {
        let expected = [];
        let actual = filter.byIncludedIngredients(recipes, ["beef"]);
        expect(actual).to.eql(expected);
      });
    });

    describe("when more than one ingredient is filtered", () => {
      it("returns recipes that have any of the provided ingredients (OR filtering)", () => {
        let expected = [recipes[0], recipes[1]];
        let actual = filter.byIncludedIngredients(recipes, ["pork", "potatoes"]);
        expect(actual).to.eql(expected);
      });
    });
  });

  describe("#byExcludedIngredients(recipes, ingredients)", function () {
    let recipes = [
      {
        name: "Al Pastor",
        ingredients: [
          { name: "pork shoulder" },
          { name: "pineapple" },
          { name: "onion" },
          { name: "cilantro" },
        ],
      },
      {
        name: "Papas con Rajas",
        ingredients: [
          { name: "potatoes" },
          { name: "rajas chipotle" },
          { name: "queso cotija" },
          { name: "onion" },
          { name: "cilantro" },
        ],
      },
    ];

    describe("when a recipe does not includes the ingredient", () => {
      it("returns the recipe", () => {
        let expected = [recipes[0]];
        let actual = filter.byExcludedIngredients(recipes, ["potatoes"]);
        expect(actual).to.eql(expected);
      });
    });

    describe("when a recipe includes the ingredient as a partial match", () => {
      it("does not return the recipe", () => {
        let expected = [recipes[1]];
        let actual = filter.byExcludedIngredients(recipes, ["pork"]);
        expect(actual).to.eql(expected);
      });
    });

    describe("when no recipes include the ingredient", () => {
      it("returns all the recipes", () => {
        let expected = [recipes[0], recipes[1]];
        let actual = filter.byExcludedIngredients(recipes, ["beef"]);
        expect(actual).to.eql(expected);
      });
    });

    describe("when all recipes include the ingredient", () => {
      it("returns an empty array", () => {
        let expected = [];
        let actual = filter.byExcludedIngredients(recipes, ["cilantro"]);
        expect(actual).to.eql(expected);
      });
    });

    describe("when more than one ingredient is filtered", () => {
      it("returns any recipes that do not have one of the provided ingredients (OR filtering)", () => {
        let expected = [recipes[0], recipes[1]];
        let actual = filter.byExcludedIngredients(recipes, ["pork", "potatoes"]);
        expect(actual).to.eql(expected);
      });
    });
  });
});
