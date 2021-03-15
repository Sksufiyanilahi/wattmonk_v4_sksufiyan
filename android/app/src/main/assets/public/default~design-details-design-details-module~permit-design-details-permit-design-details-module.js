(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~design-details-design-details-module~permit-design-details-permit-design-details-module"],{

/***/ "06dE":
/*!*******************************************************************!*\
  !*** ./node_modules/ngx-timer/__ivy_ngcc__/fesm2015/ngx-timer.js ***!
  \*******************************************************************/
/*! exports provided: NgxTimerModule, CountupTimerComponent, CountupTimerService, countUpTimerConfigModel, timerTexts, CountdownTimerComponent, CountdownTimerService, countDownTimerConfigModel, countDownTimerTexts, TimerStaus, ɵa, ɵb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTimerModule", function() { return NgxTimerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountupTimerComponent", function() { return CountupTimerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountupTimerService", function() { return CountupTimerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countUpTimerConfigModel", function() { return countUpTimerConfigModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timerTexts", function() { return timerTexts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountdownTimerComponent", function() { return CountdownTimerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CountdownTimerService", function() { return CountdownTimerService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countDownTimerConfigModel", function() { return countDownTimerConfigModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "countDownTimerTexts", function() { return countDownTimerTexts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimerStaus", function() { return TimerStaus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return StopWatchComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return StopWatchService; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

class CountupTimerService {
    constructor() {
        //Init
        this.timerValue = {
            seconds: '00',
            mins: '00',
            hours: '00',
        };
        this.isTimerStart = false;
        this.totalSeconds = 0;
        this.currentOperationId = 0;
        //start timer
        this.startTimer = (/**
         * @param {?=} startTime
         * @return {?}
         */
        (startTime) => {
            if (startTime) {
                /** @type {?} */
                let currentDate = new Date();
                /** @type {?} */
                let startedTime = new Date(startTime);
                this.totalSeconds = Math.round((currentDate.getTime() - startedTime.getTime()) / 1000);
            }
            this.isTimerStart = true;
            return true;
        });
        //end timer
        this.pauseTimer = (/**
         * @param {?=} startTime
         * @param {?=} endTime
         * @return {?}
         */
        (startTime, endTime) => {
            if (startTime && endTime) {
                /** @type {?} */
                let endedDate = new Date(endTime);
                /** @type {?} */
                let startedTime = new Date(startTime);
                this.totalSeconds = Math.round((endedDate.getTime() - startedTime.getTime()) / 1000);
            }
            this.isTimerStart = false;
            return false;
        });
        //reset Timer
        this.stopTimer = (/**
         * @return {?}
         */
        () => {
            this.isTimerStart = false;
            this.totalSeconds = 0;
        });
        //get timer value Obj
        this.getTimerValue = (/**
         * @return {?}
         */
        () => {
            return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((/**
             * @param {?} obs
             * @return {?}
             */
            obs => {
                if (this.intervalSubscription) {
                    this.intervalSubscription.unsubscribe();
                }
                this.intervalSubscription = this.interval.subscribe((/**
                 * @param {?} int
                 * @return {?}
                 */
                int => {
                    if (this.isTimerStart) {
                        ++this.totalSeconds;
                        this.timerValue.seconds = this.setTimervalue(this.totalSeconds % 60);
                        /** @type {?} */
                        let totalSecondsForMinutes = 0;
                        totalSecondsForMinutes = (Math.trunc(this.totalSeconds / 60) >= 60) ? (this.totalSeconds / 60) % 60 : this.totalSeconds / 60;
                        this.timerValue.mins = this.setTimervalue(Math.trunc(totalSecondsForMinutes));
                        this.timerValue.hours = this.setTimervalue(Math.trunc(this.totalSeconds / 3600));
                        obs.next(this.timerValue);
                        obs.complete();
                    }
                    else {
                        if (this.totalSeconds > 0) {
                            this.timerValue.seconds = this.setTimervalue(this.totalSeconds % 60);
                            /** @type {?} */
                            let totalSecondsForMinutes = 0;
                            totalSecondsForMinutes = (Math.trunc(this.totalSeconds / 60) >= 60) ? (this.totalSeconds / 60) % 60 : this.totalSeconds / 60;
                            this.timerValue.mins = this.setTimervalue(Math.trunc(totalSecondsForMinutes));
                            this.timerValue.hours = this.setTimervalue(Math.trunc(this.totalSeconds / 3600));
                        }
                        else {
                            this.timerValue.hours = "00";
                            this.timerValue.mins = "00";
                            this.timerValue.seconds = "00";
                        }
                        obs.next(this.timerValue);
                        obs.complete();
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    obs.error(error);
                    obs.complete();
                }));
            }));
        });
        //set timer value
        this.setTimervalue = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            /** @type {?} */
            let valString = val + "";
            return (valString.length < 2) ? "0" + valString : valString;
        });
        this.interval = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(1000);
    }
}
CountupTimerService.ɵfac = function CountupTimerService_Factory(t) { return new (t || CountupTimerService)(); };
CountupTimerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CountupTimerService, factory: CountupTimerService.ɵfac, providedIn: 'root' });
/** @nocollapse */
CountupTimerService.ctorParameters = () => [];
/** @nocollapse */ CountupTimerService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function CountupTimerService_Factory() { return new CountupTimerService(); }, token: CountupTimerService, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CountupTimerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class countUpTimerConfigModel {
}
class timerTexts {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CountupTimerComponent {
    /**
     * @param {?} countupTimerService
     */
    constructor(countupTimerService) {
        this.countupTimerService = countupTimerService;
        //Init
        this.timerObj = {};
        //get timer value
        this.getTimerValue = (/**
         * @return {?}
         */
        () => {
            this.timerSubscription = this.countupTimerService.getTimerValue().subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                this.timerObj = Object.assign(res);
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                console.log(error);
                console.log('Failed to get timer value');
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getTimerValue();
        this.timerConfig = new countUpTimerConfigModel();
        this.timerTextConfig = new timerTexts();
        this.timerConfig = this.countUpTimerConfig ? Object.assign(this.countUpTimerConfig) : null;
        this.timerTextConfig = this.countUpTimerConfig && this.countUpTimerConfig.timerTexts ? Object.assign(this.countUpTimerConfig.timerTexts) : null;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }
}
CountupTimerComponent.ɵfac = function CountupTimerComponent_Factory(t) { return new (t || CountupTimerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](CountupTimerService)); };
CountupTimerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CountupTimerComponent, selectors: [["countup-timer"]], inputs: { startTime: "startTime", countUpTimerConfig: "countUpTimerConfig" }, decls: 13, vars: 8, consts: [[1, "time-category"]], template: function CountupTimerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]((ctx.timerConfig == null ? null : ctx.timerConfig.timerClass) ? ctx.timerConfig.timerClass : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerObj.hours);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.timerTextConfig && ctx.timerTextConfig.hourText ? ctx.timerTextConfig.hourText : "hh", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerObj.mins);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.timerTextConfig && ctx.timerTextConfig.minuteText ? ctx.timerTextConfig.minuteText : "mm", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerObj.seconds);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerTextConfig && ctx.timerTextConfig.secondsText ? ctx.timerTextConfig.secondsText : "ss");
    } }, styles: [""] });
