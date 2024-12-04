import { act } from 'react'
import { beforeEach, describe, expect, test, mock } from '@jest/globals';
import { renderHook, waitFor } from '@testing-library/react';
import { CardProvider, useCards } from '../../state/CardProvider.js';


describe('CardProvider', () => {
	const testCards = [
		{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal'], master: 0 },
		{ id: 2, front: 'thingol', back: 'king of doriath', tags: ['elf', 'mortal'], master: 0 },
		{ id: 3, front: 'luthien', back: 'princess of doriath', tags: ['elf', 'immortal', 'maia', 'magician'] , master: 0 },
		{ id: 4, front: 'huan', back: 'hound of valinor', tags: ['wolf', 'immortal'], master: 0 },
		{ id: 5, front: 'mablung', back: 'captian of doriath', tags: ['elf', 'mortal'], master: 0 },
		{ id: 6, front: 'beleg', back: 'the archer', tags: ['elf', 'mortal'], master: 0 },
		{ id: 7, front: 'carcharoth', back: 'guard of angband', tags: ['wolf', 'werewolf'], master: 0 },
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

	const newCard = { front: 'sauron', back: 'lord of the rings', tags: ['ainur', 'immortal', 'immoral'], master: 0 }
	const singleCard = { id: 1, front: 'manwe', back: 'lord of the valar', tags: ['ainur', 'immortal', 'moral'], master: 0 }
	/* BEGIN ADDCARD */

	test('addCard-base', () => {
		act(() => {
			result.current.addCard(...Object.values(newCard))
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toBe(newCard.tags)
		expect(result.current.cards[0].master).toBe(0)
	})

	test('addCard-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		expect(() => result.current.addCard(Object.values(newCard))).toThrow()
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
		expect(result.current.cards[0].master).toBe(0)
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
		expect(result.current.cards[0].master).toBe(0)
	})

	test('addCard-front-undefined', () => {
		expect(() => result.current.addCard(undefined, newCard.back, newCard.tags)).toThrow()
	})

	test('addCard-front-number', () => {
		expect(() => result.current.addCard(1, newCard.back, newCard.tags)).toThrow()
	})

	test('addCard-back-undefined', () => {
		expect(() => result.current.addCard(newCard.front, undefined, newCard.tags)).toThrow()
	})

	test('addCard-back-number', () => {
		expect(() => result.current.addCard(newCard.front, 1, newCard.tags)).toThrow()
	})

	test('addCard-tags-undefined', () => {
		expect(() => result.current.addCard(newCard.front, newCard.back, undefined)).toThrow()
	})

	test('addCard-tags-numbers', () => {
		expect(() => result.current.addCard(newCard.front, newCard.back, [1, 2, 3])).toThrow()
	})

	test('addCard-tags-empty', () => {
		act(() => {
			result.current.addCard(newCard.front, newCard.back, [])
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toStrictEqual([])
		expect(result.current.cards[0].master).toBe(0)
	})

	test('addCard-tags-empty', () => {
		act(() => {
			result.current.addCard(newCard.front, newCard.back, ['ainur'])
		})
		expect(result.current.cards).toHaveLength(testCards.length + 1)
		expect(result.current.cards[0].front).toBe(newCard.front)
		expect(result.current.cards[0].back).toBe(newCard.back)
		expect(result.current.cards[0].tags).toStrictEqual(['ainur'])
		expect(result.current.cards[0].master).toBe(0)
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
		expect(() => result.current.removeCard(0)).toThrow()
	})

	test('removeCard-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		expect(() => result.current.removeCard(0)).toThrow()
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
		expect(() => result.current.removeCard(undefined)).toThrow()
	})

	test('removeCard-index-negative', () => {
		expect(() => result.current.removeCard(-1)).toThrow()
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
		expect(() => result.current.removeCard(8)).toThrow()
	})

	test('removeCard-index-string', () => {
		expect(() => result.current.removeCard('beren')).toThrow()
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
		expect(result.current.cards[0].master).toBe(0)
	})

	test('editCard-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		expect(() => result.current.editCard(1, ...Object.values(newCard))).toThrow()
	})

	test('editCard-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		expect(() => result.current.editCard(1, ...Object.values(newCard))).toThrow()
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
		expect(result.current.cards[0].master).toBe(0)
	})

	test('editCard-id-undefined', () => {
		expect(() => result.current.editCard(undefined, ...Object.values(newCard))).toThrow()
	})

	test('editCard-id-negative', () => {
		expect(() => result.current.editCard(-1, ...Object.values(newCard))).toThrow()
	})

	test('editCard-id-zero', () => {
		expect(() => result.current.editCard(0, ...Object.values(newCard))).toThrow()
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
		expect(result.current.cards[testCards.length-1].master).toBe(0)
	})

	test('editCard-id-too-high', () => {
		expect(() => result.current.editCard(testCards.length+1, ...Object.values(newCard))).toThrow()
	})

	test('editCard-id-string', () => {
		expect(() => result.current.editCard('beren', ...Object.values(newCard))).toThrow()
	})

	test('editCard-front-undefined', () => {
		expect(() => result.current.editCard(1, undefined, newCard.back, newCard.tags)).toThrow()
	})

	test('editCard-front-number', () => {
		expect(() => result.current.editCard(1, 1, newCard.back, newCard.tags)).toThrow()
	})

	test('editCard-back-undefined', () => {
		expect(() => result.current.editCard(1, newCard.front, undefined, newCard.tags)).toThrow()
	})

	test('editCard-back-number', () => {
		expect(() => result.current.editCard(1, newCard.front, 1, newCard.tags)).toThrow()
	})

	test('editCard-tags-undefined', () => {
		expect(() => result.current.editCard(1, newCard.front, newCard.back, undefined)).toThrow()
	})

	test('editCard-tags-numbers', () => {
		expect(() => result.current.editCard(1, newCard.front, newCard.back, [1, 2, 3])).toThrow()
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
		expect(result.current.cards[0].master).toBe(0)
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
		expect(result.current.cards[0].master).toBe(0)
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
	/* BEGIN MODIFYMASTERY */

	test('modifyMastery-base', () => {
		act(() => {
			result.current.modifyMastery(1, -1)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual([ '!learning', ...testCards[0].tags])
		expect(result.current.cards[0].master).toBe(testCards[0].master - 1)
	})

	test('modifyMastery-cards-undefined', () => {
		act(() => {
			result.current.forceCards(undefined)
		})
		expect(() => result.current.modifyMastery(1, -1)).toThrow()
	})

	test('modifyMastery-cards-empty', () => {
		act(() => {
			result.current.forceCards([])
		})
		expect(() => result.current.modifyMastery(1, -1)).toThrow()
	})

	test('modifyMastery-cards-single', () => {
		act(() => {
			result.current.forceCards([singleCard])
		})
		act(() => {
			result.current.modifyMastery(1, -1)
		})
		expect(result.current.cards).toHaveLength(1)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(singleCard.front)
		expect(result.current.cards[0].back).toBe(singleCard.back)
		expect(result.current.cards[0].tags).toStrictEqual([ '!learning', ...singleCard.tags])
		expect(result.current.cards[0].master).toBe(singleCard.master - 1)
	})

	test('modifyMastery-mastery-neg-5', () => {
		act(() => {
			result.current.modifyMastery(1, -5)
		})
		expect(result.current.cards[0].master).toBe(-5)
		act(() => {
			result.current.modifyMastery(1, 1)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual([ '!learning', ...testCards[0].tags])
		expect(result.current.cards[0].master).toBe(-4)
	})

	test('modifyMastery-mastery-neg-1', () => {
		act(() => {
			result.current.modifyMastery(1, -1)
		})
		expect(result.current.cards[0].master).toBe(-1)
		act(() => {
			result.current.modifyMastery(1, 1)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual(testCards[0].tags)
		expect(result.current.cards[0].master).toBe(0)
	})

	test('modifyMastery-mastery-1', () => {
		act(() => {
			result.current.modifyMastery(1, 1)
		})
		expect(result.current.cards[0].master).toBe(1)
		act(() => {
			result.current.modifyMastery(1, 1)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual(testCards[0].tags)
		expect(result.current.cards[0].master).toBe(2)
	})

	test('modifyMastery-mastery-5', () => {
		act(() => {
			result.current.modifyMastery(1, 5)
		})
		expect(result.current.cards[0].master).toBe(5)
		act(() => {
			result.current.modifyMastery(1, 1)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual(testCards[0].tags)
		expect(result.current.cards[0].master).toBe(6)
	})

	test('modifyMastery-id-undefined', () => {
		expect(() => result.current.modifyMastery(undefined, -1)).toThrow()
	})

	test('modifyMastery-id-negative', () => {
		expect(() => result.current.modifyMastery(-1, -1)).toThrow()
	})

	test('modifyMastery-id-zero', () => {
		expect(() => result.current.modifyMastery(0, -1)).toThrow()
	})

	test('modifyMastery-id-maximum', () => {
		act(() => {
			result.current.modifyMastery(testCards.length, -1)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[testCards.length-1].id).toBe(testCards.length)
		expect(result.current.cards[testCards.length-1].front).toBe(testCards[testCards.length-1].front)
		expect(result.current.cards[testCards.length-1].back).toBe(testCards[testCards.length-1].back)
		expect(result.current.cards[testCards.length-1].tags).toStrictEqual([ '!learning', ...testCards[testCards.length-1].tags])
		expect(result.current.cards[testCards.length-1].master).toBe(testCards[testCards.length-1].master - 1)
		expect(result.current.cards[0].master).toBe(0)
	})

	test('modifyMastery-id-too-high', () => {
		expect(() => result.current.modifyMastery(testCards.length + 1, -1)).toThrow()
	})

	test('modifyMastery-id-string', () => {
		expect(() => result.current.modifyMastery('beren', -1)).toThrow()
	})

	test('modifyMastery-id-num-undefined', () => {
		expect(() => result.current.modifyMastery(1, undefined)).toThrow()
	})

	test('modifyMastery-num-neg-5', () => {
		act(() => {
			result.current.modifyMastery(1, -5)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual([ '!learning', ...testCards[0].tags])
		expect(result.current.cards[0].master).toBe(testCards[0].master - 5)
	})

	test('modifyMastery-num-zero', () => {
		act(() => {
			result.current.modifyMastery(1, 0)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual(testCards[0].tags)
		expect(result.current.cards[0].master).toBe(testCards[0].master)
	})

	test('modifyMastery-num-one', () => {
		act(() => {
			result.current.modifyMastery(1, 1)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual(testCards[0].tags)
		expect(result.current.cards[0].master).toBe(testCards[0].master + 1)
	})

	test('modifyMastery-num-5', () => {
		act(() => {
			result.current.modifyMastery(1, 5)
		})
		expect(result.current.cards).toHaveLength(testCards.length)
		expect(result.current.cards[0].id).toBe(1)
		expect(result.current.cards[0].front).toBe(testCards[0].front)
		expect(result.current.cards[0].back).toBe(testCards[0].back)
		expect(result.current.cards[0].tags).toStrictEqual(testCards[0].tags)
		expect(result.current.cards[0].master).toBe(testCards[0].master + 5)
	})

	test('modifyMastery-id-num-string', () => {
		expect(() => result.current.modifyMastery(1, 'beren')).toThrow()
	})

	/* END MODIFYMASTERY */
})

// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:
