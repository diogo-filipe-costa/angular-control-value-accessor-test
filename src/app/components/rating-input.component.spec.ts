import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingInputComponent } from './rating-input.component';

describe('RatingInputComponent', () => {
  let fixture: ComponentFixture<RatingInputComponent>;
  let comp: RatingInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RatingInputComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('writeValue sets the correct number of stars', () => {
    comp.writeValue(3);
    expect(comp.value).toBe(3);
    expect(comp.stars.filter(Boolean).length).toBe(3);

    comp.writeValue(null);
    expect(comp.value).toBe(0);
    expect(comp.stars.filter(Boolean).length).toBe(0);

    comp.writeValue(10); // clamp to maxStars
    expect(comp.value).toBe(comp['maxStars']);
    expect(comp.stars.filter(Boolean).length).toBe(comp['maxStars']);

    comp.writeValue(-5); // clamp to zero
    expect(comp.value).toBe(0);
  });

  it('rate updates model and calls onChange/onTouched when enabled', () => {
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');
    comp.registerOnChange(onChangeSpy);
    comp.registerOnTouched(onTouchedSpy);

    comp.rate(4);
    expect(comp.value).toBe(4);
    expect(onChangeSpy).toHaveBeenCalledWith(4);
    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('rate does nothing when disabled', () => {
    comp.setDisabledState(true);
    const onChangeSpy = jasmine.createSpy('onChange');
    const onTouchedSpy = jasmine.createSpy('onTouched');
    comp.registerOnChange(onChangeSpy);
    comp.registerOnTouched(onTouchedSpy);

    // ensure starting value is 0
    expect(comp.value).toBe(0);
    comp.rate(5);
    expect(onChangeSpy).not.toHaveBeenCalled();
    expect(onTouchedSpy).not.toHaveBeenCalled();
    expect(comp.value).toBe(0);
  });

  it('registerOnChange / registerOnTouched replace callbacks', () => {
    const fn = jasmine.createSpy('fn');
    const fn2 = jasmine.createSpy('fn2');
    comp.registerOnChange(fn as any);
    expect((comp as any).onChange).toBe(fn as any);

    comp.registerOnTouched(fn2 as any);
    expect((comp as any).onTouched).toBe(fn2 as any);
  });

  it('setDisabledState updates disabled flag and opacity', () => {
    comp.setDisabledState(true);
    expect(comp.disabled).toBeTrue();
    expect(comp.opacity).toBe(0.25);

    comp.setDisabledState(false);
    expect(comp.disabled).toBeFalse();
    expect(comp.opacity).toBe(1);
  });
});