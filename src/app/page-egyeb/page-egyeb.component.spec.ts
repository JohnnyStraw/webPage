import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEgyebComponent } from './page-egyeb.component';

describe('PageEgyebComponent', () => {
  let component: PageEgyebComponent;
  let fixture: ComponentFixture<PageEgyebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageEgyebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageEgyebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
