import { TestBed } from '@angular/core/testing';

import { LiaisonBack } from './liaison-back';

describe('LiaisonBack', () => {
  let service: LiaisonBack;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiaisonBack);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
