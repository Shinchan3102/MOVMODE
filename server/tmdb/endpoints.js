const config = require("./config");

const tmdbEndPoints={
    mediaList:({mediaType, mediaCategory,page})=>config.getUrl(
        `${mediaType}/${mediaCategory}`,{page}
    ),
    mediaDetail:({mediaType,mediaId})=>config.getUrl(
        `${mediaType}/${mediaId}`
    ),
    mediaGenre:({mediaType})=>config.getUrl(
        `genre/${mediaType}/list`
    ),
    mediaCredits:({mediaType,mediaId})=>config.getUrl(
        `${mediaType}/${mediaId}/credits`
    ),
    mediaVideos:({mediaType,mediaId})=>config.getUrl(
        `${mediaType}/${mediaId}/videos`
    ),
    mediaRecommend:({mediaType,mediaId})=>config.getUrl(
        `${mediaType}/${mediaId}/recommendations`
    ),
    mediaImages:({mediaType,mediaId})=>config.getUrl(
        `${mediaType}/${mediaId}/images`
    ),
    mediaSearch:({mediaType,query,page})=>config.getUrl(
        `search/${mediaType}`,{query,page}
    ),
    personDetail:({personId})=>config.getUrl(
        `person/${personId}`
    ),
    personMedias:({personId})=>config.getUrl(
        `person/${personId}/combined_credits`
    )
};

module.exports=tmdbEndPoints;