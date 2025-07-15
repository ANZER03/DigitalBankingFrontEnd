import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharttestComponent } from './charttest.component';

describe('CharttestComponent', () => {
  let component: CharttestComponent;
  let fixture: ComponentFixture<CharttestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharttestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharttestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
