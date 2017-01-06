/**
 * Created by jessietang on 1/5/2017.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Hero} from './hero';
import {HeroService} from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'views/heroes.component.html',
  styleUrls: ['styles/heroes.component.css']
})

export class HeroesComponent implements OnInit{
  //heroes = HEROES; //暴露HEROES
  heroes: Hero[];
  selectedHero: Hero;

  constructor(
    private heroService: HeroService,
    private router: Router
  ){}
  getHeroes(): void{
    /*this.heroService.getHeroes().then(function(heroes){
     this.heroes = heroes;
     });*/
    // 使用箭头函数 比等价的函数表达式更加简洁，能优雅的处理 this 指针
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void{
    this.getHeroes();
  }

  onSelect(hero: Hero): void{
    this.selectedHero = hero;
  }

  goToDetail(): void {
    this.router.navigate(['/detail',this.selectedHero.id]);
  }


  //当指定的名字不为空的时候，点击处理器就会委托 hero 服务来创建一个具有此名字的英雄，
  // 并把这个新的英雄添加到我们的数组中
  add(name: string): void {
    name = name.trim();
    if(!name){return;}
    this.heroService.create(name)
    .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  }


  //它从数组中移除了被删除的英雄，如果删除的是正选中的英雄，还会清空选择。
  delete(hero: Hero): void{
    this.heroService
    .delete(hero.id)
    .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if(this.selectedHero == hero){
          this.selectedHero = null;
        }
      })
  }

}
