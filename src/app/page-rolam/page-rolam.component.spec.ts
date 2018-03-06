import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRolamComponent } from './page-rolam.component';

describe('PageRolamComponent', () => {
  let component: PageRolamComponent;
  let fixture: ComponentFixture<PageRolamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageRolamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageRolamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
