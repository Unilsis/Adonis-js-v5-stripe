import Env from "@ioc:Adonis/Core/Env";

module.exports = {
    key_publishable: Env.get("STRIPE_PUBLIC_KEY"),
    key_secret: Env.get("STRIPE_SECRET_KEY"),
    url_success: Env.get('APP_URL') + "/payment_success",
    url_error: Env.get('APP_URL') + "/payment_error"
}