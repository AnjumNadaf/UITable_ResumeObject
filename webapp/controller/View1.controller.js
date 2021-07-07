sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"uitable/util/formatter",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV",
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel,formatter, Export,ExportTypeCSV,library,Spreadsheet) {
		"use strict";

		

		return Controller.extend("uitable.controller.View1", {
			formatter:formatter,
			onInit: function () {
				debugger;
				var oJSONModel = new JSONModel();
				var that = this;

				// that.getOwnerComponent().setModel(oJSONModel,"myModel");
				var sURL = "/sap/opu/odata/sap/ZAPROJECT3_SRV/";
				var oModel9 = new sap.ui.model.odata.ODataModel(sURL,true);
				oModel9.read("/expensesSet",{
					success:function(data){
						debugger;
					 oJSONModel.setData({
						expensesSet:data.results
					   
					 });
					 console.log(data.results);
					 debugger
					 that.getOwnerComponent().setModel(oJSONModel,"myModel");


			},error:function(){
				alert("Error");

			}

		});


            //  var jsonmodel = new JSONModel();
			//  var that = this;
			//  var sURL = "/sap/opu/odata/sap/ZAPROJECT3_SRV/";
			//  var oModel = new sap.ui.model.odata.ODataModel(sURL,true);
			//  oModel.read("/expensesSet",{
			// 	 success:function(data){
			// 		//  alert("Success");
            //        jsonmodel.setData({
			// 		  expensesSet:data.result 
			// 	   });
			// 	   console.log(data.results);
			// 	    that.getOwnerComponent().setModel(jsonmodel,"myModel");
			// 	 },
			// 	 error:function(error){
            //      console.log(error);
			// 	 }
			//  })
















			},

			onNext:function(){
               debugger;
			   this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			   this.oRouter.navTo("RouteView2");
			},

			onCreate:function(){
				debugger;
				var sform1 = this.getView().byId("simpleformid").setVisible(true);
				var oTable = this.getView().byId("table1");

			
				

				// var itemRow = {
				// 	Empid:"",
				// 	Empfname:"",
				// 	Emplname:"",
				// 	Designation:"",
				// 	Emonth:"",
				// 	Eyear:"",
				// 	Expenses:"",
				// 	Assets:"",
				// 	Expensestype:""
				// }

				//  var oModel = this.getView().getModel("myModel");

				// //  var itemData = oModel.getProperty("/expensesSet");

				// // var oModel9 = this.getOwnerComponent().getModel("myModel").getProperty("/expensesSet");

				
				// 	var itemData = [];
				// 	itemData.push(itemRow);

				

				// itemData.push(itemRow);

				// oModel.setData({
				// 	expensesSet: itemData
				// });
                //  var oModel9 = this.getOwnerComponent().getModel("myModel").getProperty("/expensesSet");
				//  console.log(oModel9);
				// // this.onInit();


               

				
			},

			onSave:function(){
                debugger;

				var id = this.getView().byId("eid").getValue();
				var fname = this.getView().byId("name").getValue();
				var lname = this.getView().byId("lname").getValue();
				var designation = this.getView().byId("cityid").getValue();
				var expenses = this.getView().byId("phonenum").getValue();
				var assets = this.getView().byId("assets").getValue();
				var emonth = this.getView().byId("month").getValue();
				var eyear = this.getView().byId("year").getValue();
				var expensestype = this.getView().byId("ExpensesType").getValue();

				if(id =="" &&  fname== "" &&  lname =="" &&  designation=="" && expenses==""  && assets=="" 
				&& emonth=="" && eyear=="" && expensestype=="" ){
					                   alert("Please Enter All Fields");

				}else{
                      
					var payLoad = {
						Empid:id,
						Empfname:fname,
						Emplname:lname,
						Designation:designation,
						Expenses:expenses,
						Emonth:emonth,
                        Eyear:eyear,
						Assets:assets,
						Expensestype:expensestype
					}

					var that = this;
					// var sURL = "/sap/opu/odata/sap/ZAPROJECT3_SRV/";
					// var oModel = new sap.ui.model.odata.oDataModel(sURL,true);
					// var oModel = new sap.ui.model.odata.ODataModel(sURL,true);
					var oModel = this.getOwnerComponent().getModel();
					oModel.create("/expensesSet", payLoad,{
						method:"POST",
						success:function(){
							alert("new Data Created Succesfully!");
						},
						error:function(){
							alert('Error');
						}
					});



				}

				var sform1 = this.getView().byId("simpleformid").setVisible(false);


			},

			onEdit:function(){
				debugger;
				var oTable = this.getView().byId("table1");
				var selectedRows = oTable.getSelectedIndices();
				var array = [];
				for(var i=0; i<selectedRows.length; i++){
					var objectsss = oTable.getContextByIndex(i).getObject();
					// console.log(objectsss);
					array.push(objectsss);
					console.log(array);

					var empid = array[i].Empid;
					var empfname = array[i].Empfname;
					var emplname = array[i].Emplname;
					var designation = array[i].Designation;
					var expenses = array[i].Expenses;
					var emonth = array[i].Emonth;
					var eyear = array[i].Eyear;
					var assets = array[i].Assets;
					var expensestype = array[i].Expensestype;
					


					var payLoad = {
						Empid:empid,
						Empfname:empfname,
						Emplname:emplname,
						Designation:designation,
						Expenses:expenses,
						Emonth:emonth,
                        Eyear:eyear,
						Assets:assets,
						Expensestype:expensestype
					}

					var that = this;
					var sURL = "/sap/opu/odata/sap/ZAPROJECT3_SRV/";
					var oModel = new sap.ui.model.odata.ODataModel(sURL,true);
					
					oModel.update("/expensesSet('" +  empid + "')", payLoad,{
						method:"PUT",
						success:function(){
							alert("Updated successfully");
						that.onInit();
                            
						},
						error:function(err){
							// sap.m.MessageBox.error("Not updated.");
							alert("Error");

						}

					});

	
				}

				oTable.clearSelection();

			},


			onDelete:function(){
				debugger;

				var oTable = this.getView().byId("table1");
				var selectedRows = oTable.getSelectedIndices();
				var array = [];
				for(var i=0; i<selectedRows.length; i++){
					var objectsss = oTable.getContextByIndex(selectedRows[i]).getObject();
					// console.log(objectsss);
					array.push(objectsss);
					console.log(array);

					var empid = array[i].Empid;
					var empfname = array[i].Empfname;
					var emplname = array[i].Emplname;
					var designation = array[i].Designation;
					var expenses = array[i].Expenses;
					var emonth = array[i].Emonth;
					var eyear = array[i].Eyear;
					var assets = array[i].Assets;
					var expensestype = array[i].Expensestype;
					


					

					var that = this;
					var sURL = "/sap/opu/odata/sap/ZAPROJECT3_SRV/";
					var oModel = new sap.ui.model.odata.ODataModel(sURL,true);
					
					oModel.remove("/expensesSet('" +  empid + "')",{
						method:"DELETE",
						success:function(response){
							alert("Deleted successfully");
							console.log(response);
						that.onInit();
                            
						},
						error:function(err){
							// sap.m.MessageBox.error("Not updated.");
							alert("Error");

						}

					});

	
				}

				oTable.clearSelection();

			},

			clearSelection:function(){
				debugger;
				var oTable = this.getView().byId("table1");
				oTable.clearSelection();
				
			},

			getContextByIndex:function(){
				debugger;
				var oTable = this.getView().byId("table1");
				var selectedItem = oTable.getSelectedIndex();
				var Selectedobject = oTable.getContextByIndex(selectedItem).getObject();
				sap.m.MessageToast.show(Selectedobject);

			},

			getSelectedIndices:function(){
				debugger;
				var oTable = this.getView().byId("table1");
				var selectedItem = oTable.getSelectedIndices();
				alert(selectedItem);

			},

			onSwitchChange:function(oEvent){
				debugger;
				var oTable = this.getView().byId("table1");
				oTable.setEnableSelectAll(oEvent.getParameter("state"));

			},

			onDataLabelChanged : function(oEvent){
				debugger;

				var that=this;
				var oVizFrame = that.getView().byId("idVizFrame");
				
				oVizFrame.setVizProperties({
				plotArea: {
				dataLabel: {
				visible: oEvent.getParameter("state")
				}
				}
				});

			},
			onSumLabelChanged : function(oEvent){
				debugger;
				var that=this;
				var oVizFrame = that.getView().byId("idVizFrame");
				var sumLabelSwitch = oEvent.getParameter("state");
				oVizFrame.setVizProperties({
				plotArea: {
				dataLabel: {
				showTotal: sumLabelSwitch
				}
				}
				});
				
				},

				onAxisTitleChanged : function(oEvent){
					debugger;
					var that=this;
					var oVizFrame = that.getView().byId("idVizFrame");
					
					var state = oEvent.getParameter("state");
					oVizFrame.setVizProperties({
					valueAxis: {
					title: {
					visible: state
					}
					},
					categoryAxis: {
					title: {
					visible: state
					}
					}
					});
					
					},

					onTypeSelected : function(oEvent){
						debugger;
						var that=this;
						var typeRadio = oEvent.getSource().getSelectedButton().getProperty("text");
						var oVizFrame = that.getView().byId("idVizFrame");
						
						if (typeRadio === "Regular") {
						
						oVizFrame.setVizType("line");
						
						} else if(typeRadio === "percentage") {
						oVizFrame.setVizType("100_stacked_bar");
						oVizFrame.setVizProperties({
						plotArea: {
						mode: "percentage",
						drawingEffect: "glossy",
						
						dataLabel: {
						type: "percentage",
						visible: true
						
						}
						}

						
						});
						
						}else{
							oVizFrame.setVizType("line");
						}
						},

						
				onFilter:function(oEvent){
					debugger;
					var type = this.getView().byId("filterData").getSelectedItem().getText();
					var aFilter = [];
					var oFilteryear =new sap.ui.model.Filter("Eyear",sap.ui.model.FilterOperator.EQ,type);   
					aFilter.push(oFilteryear);

					var ovizFrame = this.getView().byId("idVizFrame");
					ovizFrame.getDataset().getBinding("data").filter(aFilter);

				},

				onChangetoBar:function(oEvent){
					debugger;
					var oVizFrame = this.getView().byId("idVizFrame");
					
					var state = oEvent.getParameter("state");
					if(state == true){


						oVizFrame.setVizType("bar");
						oVizFrame.setVizProperties({
						plotArea: {
						mode: "percentage",
						drawingEffect: "glossy",
						
						dataLabel: {
						type: "percentage",
						visible: true
						
						}
						}

						
						});
						//Create Viz dataset to feed to the data to the graph
					// 	var oDataset = new sap.viz.ui5.data.FlattenedDataset({
					// 		dimensions : [{
					// 			name : 'Expenses',
					// 			value : "{myModel>Expenses}"}],
										   
					// 		measures : [{
					// 			name : 'Eyear',
					// 			value : "{myModel>Eyear}"} ],
										 
					// 		data : {
					// 			path : "myModel>/expensesSet"
					// 		}
					// 	});

					// 	oVizFrame.setDataset(oDataset);
					// 	oVizFrame.setVizType('column');

					// 	oVizFrame.setVizProperties({
					// 		plotArea: {
					// 			colorPalette : d3.scale.category20().range()
					// 			}});

					// var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					// 				'uid': "categoryAxis",
					// 				'type': "Dimesion",
					// 				'values': ["Eyear}"]
					// 			  }), 
					// 			  feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
					// 				'uid': "valueAxis",
					// 				'type': "<Measure",
					// 				'values': ["Expenses"]
					// 			  });

					// 			  oVizFrame.addFeed(feedValueAxis);
		            //               oVizFrame.addFeed(feedCategoryAxis);
					}else if(state== false){
						oVizFrame.setVizType("line");
					}



				},

				// changeStatus:function(){
				// 	debugger;
				// 	var oTable = this.getView().byId("table1");
				// 	var obj1 = oTable.getContextByIndex(0).getObject();
				// 	var rows = oTable.getRows();
				// 	// rows[1].mAggregations.cells[8].mProperties.type
				// 	// rows[1].mAggregations.cells[8].mProperties.text
				// 	for(var i=0; i<=rows.length; i++){
				// 		if(i==0){
				// 			rows[0].mAggregations.cells[8].mProperties.setType("Accept");
				// 			rows[0].mAggregations.cells[8].mProperties.setText("Active");

				// 		}else{
				// 			return rows[i].mAggregations.cells[8].mProperties.type;

				// 		}
				// 	}
		
		
				// },

				onDataExportPDF:function(oEvent){
					debugger;
					var fnSuccess = function(oData, oResponse) {  
      
						var columns = ["Empid","Empfname","Emplname","Designation","Expenses","Assets","Eyear","Emonth","Expensestype"];  
						var data = [];  
							for(var i=0;i<oData.results.length;i++)   
							{  
								data[i]=[oData.results[i].Empid,oData.results[i].Empfname,oData.results[i].Emplname,oData.results[i].Designation,oData.results[i].Expense,
								oData.results[i].Assets,oData.results[i].Eyear,oData.results[i].Emonth,oData.results[i].Expensestype];  
							}  
			  
						var doc = new jsPDF('p', 'pt');  
						doc.autoTable(columns, data);  
						doc.save("DemoData.pdf");  
					};  
					var fnFail = function() {  
					};  

					var sURL = "/sap/opu/odata/sap/ZAPROJECT3_SRV/";
				var oModel9 = new sap.ui.model.odata.ODataModel(sURL,true);
				oModel9.read("/expensesSet",null, null, true, fnSuccess, fnFail);
					
			  

				},



		onDataExport : function(oEvent) {
			debugger;

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					separatorChar : ";"
				}),

				// Pass in the model created above
				models : this.getView().getModel("myModel"),

				// binding information for the rows aggregation
				rows : {
					path : "myModel>/expensesSet"
				},

				// column definitions with column name and binding info for the content

				columns : [{
					name : "Empid",
					template : {
						content : "{myModel>Empid}"
					}
				}, {
					name : "Empfname",
					template : {
						content : "{myModel>Empfname}"
					}
				}, {
					name : "Emplname",
					template : {
						content : "{myModel>Emplname}"
					}
				}
				// }, {
				// 	name : "Dimensions",
				// 	template : {
				// 		content : {
				// 			parts : ["Width", "Depth", "Height", "DimUnit"],
				// 			formatter : function(width, depth, height, dimUnit) {
				// 				return width + " x " + depth + " x " + height + " " + dimUnit;
				// 			},
				// 			state : "Warning"
				// 		}
				// 	// "{Width} x {Depth} x {Height} {DimUnit}"
				// 	}
				// }, {
				// 	name : "Weight",
				// 	template : {
				// 		content : "{WeightMeasure} {WeightUnit}"
				// 	}
				// }, {
				// 	name : "Price",
				// 	template : {
				// 		content : "{Price} {CurrencyCode}"
				// 	}
				]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		},



		createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: 'Full name',
				property: ['Empfname', 'Emplname']
				
			});

			aCols.push({
				label: 'Empid',
				
				property: 'Empid',
				
			});

			aCols.push({
				property: 'Empfname',
				
			});

			aCols.push({
				property: 'Emplname',
				
			});

			

			

			aCols.push({
				property: 'Designation',
				
			});

			

			return aCols;
		},

		onExport: function() {
			debugger;
			var aCols, oRowBinding, oSettings, oSheet, oTable;

			if (!this._oTable) {
				this._oTable = this.byId('table1');
			}

			oTable = this._oTable;
			oRowBinding = oTable.getBinding('rows');
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: {
					columns: aCols,
					hierarchyLevel: 'Level'
				},
				dataSource: oRowBinding,
				fileName: 'Table export sample.xlsx',
				worker: false // We need to disable worker because we are using a MockServer as OData Service
			};
           // 'sap/ui/export/Spreadsheet',
			oSheet = new Spreadsheet(oSettings);
			oSheet.build().finally(function() {
				oSheet.destroy();
			});
		},

		ajaxCall:function(){
			debugger;
			var oModel = new JSONModel();
			var that = this;
			var aData = jQuery.ajax({
				type:"GET",
				contentType:"application/json",
				url:"/sap/opu/odata/sap/ZAPROJECT3_SRV/expensesSet",
				dataType:"json",
				async:false,
				success:function(data,textStatus,jqXHR){
					debugger;
                //   oModel.setData(data.results);
				  oModel.setData({
					  expenseSets:data.results
				  });
				  that.calldata(oModel);
				  
				  alert("Succes to Post");
				}
			});

			
			

		},

		calldata:function(model){
			debugger;
			this.getOwnerComponent().setModel("myModel3",model);
			var data1 = this.getOwnerComponent().getModel('myModel3');
			console.log(data1);


		},

		// onAfterRendering:function(){
		// 	debugger;
		// 	alert("After");
		// },

		// onBeforeRendering:function(){
		// 	debugger;
		// 	alert("Before");
			
		// },

		download: function(oEvent){
			debugger;
			var sUrl = "/sap/opu/odata/sap/ZAPROJECT3_SRV/expensesSet?$format=xlsx";
				var encodeUrl = encodeURI(sUrl);
			sap.m.URLHelper.redirect(encodeUrl,true);
		  },

		  onOpenDialog1:function(){
			  debugger;
			  var id = "newDialog1";
			  if(!this.oDialog){
				  this.oDialog = new sap.ui.xmlfragment(id, "uitable.view.form", this);
				  this.getView().addDependent(this.oDialog);
			}
			this.oDialog.open();

		  },
		  onOpenDialog2:function(){
			debugger;
			var id = "newDialog1";
			if(!this.oDialog){
				this.oDialog = new sap.ui.xmlfragment(id, "uitable.view.form", this);
				this.getView().addDependent(this.oDialog);
		  }
		  this.oDialog.open();
		  
		},
		onCloseDialog1:function(){
			debugger;
			this.oDialog.close();
		},
		dialogAfterclose:function(){
			debugger;
			this.oDialog.destroy();
		},
		onbeforeOpen:function(){
			debugger;
			alert("onbeforeOpen");
		},

		onLabelChanged:function(oEvent){
			debugger;
			var that=this;
			var oVizFrame = that.getView().byId("idVizFrames");
			oVizFrame.setVizProperties({
				plotArea: {
				dataLabel: {
				visible: oEvent.getParameter("state")
				}
				}
				});

		},
		onAxisTitleChanged1:function(oEvent){
			debugger;
			var oVizFrame = this.getView().byId("idVizFrames");
					
					var state = oEvent.getParameter("state");
					oVizFrame.setVizProperties({
					valueAxis: {
					title: {
					visible: state
					}
					},
					categoryAxis: {
					title: {
					visible: state
					}
					}
					});

		},

		onChangetoBarChart:function(oEvent){
			debugger;
			var oVizFrame = this.getView().byId("idVizFrames");
					
					var state = oEvent.getParameter("state");
					if(state == true){


						oVizFrame.setVizType("bar");
						oVizFrame.setVizProperties({
						plotArea: {
						mode: "percentage",
						drawingEffect: "glossy",
						
						dataLabel: {
						type: "percentage",
						visible: true
						
						}
						}
                    });
				}else if(state == false){
					oVizFrame.setVizType("line")
				}

		}





			
		});
	});
