import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdiIconComponent } from './mdi-icon.component';

describe('MdiIconComponent', () => {
  let component: MdiIconComponent;
  let fixture: ComponentFixture<MdiIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdiIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdiIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
