import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import { ThrowStmt } from '@angular/compiler';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  //rootPage:any = HomePage;
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, databaseProvider: DatabaseProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      databaseProvider.createDatabase()
                      .then(() => {

                        this.openHomePage(splashScreen);
                      })
                      .catch(() => {
                        
                        this.openHomePage(splashScreen);
                      });
    });
  }

  private openHomePage(splashScreen: SplashScreen){

    splashScreen.hide();
    this.rootPage(HomePage);
  }
}

