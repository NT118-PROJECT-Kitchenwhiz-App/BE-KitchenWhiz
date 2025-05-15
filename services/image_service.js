const ImageModel = require("../models/image_model");

class ImageService {

    static async createImage(imageData) {
        try {
            const {image_url, image_public_id} = imageData;

            const newImage = new ImageModel({
                image_url,
                image_public_id
            });

            return await newImage.save();
        }
        catch (error) {
            throw error;
        }
    }

    static async getImageId(image_url) {
        try {
            const image = await ImageModel.findOne({image_url});

            if (image) return image._id;
            return null;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = ImageService;