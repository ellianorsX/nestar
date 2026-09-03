import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardArticleService } from './board-article.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { BoardArticle, BoardArticles } from '../../libs/dto/board-article/board-article';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import {
	AllBoardArticlesInquiry,
	BoardArticleInput,
	BoardArticlesInquiry,
} from '../../libs/dto/board-article/board-article.input';
import * as mongoose from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { BoardArticleUpdate } from '../../libs/dto/board-article/board-article.update';
import { MemberType } from '../../libs/enums/member.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import * as mongoose_1 from 'mongoose';

@Resolver()
export class BoardArticleResolver {
	constructor(private readonly boardArticleService: BoardArticleService) {}

	/**''''''''''''''''''''''''''''createBoardArticles''''''''''''''''''''''''''''''''''''''''''''  **/
	@UseGuards(AuthGuard)
	@Mutation(() => BoardArticle)
	public async createBoardArticle(
		@Args('input') input: BoardArticleInput,
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<BoardArticle> {
		console.log('Mutation: createBoardArticle');

		return await this.boardArticleService.createBoardArticle(memberId, input);
	}

	/**''''''''''''''''''''''''''''getBoardArticle''''''''''''''''''''''''''''''''''''''''''''  **/

	@UseGuards(WithoutGuard)
	@Query(() => BoardArticle)
	public async getBoardArticle(
		@Args('articleId') input: string,
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<BoardArticle> {
		console.log('Query: getProperty');

		const articleId = shapeIntoMongoObjectId(input);

		return await this.boardArticleService.getBoardArticle(memberId, articleId);
	}

	/**''''''''''''''''''''''''''''updateBoardArticles''''''''''''''''''''''''''''''''''''''''''''  **/
	@UseGuards(AuthGuard)
	@Mutation(() => BoardArticle)
	public async updateBoardArticle(
		@Args('input') input: BoardArticleUpdate,
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<BoardArticle> {
		console.log('Mutation: updateBoardArticle');

		input._id = shapeIntoMongoObjectId(input._id);

		return await this.boardArticleService.updateBoardArticle(memberId, input);
	}

	/**''''''''''''''''''''''''''''getBoardArticles''''''''''''''''''''''''''''''''''''''''''''  **/
	@UseGuards(WithoutGuard)
	@Query(() => BoardArticles)
	public async getBoardArticles(
		@Args('input') input: BoardArticlesInquiry,
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<BoardArticles> {
		console.log('Query: getBoardArticles');

		// input.search.memberId = shapeIntoMongoObjectId(input.search.memberId);

		return await this.boardArticleService.getBoardArticles(memberId, input);
	}

	/**''''''''''''''''''''''''''''ONLY FOR ADMIN''''''''''''''''''''''''''''''''''''''''''''  **/
	/**''''''''''''''''''''''''''''getAllBoardArticlesByAdmin''''''''''''''''''''''''''''''''''''''''''''  **/
	/** ADMIN **/

	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Query(() => BoardArticles)
	public async getAllBoardArticlesByAdmin(
		@Args('input') input: AllBoardArticlesInquiry,
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<BoardArticles> {
		console.log('Query: getAllBoardArticlesByAdmin');

		return await this.boardArticleService.getAllBoardArticlesByAdmin(input);
	}

	/**''''''''''''''''''''''''''''updateBoardArticlesByAdmin''''''''''''''''''''''''''''''''''''''''''''  **/
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => BoardArticle)
	public async updateBoardArticleByAdmin(
		@Args('input') input: BoardArticleUpdate,
		@AuthMember('_id') memberId: mongoose_1.ObjectId,
	): Promise<BoardArticle> {
		console.log('Mutation: updateBoardArticleByAdmin');

		input._id = shapeIntoMongoObjectId(input._id);

		return await this.boardArticleService.updateBoardArticleByAdmin(input);
	}

	/**''''''''''''''''''''''''''''removeBoardArticlesByAdmin''''''''''''''''''''''''''''''''''''''''''''  **/
	@Roles(MemberType.ADMIN)
	@UseGuards(RolesGuard)
	@Mutation(() => BoardArticle)
	public async removeBoardArticleByAdmin(
		@Args('articleId') input: string,
		@AuthMember('_id') memberId: mongoose.ObjectId,
	): Promise<BoardArticle> {
		console.log('Mutation: removeBoardArticleByAdmin');

		const articleId = shapeIntoMongoObjectId(input);

		return await this.boardArticleService.removeBoardArticleByAdmin(articleId);
	}
}
