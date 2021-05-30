import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'poly-blog';

  constructor(private router: Router) { }

  loadHomeComponment(url: string) {
    const currentUrl = this.router.url;
    if (currentUrl.toString().includes(url)) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });
    }
    else {
      this.router.navigate([url]);
    }

  }
}
