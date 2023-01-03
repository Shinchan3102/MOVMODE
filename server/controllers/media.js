const reviewModel = require('../models/review');
const userModel = require('../models/users');
const tmdbApi = require('../tmdb/api');
const favoriteModel = require('../models/favorite');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();

const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

    return res.status(200).json(response);
  } catch (error) {
    
    res.status(400).json({ error });
  }
};

const getGenres = async (req, res) => {
  try {
   
    const { mediaType } = req.params;
   
    const response = await tmdbApi.mediaGenre({ mediaType });
   
    return res.status(200).json({ response });
  } catch (error) {
    
    res.status(400).json({ error });
  }
};

const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;
    

    const data = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType
    });
    
    return res.status(200).json({ data });
  } catch (error) {
    
    res.status(400).json({ error });
  }
};

const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;


    const params = { mediaType, mediaId };

    const media = await tmdbApi.mediaDetail(params);

    media.credits = await tmdbApi.mediaCredits(params);

    media.videos = await tmdbApi.mediaVideos(params);

    const recommend = await tmdbApi.mediaRecommend(params);

    media.recommend = recommend.results;

    media.images = await tmdbApi.mediaImages(params);
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[1];

    if (token) {
      
      const data = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = data?.data;
      if (data) {
        const user = await userModel.findById(data?.data);
       
        if (user) {
          const isFavorite = await favoriteModel.findOne({ user: user._id, mediaId });
         
          media.isFavorite = isFavorite !== null;
        }
      }
    }

    media.reviews = await reviewModel.find({ mediaId }).populate("user").sort({date:-1});

    res.status(200).json({ media });
  } catch (e) {
   
    res.status(400).json({ e });
  }
};

module.exports = { getList, getGenres, search, getDetail };