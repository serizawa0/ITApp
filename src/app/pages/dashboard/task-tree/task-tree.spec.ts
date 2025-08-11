import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTree } from './task-tree';

describe('TaskTree', () => {
  let component: TaskTree;
  let fixture: ComponentFixture<TaskTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
