const API_ENDPOINT = {
    // Get list of user's liked photos endpoint
    GetListOfLikedPhotosEndpoint: "/users/{0}/likes",

    // Dislike photo endpoint
    DislikePhotoEndpoint: "/photos/{0}/like",

    // Get photographer's profile
    GetPhotographerProfile: "/users/{0}",

    GetPhotographerPortfolioLink: "/users/{0}/portfolio",

    GetPhotographerPhotos: "/users/{0}/photos",

    GetPhotographerLikedPhotos: "/users/{0}/likes"
};

export default API_ENDPOINT;