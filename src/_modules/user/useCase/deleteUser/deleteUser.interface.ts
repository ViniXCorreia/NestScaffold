import { UserEntity } from 'src/infra/database/entities/user.entity';

export const DELETE_USER_USE_CASE = 'DeletePersonUseCase';

export interface IDeleteUserByDocumentNumberUseCase {
	execute(documentNumber: string): Promise<UserEntity>;
}
