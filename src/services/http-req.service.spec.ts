import { TestBed, inject } from '@angular/core/testing';

import { HttpReqService } from './http-req.service';

describe('HttpReqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpReqService]
    });
  });

  it('should be created', inject([HttpReqService], (service: HttpReqService) => {
    expect(service).toBeTruthy();
  }));
});
