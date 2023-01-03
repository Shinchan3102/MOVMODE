const favoriteModel = require('../models/favorite');

const addFavorite = async (req, res) => {
    try {
        const isFavorite = await favoriteModel.findOne({
            user: req.userId,
            mediaId: req.body.mediaId
        });
        if (isFavorite) return res.status(200).json({ isFavorite });

        const favorite = new favoriteModel({
            ...req.body,
            user: req.userId
        });

        await favorite.save();

        res.status(200).json({ data:favorite });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const removeFavorite = async (req, res) => {
    try {
        const {favoriteId} = req.params;

        const favorite = await favoriteModel.findOne({
            user: req.userId,
            _id: favoriteId
        });

        if (!favorite) return res.status(500).json({ message: 'not found' });

        await favorite.remove();

        res.status(200).json({ data: favorite });

    } catch (error) {
        res.status(400).json({ error });
    }
};

const getFavoritesOfUser = async (req, res) => {
    try {
        const favorite = await favoriteModel.find({ user: req.userId });

        res.status(200).json({ data:favorite });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports = { addFavorite, removeFavorite, getFavoritesOfUser };