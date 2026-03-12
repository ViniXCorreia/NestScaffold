import { UserEntity } from 'src/infra/database/entities/user.entity';

export const FIND_ONE_USER_BY_DOCUMENT_NUMBER =
	'IFindOneUserByDocumentNumberUseCase';

export interface IFindOneUserByDocumentNumberUseCase {
	execute(documentNumber: string): Promise<UserEntity>;
}
