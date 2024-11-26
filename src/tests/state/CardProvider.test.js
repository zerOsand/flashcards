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

	/* BEGIN ADDCARD */
	const addedCard = { front: 'sauron', back: 'lord of the rings', tags: ['ainur', 'immortal', 'immoral'] }
	const singleCard = { front: 'manwe', back: 'lord of the valar', tags: ['ainur', 'immortal', 'moral'] }

	test('addCard-base', () => {
		act(() => {
			result.current.addCard(...Object.values(addedCard))
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(addedCard.front)
		expect(result.current.cards[0].back).toBe(addedCard.back)
		expect(result.current.cards[0].tags).toBe(addedCard.tags)
	})

	test('addCard-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		act(() => {
			expect(() => result.current.addCard(Object.values(addedCard))).toThrow()
		})
	})

	test('addCard-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		act(() => {
			result.current.addCard(...Object.values(addedCard))
		})
		expect(result.current.cards).toHaveLength(1)
		expect(result.current.cards[0].front).toBe(addedCard.front)
		expect(result.current.cards[0].back).toBe(addedCard.back)
		expect(result.current.cards[0].tags).toBe(addedCard.tags)
	})

	test('addCard-cards-single', () => {
		act(() => {
			result.current.forceCards([singleCard])
		})
		act(() => {
			result.current.addCard(...Object.values(addedCard))
		})
		expect(result.current.cards).toHaveLength(2)
		expect(result.current.cards[0].front).toBe(addedCard.front)
		expect(result.current.cards[0].back).toBe(addedCard.back)
		expect(result.current.cards[0].tags).toBe(addedCard.tags)
	})

	test('addCard-front-undefined', () => {
		act(() => {
			expect(() => result.current.addCard(undefined, addedCard.back, addedCard.tags)).toThrow()
		})
	})

	test('addCard-front-number', () => {
		act(() => {
			expect(() => result.current.addCard(1, addedCard.back, addedCard.tags)).toThrow()
		})
	})

	test('addCard-back-undefined', () => {
		act(() => {
			expect(() => result.current.addCard(addedCard.front, undefined, addedCard.tags)).toThrow()
		})
	})

	test('addCard-back-number', () => {
		act(() => {
			expect(() => result.current.addCard(addedCard.front, 1, addedCard.tags)).toThrow()
		})
	})

	test('addCard-tags-undefined', () => {
		act(() => {
			expect(() => result.current.addCard(addedCard.front, addedCard.back, undefined)).toThrow()
		})
	})

	test('addCard-tags-numbers', () => {
		act(() => {
			expect(() => result.current.addCard(addedCard.front, addedCard.back, [1, 2, 3])).toThrow()
		})
	})

	test('addCard-tags-empty', () => {
		act(() => {
			result.current.addCard(addedCard.front, addedCard.back, [])
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(addedCard.front)
		expect(result.current.cards[0].back).toBe(addedCard.back)
		expect(result.current.cards[0].tags).toStrictEqual([])
	})

	test('addCard-tags-empty', () => {
		act(() => {
			result.current.addCard(addedCard.front, addedCard.back, ['ainur'])
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(addedCard.front)
		expect(result.current.cards[0].back).toBe(addedCard.back)
		expect(result.current.cards[0].tags).toStrictEqual(['ainur'])
	})

	/* END ADDCARD */
	/* BEGIN REMOVECARD */

	test('removeCard-base', () => {
		act(() => {
			result.current.removeCard(0)
		})
		expect(result.current.cards).toHaveLength(testCards.length - 1)
		expect(result.current.cards[0].front).toBe('thingol')
	})

	test('removeCard-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		act(() => {
			expect(() => result.current.removeCard(0)).toThrow()
		})
	})

	test('removeCard-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		act(() => {
			expect(() => result.current.removeCard(0)).toThrow()
		})
	})

	test('removeCard-cards-single', () => {
		act(() => {
			result.current.forceCards([singleCard])
		})
		act(() => {
			result.current.removeCard(0)
		})
		expect(result.current.cards).toHaveLength(0)
	})

	test('removeCard-index-undefined', () => {
		act(() => {
			expect(() => result.current.removeCard(undefined)).toThrow()
		})
	})

	test('removeCard-index-negative', () => {
		act(() => {
			expect(() => result.current.removeCard(-1)).toThrow()
		})
	})

	test('removeCard-index-middle', () => {
		act(() => {
			result.current.removeCard(3)
		})
		expect(result.current.cards).toHaveLength(testCards.length - 1)
		expect(result.current.cards[3].front).toBe('mablung')
	})

	test('removeCard-index-match', () => {
		act(() => {
			result.current.removeCard(testCards.length - 1)
		})
		expect(result.current.cards).toHaveLength(testCards.length - 1)
		expect(result.current.cards[testCards.length - 2].front).toBe('beleg')
	})

	test('removeCard-index-negative', () => {
		act(() => {
			expect(() => result.current.removeCard(8)).toThrow()
		})
	})

	test('removeCard-index-string', () => {
		act(() => {
			expect(() => result.current.removeCard('beren')).toThrow()
		})
	})

	/* END REMOVECARD */

})

// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:
