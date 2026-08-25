import { Field, Int, ObjectType } from '@nestjs/graphql';
import * as mongoose from 'mongoose';

@ObjectType()
export class View {
	@Field(() => String)
	_id!: mongoose.ObjectId;

	@Field(() => String)
	viewGroup!: string;

	@Field(() => String)
	viewRefId!: mongoose.ObjectId;

	@Field(() => String)
	memberId!: mongoose.ObjectId;

	@Field(() => Date)
	createdAt!: Date;

	@Field(() => Date)
	updatedAt!: Date;
}
