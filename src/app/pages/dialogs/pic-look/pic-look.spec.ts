import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicLook } from './pic-look';

describe('PicLook', () => {
  let component: PicLook;
  let fixture: ComponentFixture<PicLook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicLook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicLook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
