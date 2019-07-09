import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamexplorerComponent } from './teamexplorer.component';

describe('TeamexplorerComponent', () => {
  let component: TeamexplorerComponent;
  let fixture: ComponentFixture<TeamexplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamexplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamexplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
