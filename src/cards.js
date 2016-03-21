const defaultFormat = /(\d{1,4})/g;

// Debit cards must come first, since they have more
// specific patterns than their credit-card equivalents.
const cards = [{
	type: 'visaelectron',
	patterns: [4026, 417500, 4405, 4508, 4844, 4913, 4917],
	format: defaultFormat,
	length: [16],
	cvcLength: [3],
	luhn: true
}, {
	type: 'maestro',
	patterns: [5018, 502, 503, 56, 58, 639, 6220, 67],
	format: defaultFormat,
	length: [12, 13, 14, 15, 16, 17, 18, 19],
	cvcLength: [3],
	luhn: true
}, {
	type: 'forbrugsforeningen',
	patterns: [600],
	format: defaultFormat,
	length: [16],
	cvcLength: [3],
	luhn: true
}, {
	type: 'dankort',
	patterns: [5019],
	format: defaultFormat,
	length: [16],
	cvcLength: [3],
	luhn: true
}, {
	type: 'visa',
	patterns: [4],
	format: defaultFormat,
	length: [13, 16],
	cvcLength: [3],
	luhn: true
}, {
	type: 'mastercard',
	patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
	format: defaultFormat,
	length: [16],
	cvcLength: [3],
	luhn: true
}, {
	type: 'amex',
	patterns: [34, 37],
	format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
	length: [15],
	cvcLength: [3, 4],
	luhn: true
}, {
	type: 'dinersclub',
	patterns: [30, 36, 38, 39],
	format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
	length: [14],
	cvcLength: [3],
	luhn: true
}, {
	type: 'discover',
	patterns: [60, 64, 65, 622],
	format: defaultFormat,
	length: [16],
	cvcLength: [3],
	luhn: true
}, {
	type: 'unionpay',
	patterns: [62, 88],
	format: defaultFormat,
	length: [16, 17, 18, 19],
	cvcLength: [3],
	luhn: false
}, {
	type: 'jcb',
	patterns: [35],
	format: defaultFormat,
	length: [16],
	cvcLength: [3],
	luhn: true
}];

export function cardType(cardNumber) {
	if (!cardNumber) {
		return null;
	}

	const card = cardFromNumber(cardNumber);
	return card ? card.type : null;
}

export function cardFromNumber(cardNumber) {
	const num = (cardNumber + '').replace(/\D/g, '');

	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		const patterns = card.patterns;

		for (let j = 0; j < patterns.length; j++) {
			const pattern = patterns[j];
			const p = pattern + '';
			if (num.substr(0, p.length) === p) {
				return card;
			}
		}
	}
}

export function cardFromType(type) {
	for (let i = 0; i < cards.length; i++) {
		const card = cards[i];
		if (card.type === type) {
			return card;
		}
	}
}
