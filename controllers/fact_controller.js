const FactService = require("../services/fact_service");

exports.createFact = async (req, res) => {
    try {
        const {quote} = req.body;
        
        if (!quote) {
            return res.status(400).json({message: "Quote is required"});
        }

        const fact = await FactService.createFact(quote);

        res.status(200).json({message: "Add Fact Successfully"});
    }
    catch (error) {
        console.log("Create New Fact Error: ", error);
        res.status(500).json("Internal Server Error");
    }
}

exports.randomFact = async (req, res) => {
    try {
        const fact = await FactService.getRandomFact();
        
        res.status(200).json(fact);
    }
    catch (error) {
        console.log("Random Fact Recipe Error: ", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}