package cz.klecansky.recipedb.recipe.domain;

public enum Type {
    BREAKFAST("Breakfast"), SALAD("Salad"), SIDE_DISH("Side Dish"), MAIN_DISH("Main Dish"), DRINK("Drink"), DESSERT("Dessert"), BAKING("Baking");
    private final String text;

    Type(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
