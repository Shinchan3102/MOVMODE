
const tmdbApi=require('../tmdb/api');

const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;

        const person = await tmdbApi.personDetail({ personId });

        res.status(200).json({ data:person });
    } catch (error) {
        res.status(400).json({ error });
    }
};

const personMedias = async (req, res) => {
    try {
        const { personId } = req.params;

        const medias = await tmdbApi.personMedias({ personId });

        res.status(200).json({ data:medias });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports={personDetail,personMedias}