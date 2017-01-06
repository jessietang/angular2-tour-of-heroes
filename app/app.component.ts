import { Component } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `<h2>{{title}}</h2>
            <nav>
              <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
              <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
            </nav>
            <div [ngSwitch]="status">
  <template [ngSwitchCase]="'in-mission'">In Mission</template>
  <template [ngSwitchCase]="'ready'">Ready</template>
  <template ngSwitchDefault>Unknown</template>
</div>
            <router-outlet></router-outlet>
            `,
  styleUrls: ['styles/app.component.css']
})

export class AppComponent {
  title = 'Tour Of Heroes';
  status = 'ready';


}
