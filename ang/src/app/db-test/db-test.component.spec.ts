import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { DbTestComponent } from './db-test.component';

describe('DbTestComponent', () => {
  let component: DbTestComponent;
  let fixture: ComponentFixture<DbTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DbTestComponent]
    });
    fixture = TestBed.createComponent(DbTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
