import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"
import { of } from "rxjs"
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PostService } from "src/app/services/post/post.service"
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA } from "@angular/core"
import { By } from "@angular/platform-browser"
import { PostComponent } from "../../post/post.component"

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

  // @Component({
  //   selector: 'app-post',
  //   template: '<div></div>'
  // })
  // class FakeComponent { 
  //   @Input() post!:Post
  // }

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
      declarations: [PostsComponent, PostComponent],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
          // useClass: mockPostService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

  it('should create one post child element for each post', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS))
    fixture.detectChanges()
    let debugElement = fixture.debugElement
    let postElement = debugElement.queryAll(By.css('.posts'))
    expect(postElement.length).toBe(POSTS.length)
  })

  it('should create exact same number of post component in Posts', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS))
    fixture.detectChanges()
    let postElementDEs = fixture.debugElement.queryAll(By.directive(PostComponent))
    expect(postElementDEs.length).toEqual(POSTS.length)
  })

  it('should check whether exact post is sending to post component', () => {
    mockPostService.getPosts.and.returnValue(of(POSTS))
    fixture.detectChanges()
    let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent))

    for (let i = 0; i < postComponentDEs.length; i++) {
      let postComponent = postComponentDEs[i].componentInstance as PostComponent
      expect(postComponent.post.title).toBe(POSTS[i].title)
    }

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

    it('should call delete method when post component button is clicked', () => {
      spyOn(component, 'delete')
      mockPostService.getPosts.and.returnValue(of(POSTS))
      fixture.detectChanges()

      let postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent))
      for (let i = 0; i < postComponentDEs.length; i++) {
        postComponentDEs[i].query(By.css('button')).triggerEventHandler('click', { preventDefault: () => { } })
        expect(component.delete).toHaveBeenCalledWith(POSTS[i])
      }
    })
  })
})   