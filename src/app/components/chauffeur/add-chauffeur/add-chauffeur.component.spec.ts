import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChauffeurComponent } from './add-chauffeur.component';

describe('AddChauffeurComponent', () => {
  let component: AddChauffeurComponent;
  let fixture: ComponentFixture<AddChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
