# Angular Phone Input Component


## Ana Modülünüzün yapılandırması aşağıdaki gibi olmalıdır
Markup :  `declarations: [ AppComponent, PhoneMaskInput ], imports: [ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }), NgxMaskModule.forRoot(), FormsModule],`


## Örnek Kullanım şekli

<phone-input [formControl]="phone" [selectedMask]="'tr'"></phone-input>

## Not:
phone-input/mask-listesi.ts dosyasında ülkelerin telefon görünümünü düzenleyenilirsiniz.


)
