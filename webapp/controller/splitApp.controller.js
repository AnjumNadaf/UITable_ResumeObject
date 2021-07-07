sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function(Controller,JSONModel){
    "use strict"

    return Controller.extend("uitable.controller.splitApp",{

        onInit:function(){
            debugger;
            var that = this;
            var oPromise =  new Promise((resolve,reject)=>{
                var jsonmodel = new JSONModel();
                var url = "/sap/opu/odata/sap/ZAPROJECT3_SRV/";
                // var oModel = new sap.ui.model.odata.ODataModel(url,true);
                var oModel = new sap.ui.model.odata.ODataModel(url,true);
                oModel.read("/expensesSet",{
                    success:function(data){
                    console.log(data.results);
                    jsonmodel.setData({
                        expensesSet:data.results
                    })
                    resolve(data.results);
                    that.getOwnerComponent().setModel("myModel3P",jsonmodel);
                    },
                    error:function(error){
                        reject(error);
                    }
                })

            })
              
            oPromise.then((successMessage)=>{
                console.log(successMessage);
            }).catch(function(error){
             console.log(error);
            })


        },

        onFirst:function(){
            debugger;
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.navTo("RouteView1");
        },

        onAfterRendering:function(){
			debugger;
			//alert("After");
		},

		onBeforeRendering:function(){
			debugger;
			//alert("Before");
			
		},
        onLineChart:function(){
            debugger;
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.navTo("RouteView3");
        }




    });

});