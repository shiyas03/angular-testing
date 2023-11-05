import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  post!: Post

  constructor(private route: ActivatedRoute, private postService: PostService, private location: Location) { }

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id')
    id && this.postService.getPost(+id).subscribe((post) => (this.post = post))
  }

  goBack(){
    this.location.reload()
  }

  save(){
    this.postService.updatePost(this.post).subscribe(()=>this.goBack())
  }

}
