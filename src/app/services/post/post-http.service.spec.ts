import { TestBed } from "@angular/core/testing"
import { PostService } from "./post.service"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe('Post Service HttpClientTestingModule', () => {
    let postService: PostService
    let httpTestingController: HttpTestingController
    let POSTS = [
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostService],
            imports: [HttpClientTestingModule]
        })

        postService = TestBed.inject(PostService)
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    describe('getpost method',()=>{
        it('should return posts when getPosts is called',(done:DoneFn)=>{
            postService.getPosts().subscribe((data)=>{
                expect(data).toEqual(POSTS)
                done()
            })
            let request = httpTestingController.expectOne('http://jsonplaceholder.typicode.com/posts')
            request.flush(POSTS)
            expect(request.request.method).toBe('GET')
        })
    })
})