/** @nocollapse */
CountupTimerComponent.ctorParameters = () => [
    { type: CountupTimerService }
];
CountupTimerComponent.propDecorators = {
    startTime: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    countUpTimerConfig: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CountupTimerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'countup-timer',
                template: "<div [class]=\"timerConfig?.timerClass ? timerConfig.timerClass : ''\">\n  <span>{{timerObj.hours}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.hourText ? timerTextConfig.hourText : 'hh'}} </span> \n  <span>{{timerObj.mins}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.minuteText ? timerTextConfig.minuteText : 'mm'}}  </span> \n  <span>{{timerObj.seconds}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.secondsText ? timerTextConfig.secondsText : 'ss'}}</span>\n</div>",
                styles: [""]
            }]
    }], function () { return [{ type: CountupTimerService }]; }, { startTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], countUpTimerConfig: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class countDownTimerConfigModel {
}
class countDownTimerTexts {
}
/** @enum {string} */
const TimerStaus = {
    START: "START",
    PAUSE: "PAUSE",
    STOP: "STOP",
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CountdownTimerService {
    constructor() {
        this.onTimerStatusChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        //Init
        this.timerValue = {
            seconds: '00',
            mins: '00',
            hours: '00',
        };
        this.isTimerStart = false;
        this.totalSeconds = 0;
        this.currentOperationId = 0;
        //start timer
        this.startTimer = (/**
         * @param {?} startTime
         * @return {?}
         */
        (startTime) => {
            if (startTime) {
                /** @type {?} */
                let currentDate = new Date();
                /** @type {?} */
                let startedTime = new Date(startTime);
                this.totalSeconds = (Math.round((currentDate.getTime() - startedTime.getTime()) / 1000)) * -1;
            }
            this.isTimerStart = true;
            this.onTimerStatusChange.emit(TimerStaus.START);
            return true;
        });
        //end timer
        this.pauseTimer = (/**
         * @param {?=} startTime
         * @param {?=} endTime
         * @return {?}
         */
        (startTime, endTime) => {
            if (startTime && endTime) {
                /** @type {?} */
                let endedDate = new Date(endTime);
                /** @type {?} */
                let startedTime = new Date(startTime);
                this.totalSeconds = Math.round((endedDate.getTime() - startedTime.getTime()) / 1000);
            }
            this.isTimerStart = false;
            this.onTimerStatusChange.emit(TimerStaus.PAUSE);
            return false;
        });
        //reset Timer
        this.stopTimer = (/**
         * @return {?}
         */
        () => {
            this.isTimerStart = false;
            this.totalSeconds = 0;
            this.onTimerStatusChange.emit(TimerStaus.STOP);
        });
        //resume Timer
        this.resumeTimer = (/**
         * @return {?}
         */
        () => {
            this.isTimerStart = true;
        });
        //get timer value Obj
        this.getTimerValue = (/**
         * @return {?}
         */
        () => {
            return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((/**
             * @param {?} obs
             * @return {?}
             */
            obs => {
                if (this.intervalSubscription) {
                    this.intervalSubscription.unsubscribe();
                }
                this.intervalSubscription = this.interval.subscribe((/**
                 * @param {?} int
                 * @return {?}
                 */
                int => {
                    if (this.isTimerStart && this.totalSeconds > 0) {
                        --this.totalSeconds;
                        this.timerValue.seconds = this.setTimervalue(this.totalSeconds % 60);
                        /** @type {?} */
                        let totalSecondsForMinutes = 0;
                        totalSecondsForMinutes = (Math.trunc(this.totalSeconds / 60) >= 60) ? (this.totalSeconds / 60) % 60 : this.totalSeconds / 60;
                        this.timerValue.mins = this.setTimervalue(Math.trunc(totalSecondsForMinutes));
                        this.timerValue.hours = this.setTimervalue(Math.trunc(this.totalSeconds / 3600));
                        obs.next(this.timerValue);
                        obs.complete();
                    }
                    else {
                        if (this.totalSeconds > 0) {
                            this.timerValue.seconds = this.setTimervalue(this.totalSeconds % 60);
                            /** @type {?} */
                            let totalSecondsForMinutes = 0;
                            totalSecondsForMinutes = (Math.trunc(this.totalSeconds / 60) >= 60) ? (this.totalSeconds / 60) % 60 : this.totalSeconds / 60;
                            this.timerValue.mins = this.setTimervalue(Math.trunc(totalSecondsForMinutes));
                            this.timerValue.hours = this.setTimervalue(Math.trunc(this.totalSeconds / 3600));
                        }
                        else {
                            this.timerValue.hours = "00";
                            this.timerValue.mins = "00";
                            this.timerValue.seconds = "00";
                            this.stopTimer();
                        }
                        obs.next(this.timerValue);
                        obs.complete();
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    obs.error(error);
                    obs.complete();
                }));
            }));
        });
        //set timer value
        this.setTimervalue = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            /** @type {?} */
            let valString = val + "";
            return (valString.length < 2) ? "0" + valString : valString;
        });
        this.interval = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(1000);
    }
}
CountdownTimerService.ɵfac = function CountdownTimerService_Factory(t) { return new (t || CountdownTimerService)(); };
CountdownTimerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CountdownTimerService, factory: CountdownTimerService.ɵfac, providedIn: 'root' });
/** @nocollapse */
CountdownTimerService.ctorParameters = () => [];
/** @nocollapse */ CountdownTimerService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function CountdownTimerService_Factory() { return new CountdownTimerService(); }, token: CountdownTimerService, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CountdownTimerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CountdownTimerComponent {
    /**
     * @param {?} countdownTimerService
     */
    constructor(countdownTimerService) {
        this.countdownTimerService = countdownTimerService;
        this.timerObj = {};
        //get timer value
        this.getTimerValue = (/**
         * @return {?}
         */
        () => {
            this.timerSubscription = this.countdownTimerService.getTimerValue().subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                this.timerObj = Object.assign(res);
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                console.log(error);
                console.log('Failed to get timer value');
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getTimerValue();
        this.timerConfig = new countDownTimerConfigModel();
        this.timerTextConfig = new countDownTimerTexts();
        this.timerConfig = this.countDownTimerConfig ? Object.assign(this.countDownTimerConfig) : null;
        this.timerTextConfig = this.countDownTimerConfig && this.countDownTimerConfig.timerTexts ? Object.assign(this.countDownTimerConfig.timerTexts) : null;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }
}
CountdownTimerComponent.ɵfac = function CountdownTimerComponent_Factory(t) { return new (t || CountdownTimerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](CountdownTimerService)); };
CountdownTimerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CountdownTimerComponent, selectors: [["countdown-timer"]], inputs: { startTime: "startTime", countDownTimerConfig: "countDownTimerConfig" }, decls: 13, vars: 8, consts: [[1, "time-category"]], template: function CountdownTimerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]((ctx.timerConfig == null ? null : ctx.timerConfig.timerClass) ? ctx.timerConfig.timerClass : "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerObj.hours);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.timerTextConfig && ctx.timerTextConfig.hourText ? ctx.timerTextConfig.hourText : "hh", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerObj.mins);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.timerTextConfig && ctx.timerTextConfig.minuteText ? ctx.timerTextConfig.minuteText : "mm", " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerObj.seconds);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.timerTextConfig && ctx.timerTextConfig.secondsText ? ctx.timerTextConfig.secondsText : "ss");
    } }, styles: [""] });
