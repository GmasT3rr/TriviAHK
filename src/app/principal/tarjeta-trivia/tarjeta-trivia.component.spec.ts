import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaTriviaComponent } from './tarjeta-trivia.component';

describe('TarjetaTriviaComponent', () => {
  let component: TarjetaTriviaComponent;
  let fixture: ComponentFixture<TarjetaTriviaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetaTriviaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaTriviaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
