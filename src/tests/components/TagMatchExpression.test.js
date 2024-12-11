import { beforeEach, describe, expect, test, mock } from '@jest/globals';
import { tokenize, tagsMatchExpression } from '../../components/Searchbar/TagMatchExpression';

describe('tokenize', () => {
	test('single tag', () => {
		const input = 'tag1'
		expect(tokenize('tag1')).toEqual(['tag1'])
	})

	test('two tags', () => {
		expect(tokenize('tag1 tag2')).toEqual(['tag1', 'tag2'])
	})

	test('two tags AND', () => {
		expect(tokenize('tag1&tag2')).toEqual(['tag1', '&', 'tag2'])
	})

	test('two tags OR', () => {
		expect(tokenize('tag1|tag2')).toEqual(['tag1', '|', 'tag2'])
	})

	test('two tags XOR', () => {
		expect(tokenize('tag1^tag2')).toEqual(['tag1', '^', 'tag2'])
	})

	test('paren tag', () => {
		expect(tokenize('(tag1)')).toEqual(['(', 'tag1', ')'])
	})

	test('NOT tag', () => {
		expect(tokenize('!tag1')).toEqual(['!', 'tag1'])
	})

	test('syntax', () => {
		expect(tokenize('!)|&^(')).toEqual(['!', ')', '|', '&', '^', '('])
	})

	test('complex expression', () => {
		expect(tokenize('(!tag1)&(!tag2|(tag3^tag4)|tag5)')).toEqual(['(', '!', 'tag1', ')', '&', '(', '!', 'tag2', '|', '(', 'tag3', '^', 'tag4', ')', '|', 'tag5', ')'])
	})

	test('complex expression whitespace', () => {
		expect(tokenize(' ( ! tag1 ) & ( ! tag2 | ( tag3 ^ tag4 ) | tag5 ) ')).toEqual(['(', '!', 'tag1', ')', '&', '(', '!', 'tag2', '|', '(', 'tag3', '^', 'tag4', ')', '|', 'tag5', ')'])
	})

	test('zero tags', () => {
		expect(tagsMatchExpression('tag1', [])).toBe(false)
	})

	test('one tag matched', () => {
		expect(tagsMatchExpression('tag1', ['tag1', 'tag2', 'tag3'])).toBe(true)
	})

	test('one tag unmatched', () => {
		expect(tagsMatchExpression('tag1', ['tag2', 'tag3'])).toBe(false)
	})

	test('one tag one ! matched', () => {
		expect(tagsMatchExpression('!tag1', ['tag2', 'tag3'])).toBe(true)
	})

	test('one tag one ! umatched', () => {
		expect(tagsMatchExpression('!tag1', ['tag1', 'tag2'])).toBe(false)
	})

	test('one & matched', () => {
		expect(tagsMatchExpression('tag1 & tag2', ['tag1', 'tag2', 'tag3'])).toBe(true)
	})

	test('one & umatched', () => {
		expect(tagsMatchExpression('tag1&tag2', ['tag1', 'tag3'])).toBe(false)
	})

	test('two & matched', () => {
		expect(tagsMatchExpression('tag1&tag2&tag3', ['tag1', 'tag2', 'tag3', 'tag4'])).toBe(true)
	})

	test('two & umatched', () => {
		expect(tagsMatchExpression('tag1&tag2&tag3', ['tag1', 'tag3', 'tag4'])).toBe(false)
	})

	test('one | matched', () => {
		expect(tagsMatchExpression('tag1 | tag2', ['tag1', 'tag3'])).toBe(true)
	})

	test('one | umatched', () => {
		expect(tagsMatchExpression('tag1|tag2', ['tag3', 'tag4'])).toBe(false)
	})

	test('two | matched', () => {
		expect(tagsMatchExpression('tag1|tag2|tag3', ['tag1', 'tag4'])).toBe(true)
	})

	test('two | umatched', () => {
		expect(tagsMatchExpression('tag1|tag2|tag3', ['tag4'])).toBe(false)
	})

	test('two ^ matched', () => {
		expect(tagsMatchExpression('tag1^tag2^tag3', ['tag3'])).toBe(true)
	})

	test('two ^ umatched', () => {
		expect(tagsMatchExpression('tag1^tag2^tag3', ['tag1', 'tag2'])).toBe(false)
	})

	test('one & one | matched 1.1', () => {
		expect(tagsMatchExpression('tag1&tag2|tag3', ['tag1', 'tag2'])).toBe(true)
	})

	test('one & one | matched 1.2', () => {
		expect(tagsMatchExpression('tag1&tag2|tag3', ['tag3'])).toBe(true)
	})

	test('one & one | umatched 1.3', () => {
		expect(tagsMatchExpression('tag1&tag2|tag3', ['tag2'])).toBe(false)
	})

	test('one & one | one ! matched 1.4', () => {
		expect(tagsMatchExpression('tag1&!tag2|tag3', ['tag1', 'tag4'])).toBe(true)
	})

	test('one & one | matched 2.1', () => {
		expect(tagsMatchExpression('tag1&(tag2|tag3)', ['tag1', 'tag2'])).toBe(true)
	})

	test('one & one | matched 2.2', () => {
		expect(tagsMatchExpression('tag1&(tag2|tag3)', ['tag1', 'tag3'])).toBe(true)
	})

	test('one & one | umatched 2.3', () => {
		expect(tagsMatchExpression('tag1&(tag2|tag3)', ['tag1', 'tag4'])).toBe(false)
	})

	test('one & one | one ! matched 2.4', () => {
		expect(tagsMatchExpression('tag1&(!tag2|tag3)', ['tag1', 'tag4'])).toBe(true)
	})

	/**
	 * The parser should return TRUE on invalid
	 * substrings and attempt to match the rest.
	 */

	test('() all invalid', () => {
		expect(tagsMatchExpression('()', ['tag1', 'tag4'])).toBe(true)
	})

	test('& tag1 all invalid', () => {
		expect(tagsMatchExpression('& tag1', ['tag1', 'tag4'])).toBe(true)
	})

	test('& tag1 all invalid', () => {
		expect(tagsMatchExpression('!& & tag2', ['tag1', 'tag4'])).toBe(false)
	})

	test('!& & tag2 first invalid', () => {
		expect(tagsMatchExpression('!& & tag2', ['tag1', 'tag4'])).toBe(false)
	})

	test('!& | tag2 first invalid', () => {
		// !{invalid stuff} evalutes to FALSE
		expect(tagsMatchExpression('!& | tag2', ['tag1', 'tag4'])).toBe(false)
	})

	test('tag2 & !! second invalid', () => {
		expect(tagsMatchExpression('tag2 & !!', ['tag1'])).toBe(false)
	})

	test('tag2 | !! second invalid', () => {
		expect(tagsMatchExpression('tag2 | !!', ['tag1'])).toBe(true)
	})

})


// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:
