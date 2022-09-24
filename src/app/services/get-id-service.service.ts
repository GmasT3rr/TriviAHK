import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetIdServiceService {
  @Output() shareId: EventEmitter<any> = new EventEmitter();

  constructor() {}
}
