import { PropertyStatus } from '../../libs/enums/property.enum';
import { PropertyService } from './property.service';

describe('PropertyService.getProperties', () => {
	it('ignores empty filter arrays and resets to the general list', async () => {
		const aggregate = jest.fn().mockReturnValue({
			exec: jest.fn().mockResolvedValue([
				{
					list: [],
					metaCounter: [{ total: 0 }],
				},
			]),
		});

		const service = new PropertyService({ aggregate } as any, {} as any, {} as any);

		await service.getProperties(
			null as any,
			{
				page: 1,
				limit: 10,
				search: {
					locationList: [],
					roomsList: [],
					bedsList: [],
					typeList: [],
					options: [],
				},
			} as any,
		);

		expect(aggregate).toHaveBeenCalledTimes(1);
		expect(aggregate.mock.calls[0][0][0]).toEqual({
			$match: {
				propertyStatus: PropertyStatus.ACTIVE,
			},
		});
	});
});
