import { beforeEach, describe, expect, test, mock } from '@jest/globals';
import jsCookie from 'js-cookie';
import cookie from '../../utils/cookie';


describe('cookies', () => {

	beforeEach(() => {
		jsCookie.remove('test')
	})

	test('cookie.set exists and sets a cookie', () => {
		expect(typeof cookie.get).toBe('function')

		let cookieString = document.cookie;
		expect(cookieString).not.toContain('test')

		cookie.set('test', 'foo', 1)
		cookieString = document.cookie
		expect(cookieString).toContain('test=foo')
	})

	test('get', () => {
		jsCookie.set('test', 'bar')
		expect(cookie.get('test')).toBe('bar')
	})

	test('remove', () => {
		jsCookie.set('test', 'baz')
		cookie.remove('test')
		expect(jsCookie.get('test')).toBeUndefined()
	})
})

// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:
