import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemInfoComponent } from './sem-info.component';

describe('SemInfoComponent', () => {
  let component: SemInfoComponent;
  let fixture: ComponentFixture<SemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
