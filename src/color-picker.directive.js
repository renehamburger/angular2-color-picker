var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Directive, Input, Output, ViewContainerRef, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { ColorPickerService } from './color-picker.service';
import { Rgba, Hsla, Hsva, SliderPosition, SliderDimension } from './classes';
import { NgModule, Compiler, ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
var ColorPickerDirective = (function () {
    function ColorPickerDirective(compiler, vcRef, el, service) {
        this.compiler = compiler;
        this.vcRef = vcRef;
        this.el = el;
        this.service = service;
        this.colorPickerChange = new EventEmitter(true);
        this.cpToggleChange = new EventEmitter(true);
        this.cpPosition = 'right';
        this.cpPositionOffset = '0%';
        this.cpPositionRelativeToArrow = false;
        this.cpOutputFormat = 'hex';
        this.cpPresetLabel = 'Preset colors';
        this.cpCancelButton = false;
        this.cpCancelButtonClass = 'cp-cancel-button-class';
        this.cpCancelButtonText = 'Cancel';
        this.cpOKButton = false;
        this.cpOKButtonClass = 'cp-ok-button-class';
        this.cpOKButtonText = 'OK';
        this.cpFallbackColor = 'rgba(0,0,0,0)';
        this.cpHeight = 'auto';
        this.cpWidth = '230px';
        this.cpIgnoredElements = [];
        this.cpDialogDisplay = 'popup';
        this.cpSaveClickOutside = true;
        this.cpAlphaChannel = 'hex6';
        this.cpColorChangeOnInit = true;
        this.ignoreChanges = false;
        this.created = false;
    }
    ColorPickerDirective.prototype.ngOnChanges = function (changes) {
        if (changes.cpToggle) {
            if (changes.cpToggle.currentValue)
                this.openDialog();
            if (!changes.cpToggle.currentValue && this.dialog)
                this.dialog.closeColorPicker();
        }
        if (changes.colorPicker) {
            if (this.dialog && !this.ignoreChanges) {
                if (this.cpDialogDisplay === 'inline') {
                    this.dialog.setInitialColor(changes.colorPicker.currentValue);
                }
                this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
            }
            this.ignoreChanges = false;
        }
    };
    ColorPickerDirective.prototype.ngOnInit = function () {
        var hsva = this.service.stringToHsva(this.colorPicker);
        if (hsva === null)
            hsva = this.service.stringToHsva(this.colorPicker, true);
        if (hsva == null) {
            hsva = this.service.stringToHsva(this.cpFallbackColor);
        }
        this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8'));
    };
    ColorPickerDirective.prototype.onClick = function () {
        var _this = this;
        if (this.cpIgnoredElements.filter(function (item) { return item === _this.el.nativeElement; }).length === 0) {
            this.openDialog();
        }
    };
    ColorPickerDirective.prototype.openDialog = function () {
        var _this = this;
        if (!this.created) {
            this.created = true;
            this.compiler.compileModuleAndAllComponentsAsync(DynamicCpModule)
                .then(function (factory) {
                var compFactory = factory.componentFactories.find(function (x) { return x.componentType === DialogComponent; });
                var injector = ReflectiveInjector.fromResolvedProviders([], _this.vcRef.parentInjector);
                var cmpRef = _this.vcRef.createComponent(compFactory, 0, injector, []);
                cmpRef.instance.setDialog(_this, _this.el, _this.colorPicker, _this.cpPosition, _this.cpPositionOffset, _this.cpPositionRelativeToArrow, _this.cpOutputFormat, _this.cpPresetLabel, _this.cpPresetColors, _this.cpCancelButton, _this.cpCancelButtonClass, _this.cpCancelButtonText, _this.cpOKButton, _this.cpOKButtonClass, _this.cpOKButtonText, _this.cpHeight, _this.cpWidth, _this.cpIgnoredElements, _this.cpDialogDisplay, _this.cpSaveClickOutside, _this.cpAlphaChannel);
                _this.dialog = cmpRef.instance;
            });
        }
        else if (this.dialog) {
            this.dialog.openDialog(this.colorPicker);
        }
    };
    ColorPickerDirective.prototype.colorChanged = function (value, ignore) {
        if (ignore === void 0) { ignore = true; }
        this.ignoreChanges = ignore;
        this.colorPickerChange.emit(value);
    };
    ColorPickerDirective.prototype.changeInput = function (value) {
        this.dialog.setColorFromString(value, true);
    };
    ColorPickerDirective.prototype.toggle = function (value) {
        this.cpToggleChange.emit(value);
    };
    return ColorPickerDirective;
}());
__decorate([
    Input('colorPicker'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "colorPicker", void 0);
__decorate([
    Output('colorPickerChange'),
    __metadata("design:type", Object)
], ColorPickerDirective.prototype, "colorPickerChange", void 0);
__decorate([
    Input('cpToggle'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpToggle", void 0);
__decorate([
    Output('cpToggleChange'),
    __metadata("design:type", Object)
], ColorPickerDirective.prototype, "cpToggleChange", void 0);
__decorate([
    Input('cpPosition'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpPosition", void 0);
__decorate([
    Input('cpPositionOffset'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpPositionOffset", void 0);
__decorate([
    Input('cpPositionRelativeToArrow'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpPositionRelativeToArrow", void 0);
__decorate([
    Input('cpOutputFormat'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpOutputFormat", void 0);
__decorate([
    Input('cpPresetLabel'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpPresetLabel", void 0);
__decorate([
    Input('cpPresetColors'),
    __metadata("design:type", Array)
], ColorPickerDirective.prototype, "cpPresetColors", void 0);
__decorate([
    Input('cpCancelButton'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpCancelButton", void 0);
__decorate([
    Input('cpCancelButtonClass'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpCancelButtonClass", void 0);
__decorate([
    Input('cpCancelButtonText'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpCancelButtonText", void 0);
__decorate([
    Input('cpOKButton'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpOKButton", void 0);
__decorate([
    Input('cpOKButtonClass'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpOKButtonClass", void 0);
__decorate([
    Input('cpOKButtonText'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpOKButtonText", void 0);
__decorate([
    Input('cpFallbackColor'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpFallbackColor", void 0);
__decorate([
    Input('cpHeight'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpHeight", void 0);
__decorate([
    Input('cpWidth'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpWidth", void 0);
__decorate([
    Input('cpIgnoredElements'),
    __metadata("design:type", Object)
], ColorPickerDirective.prototype, "cpIgnoredElements", void 0);
__decorate([
    Input('cpDialogDisplay'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpDialogDisplay", void 0);
__decorate([
    Input('cpSaveClickOutside'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpSaveClickOutside", void 0);
__decorate([
    Input('cpAlphaChannel'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpAlphaChannel", void 0);
__decorate([
    Input('cpColorChangeOnInit'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpColorChangeOnInit", void 0);
ColorPickerDirective = __decorate([
    Directive({
        selector: '[colorPicker]',
        host: {
            '(input)': 'changeInput($event.target.value)',
            '(click)': 'onClick()'
        }
    }),
    __metadata("design:paramtypes", [Compiler, ViewContainerRef, ElementRef, ColorPickerService])
], ColorPickerDirective);
export { ColorPickerDirective };
var TextDirective = (function () {
    function TextDirective() {
        this.newValue = new EventEmitter();
    }
    TextDirective.prototype.changeInput = function (value) {
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            var numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    };
    return TextDirective;
}());
__decorate([
    Output('newValue'),
    __metadata("design:type", Object)
], TextDirective.prototype, "newValue", void 0);
__decorate([
    Input('text'),
    __metadata("design:type", Object)
], TextDirective.prototype, "text", void 0);
__decorate([
    Input('rg'),
    __metadata("design:type", Number)
], TextDirective.prototype, "rg", void 0);
TextDirective = __decorate([
    Directive({
        selector: '[text]',
        host: {
            '(input)': 'changeInput($event.target.value)'
        }
    }),
    __metadata("design:paramtypes", [])
], TextDirective);
export { TextDirective };
var SliderDirective = (function () {
    function SliderDirective(el) {
        var _this = this;
        this.el = el;
        this.newValue = new EventEmitter();
        this.listenerMove = function (event) { _this.move(event); };
        this.listenerStop = function () { _this.stop(); };
    }
    SliderDirective.prototype.setCursor = function (event) {
        var height = this.el.nativeElement.offsetHeight;
        var width = this.el.nativeElement.offsetWidth;
        var x = Math.max(0, Math.min(this.getX(event), width));
        var y = Math.max(0, Math.min(this.getY(event), height));
        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
        }
        else if (this.rgX === undefined && this.rgY !== undefined) {
            this.newValue.emit({ v: y / height, rg: this.rgY });
        }
        else {
            this.newValue.emit({ v: x / width, rg: this.rgX });
        }
    };
    SliderDirective.prototype.move = function (event) {
        event.preventDefault();
        this.setCursor(event);
    };
    SliderDirective.prototype.start = function (event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    };
    SliderDirective.prototype.stop = function () {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    };
    SliderDirective.prototype.getX = function (event) {
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    };
    SliderDirective.prototype.getY = function (event) {
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    };
    return SliderDirective;
}());
__decorate([
    Output('newValue'),
    __metadata("design:type", Object)
], SliderDirective.prototype, "newValue", void 0);
__decorate([
    Input('slider'),
    __metadata("design:type", String)
], SliderDirective.prototype, "slider", void 0);
__decorate([
    Input('rgX'),
    __metadata("design:type", Number)
], SliderDirective.prototype, "rgX", void 0);
__decorate([
    Input('rgY'),
    __metadata("design:type", Number)
], SliderDirective.prototype, "rgY", void 0);
SliderDirective = __decorate([
    Directive({
        selector: '[slider]',
        host: {
            '(mousedown)': 'start($event)',
            '(touchstart)': 'start($event)'
        }
    }),
    __metadata("design:paramtypes", [ElementRef])
], SliderDirective);
export { SliderDirective };
var DialogComponent = (function () {
    function DialogComponent(el, service) {
        this.el = el;
        this.service = service;
        this.dialogArrowSize = 10;
        this.dialogArrowOffset = 15;
        //
        this.cpOKButton = false;
        this.cpOKButtonClass = 'cp-ok-button-class';
        this.cpOKButtonText = 'OK';
        this.cpDialogDisplay = 'popup';
        this.cpAlphaChannel = 'hex6';
        this.cpSaveClickOutside = false;
    }
    DialogComponent.prototype.setDialog = function (instance, elementRef, color, cpPosition, cpPositionOffset, cpPositionRelativeToArrow, cpOutputFormat, cpPresetLabel, cpPresetColors, cpCancelButton, cpCancelButtonClass, cpCancelButtonText, cpOKButton, cpOKButtonClass, cpOKButtonText, cpHeight, cpWidth, cpIgnoredElements, cpDialogDisplay, cpSaveClickOutside, cpAlphaChannel) {
        this.directiveInstance = instance;
        this.initialColor = color;
        this.directiveElementRef = elementRef;
        this.cpPosition = cpPosition;
        this.cpPositionOffset = parseInt(cpPositionOffset);
        if (!cpPositionRelativeToArrow) {
            this.dialogArrowOffset = 0;
        }
        this.cpOutputFormat = cpOutputFormat;
        this.cpPresetLabel = cpPresetLabel;
        this.cpPresetColors = cpPresetColors;
        this.cpCancelButton = cpCancelButton;
        this.cpCancelButtonClass = cpCancelButtonClass;
        this.cpCancelButtonText = cpCancelButtonText;
        this.cpOKButton = cpOKButton;
        this.cpOKButtonClass = cpOKButtonClass;
        this.cpOKButtonText = cpOKButtonText;
        this.cpHeight = parseInt(cpHeight);
        this.cpWidth = parseInt(cpWidth);
        this.cpIgnoredElements = cpIgnoredElements;
        this.cpDialogDisplay = cpDialogDisplay;
        if (this.cpDialogDisplay === 'inline') {
            this.dialogArrowOffset = 0;
            this.dialogArrowSize = 0;
        }
        this.cpSaveClickOutside = cpSaveClickOutside;
        this.cpAlphaChannel = cpAlphaChannel;
    };
    DialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        var alphaWidth = this.alphaSlider.nativeElement.offsetWidth;
        var hueWidth = this.hueSlider.nativeElement.offsetWidth;
        this.sliderDimMax = new SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cpOutputFormat === 'rgba') {
            this.format = 1;
        }
        else if (this.cpOutputFormat === 'hsla') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.listenerMouseDown = function (event) { _this.onMouseDown(event); };
        this.listenerResize = function () { _this.onResize(); };
        this.openDialog(this.initialColor, false);
    };
    DialogComponent.prototype.setInitialColor = function (color) {
        this.initialColor = color;
    };
    DialogComponent.prototype.openDialog = function (color, emit) {
        if (emit === void 0) { emit = true; }
        this.setInitialColor(color);
        this.setColorFromString(color, emit);
        this.openColorPicker();
    };
    DialogComponent.prototype.cancelColor = function () {
        this.setColorFromString(this.initialColor, true);
        if (this.cpDialogDisplay === 'popup') {
            this.directiveInstance.colorChanged(this.initialColor, true);
            this.closeColorPicker();
        }
    };
    DialogComponent.prototype.oKColor = function () {
        if (this.cpDialogDisplay === 'popup') {
            this.closeColorPicker();
        }
    };
    DialogComponent.prototype.setColorFromString = function (value, emit) {
        if (emit === void 0) { emit = true; }
        var hsva;
        if (this.cpAlphaChannel === 'hex8') {
            hsva = this.service.stringToHsva(value, true);
            if (!hsva && !this.hsva) {
                hsva = this.service.stringToHsva(value, false);
            }
        }
        else {
            hsva = this.service.stringToHsva(value, false);
        }
        if (hsva) {
            this.hsva = hsva;
            this.update(emit);
        }
    };
    DialogComponent.prototype.onMouseDown = function (event) {
        if ((!this.isDescendant(this.el.nativeElement, event.target)
            && event.target != this.directiveElementRef.nativeElement &&
            this.cpIgnoredElements.filter(function (item) { return item === event.target; }).length === 0) && this.cpDialogDisplay === 'popup') {
            if (!this.cpSaveClickOutside) {
                this.setColorFromString(this.initialColor, false);
                this.directiveInstance.colorChanged(this.initialColor);
            }
            this.closeColorPicker();
        }
    };
    DialogComponent.prototype.openColorPicker = function () {
        if (!this.show) {
            this.setDialogPosition();
            this.show = true;
            this.directiveInstance.toggle(true);
            document.addEventListener('mousedown', this.listenerMouseDown);
            window.addEventListener('resize', this.listenerResize);
        }
    };
    DialogComponent.prototype.closeColorPicker = function () {
        if (this.show) {
            this.show = false;
            this.directiveInstance.toggle(false);
            document.removeEventListener('mousedown', this.listenerMouseDown);
            window.removeEventListener('resize', this.listenerResize);
        }
    };
    DialogComponent.prototype.onResize = function () {
        if (this.position === 'fixed') {
            this.setDialogPosition();
        }
    };
    DialogComponent.prototype.setDialogPosition = function () {
        var dialogHeight = this.dialogElement.nativeElement.offsetHeight;
        var node = this.directiveElementRef.nativeElement, position = 'static';
        var parentNode = null;
        while (node !== null && node.tagName !== 'HTML') {
            position = window.getComputedStyle(node).getPropertyValue("position");
            if (position !== 'static' && parentNode === null) {
                parentNode = node;
            }
            if (position === 'fixed') {
                break;
            }
            node = node.parentNode;
        }
        if (position !== 'fixed') {
            var boxDirective = this.createBox(this.directiveElementRef.nativeElement, true);
            if (parentNode === null) {
                parentNode = node;
            }
            var boxParent = this.createBox(parentNode, true);
            this.top = boxDirective.top - boxParent.top;
            this.left = boxDirective.left - boxParent.left;
        }
        else {
            var boxDirective = this.createBox(this.directiveElementRef.nativeElement, false);
            this.top = boxDirective.top;
            this.left = boxDirective.left;
            this.position = 'fixed';
        }
        if (this.cpPosition === 'left') {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left -= this.cpWidth + this.dialogArrowSize - 2;
        }
        else if (this.cpPosition === 'top') {
            this.top -= dialogHeight + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
            this.arrowTop = dialogHeight - 1;
        }
        else if (this.cpPosition === 'bottom') {
            this.top += boxDirective.height + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
        }
        else {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left += boxDirective.width + this.dialogArrowSize;
        }
    };
    DialogComponent.prototype.setSaturation = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    DialogComponent.prototype.setLightness = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    DialogComponent.prototype.setHue = function (val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    };
    DialogComponent.prototype.setAlpha = function (val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    };
    DialogComponent.prototype.setR = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    DialogComponent.prototype.setG = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    DialogComponent.prototype.setB = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    DialogComponent.prototype.setSaturationAndBrightness = function (val) {
        this.hsva.s = val.s / val.rgX;
        this.hsva.v = val.v / val.rgY;
        this.update();
    };
    DialogComponent.prototype.formatPolicy = function () {
        this.format = (this.format + 1) % 3;
        if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
            this.format++;
        }
        return this.format;
    };
    DialogComponent.prototype.update = function (emit) {
        if (emit === void 0) { emit = true; }
        var hsla = this.service.hsva2hsla(this.hsva);
        var rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
        var hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        this.hexText = this.service.hexText(rgba, this.cpAlphaChannel === 'hex8');
        this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
            this.format++;
        }
        var lastOutput = this.outputColor;
        this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8');
        this.selectedColor = this.service.outputFormat(this.hsva, 'rgba', false);
        this.slider = new SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8, (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8);
        if (emit && lastOutput !== this.outputColor) {
            this.directiveInstance.colorChanged(this.outputColor);
        }
    };
    DialogComponent.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    DialogComponent.prototype.createBox = function (element, offset) {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    };
    return DialogComponent;
}());
__decorate([
    ViewChild('hueSlider'),
    __metadata("design:type", Object)
], DialogComponent.prototype, "hueSlider", void 0);
__decorate([
    ViewChild('alphaSlider'),
    __metadata("design:type", Object)
], DialogComponent.prototype, "alphaSlider", void 0);
__decorate([
    ViewChild('dialogPopup'),
    __metadata("design:type", Object)
], DialogComponent.prototype, "dialogElement", void 0);
DialogComponent = __decorate([
    Component({
        selector: 'color-picker',
        templateUrl: './templates/default/color-picker.html',
        styleUrls: ['./templates/default/color-picker.css']
    }),
    __metadata("design:paramtypes", [ElementRef, ColorPickerService])
], DialogComponent);
export { DialogComponent };
var DynamicCpModule = (function () {
    function DynamicCpModule() {
    }
    return DynamicCpModule;
}());
DynamicCpModule = __decorate([
    NgModule({
        imports: [BrowserModule],
        declarations: [DialogComponent, TextDirective, SliderDirective]
    }),
    __metadata("design:paramtypes", [])
], DynamicCpModule);
export { DynamicCpModule };
;
//# sourceMappingURL=color-picker.directive.js.map