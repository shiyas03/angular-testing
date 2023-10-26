import { CalculatorService } from "./calculator.service"

describe('Calculatorservice',()=>{

  it('should add two number',()=>{
    let calculator = new CalculatorService()
    let result = calculator.add(2,2)
    expect(result).toBe(4)
  })

  it('should substract two numbers',()=>{
    
    let calculator = new CalculatorService()
    let result = calculator.substract(2,2)
    expect(result).toBe(0)
  })

  //xit will disable temporarly
  // xit('should do something',()=>{
  //   pending()      this will add execution to pending
  //   fail()         this will fail
  // })
})