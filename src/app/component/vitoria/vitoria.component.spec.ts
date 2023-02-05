import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitoriaComponent } from './vitoria.component';

describe('VitoriaComponent', () => {
  let component: VitoriaComponent;
  let fixture: ComponentFixture<VitoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VitoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
