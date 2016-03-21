import { cardFromNumber } from './cards';

export function formatCardNumber(cardNumber) {
	let num = cardNumber.replace(/\D/g, '');
	const card = cardFromNumber(num);
	if (!card) {
		return num;
	}

	const upperLength = card.length[card.length.length - 1];
	num = num.slice(0, upperLength);
	if (card.format.global) {
		const res = num.match(card.format);
		return res ? res.join(' ') : null;
	} else {
		let groups = card.format.exec(num);
		if (!groups) {
			return null;
		}
		groups.shift();
		groups = groups.filter(n => n); // Filter empty groups
		return groups.join(' ');
	}
}

export function formatExpiry(expiry) {
	const parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
	if (!parts) {
		return '';
	}

	let mon = parts[1] || '';
	let sep = parts[2] || '';
	const year = parts[3] || '';

	if (year.length > 0) {
		sep = ' / ';
	} else if (sep === ' /') {
		mon = mon.substring(0, 1);
		sep = '';
	} else if (mon.length === 2 || sep.length > 0) {
		sep = ' / ';
	} else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
		mon = '0' + mon;
		sep = ' / ';
	}
	return mon + sep + year;
}
