const FactModel = require("../models/facts_model");

class FactService {
    static async createFact(quote) {
        try {
            const fact = new FactModel({
                quote
            });

            return await fact.save();
        }
        catch (error) {
            console.log("Create Fact Error: ", error);
        }
    }

    static async getRandomFact() {
        try {
            const count = await FactModel.countDocuments();
            const randomIndex = Math.floor(Math.random() * count);

            const randomFact = await FactModel.findOne().skip(randomIndex);

            return randomFact;

        }
        catch (error) {
            console.log("Get Random Fact Error: ", error);
        }
    }
}

module.exports = FactService;