import { CategoryProvider } from './../../providers/category/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Product, ProductProvider } from '../../providers/product/product';

@IonicPage()
@Component({
  selector: 'page-edit-product',
  templateUrl: 'edit-product.html',
})
export class EditProductPage {

  model: Product;

  categories: any[]; 

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toastCtrl: ToastController,
              private productProvider: ProductProvider,
              private categoryProvider: CategoryProvider) {

    this.model = new Product();

    if(this.navParams.data.id){

      this.productProvider.get(this.navParams.data.id)
      .then((result: any) => {

        this.model = result;
      })
    }
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad EditProductPage');

    this.categoryProvider.getAll()
    .then((result: any[]) => {

      this.categories =result;
    })
    .catch(() => {

      this.toastCtrl.create({message: 'Erro ao carregar as categorias.', duration: 7000, position: 'botton'}).present();
    });
  }

  save(){

    this.saveProduct()
    .then(() => {

      this.toastCtrl.create({message: 'Produto salvo com sucesso!', duration: 7000, position: 'botton'}).present();
      this.navCtrl.pop();
    })
    .catch(() => {

      this.toastCtrl.create({message: 'Falha ao tentar salvar produto..', duration: 7000, position: 'botton'}).present();
    });
  }

  private saveProduct(){

    if(this.model.id){

      return this.productProvider.update(this.model);
    }else{

      return this.productProvider.insert(this.model);
    }
  }

}
