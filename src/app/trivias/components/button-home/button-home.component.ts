import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-home',
  templateUrl: './button-home.component.html',
  styleUrls: ['./button-home.component.css']
})
export class ButtonHomeComponent implements OnInit {
  @Input() desc!: string;
  @Input() route!: string;
  @Input() icon!: string;
  textArr!: string[];
  constructor() {}

  ngOnInit(): void {
    this.textArr = [...this.desc];
  }

  itemSetter(index: number): string {
    return `--item: ${index + 1}`;
  }
}
