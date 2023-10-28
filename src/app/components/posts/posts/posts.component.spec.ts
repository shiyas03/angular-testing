import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"
import { of } from "rxjs"
import { TestBed } from "@angular/core/testing"
import { PostService } from "src/app/services/post/post.service"

class mockPostService {
  getPosts() { }

  deletePost(post: Post) {
    return of(true)
  }
}

describe('PostComponent', () => {
  let POSTS: Post[]
  let component: PostsComponent
  // let mockPostService: any
  let postService: any

  beforeEach(() => {
    POSTS = [
      {
        id: 1, body: 'body 1', title: 'title 1'
      },
      {
        id: 2, body: 'body 2', title: 'title 2'
      },
      {
        id: 3, body: 'body 3', title: 'title 3'
      },
    ]

    // mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost'])

    TestBed.configureTestingModule({
      providers: [
        PostsComponent,
        {
          provide: PostService,
          // useValue: mockPostService
          useClass: mockPostService
        }
      ]
    })

    // component = new PostsComponent(mockPostService)
    component = TestBed.inject(PostsComponent)
    postService = TestBed.inject(PostService)

  })

  describe('delete', () => {

    beforeEach(() => {
      // postService.deletePost.and.returnValue(of(true))
      component.posts = POSTS;
    })

    it('should delete the selected post from posts', () => {

      component.delete(POSTS[1])
      expect(component.posts.length).toBe(2)
    })

    it('should delte the actual selected post in posts', () => {

      component.delete(POSTS[1])
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1])
      }
    })

    it('should call the delete method in post service only once', () => {
      spyOn(postService, 'deletePost').and.callThrough()
      component.delete(POSTS[1])
      expect(postService.deletePost).toHaveBeenCalledTimes(1)
    })
  })
})   