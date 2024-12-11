import jsCookie from 'js-cookie';

const cookie = {
	get: (key) => jsCookie.get(key),
	set: (key, value, expires) => jsCookie.set(key, value, {expires: expires, sameSite: "strict"}),
	remove: (key) => jsCookie.remove(key),
}


export default cookie
