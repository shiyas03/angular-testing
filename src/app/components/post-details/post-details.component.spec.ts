import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PostDetailsComponent } from "./post-details.component"
import { PostService } from "src/app/services/post/post.service"
import { ActivatedRoute } from "@angular/router"
import { By } from "@angular/platform-browser"
import { of } from "rxjs"
import { Post } from "src/app/models/post"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { FormsModule } from "@angular/forms"

describe('PostDetailsComponent', () => {
  let fixture: ComponentFixture<PostDetailsComponent>
  let mockPostService: jasmine.SpyObj<PostService>
  beforeEach(() => {
    let mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3'
          }
        }
      }
    }

    mockPostService = jasmine.createSpyObj(['getPost', 'updatePost'])
    let mockLocation = jasmine.createSpyObj(['reload'])

    TestBed.configureTestingModule({
      declarations: [PostDetailsComponent],
      imports: [FormsModule],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: PostService, useValue: mockPostService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(PostDetailsComponent)
  })

  it('should render the post title in h2 template', () => {

    mockPostService.getPost.and.returnValue(of({
      id: 3, title: 'Title 3', body: 'Body 3'
    } as Post
    ))

    fixture.detectChanges()

    // let element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement
    let element = fixture.nativeElement.querySelector('h2') as HTMLElement;
    expect(element.textContent).toBe(fixture.componentInstance.post.title)
  })
})