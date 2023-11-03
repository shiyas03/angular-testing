import { HttpClient } from "@angular/common/http"
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"

let testUrl = '/data'
interface Data {
    name: string
}

describe('Http Client Module', () => {
    let httpClient: HttpClient
    let httpTestingController: HttpTestingController
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
        httpClient = TestBed.inject(HttpClient)
        httpTestingController = TestBed.inject(HttpTestingController)
    })

    it('should call the testUrl with get request', () => {
        // let testData: Data = { name: 'testing data' }
        let testData: Data[] = [{ name: 'testing 1' }, { name: 'testing 2' }]

        httpClient.get<Data[]>(testUrl).subscribe((data) => {
            expect(data.length).toEqual(0)
        })

        httpClient.get<Data[]>(testUrl).subscribe((data) => {
            expect(data).toEqual([testData[0]])
        })

        httpClient.get<Data[]>(testUrl).subscribe((data) => {
            expect(data).toEqual(testData)
        })

        // let request = httpTestingController.expectOne('/data')
        // request.flush(testData)
        // expect(request.request.method).toBe('GET')

        let request = httpTestingController.match('/data')
        expect(request.length).toEqual(3)
        request[0].flush([])
        request[1].flush([testData[0]])
        request[2].flush(testData)
    })
})