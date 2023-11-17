import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsSearchComponent } from './fs-search.component';

describe('FsSearchComponent', () => {
  let component: FsSearchComponent;
  let fixture: ComponentFixture<FsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
