import Env from '@ioc:Adonis/Core/Env'
import Config from "@ioc:Adonis/Core/Config";

export default class StripesController {
    async checkout ({ response }) {
      const stripe = require('stripe')(Config.get('stripe.key_secret'));
      let paymentMethod = await stripe.paymentMethods.create({
        // dados q virão do front-end
        type: "card",
        card: {
          number: "4242424242424242",
          exp_month: 10,
          exp_year: 2023,
          cvc: 314
        }
      })

       await stripe.paymentIntents.create({
        // dados q virão do front-end
        payment_method: paymentMethod.id,
        amount: 524000,
        currency: "aoa",
        description: "Roteamento",
        confirm: true,
        automatic_payment_methods: {enabled: true},
        return_url: `${Env.get('APP_URL')}/payment_success`
      }).then( () => {
        return response.redirect().toRoute("/payment_success")
      })
      .catch( () => {
        return response.redirect().toRoute("/payment_error")
      });
    }
    
    async paySuccess ({ response }) {
      return response.status(200).json({ message: "Pagamento realizado com sucesso" })
    }
  
    async payError ({ response }) {
      return response.status(200).json({ message: "Falha ao realizar pagamento" })
    }
}
