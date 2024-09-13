module.exports = {
    //Get list of user's liked photos endpoint
    GetListOfLikedPhotosEndpoint : "/users/{username}/likes",

    //Dislike photo endpoint
    DislikePhotoEndpoint : "/photos/{photoId}/like",

    //Get photographer's profile
    GetPhotographerProfile : "/users/{username}",

    GetPhotographerPortfolioLink : "/users/{username}/portfolio",

    GetPhotographerPhotos: "/users/{username}/photos",

}