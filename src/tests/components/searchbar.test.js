import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, mock } from '@jest/globals'
import { toBeInTheDocument} from '@testing-library/jest-dom'
import Searchbar from '../../components/Searchbar'


jest.mock('../../state/CardProvider.js', () => ({
	useCards: () => ({
		cards: [
			{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal', 'moral'] },
			{ id: 2, front: 'thingol', back: 'king of doriath', tags: ['elf', 'mortal', 'moral'] },
			{ id: 3, front: 'luthien', back: 'princess of doriath', tags: ['elf', 'immortal', 'ainur', 'moral'] },
			{ id: 4, front: 'huan', back: 'hound of valinor', tags: ['wolf', 'immortal', 'moral'] },
			{ id: 5, front: 'mablung', back: 'captian of doriath', tags: ['elf', 'mortal', 'moral'] },
			{ id: 6, front: 'beleg', back: 'the archer', tags: ['elf', 'mortal', 'moral'] },
			{ id: 7, front: 'carcharoth', back: 'guard of angband', tags: ['wolf', 'werewolf', 'immoral'] },
			{ id: 8, front: 'sauron', back: 'lord of the rings', tags: ['ainur', 'immortal', 'immoral'] },
			{ id: 9, front: 'manwe', back: 'lord of the valar', tags: [] },
		]
	})
}))


describe('Searchbar', () => {


	let mockChanged
	let input
	beforeEach(() => {
		mockChanged = jest.fn()
		render(<Searchbar onFilteredCardsChange={mockChanged} />)
		input = screen.getByRole('textbox')
	})

	test('renders in document', () => {
		expect(input).toBeInTheDocument()
		expect(input).toHaveAttribute('placeholder', 'tag1 && tag2 || tag3')
	})

	test('empty search does not filter', async () => {
		fireEvent.change(input, { target: { value: '' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toHaveLength(9)
		// explicitly contains element with no tags
		expect(mockChanged).toHaveBeenCalledWith(
			expect.arrayContaining([
				expect.objectContaining({ front: 'manwe' })
			])
		)
	})

	test('zero matches no keywords', async () => {
		fireEvent.change(input, { target: { value: 'valar' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toHaveLength(0)
	})

	test('one matches no keywords', async () => {
		fireEvent.change(input, { target: { value: 'werewolf' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toEqual([
			{id: 7, front: 'carcharoth', back: 'guard of angband', tags: ['wolf', 'werewolf', 'immoral']}
		])
	})

	test('multiple matches no keywords', async () => {
		fireEvent.change(input, { target: { value: 'elf' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toHaveLength(4)
	})

	test('zero matches AND keywords', async () => {
		fireEvent.change(input, { target: { value: 'elf && immoral' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toHaveLength(0)
	})

	test('one matches AND keywords', async () => {
		fireEvent.change(input, { target: { value: 'elf && immortal' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toEqual([
			{ id: 3, front: 'luthien', back: 'princess of doriath', tags: ['elf', 'immortal', 'ainur', 'moral'] },
		])
	})

	test('multiple matches AND keywords', async () => {
		fireEvent.change(input, { target: { value: 'elf && mortal' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toHaveLength(3)
	})

	test('zero matches OR keywords', async () => {
		fireEvent.change(input, { target: { value: 'valar || maiar' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toHaveLength(0)
	})

	test('one matches OR keywords', async () => {
		fireEvent.change(input, { target: { value: 'outlaw || maiar' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toEqual([
			{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal', 'moral'] },
		])
	})

	test('multiply matches OR keywords', async () => {
		fireEvent.change(input, { target: { value: 'immortal || immoral' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toHaveLength(4)
	})

	test('complex and + or one', async () => {
		fireEvent.change(input, { target: { value: 'human || wolf && moral' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toEqual([
			{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal', 'moral'] },
			{ id: 4, front: 'huan', back: 'hound of valinor', tags: ['wolf', 'immortal', 'moral'] },
		])
	})

	test('complex and + or two', async () => {
		fireEvent.change(input, { target: { value: 'human || wolf && immoral' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toEqual([
			{ id: 1, front: 'beren', back: 'the empty-handed', tags: ['human', 'outlaw', 'mortal', 'moral'] },
			{ id: 7, front: 'carcharoth', back: 'guard of angband', tags: ['wolf', 'werewolf', 'immoral'] },
		])
	})

	test('complex and + or three', async () => {
		fireEvent.change(input, { target: { value: 'moral && immortal || wolf && moral' } });
		await waitFor (() => {
			expect(mockChanged).toHaveBeenCalled();
		})

		expect(mockChanged.mock.calls[mockChanged.mock.calls.length -1][0]).toEqual([
			{ id: 3, front: 'luthien', back: 'princess of doriath', tags: ['elf', 'immortal', 'ainur', 'moral'] },
			{ id: 4, front: 'huan', back: 'hound of valinor', tags: ['wolf', 'immortal', 'moral'] },
		])
	})

})

		 
// Local Variables:
// compile-command: "guix shell -m manifest.scm -- npm run test"
// End:

