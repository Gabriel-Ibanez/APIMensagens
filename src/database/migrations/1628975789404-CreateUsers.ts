import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1628975789404 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    

    await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "uuid", // tipo uuid
              isPrimary: true, // chave primária
            },
            {
              name: "name",
              type: "varchar", // numero varchar
            },
            {
              name: "email",
              type: "varchar", // numero varchar
            },
            {
              name: "admin",
              type: "boolean",
              default: false,
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "now()",
            },
         ],
        })
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      // desfazer o que foi feito pelo método up
      await queryRunner.dropTable("users");
    }
  }
  