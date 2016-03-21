
# Why?

[Stripe](https://stripe.com) is an amazing payment solution.

[Stripe.js](https://stripe.com/docs/stripe.js) can be used to collect credit card details easily.
But Stripe.js also has built-in validators to check the format of credit card, CVC, bank account, and routing numbers, as well as a card's type and expiration.
However, Stripe.js is only available for the browser with script tag  inclusion (and as global variable "Stripe").

The projet [stripe-node](https://github.com/stripe/stripe-node) is the Stripe API wrapper for node.js but do not export the Stripe.js usefull functions. It's the goal of this project.

This project only export some usefull [jquery.payment](https://github.com/stripe/jquery.payment) functions.
If you use jquery, you can use jquery.payment directly.
See related thread https://github.com/stripe/stripe-node/issues/228 for more details.

# Available functions

* cardType
* formatCardNumber
* formatExpiry
* validateCardNumber
* validateExpiry
* validateCVC

See [Stripe.js doc](https://stripe.com/docs/stripe.js)

# Usage

```js
import { cardType, formatCardNumber } from 'stripe.js';

const type = cardType('4242424242424242');
// type === 'visa'

const formattedCardNumber = formatCardNumber('4242424242424242');
// formattedCardNumber === '4242 4242 4242 4242'
```

# Install

```sh
$ npm install stripe.js --save
```
