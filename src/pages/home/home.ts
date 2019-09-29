import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ProductProvider, Product } from '../../providers/product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  onlyInactives: boolean = false;
  searchText: string = null;

  constructor(public navCtrl: NavController,
              private toastCtrl: ToastController,
              private productProvider: ProductProvider) {

  }

  ionViewDidEnter(){
   
    this.getAllProducts();
  }

  getAllProducts(){

    this.productProvider.getAll(!this.onlyInactives, this.searchText)
    .then((result: any[]) => {
      
      this.products = result;
    })
    .catch(err => console.error('Falha ao tentar carregar o getAllProducts.'));
  }

  addProduct(){
    
    this.navCtrl.push('EditProductPage');
  }

  editProduct(id: number){
    
    this.navCtrl.push('EditProductPage', {id: id});
  }

  removeProduct(product: Product){

    this.productProvider.delete(product.id)
    .then(() => {

      var index = this.products.indexOf(product);

      this.products.splice(index, 1);

      this.toastCtrl.create({
        message: "Produto removido com sucesso!",
        duration: 7000, position: 'botton'
      })
      .present();
    })
    .catch(err => console.error('Falha ao tentar remover producto', err));
  }

  filterProducts(ev: any){

    this.getAllProducts();
  }
}
