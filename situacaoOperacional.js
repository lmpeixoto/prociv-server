ARMApp.controller("SituacaoOperacionalCtrl", ["$scope", "$rootScope", "ARMService", "$attrs", "$translate", "$filter", "$interval", function(n, t, i, r, u, f, e) {
    function o(t) {
        var r = "DefinicoesGerais", e = _spPageContextInfo.siteAbsoluteUrl + "/bk/_api/web/lists/GetByTitle('" + r + "')/Items", u = ["ID", "Title", "ARM_SettingHTML_PTPT", "ARM_SettingHTML_ENUS"], o = [{
            Name: "Title",
            Igualator: "eq",
            Value: "'" + t + "'"
        }], f;
        i.EnableLoading();
        f = i.GetRESTData(e, null, u, o, null);
        f.then(function(t) {
            i.DisableLoading();
            $(t).each(function(i, r) {
                var f = {};
                $(u).each(function(n, t) {
                    f[t] = r[t]
                });
                n.Legend = _spPageContextInfo.currentCultureName.toLowerCase() == "en-us" ? t[0].ARM_SettingHTML_ENUS : t[0].ARM_SettingHTML_PTPT
            })
        }, function(n) {
            i.treatErrors("SituacaoOperacionalCtrl", "GetLegenda", _spPageContextInfo.siteAbsoluteUrl + "/" + r, n)
        })
    }
    function c() {
        $("#ANPCContainerHome").css({
            "background-color": "rgb(211, 211, 211)"
        });
        Url.get.cID != null ? (n.SelectedKey(Url.get.cID, f("filter")(n.mapPoints, {
            ID: Url.get.cID
        })[0].Name),
        n.GetData()) : n.GetData();
        n.GetHistoryOccurrencesAll()
    }
    var s, h;
    ARM_SERVICE_URL_RELATIVE = "/_vti_bin/ARM.ANPC.UI/ANPC_SituacaoOperacional.svc";
    n.showLegenda = !1;
    n.map;
    n.index = 0;
    n.selected = "";
    n.mapPoints = [];
    n.exports = [];
    n.forToday = !1;
    n.filtroID = "0";
    n.markerSelected;
    n.autoRefresh = 1e4;
    n.ocorrencias = [];
    n.total = 0;
    s = function(n) {
        var t = document.createElement("script");
        t.type = "text/javascript";
        t.src = n;
        document.head.appendChild(t)
    }
    ;
    s("/_layouts/15/ARM.ANPC.UI/Scripts/esrimaps/esriMap.js");
    h = _spPageContextInfo.siteAbsoluteUrl + "/bk/_api/web/lists/GetByTitle('DefinicoesGerais')/Items?$filter=Title%20eq%20%27SODefaultView%27&$select=Title,T_x00ed_tulo_x0020_PT";
    $.ajax({
        url: h,
        type: "GET",
        async: !1,
        headers: {
            accept: "application/json;odata=verbose"
        },
        success: function(t) {
            key = t.d.results[0].T_x00ed_tulo_x0020_PT;
            n.filtroID = key
        },
        error: function(n) {
            console.log("error");
            console.log(n);
            i.treatErrors("SituacaoOperacionalCtrl", "GetSODefaultView", _spPageContextInfo.siteAbsoluteUrl + "/" + listName, n)
        }
    });
    n.GetExport = function() {
        var i = "/" + _spPageContextInfo.currentCultureName + "/" + t.getPagesName() + "/export.aspx?ex=1&l=0&d=" + (n.distritoID != null ? n.distritoID : "") + "&c=" + (n.distritoID != null ? n.concelhoID : "") + "&f=" + (n.freguesiaID != null ? n.freguesiaID : "") + "&t=" + (n.forToday ? "1" : "0") + "&n=" + n.filtroID + "&e=";
        n.exports = [{
            url: i + "0",
            title: u.instant("Excel")
        }, {
            url: i + "1",
            title: u.instant("CSV")
        }, {
            url: i + "2",
            title: u.instant("KMZ")
        }]
    }
    ;
    n.SetForToday = function() {
        n.forToday = !n.forToday;
        n.forToday ? o("0002") : o("0001");
        n.GetHistoryOccurrencesAll();
        n.GetHistoryOccurrencesCountedByDistritos();
        n.GetData()
    }
    ;
    n.resetMap = function() {
        n.concelhoID = null;
        n.freguesiaID = null;
        setCity("Portugal");
        i.EnableLoading();
        try {
            deleteMarkers()
        } catch (t) {}
        n.distritoID = null;
        n.pageSize = 4;
        n.pageIndex = 1;
        n.GetHistoryOccurrencesByDistritoLoading = !1;
        n.ocorrencias = [];
        n.total = null;
        n.GetHistoryOccurrencesCountedByDistritos();
        n.GetHistoryOccurrencesByDistrito();
        n.GetHistoryOccurrencesAll();
        i.DisableLoading()
    }
    ;
    n.LinkOcorrenciasSiginificativas = "../Paginas/ocorrenciassignificativas.aspx";
    n.LinkOcorrenciasSiginificativas = _spPageContextInfo.currentCultureName.toLowerCase() == "en-us" ? "../Pages/ocorrenciassignificativas.aspx" : "../Paginas/ocorrenciassignificativas.aspx";
    n.LinkOcorrenciasSiginificativasPesquisa = "../Paginas/pesquisa.aspx";
    n.LinkOcorrenciasSiginificativasPesquisa = _spPageContextInfo.currentCultureName.toLowerCase() == "en-us" ? "../Pages/pesquisa.aspx" : "../Paginas/pesquisa.aspx";
    Url = {
        get get() {
            var n = {};
            return window.location.search.length !== 0 && window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(t, i, r) {
                i = decodeURIComponent(i);
                n[i] = typeof n[i] == "undefined" ? decodeURIComponent(r) : [].concat(n[i], decodeURIComponent(r))
            }),
            n
        }
    };
    n.settings = {
        type: "map",
        theme: "none",
        mouseWheelZoomEnabled: !1,
        colorSteps: 4,
        dataProvider: {
            mapURL: "/PublishingImages/ANPC/home/portugalHigh.svg",
            zoomLevel: 1.7,
            zoomLongitude: -7.9,
            zoomLatitude: 39.6,
            getAreasFromMap: !0,
            areas: [{
                id: "PT",
                showAsSelected: !1
            }],
            images: n.mapPoints
        },
        imagesSettings: {
            rollOverScale: 1.5,
            selectedScale: 1.5,
            labelRollOverColor: "#000",
            labelPosition: "bottom",
            selectable: !0
        },
        areasSettings: {
            autoZoom: !0,
            balloonText: "[[title]]: <strong>[[value]]<\/strong>",
            color: "#F2B777",
            colorSolid: "#CD411A",
            selectedColor: "#37b097",
            outlineColor: "#666666",
            rollOverOutlineColor: "#000000",
            unlistedAreasColor: "#828282",
            unlistedAreasOutlineColor: "#333333"
        },
        zoomControl: {
            zoomControlEnabled: !1,
            minZoomLevel: 1.7,
            maxZoomLevel: 4,
            homeButtonEnabled: !1
        }
    };
    n.pageSize = 4;
    n.pageIndex = 1;
    n.GetHistoryOccurrencesByDistritoLoading = !1;
    n.ocorrencias = [];
    n.total = null;
    n.GetData = function() {
        i.EnableLoading();
        n.pageSize = 4;
        n.pageIndex = 1;
        n.GetHistoryOccurrencesByDistritoLoading = !1;
        n.ocorrencias = [];
        n.total = null;
        n.GetHistoryOccurrencesByDistrito();
        n.concelhoID != null && n.GetHistoryOccurrencesCountedByConcelhos();
        i.DisableLoading()
    }
    ;
    n.fullscreenFlag = !1;
    n.fullscreen = function() {
        n.fullscreenFlag == !1 ? ($("#ANPCContainerHome").css({
            "margin-left": "0"
        }),
        $(".side-menu").css({
            display: "none"
        }),
        $(".header-titles").css({
            left: "15px"
        }),
        n.fullscreenFlag = !0) : ($("#ANPCContainerHome").css({
            "margin-left": "290px"
        }),
        $(".side-menu").css({
            display: "block"
        }),
        $(".header-titles").css({
            left: "310px"
        }),
        n.fullscreenFlag = !1)
    }
    ;
    n.SelectedArea = function(t) {
        n.distritoID != t && (n.ocorrencias = [],
        n.pageIndex = 1,
        n.total = null);
        n.map = t;
        n.selected = n.map.title;
        n.map.customData != null && (n.distritoID = n.map.customData.ID,
        n.GetHistoryOccurrencesByDistrito(),
        n.distritoID != null && n.GetHistoryOccurrencesCountedByConcelhos())
    }
    ;
    n.SelectedKey = function(t, i) {
        n.concelhoID = null;
        n.freguesiaID = null;
        try {
            deleteMarkers()
        } catch (r) {}
        i && (t == null ? setCity("Portugal") : setCity(i));
        n.distritoID != t && (n.ocorrencias = [],
        n.pageIndex = 1,
        n.total = null);
        t != null && (n.distritoID = t);
        n.GetHistoryOccurrencesByDistrito();
        n.distritoID != null && n.GetHistoryOccurrencesCountedByConcelhos()
    }
    ;
    n.CountOco = 0;
    n.CountOp = 0;
    n.CountMt = 0;
    n.CountMa = 0;
    n.CountOcoEmCurso = 0;
    n.CountOpEmCurso = 0;
    n.CountMtEmCurso = 0;
    n.CountMaEmCurso = 0;
    n.CountOcoEmRes = 0;
    n.CountOpEmRes = 0;
    n.CountMtEmRes = 0;
    n.CountMaEmRes = 0;
    n.CountOcoEmConc = 0;
    n.CountOpEmConc = 0;
    n.CountMtEmConc = 0;
    n.CountMaEmConc = 0;
    n.GetHistoryOccurrencesCountedByDistritos = function(t) {
        try {
            deleteMarkers()
        } catch (u) {}
        n.CountOco = 0;
        n.CountOp = 0;
        n.CountMt = 0;
        n.CountMa = 0;
        n.CountOcoEmCurso = 0;
        n.CountOpEmCurso = 0;
        n.CountMtEmCurso = 0;
        n.CountMaEmCurso = 0;
        n.CountOcoEmRes = 0;
        n.CountOpEmRes = 0;
        n.CountMtEmRes = 0;
        n.CountMaEmRes = 0;
        n.CountOcoEmConc = 0;
        n.CountOpEmConc = 0;
        n.CountMtEmConc = 0;
        n.CountMaEmConc = 0;
        var r = {
            forToday: n.forToday,
            natureza: n.filtroID
        };
        i.GetListData("GetHistoryOccurrencesCountedByDistritos", r).then(function(r) {
            for (var e, y, u = r.arrayInfo[0].Data, f = 0; f < u.length; f++) {
                n.CountOco += u[f].NumOccorencias;
                n.CountOp += u[f].NumOperacionais;
                n.CountMt += u[f].NumMeiosTerrestres;
                n.CountMa += u[f].NumMeiosAereos;
                u[f].Estado > 2 && u[f].Estado < 7 && (n.CountOcoEmCurso += u[f].NumOccorencias,
                n.CountOpEmCurso += u[f].NumOperacionais,
                n.CountMtEmCurso += u[f].NumMeiosTerrestres,
                n.CountMaEmCurso += u[f].NumMeiosAereos);
                u[f].Estado === 7 && (n.CountOcoEmRes += u[f].NumOccorencias,
                n.CountOpEmRes += u[f].NumOperacionais,
                n.CountMtEmRes += u[f].NumMeiosTerrestres,
                n.CountMaEmRes += u[f].NumMeiosAereos);
                u[f].Estado > 7 && (n.CountOcoEmConc += u[f].NumOccorencias,
                n.CountOpEmConc += u[f].NumOperacionais,
                n.CountMtEmConc += u[f].NumMeiosTerrestres,
                n.CountMaEmConc += u[f].NumMeiosAereos);
                try {
                    getLocation != undefined && getLocation(u[f].Name, u[f].NumOccorencias)
                } catch (b) {
                    try {
                        getLocation != undefined && getLocation(u[f].Name, u[f].NumOccorencias)
                    } catch (k) {}
                }
            }
            i.DisableLoading();
            var h = 0
              , p = 0
              , w = 0
              , o = [];
            for (e = u.length - 1; e >= 0; e--)
                h = u[e].ID,
                h < p && (p = h),
                h > w && (w = h);
            var s = 0
              , c = 0
              , l = 0
              , a = 0
              , v = 0;
            for (e = p; e <= w; e++)
                y = $.grep(u, function(n) {
                    return n.ID == e
                }),
                y.length > 0 && ($.each(y, function(n, t) {
                    c = c + t.NumOccorencias;
                    l = l + t.NumOperacionais;
                    a = a + t.NumMeiosTerrestres;
                    v = v + t.NumMeiosAereos
                }),
                o[s] = y[0],
                o[s].NumOccorencias = c,
                o[s].NumOperacionais = l,
                o[s].NumMeiosTerrestres = a,
                o[s].NumMeiosAereos = v,
                s++,
                c = 0,
                l = 0,
                a = 0,
                v = 0);
            n.mapPoints = o;
            t && t()
        }, function(n) {
            i.DisableLoading();
            i.treatErrors("SituacaoOperacionalCtrl", "GetHistoryOccurrencesCountedByDistritos", r, n)
        })
    }
    ;
    n.GetHistoryOccurrencesCountedByConcelhos = function() {
        try {
            deleteMarkers()
        } catch (r) {}
        var t = {
            forToday: n.forToday,
            distritoID: n.distritoID,
            natureza: n.filtroID
        };
        i.GetListData("GetHistoryOccurrencesCountedByConcelhos", t).then(function(t) {
            n.mapConcelhos = t.arrayInfo[0].Data;
            for (var r = 0; r < n.mapConcelhos.length; r++)
                try {
                    getLocation != undefined && getLocation(n.mapConcelhos[r].Name, n.mapConcelhos[r].NumOccorencias)
                } catch (u) {}
            i.DisableLoading()
        }, function(n) {
            i.DisableLoading();
            i.treatErrors("SituacaoOperacionalCtrl", "GetHistoryOccurrencesCountedByConcelhos", t, n)
        })
    }
    ;
    n.goToSitOp = function(t) {
        n.map = t;
        n.distritoID = n.map.customData.ID;
        window.location.href = _spPageContextInfo.currentCultureName.toLowerCase() == "en-us" ? "../SITUACAOOPERACIONAL/Pages/default.aspx?cID=" + t.customData.ID : "../SITUACAOOPERACIONAL/Paginas/default.aspx?cID=" + t.customData.ID
    }
    ;
    n.GetHistoryOccurrencesByDistrito = function() {
        if ((n.total == null || n.ocorrencias.length < n.total) && (n.GetHistoryOccurrencesByDistritoLoading == !1 || n.GetHistoryOccurrencesByDistritoLoading === undefined)) {
            var r = {
                distritoID: n.distritoID,
                concelhoID: n.concelhoID,
                freguesiaID: n.freguesiaID,
                pageSize: n.pageSize,
                pageIndex: n.pageIndex,
                forToday: n.forToday,
                natureza: n.filtroID
            };
            n.GetHistoryOccurrencesByDistritoLoading = !0;
            i.GetListData("GetHistoryOccurrencesByLocation", r).then(function(r) {
                t.setNaturezaIDs(r.Variables);
                n.ocorrencias = n.ocorrencias.concat(r.arrayInfo[0].Data);
                n.total = r.arrayInfo[0].Total;
                n.pageIndex++;
                n.GetHistoryOccurrencesByDistritoLoading = !1;
                i.DisableLoading()
            }, function(t) {
                n.GetHistoryOccurrencesByDistritoLoading = !1;
                i.DisableLoading();
                i.treatErrors("SituacaoOperacionalCtrl", "GetHistoryOccurrencesByLocation", r, t)
            })
        }
    }
    ;
    n.GetHistoryOccurrencesAll = function() {
        var t = {
            forToday: n.forToday,
            natureza: n.filtroID
        };
        n.GetHistoryOccurrencesByDistritoLoading = !0;
        i.GetListData("GetMapHistoryOccurrences", t).then(function(t) {
            n.setNaturezaIDs(t.Variables);
            markersPositionsAll = [];
            markersPositions = [];
            markersPositionsAll = t.arrayInfo[0].Data;
            refreshMap();
            n.GetHistoryOccurrencesByDistritoLoading = !1;
            i.DisableLoading()
        }, function(r) {
            n.GetHistoryOccurrencesByDistritoLoading = !1;
            i.DisableLoading();
            i.treatErrors("SituacaoOperacionalCtrl", "GetHistoryOccurrencesAll", t, r)
        })
    }
    ;
    n.setDistrito = function(t) {
        n.distritoID = t.ID;
        n.distritoID != null && n.GetHistoryOccurrencesCountedByConcelhos();
        setCity(t.Name)
    }
    ;
    n.setConcelho = function(t, i) {
        n.distritoID = t.ID;
        n.concelhoID = i.ID;
        setCity(t.Name + ", " + i.Name)
    }
    ;
    n.setFreguesia = function(t, i, r) {
        n.distritoID = t.ID;
        n.concelhoID = i.ID;
        n.freguesiaID = r.ID;
        setCity(t.Name + ", " + i.Name + ", " + r.Name)
    }
    ;
    n.CountMainOccurrences = function() {
        var n = {};
        i.PostRESTData(ARM_SERVICE_URL_RELATIVE + "/CountMainOccurrences", n).then(function() {
            i.DisableLoading()
        }, function(t) {
            i.DisableLoading();
            i.treatErrors("SituacaoOperacionalCtrl", "CountMainOccurrences", n, t)
        })
    }
    ;
    n.updateNaturezaID = function(t) {
        var i = "";
        i = t == 0 ? u.instant("TodasOcorrencias") : t == 1 ? u.instant("IncendiosRurais") : u.instant("MeteorologiaAdversa");
        n.filtroIDValue = " - " + i;
        n.filtroID = t;
        styleMap = parseInt(t);
        n.resetMap()
    }
    ;
    n.mapsCity = "";
    n.$watch(function() {
        try {
            if (mapsCity != undefined)
                return mapsCity
        } catch (n) {}
        return !1
    }, function() {
        try {
            if (mapsCity != undefined) {
                var t = f("filter")(n.mapPoints, {
                    Name: mapsCity
                })[0].ID;
                n.SelectedKey(t)
            }
        } catch (i) {}
    });
    o("0001");
    n.GetAutoRefresh = function(t) {
        var r = "DefinicoesGerais", o = _spPageContextInfo.siteAbsoluteUrl + "/bk/_api/web/lists/GetByTitle('" + r + "')/Items", u = ["ID", "Title", "ARM_SettingHTML_PTPT", "ARM_SettingHTML_ENUS"], s = [{
            Name: "Title",
            Igualator: "eq",
            Value: "'" + t + "'"
        }], f;
        i.EnableLoading();
        f = i.GetRESTData(o, null, u, s, null);
        f.then(function(t) {
            i.DisableLoading();
            $(t).each(function(i, r) {
                var f = {};
                $(u).each(function(n, t) {
                    f[t] = r[t]
                });
                n.autoRefresh = _spPageContextInfo.currentCultureName.toLowerCase() == "en-us" ? t[0].ARM_SettingText_ENUS : t[0].ARM_SettingText_PTPT;
                e(function() {
                    n.GetHistoryOccurrencesAll();
                    n.GetHistoryOccurrencesCountedByDistritos();
                    n.GetData()
                }
                .bind(this), n.autoRefresh)
            })
        }, function(n) {
            i.treatErrors("SituacaoOperacionalCtrl", "GetLegenda", _spPageContextInfo.siteAbsoluteUrl + "/" + r, n)
        })
    }
    ;
    n.init = function() {
        n.GetAutoRefresh("AutoRefresh");
        $("#ANPCContainerHome").parent().css({
            "background-color": "#1a1a1a"
        });
        $("#ANPC-Breadcrumb").addClass("noheader");
        $("#ANPC-Breadcrumb").css({
            display: "none"
        });
        $("#DeltaPlaceHolderMain").addClass("noheader");
        n.GetHistoryOccurrencesCountedByDistritos(c)
    }
    ;
    n.GetHistoryOccurrence = function(t) {
        var r = {
            id: t.ID
        };
        i.EnableLoading();
        i.GetListData("GetHistoryOccurrence", r).then(function(t) {
            i.DisableLoading();
            itemX = t;
            itemX.selectedPin = !0;
            n.markerSelected = itemX;
            n.ocorrencias[0].selectedPin == null ? n.ocorrencias.unshift(n.markerSelected) : (n.ocorrencias.splice(0, 1),
            n.ocorrencias.unshift(n.markerSelected))
        }, function(t) {
            n.GetHistoryOccurrencesByDistritoLoading = !1;
            i.DisableLoading();
            i.treatErrors("SituacaoOperacionalCtrl", "GetHistoryOccurrence", r, t)
        })
    }
}
]);
/*
//# sourceMappingURL=SituacaoOperacional.min.js.map
*/
