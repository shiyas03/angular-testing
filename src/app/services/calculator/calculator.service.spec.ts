import { LoggerService } from "../logger/logger.service"
import { CalculatorService } from "./calculator.service"

describe('Calculatorservice',()=>{

  let mockloggerService : any
  let calculator : any

  beforeEach(()=>{
    // console.log("before each");
    mockloggerService = jasmine.createSpyObj('LoggerService',['log'])
    calculator = new CalculatorService(mockloggerService)
  })

  it('should add two number',()=>{
    // console.log("add");
    // let mockloggerService = jasmine.createSpyObj('LoggerService',['log'])
    // spyOn(loggerService,'log')                  this will prevent execution each time
    // spyOn(loggerService,'log').and.callThrough()     this will spy and execute method
    // const calculator = new CalculatorService(mockloggerService)
    let result = calculator.add(2,2)
    expect(result).toBe(4)
    expect(mockloggerService.log).toHaveBeenCalledTimes(1)
  }) 

  it('should substract two numbers',()=>{
    // console.log("subtract");
    let result = calculator.substract(2,2)
    expect(result).toBe(0)   
    expect(mockloggerService.log).toHaveBeenCalledTimes(1)
  }) 

  //xit used to disable execution temporarly 
  // xit('should do something',()=>{
  //   pending()      this will add execution to pending
  //   fail()         this will fail
  // })
})