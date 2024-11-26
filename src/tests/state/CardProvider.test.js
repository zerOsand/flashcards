import { act } from 'react'
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { CardProvider, useCards } from '../../state/CardProvider.js';

describe('CardProvider', () => {
	const testCards = [
		{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal'] },
		{ id: 2, front: 'thingol', back: 'king of doriath', tags: ['elf', 'mortal'] },
		{ id: 3, front: 'luthien', back: 'princess of doriath', tags: ['elf', 'immortal', 'maia', 'magician'] },
		{ id: 4, front: 'huan', back: 'hound of valinor', tags: ['wolf', 'immortal'] },
		{ id: 5, front: 'mablung', back: 'captian of doriath', tags: ['elf', 'mortal'] },
		{ id: 6, front: 'beleg', back: 'the archer', tags: ['elf', 'mortal'] },
		{ id: 7, front: 'carcharoth', back: 'guard of angband', tags: ['wolf', 'werewolf'] },
	]
	const nextCard = { front: 'sauron', back: 'lord of the rings', tags: ['ainur', 'immortal', 'immoral'] }

	let result;
	beforeEach(() => {
		const hookResult = renderHook(() =>
			useCards(), {
				wrapper: CardProvider
			})
		result = hookResult.result

		act(() => {
			result.current.forceCards(testCards)
		})
	})

	test('held forced card state', () => {
		expect(result.current.cards).toHaveLength(7)
	})

	test('addCard adds element to cards', () => {
		act(() => {
			result.current.addCard(nextCard.front, nextCard.back, nextCard.tags)
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
	})

	test('addCard increments id', () => {
		act(() => {
			result.current.addCard(nextCard.front, nextCard.back, nextCard.tags)
		})
		expect(result.current.cards[0].id).toBe(8)
	})

	test('addCard stores front, back, and tag fields', () => {
		act(() => {
			result.current.addCard(nextCard.front, nextCard.back, nextCard.tags)
		})
		expect(result.current.cards[0].front).toBe(nextCard.front)
		expect(result.current.cards[0].back).toBe(nextCard.back)
		expect(result.current.cards[0].tags).toBe(nextCard.tags)
	})

	test('removeCard remove first', () => {
		act(() => {
			result.current.removeCard(0)
		})
		expect(result.current.cards).toHaveLength(testCards.length - 1)
		expect(result.current.cards[0].front).toBe('thingol')
		expect(result.current.cards[testCards.length - 2].front).toBe('carcharoth')
	})

	test('removeCard remove last', () => {
		act(() => {
			result.current.removeCard(testCards.length - 1)
		})
		expect(result.current.cards).toHaveLength(testCards.length - 1)
		expect(result.current.cards[0].front).toBe('beren')
		expect(result.current.cards[testCards.length - 2].front).toBe('beleg')
	})
})

// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:

