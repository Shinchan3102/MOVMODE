const reviewModel=require('../models/review');

const create = async (req, res) => {
    try {
        const { movieId } = req.params;
       

        const review = new reviewModel({
            user: req.userId,
            movieId,
            ...req.body
        });

        await review.save();


        res.status(200).json({ ...review, id: review.id, user: req.user });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const remove = async (req, res) => {
    try {
        const { reviewId } = req.params;
       
        const review = await reviewModel.findOne({
            _id: reviewId,
            user: req.userId
        });

        if (!review) return res.status(500).json({ message: 'not found' });

        await review.remove();

        res.status(200).json({ data:review });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports= { create, remove };