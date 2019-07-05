import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPokeModalComponent } from './edit-poke-modal.component';

describe('EditPokeModalComponent', () => {
  let component: EditPokeModalComponent;
  let fixture: ComponentFixture<EditPokeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPokeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPokeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
