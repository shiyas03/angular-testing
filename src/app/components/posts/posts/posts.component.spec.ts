import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"
import { of } from "rxjs"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PostService } from "src/app/services/post/post.service"
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from "@angular/core"
import { By } from "@angular/platform-browser"

// class mockPostService {
//   getPosts() { }

//   deletePost(post: Post) {
//     return of(true)
//   }
// }

describe('PostComponent', () => {
  let POSTS: Post[]
  let component: PostsComponent
  let mockPostService: any
  // let postService: any
  let fixture: ComponentFixture<PostsComponent>

  @Component({
    selector: 'app-post',
    template: '<div></div>'
  })
  class FakeComponent { 
    @Input() post!:Post
  }

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

    mockPostService = jasmine.createSpyObj(['getPosts', 'deletePost'])

    TestBed.configureTestingModule({
      declarations: [PostsComponent, FakeComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
          // useClass: mockPostService
        }
      ],
      // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })

    // component = new PostsComponent(mockPostService)
    // component = TestBed.inject(PostsComponent)
    // postService = TestBed.inject(PostService)

    fixture = TestBed.createComponent(PostsComponent)
    component = fixture.componentInstance
  })

  it('should test posts form the service directly', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS))
    fixture.detectChanges()
    // component.ngOnInit()
    expect(component.posts.length).toBe(3)
  })

  it('should create one post child element for each post',()=>{
    mockPostService.getPosts.and.returnValue(of(POSTS))
    fixture.detectChanges()
    let debugElement = fixture.debugElement
    let postElement = debugElement.queryAll(By.css('.posts'))
    expect(postElement.length).toBe(POSTS.length)
  })

  describe('delete', () => {

    beforeEach(() => {
      mockPostService.deletePost.and.returnValue(of(true))
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
      // spyOn(postService, 'deletePost').and.callThrough()
      component.delete(POSTS[1])
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1)
    })
  })
})   