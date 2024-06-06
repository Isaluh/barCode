import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRelatorioComponent } from './table-relatorio.component';

describe('TableRelatorioComponent', () => {
  let component: TableRelatorioComponent;
  let fixture: ComponentFixture<TableRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRelatorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
