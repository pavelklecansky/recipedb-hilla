package cz.klecansky.recipedb.recipe.domain;

public enum Difficulty {
    SUPER_SIMPLE("Super Simple"), EASY("Easy"), AVERAGE("Average"), HARD("Hard"), VERY_DIFFICULT("Very Difficult");

    private final String text;

    Difficulty(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }
}
