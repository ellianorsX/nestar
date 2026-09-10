import { Injectable } from '@nestjs/common';

@Injectable()
export class NestarBatchService {
	getHello(): string {
		return 'Welcome to Nestar BATCH Server!';
	}

	public async batchRollback(): Promise<void> {
		console.log('Batch Rollback Executed');
	}

	public async batchTopProperties(): Promise<void> {
		console.log('Batch Top Properties Executed');
	}

	public async batchTopAgents(): Promise<void> {
		console.log('Batch Top Agents Executed');
	}
}
