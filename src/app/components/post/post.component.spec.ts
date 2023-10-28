import { Post } from "src/app/models/post"
import { PostComponent } from "./post.component"
import { EventEmitter } from "@angular/core"
import { first } from "rxjs"

describe('Post Component', () => {
    it('should raise an event when the delete post is clicked', () => {
        const component = new PostComponent
        const post: Post = { id: 1, body: 'body 1', title: 'title 1' }
        component.post = post
        component.delete.pipe(first()).subscribe((selected)=>{
            expect(selected).toEqual(component.post)
        })

        component.onDeletePost(new MouseEvent('click'))
    })
})