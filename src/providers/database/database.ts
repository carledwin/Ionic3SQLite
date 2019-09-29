import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(public http: HttpClient, private sQLite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  getDB(){

    return this.sQLite.create({
      
      name: 'products.db',
      location: 'default'
    });
  }

  public createDatabase(){

    return this.getDB()
                .then((db: SQLiteObject) =>{

                  this.createTables(db);
                  this.insertDefaultItem(db);
                })
                .catch(e => console.error(e));
  }

  private createTables(db: SQLiteObject){

    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS categories(id integer primary key AUTOINCREMENT NOT NULL, name TEXT) '],
      ['CREATE TABLE IF NOT EXISTS products(id integer primary key AUTOINCREMENT NOT NULL, name TEXT, price REAL, duedate DATE, active integer, category_id integer, FOREIGN KEY(category_id) REFERENCES categories(id))']
    ])
    .then(() => console.log('Tabelas criadas com sucesso!'))
    .catch((e) => console.error('Falha ao tentar criar tabelas', e))
  }

  private insertDefaultItem(db: SQLiteObject){

    db.executeSql('SELECT COUNT(id) AS qtd FROM categories')
      .then((data: any) => {

        if(data.row.item(0).qtd == 0){

          db.sqlBatch([
            ['INSERT INTO categories(name) VALUES(?)', ['Hambúrgueres']],
            ['INSERT INTO categories(name) VALUES(?)', ['Bebidas']],
            ['INSERT INTO categories(name) VALUES(?)', ['Sobremesas']]
          ])
          .then(() => console.log('Dados inicias incluidos com sucesso!'))
          .catch(e => console.error('Falha ao tentar incluir dados inicias', e));
        }
      })
      .catch(e => console.error('Falha ao tentar consultar quantidade de categorias', e));

  }

}
