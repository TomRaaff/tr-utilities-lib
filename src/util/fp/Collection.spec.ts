import { beforeEach, describe, expect, it, } from '@jest/globals';
import Collection from './Collection';

type Employee = {
	id: number;
	name: string;
	role: string;
	isExternalEmployee: boolean;
}

describe('Collection', () => {
	let dataArray: Collection<Employee>;
	beforeEach(() => {
		dataArray = Collection.of([
									  {
										  id: 0,
										  name: 'Rogier',
										  role: 'lead-dev',
										  isExternalEmployee: false,
									  },
									  {
										  id: 1,
										  name: 'Doa',
										  role: 'dev',
										  isExternalEmployee: false,
									  },
									  {
										  id: 2,
										  name: 'Tom',
										  role: 'dev',
										  isExternalEmployee: true,
									  },
									  {
										  id: 3,
										  name: 'Niels',
										  role: 'p.o.',
										  isExternalEmployee: false,
									  },
								  ]);
	});

	it('.contains() should return true when the collection contains an item', () => {
		expect(dataArray.contains({ name: 'Doa' }))
				.toBeTruthy();
	});
	it('.contains() should return false when the collection does not contain an item', () => {
		expect(dataArray.contains({ name: 'Tin' }))
				.toBeFalsy();
	});

	it('.count() should return the length of the collection', () => {
		expect(dataArray.count())
				.toEqual(4);
	});

	it('.push() should add an item to the collection', () => {
		// arrange
		const newItem = {
			id: 4,
			name: 'Jeroen',
			role: 'dev',
			isExternalEmployee: true,
		};
		// act
		dataArray.push(newItem);
		// assert
		expect(dataArray.contains({ name: 'Jeroen' }))
				.toBeTruthy();
	});

	it('.find() should return an array with the requested item', () => {
		// arrange
		const expected = [
			{
				id: 0,
				name: 'Rogier',
				role: 'lead-dev',
				isExternalEmployee: false,
			},
		];
		// act
		const result = dataArray.find({ id: 0 });
		// assert
		expect(result)
				.toEqual(expected);
	});
	it('.find() should return an empty array when item not present', () => {
		// arrange
		// act
		const result = dataArray.find({ id: 349857 });
		// assert
		expect(result)
				.toEqual([]);
	});

	it('.findOne() should return the requested item', () => {
		// arrange
		const expected = {
			id: 0,
			name: 'Rogier',
			role: 'lead-dev',
			isExternalEmployee: false,
		};
		// act
		const result = dataArray.findOne({ id: 0 })
								.getOrElse(() => ({} as Employee));
		// assert
		expect(result).toEqual(expected);
	});
	it('.findOne() should return Maybe.None when item not present', () => {
		// arrange
		const expected = {
			id: 0,
			name: 'Rogier',
			role: 'lead-dev',
			isExternalEmployee: false,
		}
		// act
		const employeeMaybe = dataArray.findOne({ id: 893987 });
		const result = employeeMaybe
								.getOrElse(() => expected);
		// assert
		expect(result).toEqual(expected);
	});

	it('.copy() should return a copy of the Collection', () => {
		// arrange
		const original = dataArray;
		// act
		const copy = original.copy();
		copy.push({
					  id: 4,
					  name: 'Jeroen',
					  role: 'dev',
					  isExternalEmployee: true,
				  });
		// assert
		expect(original.count())
				.not
				.toEqual(copy.count());
	});

	it('.filter() should return a copy of the Collection containing the filtered results', () => {
		// arrange
		// act
		const result = dataArray.filter((employee) => employee.role === 'dev');
		// assert
		expect(result.find({ name: 'Tom' }))
				.toBeTruthy();
		expect(result.find({ name: 'Doa' }))
				.toBeTruthy();
		expect(result.count())
				.toEqual(2);
	});

	it('.map() should return a copy of the Collection containing the mapped results', () => {
		// arrange
		const expected = Collection.of(['lead-dev', 'dev', 'dev', 'p.o.']);
		// act
		const result = dataArray.map((employee) => employee.role);
		// assert
		expect(result)
				.toEqual(expected);
	});

	it('.reduce() should return the reduced result', () => {
		// arrange
		const expected = 3;
		const startItem = {
			id: 0,
			name: 'Lana',
			role: 'dev',
			isExternalEmployee: true,
		};
		// act
		const highestID = dataArray.reduce((acc, cur) => (cur.id > acc.id ? cur : acc), startItem);
		// assert
		expect(highestID.id)
				.toEqual(expected);
	});
});
