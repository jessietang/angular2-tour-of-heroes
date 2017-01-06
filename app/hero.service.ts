/**
 * Created by jessietang on 1/5/2017.
 */
import {Injectable} from '@angular/core';
import {Hero} from './hero';
/*import {HEROES} from './mock-heroes';*/

import {Headers, Http} from '@angular/http';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{
  /*getHeroes(): Hero[]{
    return HEROES;
  }*/

  // 把HeroService的getHeroes方法改写为返回承诺的形式
  /*getHeroes(): Promise<Hero[]>{
    return Promise.resolve(HEROES);
 }*/
  private heroesUrl = 'app/heroes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http){}

  getHeroes(): Promise<Hero[]>{
    return this.http.get(this.heroesUrl)
    .toPromise()
    .then(response => response.json().data as Hero[])
    .catch(this.handleError);
  }
  /*这个由json方法返回的对象只有一个data属性。 这个data属性保存了英雄数组，
  这个数组才是调用者真正想要的。 所以我们取得这个数组，并且把它作为承诺的值进行解析。*/


  // 模拟慢速连接
  getHeroesSlowly(): Promise<Hero[]>{
    return new Promise<Hero[]>(resolve =>
    setTimeout(resolve,2000))
    .then(() => this.getHeroes());
  }


  //添加一个getHero方法，用来通过id从getHeros过滤英雄列表
  getHero(id: number): Promise<Hero>{
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === id));
  }


  // 我们通过一个编码在 URL 中的英雄 id 来告诉服务器应该更新哪个英雄。
  // put 的 body 是该英雄的 JSON 字符串，它是通过调用JSON.stringify得到的。
  // 并且在请求头中标记出的 body 的内容类型（application/json）
  update(hero: Hero): Promise<Hero>{
    const url = `${this.heroesUrl}/${hero.id}}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);

  }

  create(name: string): Promise<Hero> {
    return this.http
    .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data)
    .catch(this.handleError);
  }


  delete(id: number): Promise<Hero>{
    const url = `${this.heroesUrl}/${id}}`;
    return this.http
    .delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
