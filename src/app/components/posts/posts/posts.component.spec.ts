import { Post } from "src/app/models/post"
import { PostsComponent } from "./posts.component"
import { of } from "rxjs"

describe('PostComponent', () => {
  let POSTS: Post[]
  let component: PostsComponent
  let mockPostService: any

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
    mockPostService = jasmine.createSpyObj(['getPosts','deletePost'])
    component = new PostsComponent(mockPostService)
  })

  describe('delete', () => {

    beforeEach(()=>{
      mockPostService.deletePost.and.returnValue(of(true))
      component.posts = POSTS;
    })

    it('should delete the selected post from posts', () =>  {
      
      component.delete(POSTS[1])
      expect(component.posts.length).toBe(2)
    })

    it('should delte the actual selected post in posts',()=>{

      component.delete(POSTS[1])
      for(let post of component.posts){
        expect(post).not.toEqual(POSTS[1])
      }
    })

    it('should call the delete method in post service onlu once',()=>{
      component.delete(POSTS[1])
      expect(mockPostService.deletePost).toHaveBeenCalledTimes(1)
    })
  })
})   