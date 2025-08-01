const categorySelection = (category) => {
    switch (category) {
        case "burgers":
            return ["Burgers", "Happy Meal", "Chicken & Fish"];
        case "beverage":
            return ["Beverages"];

        case "dessert":
            return ["Desserts"];
        default:
            return undefined;

    }
};

export default categorySelection;