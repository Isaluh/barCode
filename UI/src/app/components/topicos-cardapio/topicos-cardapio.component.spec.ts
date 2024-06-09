import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicosCardapioComponent } from './topicos-cardapio.component';

describe('TopicosCardapioComponent', () => {
  let component: TopicosCardapioComponent;
  let fixture: ComponentFixture<TopicosCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicosCardapioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicosCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
