const DOMAIN = 'http://192.168.43.242:8000/'
// const DOMAIN = 'https://apifollowbees.pythonanywhere.com/'
const Urls = {
    REGISTER: `${DOMAIN}api/users/register/`,
    LOGIN: `${DOMAIN}api/users/login/`,
    LOGOUT: `${DOMAIN}api/users/logout/`,
    SEARCH: `${DOMAIN}api/trips/search/?search=`,
    HOME: `${DOMAIN}api/users/register/`,
    USER_PROFILE: `${DOMAIN}api/userprofile/username/`,
    TOP: `${DOMAIN}api/trips/`,
    CREATE_TRIP: `${DOMAIN}api/trips/`,
    GET_USER_NAME: `${DOMAIN}api/userprofile/username/`,
    CREATE_PLACE: `${DOMAIN}api/places/create/place/`,
    DETAIL_PLACE: `${DOMAIN}api/places/place/`,
    USER_TRIPS: `${DOMAIN}api/userprofile/usertrips/`,
    CREATE_PLAN_TRIP: `${DOMAIN}api/plantrip/create/`,
    USER_PLANNED_TRIP: `${DOMAIN}api/plantrip/usersplanned/`,
    ADD_PLACE_TO_PLAN_TRIP: `${DOMAIN}api/plantrip/add/place/`,
    GET_TRIP_BY_USERNAME: `${DOMAIN}api/userprofile/trips/`,
    FOLLOW: `${DOMAIN}api/userprofile/follow/`,
    FOLLOWING: `${DOMAIN}api/userprofile/following/`,
    FOLLOWERS: `${DOMAIN}api/userprofile/followers/`,
    UPDATE_PROFILE: `${DOMAIN}api/userprofile/update/`,
    REQUEST_RESET_PASSWORD: `${DOMAIN}api/auth/password_reset/`,
    CONFIRM_PASSWORD_RESET: `${DOMAIN}api/auth/password_reset/confirm/`,
    DONATE_STRIPE: `${DOMAIN}api/stripe/donate/`
}

export default Urls;