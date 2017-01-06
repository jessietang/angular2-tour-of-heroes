/**
 * Created by jessietang on 1/5/2017.
 */
// 创建HeroSearchService服务，它会把搜索请求发送到我们服务器上的 Web API
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs';

import {Hero} from './hero';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http){}

  //HeroSearchService中的http.get()调用和HeroService中的很相似，
  // 只是这次带了查询字符串。 显著的不同是：我们不再调用toPromise，
  // 而是直接返回可观察对象。
  search(term: string): Observable<Hero[]>{
    return this.http
    .get(`app/heroes/?name=${term}`)
    .map((r: Response) => r.json().data as Hero[]);
  }

}
