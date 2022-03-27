import {
        ControlContainer,
        ControlValueAccessor,
        FormControl,
        FormControlDirective,
    } from '@angular/forms';
    import { Injectable, Injector, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
    
    @Injectable()
    export class ControlValueAccessorConnector implements ControlValueAccessor, OnChanges {
        @ViewChild(FormControlDirective, { static: true })
        formControlDirective!: FormControlDirective;
    
        @Input()
        formControl!: FormControl;
    
        @Input()
        formControlName: string = '';
    
        get control(): any { 
            if (this.formControl) {
                return this.formControl;
            } else if (this.formControlName) {
                return this.controlContainer.control?.get(this.formControlName) as FormControl;
            }
        }

     
    
        constructor(
            private injector: Injector) {
    
        }
        ngOnChanges(changes: SimpleChanges): void {
        }
    
        get controlContainer() {
            return this.injector.get(ControlContainer);
        }
    
        registerOnTouched(fn: any): void {
            this.formControlDirective.valueAccessor?.registerOnTouched(fn);
        }
    
        registerOnChange(fn: any): void {
            this.formControlDirective.valueAccessor?.registerOnChange(fn);
        }
    
        writeValue(obj: any): void {
            this.formControlDirective.valueAccessor?.writeValue(obj);
        }
    
        setDisabledState(isDisabled: boolean): void {
            //this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
        }
    }
    