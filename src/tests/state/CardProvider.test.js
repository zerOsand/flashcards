import { act } from 'react'
import { beforeEach, describe, expect, test, jest } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { CardProvider, useCards } from '../../state/CardProvider.js';

describe('CardProvider', () => {
	// Note, id indexing must start at 1
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

	const newCard = { front: 'sauron', back: 'lord of the rings', tags: ['ainur', 'immortal', 'immoral'] }
	const singleCard = { id: 1, front: 'manwe', back: 'lord of the valar', tags: ['ainur', 'immortal', 'moral'] }
	/* BEGIN ADDCARD */

	test('addCard-base', () => {
		act(() => {
			result.current.addCard(...Object.values(newCard))
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toBe(newCard.tags)
	})

	test('addCard-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		act(() => {
			expect(() => result.current.addCard(Object.values(newCard))).toThrow()
		})
	})

	test('addCard-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		act(() => {
			result.current.addCard(...Object.values(newCard))
		})
		expect(result.current.cards).toHaveLength(1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toBe(newCard.tags)
	})

	test('addCard-cards-single', () => {
		act(() => {
			result.current.forceCards([singleCard])
		})
		act(() => {
			result.current.addCard(...Object.values(newCard))
		})
		expect(result.current.cards).toHaveLength(2)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toBe(newCard.tags)
	})

	test('addCard-front-undefined', () => {
		act(() => {
			expect(() => result.current.addCard(undefined, newCard.back, newCard.tags)).toThrow()
		})
	})

	test('addCard-front-number', () => {
		act(() => {
			expect(() => result.current.addCard(1, newCard.back, newCard.tags)).toThrow()
		})
	})

	test('addCard-back-undefined', () => {
		act(() => {
			expect(() => result.current.addCard(newCard.front, undefined, newCard.tags)).toThrow()
		})
	})

	test('addCard-back-number', () => {
		act(() => {
			expect(() => result.current.addCard(newCard.front, 1, newCard.tags)).toThrow()
		})
	})

	test('addCard-tags-undefined', () => {
		act(() => {
			expect(() => result.current.addCard(newCard.front, newCard.back, undefined)).toThrow()
		})
	})

	test('addCard-tags-numbers', () => {
		act(() => {
			expect(() => result.current.addCard(newCard.front, newCard.back, [1, 2, 3])).toThrow()
		})
	})

	test('addCard-tags-empty', () => {
		act(() => {
			result.current.addCard(newCard.front, newCard.back, [])
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toStrictEqual([])
	})

	test('addCard-tags-empty', () => {
		act(() => {
			result.current.addCard(newCard.front, newCard.back, ['ainur'])
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
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
	/* BEGIN EDITCARD */

	test('editCard-base', () => {
		act(() => {
			result.current.editCard(1, ...Object.values(newCard))
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toBe(newCard.tags)
	})

	test('editCard-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		act(() => {
			expect(() => result.current.editCard(1, ...Object.values(newCard))).toThrow()
		})
	})

	test('editCard-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		act(() => {
			expect(() => result.current.editCard(1, ...Object.values(newCard))).toThrow()
		})
	})

	test('editCard-cards-single', () => {
		act(() => {
			result.current.forceCards([singleCard])
		})
		act(() => {
			result.current.editCard(1, ...Object.values(newCard))
		})
		expect(result.current.cards).toHaveLength(1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toBe(newCard.tags)
	})

	test('editCard-id-undefined', () => {
		act(() => {
			expect(() => result.current.editCard(undefined, ...Object.values(newCard))).toThrow()
		})
	})

	test('editCard-id-negative', () => {
		act(() => {
			expect(() => result.current.editCard(-1, ...Object.values(newCard))).toThrow()
		})
	})

	test('editCard-id-zero', () => {
		act(() => {
			expect(() => result.current.editCard(0, ...Object.values(newCard))).toThrow()
		})
	})

	test('editCard-id-maximum', () => {
		act(() => {
			result.current.editCard(testCards.length, ...Object.values(newCard))
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[testCards.length-1].id).toBe(testCards.length)
		expect(result.current.cards[testCards.length-1].front).toBe(newCard.front)
		expect(result.current.cards[testCards.length-1].back).toBe(newCard.back)
		expect(result.current.cards[testCards.length-1].tags).toBe(newCard.tags)
	})

	test('editCard-id-too-high', () => {
		act(() => {
			expect(() => result.current.editCard(testCards.length+1, ...Object.values(newCard))).toThrow()
		})
	})

	test('editCard-id-string', () => {
		act(() => {
			expect(() => result.current.editCard('beren', ...Object.values(newCard))).toThrow()
		})
	})

	test('editCard-front-undefined', () => {
		act(() => {
			expect(() => result.current.editCard(1, undefined, newCard.back, newCard.tags)).toThrow()
		})
	})

	test('editCard-front-number', () => {
		act(() => {
			expect(() => result.current.editCard(1, 1, newCard.back, newCard.tags)).toThrow()
		})
	})

	test('editCard-back-undefined', () => {
		act(() => {
			expect(() => result.current.editCard(1, newCard.front, undefined, newCard.tags)).toThrow()
		})
	})

	test('editCard-back-number', () => {
		act(() => {
			expect(() => result.current.editCard(1, newCard.front, 1, newCard.tags)).toThrow()
		})
	})

	test('editCard-tags-undefined', () => {
		act(() => {
			expect(() => result.current.editCard(1, newCard.front, newCard.back, undefined)).toThrow()
		})
	})

	test('editCard-tags-numbers', () => {
		act(() => {
			expect(() => result.current.editCard(1, newCard.front, newCard.back, [1, 2, 3])).toThrow()
		})
	})

	test('editCard-tags-none', () => {
		act(() => {
			result.current.editCard(1, newCard.front, newCard.back, [])
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toStrictEqual([])
	})

	test('editCard-tags-single', () => {
		act(() => {
			result.current.editCard(1, newCard.front, newCard.back, ['ainur'])
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toStrictEqual(['ainur'])
	})

	/* END EDITCARD */
	/* BEGIN GETTAGS */

	test('getTags-base', () => {
		expect(result.current.getTags()).toStrictEqual(['elf', 'human', 'immortal', 'magician', 'maia',
														'mortal', 'outlaw', 'werewolf', 'wolf'])
	})

	test('getTags-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		expect(() => result.current.getTags()).toThrow()
	})

	test('getTags-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		expect(result.current.getTags()).toStrictEqual([])
	})

	test('getTags-cards-single', () => {
		act(() => {
			result.current.forceCards([singleCard])
		})
		expect(result.current.getTags()).toStrictEqual(['ainur', 'immortal', 'moral'])
	})

	/* END GETTAGS */
})

// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:
