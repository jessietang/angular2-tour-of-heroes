/**
 * Created by jessietang on 1/5/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


import {HeroSearchService} from './hero-search.service';
import {Hero} from './hero';


@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: 'views/hero-search.component.html',
  styleUrls: ['styles/hero-search.component.css'],
  providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit{
  heroes: Observable<Hero[]>;
  // Subject（主题）是一个可观察的事件流中的生产者。
  // searchTerms生成一个产生字符串的Observable，用作按名称搜索时的过滤条件。
  private searchTerms = new Subject<string>();

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ){}

  // 每当调用search时都会调用next来把新的字符串放进该主题的可观察流中。
  search(term: string): void{
    this.searchTerms.next(term);
  }


  ngOnInit(): void{
    this.heroes = this.searchTerms
    .debounceTime(300)/*在传出最终字符串之前，debounceTime(300)将会等待，
    直到新增字符串的事件暂停了 300 毫秒。 我们实际发起请求的间隔永远不会小于 300ms*/
    .distinctUntilChanged()/*distinctUntilChanged确保只在过滤条件变化时才发送请求，
     这样就不会重复请求同一个搜索词了*/
      /*switchMap会为每个从debounce和distinctUntilChanged中通过的搜索词调用搜索服务。
      它会取消并丢弃以前的搜索可观察对象，只保留最近的。*/
    .switchMap(term => term
     ? this.heroSearchService.search(term)
    : Observable.of<Hero[]>([]))
    .catch(error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }



  goDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
