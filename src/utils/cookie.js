import jsCookie from 'js-cookie';

/**
 * A utility object for interacting with cookies using the `js-cookie` library.
 * Provides methods to get, set, and remove cookies.
 */
const cookie = {
	get: (key) => jsCookie.get(key),
	set: (key, value, expires) => jsCookie.set(key, value, {expires: expires, sameSite: "strict"}),
	remove: (key) => jsCookie.remove(key),
};

export default cookie;
