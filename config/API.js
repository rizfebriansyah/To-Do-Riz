const BASE_URL = "https://api.stage.mapplecoin.com/"

export default  API ={
    auth:BASE_URL+'v1/auth',
    homeFeed:BASE_URL+'v1/feed/getHomeFeed',
    store:BASE_URL+'v1/feed/getStore',
    transactions:BASE_URL+'v1/user/transactions',
    stripe_pay:"https://api.stripe.com/v1/payment_intents",
}