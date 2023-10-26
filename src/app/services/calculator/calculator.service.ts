import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private loggerService: LoggerService) { }

  add(n1: number, n2: number) {
    let result = n1 + n2
    this.loggerService.log('add operation called')
    return result
  }

  substract(n1: number, n2: number) {
    let result = n1 - n2
    this.loggerService.log('substract operation called')
    return result
  }
}
