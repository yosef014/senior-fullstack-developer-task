import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserStatusEnum1752129146134 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Change old column name
        await queryRunner.query(`
      ALTER TABLE users RENAME COLUMN status TO old_status
    `);


        await queryRunner.query(`
      ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'Enabled'
    `);


        await queryRunner.query(`
      UPDATE users
      SET status = CASE
        WHEN old_status = 1 THEN 'Enabled'
        WHEN old_status = 0 THEN 'Disabled'
        ELSE 'Disabled'
      END
    `);

        await queryRunner.query(`
      ALTER TABLE users DROP COLUMN old_status
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      ALTER TABLE users ADD COLUMN old_status INTEGER
    `);

        await queryRunner.query(`
      UPDATE users
      SET old_status = CASE
        WHEN status = 'Enabled' THEN 1
        ELSE 0
      END
    `);

        await queryRunner.query(`
      ALTER TABLE users DROP COLUMN status
    `);

        await queryRunner.query(`
      ALTER TABLE users RENAME COLUMN old_status TO status
    `);
    }

}
