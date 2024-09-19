const API_ENDPOINT = {
    // Get list of user's liked photos endpoint
    GetListOfLikedPhotosEndpoint: "/users/{0}/likes",

    // Dislike photo endpoint
    DislikePhotoEndpoint: "/photos/{0}/like",

    // Get photographer's profile
    GetPhotographerProfile: "/users/{0}",

    // Get photographer's portfolio
    GetPhotographerPortfolioLink: "/users/{0}/portfolio",

    // Get photographer's photos
    GetPhotographerPhotos: "/users/{0}/photos",

    // Get photographer's liked photos
    GetPhotographerLikedPhotos: "/users/{0}/likes"
};

export default API_ENDPOINT;