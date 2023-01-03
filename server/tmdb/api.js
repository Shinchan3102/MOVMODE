const axiosClient = require('../axios/client');
const tmdbEndPoints = require('../tmdb/endpoints');

const tmdbApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
        tmdbEndPoints.mediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaDetail({ mediaType, mediaId })
    ),
    mediaGenre: async ({ mediaType }) => await axiosClient.get(
        tmdbEndPoints.mediaGenre({ mediaType })
    ),
    mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaCredits({ mediaType, mediaId })
    ),
    mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaVideos({ mediaType, mediaId })
    ),
    mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaRecommend({ mediaType, mediaId })
    ),
    mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
        tmdbEndPoints.mediaImages({ mediaType, mediaId })
    ),
    mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
        tmdbEndPoints.mediaSearch({ mediaType, query, page })
    ),
    personDetail: async ({ personId }) => await axiosClient.get(
        tmdbEndPoints.personDetail({ personId })
    ),
    personMedias: async ({ personId }) => await axiosClient.get(
        tmdbEndPoints.personMedias({ personId })
    ),
}

module.exports=tmdbApi;