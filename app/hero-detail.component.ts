/**
 * Created by jessietang on 1/5/2017.
 */
import 'rxjs/add/operator/switchMap';

import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
/*notice: ActivatedRoute这个单词的写法，老是写错*/
import {Location} from '@angular/common';

import {Hero} from './hero';
import {HeroService} from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: 'views/hero-detail.component.html',
  styleUrls: ['styles/hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit{
  hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.route.params
    .switchMap((params: Params) => this.heroService.getHero(+params['id']))
    .subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    this.location.back();
  }

  // 使用 hero 服务的update方法来持久化对英雄名字的修改，然后导航回前一个视图
  save(): void{
    this.heroService.update(this.hero)
    .then(() => this.goBack());
  }


}
