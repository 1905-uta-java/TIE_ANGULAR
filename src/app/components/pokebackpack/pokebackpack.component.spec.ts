import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokebackpackComponent } from './pokebackpack.component';

describe('PokebackpackComponent', () => {
  let component: PokebackpackComponent;
  let fixture: ComponentFixture<PokebackpackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokebackpackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokebackpackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
