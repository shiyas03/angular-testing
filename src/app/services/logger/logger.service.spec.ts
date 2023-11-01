import { TestBed } from "@angular/core/testing"
import { LoggerService } from "./logger.service"

describe('LoggerService', () => {

  let service: LoggerService

  beforeEach(() => {
    //arrange
    TestBed.configureTestingModule({
      providers: [LoggerService]
    })

    service = TestBed.inject(LoggerService)
  })

  it('should not have any messages at starting', () => {
    //act
    let count = service.message.length

    //assert
    expect(count).toBe(0)
  })

  it('should add messages when log is called', () => {
    //act 
    service.log('message')

    //assert
    expect(service.message.length).toBe(1)
  })

  it('should clear all messages when clear called', () => {
    //arrange 
    service.message.push('message')

    //act 
    service.clear()

    //assert
    expect(service.message.length).toBe(0)
  })
})