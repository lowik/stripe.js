import { cardFromNumber, cardFromType } from './cards';

function trim(str) {
	return str.replace(/^\s+|\s+$/gm, '');
}

function luhnCheck(cardNumber) {
	let odd = true;
	let sum = 0;
	const digits = (cardNumber + '').split('').reverse();

	digits.forEach(digit => {
		digit = parseInt(digit, 10);

		odd = !odd;
		if (odd) {
			digit *= 2;
		}
		if (digit > 9) {
			digit -= 9;
		}
		sum += digit;
	});

	return sum % 10 === 0;
}

export function validateCardNumber(cardNumber) {
	const num = (cardNumber + '').replace(/\s+|-/g, '');
	if (!/^\d+$/.test(num)) {
		return false;
	}

	const card = cardFromNumber(num);
	if (!card) {
		return false;
	}

	return card.length.indexOf(num.length) >= 0 && (!card.luhn || luhnCheck(num));
}

export function validateExpiry(month, year) {
	// Allow passing an object
	/*if (typeof month === 'object' && month.month) {
		let { month, year } = month;
	}*/

	if (!(month && year)) {
		return false;
	}

	month = trim(month);
	year = trim(year);
	if (!/^\d+$/.test(month)) {
		return false;
	}

	if (!/^\d+$/.test(year)) {
		return false;
	}

	if (!(month >= 1 && month <= 12)) {
		return false;
	}

	if (year.length === 2) {
		if (year < 70) {
			year = "20" + year;
		} else {
			year = "19" + year;
		}
	}

	if (year.length !== 4) {
		return false;
	}

	const expiry = new Date(year, month);
	const currentTime = new Date();

	// Months start from 0 in JavaScript
	expiry.setMonth(expiry.getMonth() - 1);

	// The cc expires at the end of the month,
	// so we need to make the expiry the first day
	// of the month after
	expiry.setMonth(expiry.getMonth() + 1, 1);
	return expiry > currentTime;
}

export function validateCVC(cvc, type) {
	cvc = trim(cvc);
	if (!/^\d+$/.test(cvc)) {
		return false;
	}

	const card = cardFromType(type);
	if (card) {
		// Check against a explicit card type
		return card.cvcLength.indexOf(cvc.length) >= 0;
	} else {
		// Check against all types
		return cvc.length >= 3 && cvc.length <= 4;
	}
}
