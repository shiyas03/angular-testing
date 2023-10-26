import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StrengthPipe } from './pipes/strength/strength.pipe';
import { PostsComponent } from './components/posts/posts/posts.component';
import { HttpClientModule } from '@angular/common/http'
import { PostService } from './services/post/post.service';

@NgModule({
  declarations: [
    AppComponent,
    StrengthPipe,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
