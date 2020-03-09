import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTileComponent } from './favorite-tile.component';

describe('FavoriteTileComponent', () => {
  let component: FavoriteTileComponent;
  let fixture: ComponentFixture<FavoriteTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
