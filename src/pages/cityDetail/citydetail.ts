import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CityProvider} from "../../providers/binone/city";
import {SerachProvider} from "../../providers/binone/serach";
import {FoodPage} from "../food/food";

/**
 * Generated class for the CitydetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-citydetail',
  templateUrl: 'citydetail.html',
})
export class CitydetailPage {
  navData:any;
  searchInput:any = {};
  public cityId:any;
  public searchContents:any = [];
  public history:any;
  public historys=[];
  public historyName:string='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cityProvider:CityProvider,
    public serachProvider:SerachProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CitydetailPage');
  }
  ngOnInit(){
    this.getDetailData();

  }

  getDetailData(){
    this.navData = this.navParams;
    const id = +this.navData.data.id;
    this.cityId = id;
    this.cityProvider.getDetailCity(id).subscribe(res => {
      this.navData = res;
    });
  }

  search(name:string){
    this.serachProvider.search(this.cityId,name).subscribe(res => {
      console.log(this.cityId,name);
      this.searchContents = res;
      console.log(this.searchContents);
    });
  }

  toFood(historyName,history){
    console.log(historyName,history,89898);
    this.history = history;
    this.historyName = history.name;
    this.historys.push(history);
    localStorage.setItem(this.historyName,'');
    localStorage.setItem(this.historyName,JSON.stringify(history));
    this.searchContents = [];
    this.navCtrl.push(FoodPage);

  }

  getHistory(){
    localStorage.getItem(this.historyName);
  }

    //页面进入时读取localstore
  ionViewDidEnter(){
    this.getHistory();
  }

}
