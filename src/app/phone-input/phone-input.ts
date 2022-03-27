import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, forwardRef, Injector, Input, OnChanges, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorConnector } from './control-value-accessor-connector';
import { telefonKodu } from './mask-listesi';
@Component({
  selector: 'phone-input',
  templateUrl: './phone-input.html',
  styleUrls: ['./phone-input.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneMaskInput),
      multi: true
    }
  ],
})
export class PhoneMaskInput extends ControlValueAccessorConnector implements  AfterViewInit  {
  @Input('labelShow') labelShow?: boolean;
  @Input() selectedMask = 'tr';
  ulke: FormControl = new FormControl(telefonKodu[0]);

  telefon_mask: any = telefonKodu;
  @Input()
  public get value(): string {
    return this._value;
  }
  public set value(obj: string) {
    this.switch(obj);
  }

  @Input()
  public disabled: boolean = false;

  @Output()
  public change: EventEmitter<string> = new EventEmitter<string>();

  public onChange: ((value: string) => {}) | undefined;
  public onTouched: (() => void) | undefined;

  private _value: string = '';

  constructor(
    injector: Injector,
    _cdr: ChangeDetectorRef,
  ) {
    super(injector);
  }
  ngAfterViewInit(): void {
    this.ulke.valueChanges.subscribe(x => {
      setTimeout(() => {

        this.switch(this._value ? this._value.substr(2) : null);
      }, 100);
    });

    this.ulke.setValue(telefonKodu[0]);
    this.telefon_mask = this.telefon_mask?.find((x:any) => x.slug === this.selectedMask);
    console.log('Seçilen Mask',this.telefon_mask);
  }

  public switch(value: any) {
    if (value !== this.value && this.disabled === false) {
      this._value = value;
      if (value) {
        const valueSpltControl = value.split('');
        if (valueSpltControl[0] === '0') {
          this.value = this._value.substring(1);
        }
      }

      let sendValue = this.ulke.value.kod + this.value;
      this.change.emit(sendValue);

      if (this.onChange) {
        this.onChange(sendValue);
      }

     // this._cdr.markForCheck();
    }
  }


  public override writeValue(obj: any): void {
    this.value = obj;
  }

  public override registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public override registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


}
