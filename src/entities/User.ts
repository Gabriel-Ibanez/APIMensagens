import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid} from "uuid" // utiliza o formato de id aleatório com alias uuid

@Entity("users")
class User {

    @PrimaryColumn()
    readonly id: string;

    @Column() 
    name: string;
    // nao precisa escrever nada dentro dos parênteses
    // escrever o nome de como está na tabela se aqui da Entity fosse diferente

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { User };