/** @nocollapse */
CountdownTimerComponent.ctorParameters = () => [
    { type: CountdownTimerService }
];
CountdownTimerComponent.propDecorators = {
    startTime: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
    countDownTimerConfig: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CountdownTimerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'countdown-timer',
                template: "<div [class]=\"timerConfig?.timerClass ? timerConfig.timerClass : ''\">\r\n  <span>{{timerObj.hours}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.hourText ? timerTextConfig.hourText : 'hh'}} </span> \r\n  <span>{{timerObj.mins}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.minuteText ? timerTextConfig.minuteText : 'mm'}}  </span> \r\n  <span>{{timerObj.seconds}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.secondsText ? timerTextConfig.secondsText : 'ss'}}</span>\r\n</div>",
                styles: [""]
            }]
    }], function () { return [{ type: CountdownTimerService }]; }, { startTime: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], countDownTimerConfig: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StopWatchService {
    constructor() {
        //Init
        this.timerValue = {
            miliseconds: '00',
            seconds: '00',
            mins: '00',
            hours: '00',
        };
        this.isTimerStart = false;
        this.totalSeconds = 0;
        this.currentOperationId = 0;
        //start timer
        this.startTimer = (/**
         * @return {?}
         */
        () => {
            debugger;
            this.isTimerStart = true;
            return true;
        });
        //end timer
        this.pauseTimer = (/**
         * @param {?=} startTime
         * @param {?=} endTime
         * @return {?}
         */
        (startTime, endTime) => {
            if (startTime && endTime) {
                /** @type {?} */
                let endedDate = new Date(endTime);
                /** @type {?} */
                let startedTime = new Date(startTime);
                this.totalSeconds = Math.round((endedDate.getTime() - startedTime.getTime()) / 1000);
            }
            this.isTimerStart = false;
            return false;
        });
        //reset Timer
        this.stopTimer = (/**
         * @return {?}
         */
        () => {
            this.isTimerStart = false;
            this.totalSeconds = 0;
        });
        //resume Timer
        this.resumeTimer = (/**
         * @return {?}
         */
        () => {
            this.isTimerStart = true;
        });
        //get timer value Obj
        this.getTimerValue = (/**
         * @return {?}
         */
        () => {
            return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((/**
             * @param {?} obs
             * @return {?}
             */
            obs => {
                if (this.intervalSubscription) {
                    this.intervalSubscription.unsubscribe();
                }
                this.intervalSubscription = this.interval.subscribe((/**
                 * @param {?} int
                 * @return {?}
                 */
                int => {
                    if (this.isTimerStart && this.totalSeconds > 0) {
                        --this.totalSeconds;
                        this.timerValue.seconds = this.setTimervalue(this.totalSeconds % 60);
                        /** @type {?} */
                        let totalSecondsForMinutes = 0;
                        totalSecondsForMinutes = (Math.trunc(this.totalSeconds / 60) >= 60) ? (this.totalSeconds / 60) % 60 : this.totalSeconds / 60;
                        this.timerValue.mins = this.setTimervalue(Math.trunc(totalSecondsForMinutes));
                        this.timerValue.hours = this.setTimervalue(Math.trunc(this.totalSeconds / 3600));
                        obs.next(this.timerValue);
                        obs.complete();
                    }
                    else {
                        if (this.totalSeconds > 0) {
                            this.timerValue.seconds = this.setTimervalue(this.totalSeconds % 60);
                            /** @type {?} */
                            let totalSecondsForMinutes = 0;
                            totalSecondsForMinutes = (Math.trunc(this.totalSeconds / 60) >= 60) ? (this.totalSeconds / 60) % 60 : this.totalSeconds / 60;
                            this.timerValue.mins = this.setTimervalue(Math.trunc(totalSecondsForMinutes));
                            this.timerValue.hours = this.setTimervalue(Math.trunc(this.totalSeconds / 3600));
                        }
                        else {
                            this.timerValue.hours = "00";
                            this.timerValue.mins = "00";
                            this.timerValue.seconds = "00";
                        }
                        obs.next(this.timerValue);
                        obs.complete();
                    }
                }), (/**
                 * @param {?} error
                 * @return {?}
                 */
                error => {
                    obs.error(error);
                    obs.complete();
                }));
            }));
        });
        //set timer value
        this.setTimervalue = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            /** @type {?} */
            let valString = val + "";
            return (valString.length < 2) ? "0" + valString : valString;
        });
        this.interval = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["interval"])(10000);
    }
}
StopWatchService.ɵfac = function StopWatchService_Factory(t) { return new (t || StopWatchService)(); };
StopWatchService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: StopWatchService, factory: StopWatchService.ɵfac, providedIn: 'root' });
/** @nocollapse */
StopWatchService.ctorParameters = () => [];
/** @nocollapse */ StopWatchService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["defineInjectable"])({ factory: function StopWatchService_Factory() { return new StopWatchService(); }, token: StopWatchService, providedIn: "root" });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](StopWatchService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class StopWatchComponent {
    // timerConfig: countDownTimerConfigModel;
    // timerTextConfig: countDownTimerTexts;
    /**
     * @param {?} countdownTimerService
     */
    constructor(countdownTimerService) {
        this.countdownTimerService = countdownTimerService;
        this.timerObj = {};
        //get timer value
        this.getTimerValue = (/**
         * @return {?}
         */
        () => {
            this.timerSubscription = this.countdownTimerService.getTimerValue().subscribe((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                this.timerObj = Object.assign(res);
            }), (/**
             * @param {?} error
             * @return {?}
             */
            error => {
                console.log(error);
                console.log('Failed to get timer value');
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.getTimerValue();
        // this.timerConfig = new countDownTimerConfigModel();
        // this.timerTextConfig = new countDownTimerTexts();
        // this.timerConfig = this.countDownTimerConfig ? Object.assign(this.countDownTimerConfig) : null;
        // this.timerTextConfig = this.countDownTimerConfig && this.countDownTimerConfig.timerTexts ? Object.assign(this.countDownTimerConfig.timerTexts) :  null;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.timerSubscription.unsubscribe();
    }
}
StopWatchComponent.ɵfac = function StopWatchComponent_Factory(t) { return new (t || StopWatchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](StopWatchService)); };
StopWatchComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: StopWatchComponent, selectors: [["stop-watch"]], decls: 0, vars: 0, template: function StopWatchComponent_Template(rf, ctx) { }, styles: [""] });
/** @nocollapse */
StopWatchComponent.ctorParameters = () => [
    { type: StopWatchService }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](StopWatchComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'stop-watch',
                template: "<!-- <div [class]=\"timerConfig?.timerClass ? timerConfig.timerClass : ''\">\n  <span>{{timerObj.hours}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.hourText ? timerTextConfig.hourText : 'hh'}} </span> \n  <span>{{timerObj.mins}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.minuteText ? timerTextConfig.minuteText : 'mm'}}  </span> \n  <span>{{timerObj.seconds}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.secondsText ? timerTextConfig.secondsText : 'ss'}}</span>\n  <span>{{timerObj.miliseconds}}</span><span class=\"time-category\">{{timerTextConfig && timerTextConfig.milisecondsText ? timerTextConfig.milisecondsText : 'ss'}}</span>\n</div> -->",
                styles: [""]
            }]
    }], function () { return [{ type: StopWatchService }]; }, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxTimerModule {
}
NgxTimerModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: NgxTimerModule });
NgxTimerModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function NgxTimerModule_Factory(t) { return new (t || NgxTimerModule)(); }, providers: [
        CountupTimerService,
        CountdownTimerService,
        StopWatchService
    ], imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](NgxTimerModule, { declarations: function () { return [CountupTimerComponent, CountdownTimerComponent, StopWatchComponent]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]]; }, exports: function () { return [CountupTimerComponent, CountdownTimerComponent, StopWatchComponent]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NgxTimerModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    CountupTimerComponent,
                    CountdownTimerComponent,
                    StopWatchComponent
                ],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
                ],
                exports: [
                    CountupTimerComponent,
                    CountdownTimerComponent,
                    StopWatchComponent
                ],
                entryComponents: [
                    CountupTimerComponent,
                    CountdownTimerComponent,
                    StopWatchComponent
                ],
                providers: [
                    CountupTimerService,
                    CountdownTimerService,
                    StopWatchService
                ]
            }]
    }], null, null); })();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=ngx-timer.js.map

/***/ })

}]);
//# sourceMappingURL=default~design-details-design-details-module~permit-design-details-permit-design-details-module.js.map