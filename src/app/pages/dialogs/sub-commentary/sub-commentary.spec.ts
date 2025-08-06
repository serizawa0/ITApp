import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCommentary } from './sub-commentary';

describe('SubCommentary', () => {
  let component: SubCommentary;
  let fixture: ComponentFixture<SubCommentary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCommentary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCommentary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
