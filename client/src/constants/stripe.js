// import appConfig from "./config";
import './semantic/semantic.min.css';


const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'development'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_MY_PUBLISHABLE_KEY';

export default STRIPE_PUBLISHABLE;