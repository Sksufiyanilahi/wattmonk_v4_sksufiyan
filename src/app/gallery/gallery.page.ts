import { Component, OnInit } from '@angular/core';
import { ImageModel, MenuModel, MenuSubModel } from '../camera/menu.model';
import { CAMERA_MODULE_MENU } from '../model/constants';
import { MenuPopupComponent } from './menu-popup/menu-popup.component';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {

  mainMenu: MenuModel[] = JSON.parse(JSON.stringify(CAMERA_MODULE_MENU));
  imageModel: ImageModel;
  totalSize = 3;
  currentPosition = 1;
  menu: MenuModel;
  subMenu: MenuSubModel[] = [];

  private mainMenuIndex = 0;
  private subMenuIndex = 0;
  private imagesIndex = 0;

  constructor(
    private popoverController: PopoverController,
    private navController: NavController
  ) {
    this.setMenu(0);
    this.imageModel = this.mainMenu[0].subMenu[0].images[0];

  }

  ngOnInit() {
    this.imageModel.image = 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAAZAAAAK8BAMAAAAzF/QvAAAAG1BMVEXMzMyWlpacnJyqqqrFxcWxsbGjo6O3t7e+vr6He3KoAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFDklEQVR4nO3ZS2/bxhoG4KEulpYa+8TOUkp6cLK0exqgSykJura86NoGAqRLOwWytts/Xs6QEkd25RRoCyrA8wAWP4s0MC/nwotDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg75t+f/zj4+p5vy9e3z+u+nQU82YdY7x8VD1rXB/24lHVq7scJDWmaU1XPXUUW9dN3iZwV/VpFHOQh9y++53qqSLING9f1l92Va+GTZBF/GF0Eec71VNFkEE8Wb6Px/WXXdWrhxxkmgbTOJ3WrvoTw1fZIp7Xf3eZBtV9KKpeLXKQYRr14eakrPZ7OF6Gi9OQeug8FFWfxnGdglTN9Dguq/0WZyG002NeVn1aHVcpSNPwKi6Laq9JnuvzVMb/FFWvbl7mIHd5KB3F26JK6jVtWW8WOx20qr+bNEPp5qyo+lS3Ige5aC8hl0WVrVMxiTutTIcM20vIi6Lq07u4zEGa85lObldlgzRkBjsTII+ltsvq/uuqPl2chRxkkZfbaT34uyqbxJPHa2tu+aD56uG0qHqUTu5OkHlRNW7ichR3GvnQXAXv27qrepQa0QTJa84oBdlWjYd4Pt5dkW5e5L9cpnp1XFQ9Wp+EJkhsmz8rqsYwvlztXOxG+Yh2fV7FoupPblMTpGl3CrKtNsecXuxcVIY5VtW0u4pF1Z88bb/SI+kmfWdlXeVYh9UjeaX5yhyp58Du3cf6tPl2mTYHMkfyCvWVVategNur/OaPcv8c1qq1ebo4fS7INO5MkWkz9g41yOZ6fl1Urfphqly0xk3EzfX8tKj60wXZ3GGdF1XrbvcxdtDcWm3usE6Kqj9dkH13v7XF6c6F/aEZaId29xvayb55Crkvqkb91LsuZ/u6mQubp5CXRdWzqnhCjGXVeBevV+X6u2iHUPtcOCurflXPP7PXd77j8oq4qQ/tmb0NsvctSr7zXXQL8HSz5+DeorQ3Sfveaw3TZeOue4+4vRM+uPdabZB9bxof0pAZdPfxw03Eg3vT2AYZbt/4dlVyk0bVNG6nzGA7Fy62b3y7qlfVc2/jJ02Em20PVdtdB/c2vvXt/38EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlnV/nzzvrEg8fiHPXseBZnVv1UxxnAcwmCWfq29X3wK4af4MVTzEBb/bku/Yjb6/549fxIkf57ehy9tkNF/l7/XHx+ultUvYXLz77f2GbPwLnz/OgyWk7oYvzoP1dUsbYav1vXe6up1OLqt9xRBzq7DpzbI8LL5GJ9XX8LRXZ85UpDxx58uh7er8Gv4+cPbUH3Mm58/pBNc1bum8/C2DDJ7M523QQbL5mM0rwb3v/U7oeqhNViO5tPzq9sfw3f1ua+WefNdWNV7q3pX+FT/1JMpzY8c5MvRbRuk2nzMqsn1p36D1JM9n+j5m+t5amxqV9rMNnNkFn4b3oayRwafw9MeCf+b99wjqSXptF//cl13Q25t2hQ9MrhqD2yDjF+Ep3MkrC97D5LmSLi6/XwZvizfp9amTTdHwuSsPbANkn/Jn8WqFfq+6KQG1atWeFiulmGyeJOakzbdqhUm8/bAMkgz/N7HzXUk9B3kLzi67bsF/5DPfTfgH1K96bsFAPwFfwCdo8GohZthHgAAAABJRU5ErkJggg==';
  }

  setMenu(index: number) {
    this.menu = this.mainMenu[index];
    if (this.menu.subMenu.length !== 0) {
      this.setSubMenu(index, 0);
    } else {
      this.imageModel = this.menu.imageModel[0];
    }
  }

  setSubMenu(mainMenuIndex: number, subMenuIndex: number) {
    this.mainMenuIndex = mainMenuIndex;
    this.subMenuIndex = subMenuIndex;
    this.imagesIndex = 0;
    this.subMenu = this.mainMenu[mainMenuIndex].subMenu;
    this.imageModel = this.mainMenu[mainMenuIndex].subMenu[subMenuIndex].images[0];
  }

  previousImage() {

  }

  nextImage() {

  }

  showMenu() {
    this.presentPopover();
  }

  async presentPopover() {
    const popover = await this.popoverController.create({
      component: MenuPopupComponent,
      event: null,
      translucent: true
    });
    return await popover.present();
  }

  goBack() {
    this.navController.pop();
  }
}
