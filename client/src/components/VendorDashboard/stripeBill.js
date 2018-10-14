
import React, {Component} from 'react';
import Stripe, {StripeProvider} from 'react-stripe-elements';

const {
    CardElement,
    StripeProvider,
    Elements,
    injectStripe,
} = ReactStripeElements

class _CardForm extends Component {
    render() {
        return (
            <form onSubmit={() => this.props.stripe.createToken().then(payload => console.log(payload))}>
                <CardElement />
                <button>Pay</button>
            </form>
        )
    }
}
const CardForm = injectStripe(_CardForm)

class Checkout extends Component {
    render() {
        return (
            <div className="Checkout">
                <h1>Available Elements</h1>
                <Elements>
                    <CardForm />
                </Elements>
            </div>
        )
    }
}

const App = () => {
    return (
        <StripeProvider apiKey="pk_RXwtgk4Z5VR82S94vtwmam6P8qMXQ">
            <Checkout />
        </StripeProvider>
    )
}
ReactDOM.render(<App />, document.querySelector('.App'))