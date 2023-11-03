import { TestBed } from "@angular/core/testing"
import { LoggerService } from "../logger/logger.service"
import { CalculatorService } from "./calculator.service"

function setUp() {
  let mockloggerService = jasmine.createSpyObj('LoggerService', ['log'])
  TestBed.configureTestingModule({
    providers: [CalculatorService, {
      provide: LoggerService,
      useValue: mockloggerService
    }]
  })
  let calculator = TestBed.inject(CalculatorService)
  let loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>
  return { calculator, loggerServiceSpy }
}

describe('Calculatorservice', () => {

  let loggerServiceSpy: jasmine.SpyObj<LoggerService>
  let calculator: any

  // beforeEach(() => {
  //   // console.log("before each");
  //   let mockloggerService = jasmine.createSpyObj('LoggerService', ['log'])
  //   TestBed.configureTestingModule({
  //     providers: [CalculatorService, {
  //       provide: LoggerService,
  //       useValue: mockloggerService
  //     }]
  //   })
  //   // calculator = new CalculatorService(mockloggerService)
  //   calculator = TestBed.inject(CalculatorService)
  //   loggerServiceSpy = TestBed.inject(LoggerService) as jasmine.SpyObj<LoggerService>

  // })

  it('should add two number', () => {
    // console.log("add");
    // let mockloggerService = jasmine.createSpyObj('LoggerService',['log'])
    // spyOn(loggerService,'log')                  this will prevent execution each time
    // spyOn(loggerService,'log').and.callThrough()     this will spy and execute method
    // const calculator = new CalculatorService(mockloggerService)
    const { calculator, loggerServiceSpy } = setUp()
    let result = calculator.add(2, 2)
    expect(result).toBe(4)
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1)
  })

  it('should substract two numbers', () => {
    // console.log("subtract");
    const { calculator, loggerServiceSpy } = setUp()
    let result = calculator.substract(2, 2)
    expect(result).toBe(0)
    expect(loggerServiceSpy.log).toHaveBeenCalledTimes(1)
  })

  //xit used to disable execution temporarly 
  // xit('should do something',()=>{
  //   pending()      this will add execution to pending
  //   fail()         this will fail
  // })
})