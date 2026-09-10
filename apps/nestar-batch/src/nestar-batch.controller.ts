import { Controller, Get, Logger } from '@nestjs/common';
import { NestarBatchService } from './nestar-batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Controller()
export class NestarBatchController {
	[x: string]: any;
	private readonly logger = new Logger(NestarBatchController.name);
	constructor(private readonly nestarBatchService: NestarBatchService) {}

	@Timeout(1000)
	handleTimeout() {
		this.logger.debug('Batch Service Started');
	}

	@Cron('00 00 01 * * *', { name: 'BATCH_ROLLBACK' })
	public async batchRollback() {
		try {
			this.logger['context'] = 'BATCH_ROLLBACK';
			this.logger.debug('EXECUTED!');
			await this.nestarBatchService.batchRollback();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('20 00 01 * * *', { name: 'BATCH_TOP_PROPERTIES' })
	public async batchTopProperties() {
		try {
			this.logger['context'] = 'BATCH_TOP_PROPERTIES';
			this.logger.debug('EXECUTED!');
			await this.nestarBatchService.batchTopProperties();
		} catch (err) {
			this.logger.error(err);
		}
	}

	@Cron('40 00 01 * * *', { name: 'BATCH_TOP_AGENTS' })
	public async batchTopAgents() {
		try {
			this.logger['context'] = 'BATCH_TOP_AGENTS';
			this.logger.debug('EXECUTED!');
			await this.nestarBatchService.batchTopAgents();
		} catch (err) {
			this.logger.error(err);
		}
	}

	/*@Interval(10000)
	handleInterval() {
		this.logger.debug('INTERNAL TEST');
	}*/

	@Get()
	getHello(): string {
		return this.nestarBatchService.getHello();
	}
}
