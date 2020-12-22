import { MigrationInterface, QueryRunner } from 'typeorm';

export class addUser1609184562041 implements MigrationInterface {
  name = 'addUser1609184562041';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `users` (`id` varchar(36) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(70) NOT NULL, `roles` text NOT NULL, UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB'
    );
    await queryRunner.query(
      "INSERT INTO `users` (`id`, `username`, `password`, `roles`) VALUES ('f60d593d-9ea9-4add-8f6c-5d86dd8c9f87','admin', '$2a$04$J.qvJcqZRPBlGFKWIxPOYOsPRXpkZmTyTHScEF3Kq5/QXV.8oMcfy', 'ROLE_ADMIN') "
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`'
    );
    await queryRunner.query('DROP TABLE `users`');
  }
}
