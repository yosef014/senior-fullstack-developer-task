import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserRolesToJson1752128463510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // 1. Create a temporary column 'roles' of type TEXT (since SQLite doesn't support real JSON)

        await queryRunner.query(`ALTER TABLE users ADD COLUMN roles TEXT`);

        // 2. Copy the values from the 'role' column into 'roles' as a JSON array
        await queryRunner.query(`
      UPDATE users SET roles = json('[' || quote(role) || ']')
    `);

        // 3. Drop the old 'role' column
        await queryRunner.query(`ALTER TABLE users DROP COLUMN role`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD COLUMN role TEXT`);
        await queryRunner.query(`
      UPDATE users SET role = 
        json_extract(roles, '$[0]')
    `);

        await queryRunner.query(`ALTER TABLE users DROP COLUMN roles`);
    }


}
