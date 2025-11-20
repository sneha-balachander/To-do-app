import { TestBed } from '@angular/core/testing';

import { ToDo } from './to-do';

describe('ToDo', () => {
  let service: ToDo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
