import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageProjectekComponent } from './page-projectek.component';

describe('PageProjectekComponent', () => {
  let component: PageProjectekComponent;
  let fixture: ComponentFixture<PageProjectekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageProjectekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageProjectekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
