import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [FirebaseService],
    });
    service = TestBed.inject(FirebaseService);
  });

 /*  it('should be created', () => {
    expect(service).toBeTruthy();
  }); */
});
