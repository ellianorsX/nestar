import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import type { ObjectId } from 'mongoose';

@InputType()
export class MemberUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id!: ObjectId;

	@IsOptional()
	@Field(() => MemberType, { nullable: true })
	memberType?: MemberType;

	@IsOptional()
	@Field(() => MemberStatus, { nullable: true })
	memberStatus?: MemberStatus;

	@IsOptional()
	@Field(() => String, { nullable: true })
	memberPhone?: string;

	@IsOptional()
	@Length(3, 12)
	@Field(() => String, { nullable: true })
	memberNick: string | undefined;

	@IsOptional()
	@Length(5, 12)
	@Field(() => String, { nullable: true })
	memberPassword: string | undefined;

	@IsOptional()
	@Length(5, 100)
	@Field(() => String, { nullable: true })
	memberFullName: string | undefined;

	@IsOptional()
	@Field(() => String, { nullable: true })
	memberImage: string | undefined;

	@IsOptional()
	@Field(() => String, { nullable: true })
	memberAddress?: string | undefined;

	@IsOptional()
	@Field(() => String, { nullable: true })
	memberDesc: string | undefined;

	deleteAt?: Date;
}
