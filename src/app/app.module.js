"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var fejlec_component_1 = require("./fejlec_component/fejlec.component");
var router_1 = require("@angular/router");
var page_rolam_component_1 = require("./page-rolam/page-rolam.component");
var page_main_component_1 = require("./page-main/page-main.component");
var page_egyeb_component_1 = require("./page-egyeb/page-egyeb.component");
var page_projectek_component_1 = require("./page-projectek/page-projectek.component");
var appRoutes = [
    { path: 'rolam', component: page_rolam_component_1.PageRolamComponent },
    { path: 'projectek', component: page_projectek_component_1.PageProjectekComponent },
    { path: 'egyeb', component: page_egyeb_component_1.PageEgyebComponent },
    { path: '#', component: page_main_component_1.PageMainComponent },
    { path: '', component: page_main_component_1.PageMainComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            page_rolam_component_1.PageRolamComponent, page_main_component_1.PageMainComponent, page_egyeb_component_1.PageEgyebComponent, page_projectek_component_1.PageProjectekComponent, fejlec_component_1.FejlecComponent
        ],
        imports: [
            platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(appRoutes)
        ],
        providers: [],
        bootstrap: [fejlec_component_1.FejlecComponent]
    })
], AppModule);
exports.AppModule = AppModule;
