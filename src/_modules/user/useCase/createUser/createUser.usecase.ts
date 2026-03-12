import { UserEntity } from 'src/infra/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import {
	ICreateUserUseCase as ICreateUserUseCase,
} from './createUser.interface';
import { CryptoService } from 'src/_shared/crypto/crypto.service';
import {
  ConflictException,
  ForbiddenException,
  Inject,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../../infra/dto/in/create-user.dto';
import { RoleEntity } from 'src/infra/database/entities/role.entity';

export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(
    @Inject(RepositoryProxyModule.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(RepositoryProxyModule.ROLE_REPOSITORY)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly cryptoService: CryptoService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      const userExists = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (userExists) {
        throw new ConflictException('Já existe um usuário cadastrado');
      }

      if (createUserDto.roleId === 1) {
        throw new ForbiddenException(
          'Operação inválida!',
        );
      }

      const role = await this.roleRepository.findOneBy({ id: createUserDto.roleId });

      if (!role) {
        throw new NotFoundException('Role não encontrada');
      }

      const encryptedPassword = this.cryptoService.encryptPassword(
        createUserDto.password,
      );

      const { roleId, ...userData } = createUserDto;

      const newUser = this.userRepository.create({
        ...userData,
        password: encryptedPassword,
        roles: [role],
      });

      return this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
