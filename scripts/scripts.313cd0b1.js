"use strict";angular.module("aesculapiusFrontApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngMaterial","mdDataTable","restangular","datetime"]).config(["$httpProvider","RestangularProvider","$mdDateLocaleProvider",function(a,b,c){a.defaults.xsrfCookieName="csrftoken",a.defaults.xsrfHeaderName="X-CSRFToken";var d="http://mateosss.pythonanywhere.com/api/";b.setBaseUrl(d),b.addResponseInterceptor(function(a,b){if("getList"===b&&a.results){var c=a.results;c.count=a.count,a=c}return a}),c.formatDate=function(a){if(a){var b=a.getDate(),c=a.getMonth(),d=a.getFullYear();return("0"+b).slice(-2)+"/"+("0"+(c+1)).slice(-2)+"/"+d}return""}}]).config(["$routeProvider",function(a){a.when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/employees",{templateUrl:"views/employees.html",controller:"EmployeesCtrl",controllerAs:"employees"}).when("/profiles",{templateUrl:"views/profiles.html",controller:"ProfilesCtrl",controllerAs:"profiles"}).when("/history",{templateUrl:"views/history.html",controller:"HistoryCtrl",controllerAs:"history"}).when("/profile",{templateUrl:"views/profile.html",controller:"ProfileCtrl",controllerAs:"profile"}).when("/stock",{templateUrl:"views/stock.html",controller:"StockCtrl",controllerAs:"stock"}).when("/drug",{templateUrl:"views/drug.html",controller:"DrugCtrl",controllerAs:"drug"}).when("/consult",{templateUrl:"views/consult.html",controller:"ConsultCtrl",controllerAs:"consult"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl",controllerAs:"register"}).when("/newvisit",{templateUrl:"views/newvisit.html",controller:"NewvisitCtrl",controllerAs:"newvisit"}).otherwise({redirectTo:"/login"})}]).run(["$rootScope","auth","aeData","$mdDialog",function(a,b,c,d){a.loading=!0,a.$on("$routeChangeStart",function(){a.loading=!0}),a.$on("$routeChangeSuccess",function(){a.loading=!1}),b.autoLogin(),a.showDialog=function(a,b){b&&b.value&&"consult"!==a.currentTarget.id?c[a.currentTarget.id]=c[a.currentTarget.id+"s"].get(b.value).$object:c[a.currentTarget.id]=null;var e;"employee"===a.currentTarget.id&&(e="profile"),c.selected=a.currentTarget.id,d.show({controller:_.capitalize(e||a.currentTarget.id)+"Ctrl",controllerAs:e||a.currentTarget.id,templateUrl:"views/"+(e||a.currentTarget.id)+".html",parent:angular.element(document.body),targetEvent:a,clickOutsideToClose:!0,escapeToClose:!0})}}]).config(["$mdThemingProvider",function(a){a.theme("default").primaryPalette("blue").accentPalette("pink").warnPalette("red")}]),angular.module("aesculapiusFrontApp").controller("BaseCtrl",["$scope","$location","auth","aeData","$rootScope",function(a,b,c,d,e){a.me=d.me,a.goToDialog=function(b){e.showDialog(b,{value:a.me.id})},a.$on("setMe",function(){a.me=d.me}),a.logout=function(){c.logout(),b.path("/login")}}]),angular.module("aesculapiusFrontApp").controller("LoginCtrl",["$scope","$location","auth","$rootScope","$mdToast",function(a,b,c,d,e){window.localStorage.token&&b.path("/profiles"),a.credentials={username:"",password:""},a.logIn=function(){d.loading=!0,c.token(this.credentials).then(function(){d.loading=!1,b.path("/profiles")},function(a){d.loading=!1,e.show(e.simple().textContent(a.data.non_field_errors[0]).position("bottom right").hideDelay(2e3))})}}]),angular.module("aesculapiusFrontApp").controller("ConsultCtrl",["$scope","$mdDialog","Restangular","aeData","$mdToast",function(a,b,c,d,e){a.enable=!0,a.visit=d.visitObj,a.detail=a.visit.detail,a.saveButton=!0,a.cancel=function(){e.show(e.simple().textContent("No se han hecho modificaciones").position("bottom right").hideDelay(2e3)),b.cancel()},a.edit=function(){a.enable===!0?a.enable=!1:a.enable=!0},a.change=function(){a.saveButton=!1},a["delete"]=function(){d.visitObj.remove().then(function(){b.cancel(),e.show(e.simple().textContent("Consulta eliminada con exito!").position("top","left").hideDelay(3e3)),d.reloadHistoryTable()},function(){b.cancel(),e.show(e.simple().textContent("Lamentablemente hubo un error al eliminar la consulta.").position("top","left").hideDelay(3e3))})},a.save=function(){var c=d.visitObj.detail,f=d.visitObj.datetime;d.visitObj.detail=a.detail,d.visitObj.datetime=Date(),d.visitObj.put().then(function(){b.cancel(),e.show(e.simple().textContent("Consulta guardada con exito!").position("top","left").hideDelay(3e3)),d.reloadHistoryTable()},function(){d.visitObj.detail=c,d.visitObj.datetime=f,b.cancel(),e.show(e.simple().textContent("Lamentablemente hubo un error al editar la consulta.").position("top","left").hideDelay(3e3))})}}]),function(){angular.module("aesculapiusFrontApp").controller("EmployeesCtrl",["$scope","Restangular","aeData",function(a,b,c){a.filterText="";var d,e=b.all("employees");a.$watch("filterText",function(){d&&d()}),a.getLoadResultsCallback=function(a){d=_.debounce(a,1e3),c.reloadEmployeesTable=a},a.refreshTable=function(b,d){var f=(b-1)*d;return e.getList({search:a.filterText,limit:d,offset:f}).then(function(a){return c.employees=a,{results:a,totalResultCount:a.count}})}}])}(),function(){angular.module("aesculapiusFrontApp").controller("ProfilesCtrl",["$scope","$location","Restangular","aeData",function(a,b,c,d){a.filterText="";var e,f=c.all("profiles");a.$watch("filterText",function(){e&&e()}),a.getLoadResultsCallback=function(a){e=_.debounce(a,1e3),d.reloadProfilesTable=a},a.refreshTable=function(b,c){var e=(b-1)*c;return f.getList({search:a.filterText,limit:c,offset:e}).then(function(a){return d.profiles=a,{results:a,totalResultCount:a.count}})},a.cHistory=function(a){d.historyId=a.currentTarget.parentElement.parentElement.parentElement.children[5].children[0].children[0].attributes[1].nodeValue,b.path("history")}}])}(),angular.module("aesculapiusFrontApp").controller("HistoryCtrl",["$scope","Restangular","aeData","$location","$rootScope",function(a,b,c,d,e){c.historyId||d.path("profiles"),b.one("profiles",String(c.historyId)).get().then(function(b){return a.patientName=b.first_name+" "+b.last_name,a.patientName}),a.getLoadResultsCallback=function(a){c.reloadHistoryTable=a},a.getData=function(a,d){var e=(a-1)*d;return b.all("visits").getList({pacient:c.historyId,limit:d,offset:e}).then(function(a){return{results:a,totalResultCount:a.count}})},a.goToDialog=function(a,d,f){b.one("visits",a).get().then(function(a){return c.visitObj=a,e.showDialog(d,f),a})}}]),angular.module("aesculapiusFrontApp").controller("ProfileCtrl",["$scope","$mdDialog","$rootScope","aeData","Restangular","$mdToast",function(a,b,c,d,e,f){a.person=d.getSelected(),a.isEmployeeForm="employee"===d.selected,a.isEmployeeForm&&(a.allEmployees=e.all("employees").getList().$object,a.repeat_password="",a.person=a.person||{},a.person.assist_ed=a.person.assist_ed||[],a.person.charge=a.person.charge||"secretary"),a.add=function(){return a.isEmployeeForm&&(a.person.password&&!a.repeat_password||Boolean(a.repeat_password)!==Boolean(a.person.password))?void f.show(f.simple().textContent("Debe escribir dos veces su nueva contraseña y deben coincidir.").position("bottom right").hideDelay(2e3)):void e.all(d.selected+"s").post(a.person).then(function(b){a.cancel(),f.show(f.simple().textContent(a.person.name+" ha sido añadido.").position("bottom right").hideDelay(2e3)),c.$broadcast("profileAdded",{person:b}),d.reloadSelectedTable()},function(a){f.show(f.simple().textContent(a.data).position("bottom right").hideDelay(5e3))})},a.save=function(){if(d.getSelected()){if(a.isEmployeeForm&&(a.person.password&&!a.repeat_password||Boolean(a.repeat_password)!==Boolean(a.person.password)))return void f.show(f.simple().textContent("Debe escribir dos veces su nueva contraseña y deben coincidir.").position("bottom right").hideDelay(2e3));e.copy(a.person).save().then(function(){a.cancel(),f.show(f.simple().textContent(a.person.name+" ha sido modificado.").position("bottom right").hideDelay(2e3)),d.reloadSelectedTable()},function(a){f.show(f.simple().textContent(a.data).position("bottom right").hideDelay(5e3))})}else this.add()},a["delete"]=function(){a.person.remove().then(function(){f.show(f.simple().textContent("Eliminado correctamente").position("bottom right").hideDelay(2e3)),d.reloadProfilesTable(),b.cancel()},function(a){f.show(f.simple().textContent(a.data).position("bottom right").hideDelay(5e3))})},a.cancel=function(){b.cancel()},a.assistEdSelection=function(b){var c=a.person.assist_ed.indexOf(b);c>-1?a.person.assist_ed.splice(c,1):a.person.assist_ed.push(b)},a.isChecked=function(b){return a.person.assist_ed.indexOf(b)>-1}}]),angular.module("aesculapiusFrontApp").service("auth",["Restangular","$rootScope","aeData",function(a,b,c){this.tokenAuthUrl="token-auth/",this.setMe=function(){a.all("employees").get("me").then(function(a){c.me=a,b.$broadcast("setMe")},function(a){console.error("Hubo un error al carger el perfil del usuario logueado"),console.error(a)})},this.token=function(c){var d=this;if(c.username&&c.password)return a.all(this.tokenAuthUrl).post(c).then(function(c){return b.authenticated=!0,a.setDefaultHeaders({Authorization:"Token "+c.token}),window.localStorage.token=c.token,d.setMe(),c});throw new Error("You must provide a credentials object with username and password fields to auth.token()")},this.autoLogin=function(){return window.localStorage.token?(b.authenticated=!0,a.setDefaultHeaders({Authorization:"Token "+window.localStorage.token}),this.setMe(),!0):!1},this.logout=function(){delete window.localStorage.token,b.authenticated=!1}}]),angular.module("aesculapiusFrontApp").directive("mdtButton",function(){return{restrict:"EA",template:'<md-button class="md-primary"><md-icon>{{icon}}</md-icon>{{text}}</md-button>',link:function(a,b,c){a.icon=c.icon,a.text=c.text}}}),angular.module("aesculapiusFrontApp").directive("aeProfileIcon",function(){return{template:'<div md-ink-ripple="true" md-whiteframe="2" class="unselectable" style="cursor:pointer;margin:8px;width:{{size}}px;height:{{size}}px;background-color:#49F;float:left;border-radius:{{size/2}}px;color:white;font-size:{{size/2}}px;text-align:center;line-height:{{size}}px;">{{letter}}</div>',restrict:"E",link:function(a,b,c){a.size=c.size||32,a.letter=(c.name+"A").charAt(0)}}}),angular.module("aesculapiusFrontApp").service("aeData",function(){this.me=null,this.selected=null,this.profile=null,this.profiles=null,this.employee=null,this.employees=null,this.drug=null,this.drugs=null,this.pos=null,this.visitObj=null,this.reloadHistoryTable=null,this.reloadEmployeesTable=null,this.reloadProfilesTable=null,this.reloadStockTable=null,this.historyId=null,this.reloadSelectedTable=function(){switch(this.selected){case"profile":return this.reloadProfilesTable();case"employee":return this.reloadEmployeesTable();case"drug":return this.reloadStockTable();default:return!1}},this.getSelected=function(){return this[this.selected]}}),function(){angular.module("aesculapiusFrontApp").controller("StockCtrl",["$scope","$rootScope","$mdDialog","Restangular","aeData",function(a,b,c,d,e){a.filterText="";var f,g=d.all("drugs");a.$watch("filterText",function(){f&&f()}),a.getLoadResultsCallback=function(a){f=_.debounce(a,1e3),e.reloadStockTable=a},a.refreshTable=function(b,c){var d=(b-1)*c;return g.getList({search:a.filterText,limit:c,offset:d}).then(function(a){return e.drugs=a,{results:a,totalResultCount:a.count}})},a.deleteRowCallback=function(a){for(var b=0;b<a.length;b++)d.one("drugs",a[b]).remove();e.reloadStockTable()}}])}(),function(){angular.module("aesculapiusFrontApp").controller("DrugCtrl",["$scope","$rootScope","$mdDialog","Restangular","aeData","$mdToast",function(a,b,c,d,e,f){a.drug=e.drug,a.add=function(){d.all("drugs").post(a.drug).then(function(c){a.cancel(),f.show(f.simple().textContent(a.drug.name+" ha sido añadido.").position("bottom right").hideDelay(2e3)),b.$broadcast("drugAdded",{drug:c}),e.reloadStockTable()},function(a){f.show(f.simple().textContent(a.data).position("bottom right").hideDelay(5e3))})},a.save=function(){e.drug?d.copy(a.drug).save().then(function(){a.cancel(),f.show(f.simple().textContent(a.drug.name+" ha sido modificado.").position("bottom right").hideDelay(2e3)),e.reloadStockTable()},function(a){f.show(f.simple().textContent(a.data).position("bottom right").hideDelay(5e3))}):this.add()},a["delete"]=function(){a.drug.remove(),a.cancel(),e.reloadStockTable()},a.cancel=function(){c.cancel()}}])}(),angular.module("aesculapiusFrontApp").controller("RegisterCtrl",["$scope","Restangular","$mdToast","aeData","$rootScope",function(a,b,c,d,e){a.detail="",a.selectedItemPeople="",a.nActions=[{capital:"",drug:"",quantity:"",detail:"",type:""}];var f=b.all("profiles"),g=b.all("drugs");a.itemText=function(a){return a.last_name?a.first_name+" "+a.last_name:a.first_name},a.done=function(){for(var d=[],e=0;e<a.nActions.length;e++){var f={};f.detail=a.nActions[e].detail,f.movement_type=parseInt(a.nActions[e].capital),0===f.movement_type?(f.drug=a.nActions[e].drug.id,f.drug_quantity=parseInt(a.nActions[e].quantity)):f.cash=parseFloat(a.nActions[e].quantity),f.is_donation=!!parseInt(a.nActions[e].type),d.push(f),a.nActions[e].drug.quantity-parseInt(a.nActions[e].quantity)<0&&!f.is_donation&&c.show(c.simple().textContent("No tienes esta cantidad de "+a.nActions[e].drug.name+". Revisa el Stock").position("bottom right").hideDelay(3e3))}var g={profile:a.selectedItemPeople.id,items:d};b.all("movements").post(g).then(function(){a.cancel()},function(){c.show(c.simple().textContent("Hubo un error al intentar completar el proceso. Ha completado todos los campos correctamente?").position("bottom right").hideDelay(3e3))})},a.showOrHide=function(a){return"0"===a?!1:!0},a.peopleList=function(){return f.getList({search:a.filterTextP,limit:5}).then(function(a){return a.push(" "),a})},a.drugList=function(){return g.getList({search:this.filterTextM,limit:5}).then(function(a){return a.push(" "),a})},a.addAction=function(){a.nActions.push({capital:"",drug:"",quantity:"",detail:"",type:""})},a.deleteAction=function(b){a.nActions.splice(a.nActions.indexOf(b),1)},a.cancel=function(){a.selectedItemPeople="",a.nActions=[{capital:"",drug:"",quantity:"",detail:"",type:""}]},a.goToDialog=function(a,b){d.pos=b,e.showDialog(a)},a.$on("drugAdded",function(b,c){a.drugList(),a.nActions[d.pos].drug=c.drug}),a.$on("profileAdded",function(b,c){a.peopleList(),a.selectedItemPeople=c.person})}]),angular.module("aesculapiusFrontApp").controller("NewvisitCtrl",["$scope","Restangular","$mdToast","$rootScope",function(a,b,c,d){var e=b.all("profiles"),f=b.all("visits");a.date=new Date,a.peopleList=function(){return e.getList({search:a.filterTextP,limit:5}).then(function(a){return a.push("necesito esto para el boton añadir en el autocomplete"),a})},a.cancel=function(){a.detail="",a.selectedItemPeople=""},a.goToDialog=function(a,b){var c={value:b};d.showDialog(a,c)},a.$on("profileAdded",function(b,c){a.peopleList(),a.selectedItemPeople=c.person}),a.done=function(){var b={pacient:a.selectedItemPeople.id,detail:a.detail};f.post(b).then(function(){c.show(c.simple().textContent("Nueva consulta añadida a la Historia Clinica de "+a.selectedItemPeople.first_name+" "+a.selectedItemPeople.last_name).position("bottom right").hideDelay(3e3)),a.cancel()},function(){c.show(c.simple().textContent("Hubo un error al realizar la consulta, ¿esta usted logueado?").position("bottom right").hideDelay(3e3)),a.cancel()})}}]),angular.module("aesculapiusFrontApp").run(["$templateCache",function(a){a.put("views/consult.html",'<md-dialog> <div layout="row"> <md-toolbar layout="row"> <div class="md-toolbar-tools">Consulta</div> <div style="margin-top:10px"> <md-button class="md-icon-button"> <md-icon ng-click="cancel()">close</md-icon> </md-button> </div> </md-toolbar> </div> <md-divider></md-divider> <md-dialog-content layout="column" layout-padding flex> <div layout="row"> <p> Paciente: <b ng-bind="visit.patient_name"></b></p> </div> <div layout="row"> <p> Médico: <b ng-bind="visit.doctor_name"></b></p> </div> <div layout="row"> <p>Fecha: <b ng-bind="visit.datetime|date"></b></p> </div> <div layout="row" layout-align="space-between center"> <p>Detalles: </p> <md-button class="md-icon-button md-primary" ng-click="edit()"> <md-icon>border_color</md-icon> </md-button> </div> <div> <md-input-container class="md-block" style="height: inherit;\n    overflow-y: auto"> <label></label> <textarea ng-model="detail" ng-change="change()" rows="3" ng-disabled="enable" md-no-autogrow></textarea> </md-input-container> </div> </md-dialog-content> <md-dialog-actions layout="row"> <md-button class="md-warn" ng-click="delete()" layout-align="start center"> <label>Eliminar</label> <md-icon>delete</md-icon> </md-button> <md-button ng-click="cancel()" layout-align="end center"> <label>Cancelar</label> <md-icon>cancel</md-icon> </md-button> <md-button class="md-primary" ng-click="save()" ng-disabled="saveButton" layout-align="end center"> <label>Guardar</label> <md-icon>save</md-icon> </md-button> </md-dialog-actions> </md-dialog>'),a.put("views/drug.html",'<md-dialog> <div layout="row"> <md-toolbar layout="row"> <div class="md-toolbar-tools">Agregar Medicamento</div> <div style="margin-top:10px"> <md-button class="md-icon-button"> <md-icon ng-click="cancel()">close</md-icon> </md-button> </div> </md-toolbar> </div> <md-divider></md-divider> <md-dialog-content class="md-padding" layout-xs="column" layout="row"> <div layout="column" layout-padding ng-cloak> <form name="drugForm"> <div layout="row"> <md-input-container flex="50"> <label>Nombre del Medicamento</label> <md-icon class="md-primary">healing</md-icon> <input name="name" ng-model="drug.name"> </md-input-container> <md-input-container class="md-block"> <label>Cantidad</label> <md-icon class="md-primary">vertical_align_center</md-icon> <input name="quantity" type="number" ng-model="drug.quantity"> </md-input-container> <md-input-container flex="50"> <label>Detalle</label> <md-icon class="md-primary">content_paste</md-icon> <textarea name="description" ng-model="drug.description"></textarea> </md-input-container> </div> </form> </div> </md-dialog-content> <md-dialog-actions layout="row"> <md-button class="md-warn" ng-show="drug" ng-click="delete()" layout-align="start center"> <label>Eliminar</label> <md-icon>delete</md-icon> </md-button> <md-button ng-click="cancel()" layout-align="end center"> <label>Cancelar</label> <md-icon>cancel</md-icon> </md-button> <md-button class="md-primary" ng-click="save()" layout-align="end center"> <label>Guardar</label> <md-icon>save</md-icon> </md-button> </md-dialog-actions> </md-dialog>'),a.put("views/employees.html",'<md-card> <md-toolbar layout="row"> <div class="md-toolbar-tools">Buscar Empleados</div> </md-toolbar> <md-input-container layout="row"> <div flex="90"> <label>Buscar</label> <input ng-model="filterText" type="text"> </div> <md-button class="md-primary md-accent" id="employee" ng-click="$root.showDialog($event)"> <md-icon>person_add</md-icon> </md-button> </md-input-container> </md-card> <md-card> <mdt-table sortable-columns="true" animate-sort-icon="true" paginated-rows="{isEnabled: true, rowsPerPageValues: [5,10,20,50]}" mdt-row-paginator="refreshTable(page, pageSize)" mdt-row-paginator-error-message="Hubo un error al cargar los empleados." mdt-row-paginator-no-results-message="No hubo resultados de la busqueda." mdt-trigger-request="getLoadResultsCallback(loadPageCallback)" mdt-row="{\n    \'table-row-id-key\': \'id\',\n    \'column-keys\': [\n    \'profile.first_name\',\n    \'profile.last_name\',\n    \'charge\',\n    \'profile.email\',\n    \'id\'\n    ],\n  }"> <mdt-header-row> <mdt-column align-rule="left">Nombre</mdt-column> <mdt-column align-rule="left">Apellido</mdt-column> <mdt-column align-rule="left">Tipo</mdt-column> <mdt-column align-rule="left">Email</mdt-column> <mdt-column align-rule="left">Editar</mdt-column> </mdt-header-row> <mdt-custom-cell column-key="profile.first_name"> <ae-profile-icon name="{{value}}" size="32"></ae-profile-icon> <span style="line-height:48px">{{value}}</span> </mdt-custom-cell> <mdt-custom-cell column-key="id"> <mdt-button id="employee" value="{{value}}" ng-click="$root.showDialog($event, this)" icon="edit"></mdt-button> </mdt-custom-cell> </mdt-table> </md-card>'),a.put("views/history.html",'<div> <div layout="row"> <md-toolbar layout="row"> <div class="md-toolbar-tools">Historia Clínica de {{patientName}}</div> </md-toolbar></div>  </div> <md-content layout="column" layout-padding flex> <mdt-table sortable-columns="true" animate-sort-icon="true" paginated-rows="{isEnabled: true, rowsPerPageValues: [10,20,50]}" mdt-row-paginator="getData(page, pageSize)" mdt-row-paginator-error-message="Hubo un error al cargar las personas." mdt-row-paginator-no-results-message="No hubo resultados de la busqueda." mdt-trigger-request="getLoadResultsCallback(loadPageCallback)" mdt-row="{\n      \'table-row-id-key\': \'id\',\n      \'column-keys\': [\n      \'datetime\',\n      \'doctor_name\',\n      \'detail\',\n      \'id\'\n      ],\n    }"> <mdt-header-row> <mdt-column align-rule="right">Fecha</mdt-column> <mdt-column align-rule="left">Médico</mdt-column> <mdt-column align-rule="left">Descripción</mdt-column> <mdt-column align-rule="right">Detalles</mdt-column> </mdt-header-row> <mdt-custom-cell column-key="doctor_name" aria-label="More"> <ae-profile-icon name="{{value}}" size="32"></ae-profile-icon> <span style="line-height:48px">{{value}}</span> </mdt-custom-cell> <mdt-custom-cell column-key="detail" aria-label="More"> {{value| limitTo: 97}}{{value.length > 100? \'...\': \'\'}} </mdt-custom-cell> <mdt-custom-cell column-key="datetime" aria-label="More"> {{value|date}} </mdt-custom-cell> <mdt-custom-cell column-key="id" aria-label="More"> <mdt-button id="consult" ng-click="clientScope.goToDialog(value, $event, this)" icon="more"></mdt-button> </mdt-custom-cell> </mdt-table> </md-content> '),a.put("views/login.html",'<div layout="row" flex layout-align="center"> <form ng-submit="logIn()" class="login-form pad-2" md-whiteframe="3" layout="column" layout-fill> <div layout="column" layout-align="center center"> <img src="images/logo_circle_shadow.6696ac83.png" class="login-logo"> <p class="thin-text">Ingresa a Aesculapius - Santa María</p> </div> <md-input-container class="md-block"> <md-icon class="md-primary">person</md-icon> <input ng-model="credentials.username" placeholder="Nombre de Usuario"> </md-input-container> <md-input-container class="md-block"> <md-icon class="md-primary">lock</md-icon> <input type="password" ng-model="credentials.password" placeholder="Contraseña"> </md-input-container> <md-button type="submit" class="md-primary md-raised row-4" layout="row"> <md-icon layout>arrow_forward</md-icon> </md-button> </form> </div>'),a.put("views/newvisit.html",'<md-toolbar layout="row"> <div class="md-toolbar-tools">Nueva Consulta</div> </md-toolbar> <md-content> <md-card> <md-card-content flex layout="column"> <div layout="row"> <ae-profile-icon ng-if="selectedItemPeople.first_name" name="{{selectedItemPeople.first_name}}" size="32"></ae-profile-icon> <md-autocomplete flex required md-selected-item="selectedItemPeople" md-search-text="filterTextP" md-items="item in peopleList()" md-item-text="item.first_name+\' \'+item.last_name" md-min-length="0" md-delay="1000" md-floating-label="Ingrese el nombre, apellido o DNI del paciente"> <md-item-template> <div ng-if="item.first_name"> <span class="item-title"> <md-icon>person</md-icon> <span> {{item.first_name}} </span> </span> <span class="item-metadata"> <span class="item-metastat"> <strong>{{item.last_name}}</strong> </span> <span class="item-metastat" ng-if="item.dni"> - DNI: <strong>{{item.dni}}</strong> </span> </span> </div> <div layout="row"> <md-button flex id="profile" class="md-primary" aria-label="Person Add" ng-click="$root.showDialog($event, this)"> <md-icon>person_add</md-icon> <label>Añadir Persona</label> </md-button> </div> </md-item-template> </md-autocomplete> <md-button class="md-icon-button" aria-label="More" id="profile" ng-click="goToDialog($event, selectedItemPeople.id)"> <md-icon>more_vert</md-icon> </md-button> </div> <div flex layout="row" layout-align="end center"> <span>{{date | date: "dd MMMM yyyy HH:mm"}}</span> </div> <div layout="row"> <md-input-container flex> <label>Detalles</label> <textarea ng-model="detail" rows="5"></textarea> </md-input-container> </div> </md-card-content> <md-card-actions layout="row" layout-align="end center"> <md-button class="md-primary md-raised" ng-click="done()"> <md-icon>done</md-icon> Aceptar </md-button> <md-button class="md-warn" ng-click="cancel()"> <md-icon>cancel</md-icon> Cancelar </md-button> </md-card-actions> </md-card> </md-content>'),a.put("views/profile.html",'<md-dialog> <div layout="row"> <md-toolbar layout="row"> <div class="md-toolbar-tools">Editar Perfil</div> <div style="margin-top:10px"> <md-button class="md-icon-button"> <md-icon ng-click="cancel()">close</md-icon> </md-button> </div> </md-toolbar> </div> <md-divider></md-divider> <md-dialog-content class="md-padding" layout-xs="column" layout="row"> <div layout="column" layout-padding ng-cloak> <form name="profileForm" autocomplete="nope"> <div ng-show="isEmployeeForm"> <h2 class="md-title">Información de Cuenta</h2> <div layout="row"> <md-input-container flex="50"> <label>Nombre de Usuario</label> <md-icon class="md-primary">account_circle</md-icon> <input id="autocompleteoff" name="autocompleteoff" autocomplete="off" ng-model="person.username"> </md-input-container> <md-input-container flex="50"> <label>Nueva Contraseña</label> <md-icon class="md-primary">lock</md-icon> <input ng-model="person.password" type="password"> </md-input-container> <md-input-container flex="50"> <label>Repita Contraseña</label> <md-icon class="md-primary">lock_outline</md-icon> <input ng-model="repeat_password" type="password"> </md-input-container> </div> <h3 class="md-subhead">Cargo...</h3> <md-select required ng-model="person.charge" placeholder="Seleccione cargo"> <md-option value="doctor">Doctora</md-option> <md-option value="secretary">Secretaria</md-option> </md-select> <h3 class="md-subhead">Asistido por/Asiste a...</h3> <div layout="row"> <md-checkbox value="{{e.id}}" class="md-primary" ng-checked="isChecked(e.id)" ng-repeat="e in allEmployees" ng-click="assistEdSelection(e.id)"> {{ e.profile.first_name + " " + e.profile.last_name }} </md-checkbox> </div> </div> <div ng-hide="isEmployeeForm"> <h2 class="md-title">Información Personal</h2> <div layout="row"> <md-input-container flex="50"> <label>Nombre</label> <md-icon class="md-primary">person</md-icon> <input name="comments" required name="name" ng-model="person.first_name"> <div ng-messages="profileForm.name.$error"> <div ng-message="required">Campo obligatorio</div> </div> </md-input-container> <md-input-container flex="50"> <label>Apellido</label> <md-icon class="md-primary">face</md-icon> <input name="last_name" ng-model="person.last_name"> </md-input-container> <md-input-container flex="50"> <label>DNI</label> <md-icon class="md-primary">chrome_reader_mode</md-icon> <input name="dni" ng-model="person.dni"> </md-input-container> </div> <div layout="row"> <md-input-container class="md-block" flex="50"> <label>Email</label> <md-icon class="md-primary">mail</md-icon> <input name="email" type="email" ng-model="person.email"> </md-input-container> <!-- <md-datepicker class="md-primary" ng-model="person.birth_date" md-placeholder="Nacimiento" flex="50"></md-datepicker> --> <md-datepicker class="md-primary" ng-model="person.birth_date" md-placeholder="Nacimiento" flex="50"></md-datepicker> </div> <md-input-container class="md-block"> <label>Dirección</label> <md-icon class="md-primary">location_on</md-icon> <input name="address" ng-model="person.address"> </md-input-container> <div layout="row"> <md-input-container class="md-block" flex="50"> <label>Número de teléfono</label> <md-icon class="md-primary">phone</md-icon> <input name="phone" ng-model="person.phone"> </md-input-container> <md-input-container class="md-block" flex="50"> <label>Número de celular</label> <md-icon class="md-primary">phone</md-icon> <input name="cellphone" ng-model="person.cellphone"> </md-input-container></div>  </div> <!-- TODO BORRAR ESTO ESTA DUPLICANDO LO ANTERIOR PERO CON PERSON.PROFILE --> <div ng-show="isEmployeeForm"> <h2 class="md-title">Información Personal</h2> <div layout="row"> <md-input-container flex="50"> <label>Nombre</label> <md-icon class="md-primary">person</md-icon> <input name="comments" required name="name" ng-model="person.profile.first_name"> <div ng-messages="profileForm.name.$error"> <div ng-message="required">Campo obligatorio</div> </div> </md-input-container> <md-input-container flex="50"> <label>Apellido</label> <md-icon class="md-primary">face</md-icon> <input name="last_name" ng-model="person.profile.last_name"> </md-input-container> <md-input-container flex="50"> <label>DNI</label> <md-icon class="md-primary">chrome_reader_mode</md-icon> <input name="dni" ng-model="person.profile.dni"> </md-input-container> </div> <div layout="row"> <md-input-container class="md-block" flex="50"> <label>Email</label> <md-icon class="md-primary">mail</md-icon> <input name="email" type="email" ng-model="person.profile.email"> </md-input-container> <!-- <md-datepicker class="md-primary" ng-model="person.birth_date" md-placeholder="Nacimiento" flex="50"></md-datepicker> --> <md-datepicker class="md-primary" ng-model="person.profile.birth_date" md-placeholder="Nacimiento" flex="50"></md-datepicker> </div> <md-input-container class="md-block"> <label>Dirección</label> <md-icon class="md-primary">location_on</md-icon> <input name="address" ng-model="person.profile.address"> </md-input-container> <div layout="row"> <md-input-container class="md-block" flex="50"> <label>Número de teléfono</label> <md-icon class="md-primary">phone</md-icon> <input name="phone" ng-model="person.profile.phone"> </md-input-container> <md-input-container class="md-block" flex="50"> <label>Número de celular</label> <md-icon class="md-primary">phone</md-icon> <input name="cellphone" ng-model="person.profile.cellphone"> </md-input-container></div>  </div> </form> </div> </md-dialog-content> <md-dialog-actions layout="row"> <md-button class="md-warn" ng-show="person" ng-click="delete()" layout-align="start center"> <label>Eliminar</label> <md-icon>delete</md-icon> </md-button> <md-button ng-click="cancel()" layout-align="end center"> <label>Cancelar</label> <md-icon>cancel</md-icon> </md-button> <md-button class="md-primary" ng-click="save()" layout-align="end center"> <label>Guardar</label> <md-icon>save</md-icon> </md-button> </md-dialog-actions> </md-dialog>'),a.put("views/profiles.html",'<md-card> <md-toolbar layout="row"> <div class="md-toolbar-tools">Buscar Pacientes</div> </md-toolbar> <md-input-container layout="row"> <div flex="90"> <label>Buscar</label> <input flex ng-model="filterText" type="text"> </div> <md-button class="md-primary md-accent" id="profile" ng-click="$root.showDialog($event)"> <md-icon>person_add</md-icon> </md-button> </md-input-container> </md-card> <md-card> <mdt-table sortable-columns="true" animate-sort-icon="true" paginated-rows="{isEnabled: true, rowsPerPageValues: [5,10,20,50]}" mdt-row-paginator="refreshTable(page, pageSize)" mdt-row-paginator-error-message="Hubo un error al cargar las personas." mdt-row-paginator-no-results-message="No hubo resultados de la busqueda." mdt-trigger-request="getLoadResultsCallback(loadPageCallback)" mdt-row="{\n    \'table-row-id-key\': \'id\',\n    \'column-keys\': [\n    \'first_name\',\n    \'last_name\',\n    \'dni\',\n    \'email\',\n    \'id\',\n    \'hc\'\n    ],\n  }"> <mdt-header-row> <mdt-column align-rule="left">Nombre</mdt-column> <mdt-column align-rule="left">Apellido</mdt-column> <mdt-column align-rule="left">DNI</mdt-column> <mdt-column align-rule="left">Email</mdt-column> <mdt-column align-rule="left">Editar</mdt-column> <mdt-column align-rule="left">H. Clínica</mdt-column> </mdt-header-row> <mdt-custom-cell column-key="first_name"> <ae-profile-icon name="{{value}}" size="32"></ae-profile-icon> <span style="line-height:48px">{{value}} <span></span></span></mdt-custom-cell> <mdt-custom-cell column-key="id"> <mdt-button id="profile" value="{{value}}" ng-click="$root.showDialog($event, this)" icon="edit"></mdt-button> </mdt-custom-cell> <mdt-custom-cell column-key="hc"> <mdt-button id="history" ng-click="clientScope.cHistory($event)" icon="description"></mdt-button> </mdt-custom-cell> </mdt-table> </md-card>'),
a.put("views/register.html",'<md-toolbar layout="row"> <div class="md-toolbar-tools">Caja Registradora</div> </md-toolbar> <md-content layout="column"> <md-card> <md-card-content flex layout="row"> <div> <md-card> <md-card-title> <div layout="column"> <span class="md-headline">Introduzca un Nombre</span> </div> </md-card-title> <md-card-content> <ae-profile-icon ng-if="selectedItemPeople.first_name" name="{{selectedItemPeople.first_name}}" size="32"></ae-profile-icon> <md-autocomplete required md-selected-item="selectedItemPeople" md-search-text="filterTextP" md-items="item in peopleList()" md-item-text="itemText(item)" md-min-length="0" md-delay="1000" md-no-cache="true" md-floating-label="Persona a tratar"> <md-item-template> <div ng-if="item.first_name"> <span class="item-title"> <md-icon>person</md-icon> <span> {{item.first_name}} </span> </span> <span class="item-metadata"> <span class="item-metastat"> <strong>{{item.last_name}}</strong> </span> <span class="item-metastat" ng-if="item.dni"> - DNI: <strong>{{item.dni}}</strong> </span> </span> </div> <div layout="row"> <md-button flex id="profile" class="md-primary" aria-label="Person Add" ng-click="$root.showDialog($event, this)"> <md-icon>person_add</md-icon> <label>Añadir Persona</label> </md-button> </div> </md-item-template> </md-autocomplete> </md-card-content> </md-card> </div> <md-card flex> <md-card-title> <div layout="column"> <span class="md-headline">Introduzca el capital y el tipo de acción</span> </div> </md-card-title> <md-card-content layout-padding layout="row" layout-align="none center" ng-repeat="action in nActions"> <md-select required ng-model="action.capital" placeholder="Capital" class="md-no-underline"> <md-option value="0">Medicamento</md-option> <md-option value="1">Dinero</md-option> </md-select> <span ng-show="showOrHide(action.capital)">$</span> <md-autocomplete required ng-hide="showOrHide(action.capital)" md-selected-item="action.drug" md-search-text="filterTextM" md-items="drug in drugList()" md-item-text="drug.name" md-min-length="0" md-delay="1000" md-no-cache="true" md-floating-label="Nombre del Medicamento"> <md-item-template> <div ng-if="drug.name"> <span class="drug-title"> <md-icon>healing</md-icon> <span>{{drug.name}}</span> </span> <span class="drug-metadata"> <span class="drug-metastat"> - <strong>{{drug.quantity}}</strong> </span> </span> </div> <div layout="row"> <md-button id="drug" flex class="md-primary" aria-label="Drug Add" ng-click="goToDialog($event, nActions.indexOf(action))"> <md-icon>add_box</md-icon> <label>Añadir</label> </md-button> </div> </md-item-template> </md-autocomplete> <md-input-container> <label>Cantidad</label> <input required ng-model="action.quantity"> </md-input-container> <md-select required ng-model="action.type" placeholder="Tipo" class="md-no-underline"> <md-option value="1">Ingreso</md-option> <md-option value="0">Egreso</md-option> </md-select> <md-input-container flex> <label>Detalles</label> <input ng-model="action.detail"> </md-input-container> <md-button class="md-icon-button" aria-label="deleteRow" ng-click="deleteAction(action)"> <md-icon>delete</md-icon> </md-button> </md-card-content> <div layout="row" layout-align="end center" layout-padding> <md-button class="md-fab" aria-label="more" ng-click="addAction()"> <md-icon>add</md-icon> </md-button> </div> </md-card> </md-card-content> <md-card-actions layout="row" layout-align="end center"> <md-button class="md-primary md-raised" ng-click="done()"> <md-icon>done</md-icon> Aceptar </md-button> <md-button class="md-warn" ng-click="cancel()"> <md-icon>cancel</md-icon> Cancelar </md-button> </md-card-actions> </md-card> </md-content>'),a.put("views/stock.html",'<md-card> <md-toolbar layout="row"> <div class="md-toolbar-tools">Buscar Medicamentos</div> </md-toolbar> <md-input-container layout="row"> <div flex="90"> <label>Buscar</label> <input ng-model="filterText" type="text"> </div> <md-button class="md-primary md-accent" id="drug" ng-click="$root.showDialog($event)"> <md-icon>add</md-icon> </md-button> </md-input-container> </md-card> <md-card> <mdt-table table-card="{visible: true, title: \'Inventario\'}" selectable-rows="true" alternate-headers="\'contextual\'" delete-row-callback="deleteRowCallback(rows)" sortable-columns="true" animate-sort-icon="true" paginated-rows="{isEnabled: true, rowsPerPageValues: [5,10,20,50]}" mdt-row-paginator="refreshTable(page, pageSize)" mdt-row-paginator-error-message="Hubo un error al cargar el stock." mdt-row-paginator-no-results-message="No hubo resultados de la busqueda." mdt-trigger-request="getLoadResultsCallback(loadPageCallback)" mdt-row="{\n    \'table-row-id-key\': \'id\',\n    \'column-keys\': [\n    \'name\',\n    \'quantity\',\n    \'description\',\n    \'id\',\n    ],\n  }"> <mdt-header-row> <mdt-column align-rule="left">Nombre</mdt-column> <mdt-column align-rule="left">Cantidad</mdt-column> <mdt-column align-rule="left">Detalle</mdt-column> <mdt-column align-rule="left">Editar</mdt-column> </mdt-header-row> <mdt-row> <mdt-custom-cell column-key="name" editable-field="smallEditDialog" editable-field-max-length="25"> {{value}} </mdt-custom-cell> <mdt-custom-cell column-key="quantity"> {{value}} </mdt-custom-cell> <mdt-custom-cell column-key="description"> {{value}} </mdt-custom-cell> <mdt-custom-cell column-key="id"> <mdt-button id="drug" value="{{value}}" ng-click="$root.showDialog($event, this)" icon="edit"></mdt-button> </mdt-custom-cell> </mdt-row> </mdt-table> </md-card>')}]);
