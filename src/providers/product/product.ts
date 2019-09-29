import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Identifiers } from '@angular/compiler';
import { DatabaseProvider } from '../database/database';
import { SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class ProductProvider {

  constructor( public http: HttpClient, private databaseProvider: DatabaseProvider) {
    console.log('Hello ProductProvider Provider');
    
  }
  
  public insert(product: Product){

    return this.databaseProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'INSERT INTO products(name, price, duedate, active, category_id) VALUES(?, ?, ?, ?, ?)';
      let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id];

      return db.executeSql(sql, data)
      .then(msg => console.log('Produto incluido com sucesso'))
      .catch((e) => console.error('Falha ao tentar incluir o produto.', e));
    })
    .catch((e) => console.error('Falha ao tentar incluir o produto.', e));
  }
  
  public update(product: Product){

    return this.databaseProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'UPDATE products SET name = ?, SET price = ?, SET duedate = ?, SET active = ?, SET category_id = ? WHERE id = ?';
      let data = [product.name, product.price, product.duedate, product.active ? 1 : 0, product.category_id, product.id];

      return db.executeSql(sql, data)
      .then(msg => console.log('Produto atualizado com sucesso'))
      .catch((e) => console.error('Falha ao tentar atualizar o produto.', e));
    })
    .catch((e) => console.error('Falha ao tentar atualizar o produto.', e));
  }

  public delete(id: number){

    return this.databaseProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'DELETE products WHERE id = ?';
      let data = [id];

      return db.executeSql(sql, data)
      .then(msg => console.log('Produto excluído com sucesso'))
      .catch((e) => console.error('Falha ao tentar excluir o produto.', e));
    })
    .catch((e) => console.error('Falha ao tentar excluir o produto.', e));
  }

  public get(id: number){

    return this.databaseProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'SELECT * FROM products WHERE id = ?';
      let data = [id];

      return db.executeSql(sql, data)
      .then((data: any) => {

        if(data.row.length() > 0){

          let item = data.rows.item(0);
          
          let product = new Product();

          product.id = item.id;
          product.name = item.name;
          product.price = item.price;
          product.duedate = item.duedate;
          product.active = item.active;
          product.category_id = item.category_id;
          
          console.log('Produto recuperado com sucesso')
          return product;
        }

        return null;
      })
      .catch((e) => console.error('Falha ao tentar recuperar o produto.', e));
    })
    .catch((e) => console.error('Falha ao tentar recuperar o produto.', e));
  }

  public getAll(active: boolean, name: string = null){

    return this.databaseProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'SELECT p.*, c.name AS category_name FROM products p INNER JOIN categories c on p.category_id = c.id WHERE p.active = ?';
      let data: any[] = [active ? 1 : 0];

      if(name){
        
        sql += ' and p.name like ?';

        data.push('%' + name + '%');
      }

      return db.executeSql(sql, data)
      .then((data: any) => {

        if(data.row.length() > 0){

          let products: any[] = [];

          for(var p = 0; p < data.rows.length; p++){

            var product = data.rows.item(p);

            products.push(product);
          }

          console.log('Produtos recuperados com sucesso');
          return products;
        }else{

          return [];
        }
      })
      .catch((e) => console.error('Falha ao tentar recuperar os produtos.', e));
    })
    .catch((e) => console.error('Falha ao tentar recuperar os produtos.', e));
  }
}

export class Product{

  id: number
  name: string;
  price: number;
  duedate: Date;
  active: number;
  category_id: number;
}