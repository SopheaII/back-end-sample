import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1741943950415 implements MigrationInterface {
    name = 'Default1741943950415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transactionOld\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullMessage\` varchar(255) NULL, \`trxId\` varchar(100) NULL, \`apv\` varchar(50) NULL, \`amount\` varchar(20) NULL, \`payBy\` varchar(50) NULL, \`payVia\` varchar(20) NULL, \`payDate\` varchar(50) NULL, \`status\` enum ('pending', 'completed') NOT NULL DEFAULT 'pending', \`createAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updateAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_info\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`userEmail\` varchar(255) NOT NULL, \`userContact\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`role\` varchar(255) NULL DEFAULT 'user', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user_info\``);
        await queryRunner.query(`DROP TABLE \`transactionOld\``);
    }

}
