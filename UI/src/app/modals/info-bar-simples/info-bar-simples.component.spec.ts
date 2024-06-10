import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBarSimplesComponent } from './info-bar-simples.component';

describe('InfoBarSimplesComponent', () => {
  let component: InfoBarSimplesComponent;
  let fixture: ComponentFixture<InfoBarSimplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoBarSimplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoBarSimplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
