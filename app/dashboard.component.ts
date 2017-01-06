/**
 * Created by jessietang on 1/5/2017.
 */
import {Component, OnInit} from '@angular/core';

import {Hero} from './hero';
import {HeroService} from './hero.service';

import {HeroSearchComponent} from './hero-search.component';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'views/dashboard.component.html',
  styleUrls: ['styles/dashboard.component.css']
})

export class DashboardComponent{
  heroes: Hero[];
  constructor(private heroService: HeroService){}

  ngOnInit(): void{
    this.heroService.getHeroes().then(heroes => this.heroes = heroes.slice(1,5));
  }
}
