import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RegistrarsePage } from './registrarse.page';
import { LocationService } from 'src/app/services/location.service'; 
import { HttpClientModule } from '@angular/common/http';

describe('RegistrarsePage', () => {
  let component: RegistrarsePage;
  let fixture: ComponentFixture<RegistrarsePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarsePage],
      imports: [IonicModule.forRoot(), HttpClientModule], 
      providers: [
        LocationService, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
