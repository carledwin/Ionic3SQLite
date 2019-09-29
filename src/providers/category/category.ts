import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from './../database/database';

@Injectable()
export class CategoryProvider {

  constructor(public http: HttpClient, private databaseProvider: DatabaseProvider) {
    console.log('Hello CategoryProvider Provider');
  }

  public getAll(active: boolean, name: string = null){

    return this.databaseProvider.getDB()
    .then((db: SQLiteObject) => {

      let sql = 'SELECT * FROM categories';
      
      return db.executeSql(sql, [])
      .then((data: any) => {

        if(data.row.length() > 0){

          let categories: any[] = [];

          for(var p = 0; p < data.rows.length; p++){

            var categorie = data.rows.item(p);

            categories.push(categorie);
          }
          
          console.log('Categorias recuperadas com sucesso');
          return categories;
        }else{

          return [];
        }
      })
      .catch((e) => console.error('Falha ao tentar recuperar as categorias.', e));
    })
    .catch((e) => console.error('Falha ao tentar recuperar as categorias.', e));
  }

}
