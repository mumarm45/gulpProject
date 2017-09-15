/**
 * Created by mumar on 5/3/2016.
 */
(function() {
    'use strict';
    angular
        .module('app.campaign')
        .controller('CampaignController', CampaignController);

    function CampaignController(utilCustom, CampaignService, $filter, strategyService, $document, CallbackService, $mdSidenav, $mdDialog, msUtils, ecmSystemSettingService, PromptService, PromptKeyService) {
        var vm = this;
        //Declare Variables
        vm.init = init;
        vm.saveCampaign = saveCampaign;
        vm.updateCampaign = updateCampaign;
        vm.selectCampaign = selectCampaign;
        vm.create = create;
        vm.falseStartTime = false;
        vm.deleteCampaign = deleteCampaign;
        vm.changeCampaignType = changeCampaignType;
        vm.csqQuerySearch = csqQuerySearch;
        vm.addNewVariableServer = addNewVariableServer;
        vm.filterCSQ = filterCSQ;
        vm.csqName = csqName;
        vm.getPrompts = getPrompts;
        vm.addNewVariables = addNewVariables;
        vm.removeVariables = removeVariables;
        vm.fetchPromptKey = fetchPromptKey;
        vm.checkPreviousVariable = checkPreviousVariable;
        vm.toggleInArray = msUtils.toggleInArray;
        vm.uploadCampaign = uploadCampaign;
        vm.toggleSideNav = toggleSideNav;
        vm.exists = msUtils.exists;
        vm.filterFunction = filterFunction;
        vm.changeRequestState = changeRequestState;
        vm.closeSideNav = closeSideNav;
        vm.campaignUpdateStatus = campaignUpdateStatus;
        vm.verifyDate = verifyDate;
        vm.veriables = [];
        vm.prompts = [];
        vm.addNewPrompt = false;
        vm.incrementPage = incrementPage;
        vm.dialerTypes = [{ name: 'PREDICTIVE', nameTrans: 'campaign.dialerType.PREDICTIVE' },
            { name: 'PROGRESSIVE', nameTrans: 'campaign.dialerType.PROGRESSIVE' }
        ];
        vm.campaignTypes = [{ id: 0, translationV: 'campaign.campaignType.agentBased' }, { id: 1, translationV: 'campaign.campaignType.ivrBased' }];
        vm.campaigns = [];
        vm.colums = [
            { id: 0, check: false, name: 'campaign.callBackData.businessParam1', field: 'businessParam1' },
            { id: 1, check: false, name: 'campaign.callBackData.businessParam2', field: 'businessParam2' },
            { id: 2, check: false, name: 'campaign.callBackData.businessParam3', field: 'businessParam3' },
            { id: 3, check: false, name: 'campaign.callBackData.businessParam4', field: 'businessParam4' },
            { id: 4, check: false, name: 'campaign.callBackData.businessParam5', field: 'businessParam5' },
            { id: 5, check: false, name: 'campaign.callBackData.businessParam6', field: 'businessParam6' },
            { id: 6, check: false, name: 'campaign.callBackData.businessParam7', field: 'businessParam7' },
            { id: 7, check: false, name: 'campaign.callBackData.businessParam8', field: 'businessParam8' },
            { id: 8, check: false, name: 'campaign.callBackData.businessParam9', field: 'businessParam9' },
            { id: 9, check: false, name: 'campaign.callBackData.businessParam10', field: 'businessParam10' },
            { id: 10, check: false, name: 'campaign.callBackData.businessParam11', field: 'businessParam11' },
            { id: 11, check: false, name: 'campaign.callBackData.businessParam12', field: 'businessParam12' },
            { id: 12, check: false, name: 'campaign.callBackData.ciscoCampaignId', field: 'ciscoCampaignId' },
            { id: 13, check: false, name: 'campaign.callBackData.numberToCall', field: 'numberToCall' },
            { id: 14, check: false, name: 'campaign.callBackData.remainingPrimaryAttempts', field: 'remainingPrimaryAttempts' },
            { id: 15, check: false, name: 'campaign.callBackData.remainingSecondaryAttempts', field: 'remainingSecondaryAttempts' },
        ]
        vm.callStates = [{ value: 0, translationV: "campaign.requestState.pending" },
            { value: 1, translationV: "campaign.requestState.sentToDiller" },
            { value: 2, translationV: "campaign.requestState.connected" },
            { value: 3, translationV: "campaign.requestState.notConnected" },
            { value: 4, translationV: "campaign.requestState.retriesCompleted" },
            { value: 5, translationV: "campaign.requestState.dncListed" },
            { value: -1, translationV: "campaign.requestState.all" },

        ]
        vm.checkVariable = checkVariable;
        vm.cancelOperation = cancelOperation;
        vm.translationData = {
            csq: $filter('translate')('csq.csq'),
            triggerId: $filter('translate')('application.trigger.trigger'),
            dialerType: $filter('translate')('campaign.dialerType.dialerType'),
            ucceCampaign: $filter('translate')('campaign.ucceCampaign'),
            uccxCampaign: $filter('translate')('campaign.uccxCampaign'),
            ivrPorts: $filter('translate')('campaign.ivrPorts'),
            campaignType: $filter('translate')('campaign.campaignType.campaignType'),
            strategy: $filter('translate')('strategy.strategy')

        };
        vm.weekly = [
            { id: 0, name: $filter('translate')('easyAnnouncement.sunday') },
            { id: 1, name: $filter('translate')('easyAnnouncement.monday') },
            { id: 2, name: $filter('translate')('easyAnnouncement.tuesday') },
            { id: 3, name: $filter('translate')('easyAnnouncement.wednesday') },
            { id: 4, name: $filter('translate')('easyAnnouncement.thursday') },
            { id: 5, name: $filter('translate')('easyAnnouncement.friday') },
            { id: 6, name: $filter('translate')('easyAnnouncement.saturday') }
        ];
        vm.ciscoType = 1;
        vm.createNewVariable = false;
        vm.fetchRecord = 25;

        //Methods
        getApplicationSetting();
        fetchCampaigns();
      function verifyDate(startTime, endTime)
      {
        var stt = new Date("August 14, 1947 " + startTime);
        stt = stt.getTime();

        var endt = new Date("August 14, 1947 " + endTime);
        endt = endt.getTime();
        (vm.falseStartTime) = stt >= endt;

      }
        getPrompts();
        fetchPromptKey();

        function init() {
            CampaignService.list({}).then(function(response) {
                vm.campaigns = response;
                vm.selected = {
                    startTime: "00:00",
                    endTime: "23:55",
                    strategyId: 0,
                    status: 1,
                    weekDays: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 0: true },
                    type: 1,
                    threshold: 0,
                    ivrPorts: 0,
                    csqId: [],
                    prompts: []
                };

                //  vm.veriables.map((vari)=>{
                //    vm.selected.prompts.push({name:vari.key_value,wav:''})
                //  })
                //  loadCsqs();loadTriggers();
                loadStrategy();
            }, function(error) {
                console.log(error);
            })
        }

        function create() {
            vm.createFormOr = undefined;
            vm.selected = { startTime: "00:00", endTime: "23:55", strategyId: 0, status: 1, weekDays: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 0: true }, type: 1, ivrPorts: 0, csqId: [], prompts: [] };
            filterTriggers();
            filterCsqs(); //fetchUCCECampaign();
            filterCampaign(1);
            setDefaultStrategy();

        }
        init();

        function addNewVariables() {
            //vm.addNewPrompt=true;
            if (!vm.selected.prompts || vm.selected.prompts.length == 0 || vm.selected.prompts == "[]")
                vm.selected.prompts = [{ name: '', wav: '', isHide: false, select: true }];
            else {
                vm.selected.prompts.unshift({ name: "", wav: '', isHide: false, select: true });
            }
            // vm.selected.prompts.push();


        }

        function removeVariables(key_value) {
            _.remove(vm.selected.prompts, function(vari) {
                return vari.name == key_value;
            });
            //vm.filtervariables.push(_.find(vm.variables,{id:id}));
        }

        function checkPreviousVariable(id) {
            if (_.find(vm.selected.prompts, { name: id })) {
                utilCustom.toaster($filter('translate')('campaign.selectAnotherPromptName'));
                _.remove(vm.selected.prompts, function(vari) {
                    return vari.id == id;
                });
            }
        }


        function fetchPromptKey() {
            PromptKeyService.list().then(function(response) {
                vm.veriables = response;
            }, function(error) { console.error(error); });
        }

        function addNewVariableServer(vari, name) {
            if (vari.vNameInput) {
                var fnd = _.find(vm.veriables, { key_value: vari.vNameInput.toLowerCase() })
                if (!fnd) {
                    PromptKeyService.save({ name: vari.vNameInput }).then(
                        function(response) {
                            vm.veriables.push(response);
                            vari.isHide = false;
                            vari.select = true;
                            vari.name = vari.vNameInput.toLowerCase();
                            vari.key_value = vari.vNameInput.toLowerCase();
                            vari.wav = vari.wav;
                            utilCustom.toaster($filter('translate')('campaign.addedVariable'));
                        },
                        function(error) { console.error(error); }


                    );
                } else {
                    utilCustom.toaster($filter('translate')('campaign.keyExist'));
                    vari.isHide = false;
                    vari.select = true;
                }
            } else {
                utilCustom.toaster($filter('translate')('campaign.cannot_null'));
            }


        }

        function uploadCampaign(e, campaignId) {
            $mdDialog.show({
                controller: 'CsvUploadCampaignController',
                controllerAs: 'vm',
                templateUrl: 'app/ecm/campaign/dialog/upload.html',
                parent: angular.element($document.body),
                targetEvent: e,
                clickOutsideToClose: true,
                locals: {
                    campaignId: campaignId
                }

            }).then(function(data) {
                if (data) {
                    data.map(function(contact) {
                        vm.dncs.push(contact);
                    })

                }


            })
        }

        function toggleSideNav(navID, campaignId, name) {
            vm.campaignId = campaignId;
            vm.search = { number: "", state: -1 };
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    vm.callBackData = [];
                    vm.campaignName = name;
                    vm.campaignId = campaignId;
                    vm.page = 0;
                    if (vm.campaignId)
                        getCallBackData({ max: vm.fetchRecord, page: vm.page, sSearch_campaignId: campaignId });

                });

        }

        function closeSideNav(navID) {
            $mdSidenav(navID).close()
                .then(function() {
                    vm.callBackData = [];
                    vm.search = { number: "", state: -1 };
                });
        }

        function incrementPage() {
            vm.page = vm.page + 1;
            getCallBackData({ max: vm.fetchRecord, page: vm.page, sSearch_campaignId: vm.campaignId });
        }

        function getCallBackData(params) {
            params['sSearch_campaignId'] = vm.campaignId;
            CallbackService.list(params).then(function(data) {
                angular.forEach(data.callbackData, function(call) {
                    var stateName = _.find(vm.callStates, { value: Number(call.requestState) });
                    call['requestStateFilter'] = stateName ? $filter('translate')(stateName.translationV) : 'Other';
                    call['requestTimeFilter'] = $filter('date')(call.requestTime);
                    vm.callBackData.push(call);
                })
                vm.totalCaller = data.total;
            });
        }



        function changeRequestState(state) {
            vm.callBackData = [];
            vm.page = 0;
            getCallBackData({ max: vm.fetchRecord, page: vm.page, sSearch_requestStatus: state })
        }

        function filterFunction(filterValue) {
            vm.callBackData = [];
            vm.page = 0;
            getCallBackData({ max: vm.fetchRecord, page: vm.page, sSearch: filterValue, sSearch_requestStatus: vm.search.state })
        }

        function checkVariable(vari) {
            var fnd = vm.selected.prompts.filter(function(prm) {
                return prm.name == vari.name;
            });
            if (fnd.length > 1) {
                vari.name = '';
                utilCustom.toaster($filter('translate')('campaign.cannotSame'));
            }
        }

        function cancelOperation(vari, name) {
            //vari.name=vm.selected.prompts[0].name;
            vari.select = true;
            vari.isHide = false;
        }

        function getPrompts() {
            PromptService.getAllPrompts().then(function(response) {
                vm.prompts = response;
            }, function(error) {
                console.error(error);
            });
        }

        function getApplicationSetting() {
            ecmSystemSettingService.getSetting().then(function(appSetting) {
                vm.appSetting = appSetting;
                // 0 is for UCCX and 1 is for UCCE
                vm.ciscoType = vm.appSetting.ciscoType;
            }, function(error) {
                console.log(error);
            })
        }

        function loadCsqs() {
            CampaignService.csqList().then(function(response) {
                vm.queues = response.csq;
                vm.nonFilterQueues = response.csq;
                filterCsqs();
                /* vm.queues.map(function(queue){
                 if(queue.queueType!=("VOICE")){
                 _.remove(vm.queues,function(va){
                 return va.queueType===queue.queueType;
                 })
                 }
                 })*/
            }, function(error) { console.log(error); })
        }

        function loadStrategy() {
            strategyService.list().then(function(response) {
                vm.strategies = response;
                setDefaultStrategy();
            }, function(error) { console.log(error); })
        }

        function loadTriggers() {
            CampaignService.triggerList().then(function(response) {
                vm.triggers = response.trigger;
                vm.NonFilterTriggers = response.trigger;
                filterTriggers();
            }, function(error) { console.log(error); })
        }

        function fetchCampaigns() {
            CampaignService.fetchCampaigns().then(function(response) {
                vm.campaignDataList = response;
                filterCampaign(1);
            }, function(error) { console.log(error); })
        }

        function selectCampaign(campaign) {
            vm.createForm.$setUntouched();
            filterTriggers();
            filterCsqs();
            vm.selected = { startTime: "00:00", endTime: "23:55", status: 1, weekDays: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 0: true }, type: 1, ivrPorts: 0, csqId: [] };
            vm.selected = angular.copy(campaign);
            filterCampaign(vm.selected.type);
            vm.selected.campaignDataId = vm.selected.ciscoCampaignId;
            !vm.selected.csqId ? vm.selected.csqId = [] : vm.selected.csqId = vm.selected.csqId.split(",");
            if (vm.selected.prompts) {
                vm.selected.prompts = vm.selected.prompts.split(',').map(function(val) {
                    var key_value = val.split(':');
                    if (key_value[0] != '') {
                        var obj = {
                            name: key_value[0].toLowerCase(),
                            wav: key_value[1],
                            isHide: false,
                            select: true,
                            isWavHide: true
                        };
                        return obj;
                    }

                });
                vm.selected.prompts.pop();
            }
            vm.createFormOr = 'edit';
            changeCampaignType(vm.selected.type);
            if (vm.selected.weekDays) {
                var weekDay = vm.selected.weekDays.split(",");
                var selectedDays = {};
                weekDay.map(function(day) {
                    selectedDays[day] = true;
                });
                vm.selected.weekDays = selectedDays;
            } else {
                vm.selected.weekDays = { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 0: false };
            }

            var fndSelectedTrigger = _.find(vm.NonFilterTriggers, { directoryNumber: String(campaign.triggerId) });
            if (fndSelectedTrigger) {
                vm.triggers.push(fndSelectedTrigger);
            }
            if (vm.nonFilterQueues) {
                var queFilter = vm.nonFilterQueues.map(function(queue) {
                    var que = {};
                    var id = queue.csqNameUriPair['refURL'].split('/');
                    que.name = queue.csqNameUriPair['@name'];
                    que.id = id[id.length - 1];
                    return que;


                });
                var fndSelectedCsq = _.find(queFilter, { id: String(campaign.csqId) });
                if (fndSelectedCsq) {
                    vm.queues.push(fndSelectedCsq);
                }
            }

        }

        function filterTriggers() {
            if (vm.NonFilterTriggers) {
                vm.triggers = vm.NonFilterTriggers.filter(function(trigger) {
                    var fnd = _.find(vm.campaigns, { triggerId: Number(trigger.directoryNumber) });
                    if (fnd == -1 || fnd == undefined) {
                        return trigger;
                    }
                });
            }
        }

        function filterCsqs() {
            if (vm.nonFilterQueues) {
                vm.queues = vm.nonFilterQueues.map(function(queue) {
                    var que = {};
                    var id = queue.csqNameUriPair['refURL'].split('/');
                    que.name = queue.csqNameUriPair['@name'];
                    que.id = id[id.length - 1];
                    return que;


                }).filter(function(queue) {
                    var fnd = _.find(vm.campaigns, { csqId: Number(queue.id) });
                    if (fnd == -1 || fnd == undefined) {
                        return queue;
                    }
                });
            }



        }

        function setDefaultStrategy() {
            if (vm.createFormOr != 'edit') {
                var fnd = _.find(vm.strategies, { name: 'default' });
                if (fnd) {
                    vm.selected.strategyId != undefined ? vm.selected.strategyId = fnd.id : vm.selected = { strategyId: fnd.id };
                }
            }
        }

        function csqName(id) {
            // id =Number(id);

            return _.result(_.find(vm.queues, { id: id }), 'name');
        }

        function updateCampaign() {}

        function campaignUpdateStatus(campaignId, status) {
            CampaignService.campaignUpdateStatus({ campaignId: campaignId, status: status }).then(function(data) {
                utilCustom.toaster($filter('translate')('campaign.campaignUpdateStatus'));
            }, function(error) {
                utilCustom.toaster($filter('translate')('data.updateError') + ' ' + $filter('translate')('campaign.campaign'));
            })
        }

        function saveCampaign(campaignData) {
            // if(vm.ciscoType==0){
            //   if(campaignData.type==0){
            //     if( !campaignData.name || !campaignData.dialerType || !campaignData.startTime || !campaignData.endTime || campaignData.csqId.length==0 ){
            //       utilCustom.toaster($filter('translate')('data.fillAllField'));
            //       return;
            //     }
            //   }
            //   else{
            //     if(!campaignData.name  || !campaignData.dialerType ||!campaignData.triggerId || !campaignData.startTime || !campaignData.endTime){
            //       utilCustom.toaster($filter('translate')('data.fillAllField'));
            //       return;
            //     }
            //   }
            //   if(campaignData.dialerType!='DIRECT_PREVIEW' &&  !campaignData.callingNumber){
            //     utilCustom.toaster($filter('translate')('data.fillAllField'));
            //     return;
            //   }
            // }else{
            //  }
            if (!campaignData.name || !campaignData.startTime || !campaignData.endTime || !campaignData.strategyId || !campaignData.campaignDataId) {
                utilCustom.toaster($filter('translate')('data.fillAllField'));
                return;
            }
            campaignData.campaignData = _.find(vm.campaignDataList, { id: campaignData.campaignDataId })

            if (!campaignData.ivrPorts) { campaignData.ivrPorts = 0; }
            if (!campaignData.threshold) { campaignData.threshold = 0; }
            var campaign = angular.copy(campaignData);
            var promptsString = "";
            var notNullvalue = false;
            var keyNotSave = false;
            if (campaign.prompts) {
                campaign.prompts.map(function(prmp) {
                    if (prmp.name == '' || prmp.name == 'undefined' || prmp.wav == '' || prmp.wav == 'undefined' || !prmp.name || !prmp.wav) {
                        notNullvalue = true;
                    } else {
                        var fnd = _.find(vm.veriables, { key_value: prmp.name.toLowerCase() });
                        if (!fnd) {
                            keyNotSave = true;
                        }
                    }
                    promptsString = promptsString + prmp.name + ':' + prmp.wav + ',';
                });
                if (notNullvalue) {
                    utilCustom.toaster($filter('translate')('campaign.fillAllPrompt'));
                    return;
                }
                if (keyNotSave) {
                    utilCustom.toaster($filter('translate')('campaign.saveTheKey'));
                    return;
                }
                campaign.prompts = promptsString;
            }

            var weekDay = Object.keys(campaign.weekDays);
            var selectedDays = [];
            weekDay.map(function(day) {
                if (campaign.weekDays[day])
                    selectedDays.push(day);
            });
            if (!selectedDays.length) {
                utilCustom.toaster($filter('translate')('campaign.oneDaySelect'));
                return;
            }
            campaign.weekDays = selectedDays.join(",");
            campaign.status = campaign.enabled ? 1 : 0;
            if (vm.createFormOr == 'edit') {
                utilCustom.toasterLoading();
                CampaignService.editCampaign(campaign).then(
                    function(response) {
                        var indx = findCampaign(response.id);
                        if (indx != -1) {
                            vm.campaigns[indx] = response;
                        }
                        showSaveMessage(response, 'updated');
                    },
                    function(error) {
                        utilCustom.toaster($filter('translate')('data.updateError') + ' ' + $filter('translate')('campaign.campaign'));
                    });

            } else {
                utilCustom.toasterLoading();
                CampaignService.createCampaign(campaign).then(
                    function(response) {
                        vm.createFormOr = 'edit';
                        showSaveMessage(response, 'created');

                    },
                    function(error) {
                        utilCustom.toaster($filter('translate')('data.createError') + ' ' + $filter('translate')('campaign.campaign'));
                    });

            }

        }

        function showSaveMessage(response, type) {
            if (response.campaign) {
                var camp = response.campaign;
                var msg = JSON.parse(camp.campaign);
                var message = "";
                msg.apiError.map(function(err) {
                    message = message + err.errorMessage;
                });
                utilCustom.toaster(message);
            } else {

                if ('created' == type) {
                    vm.selected.id = response.id;
                    vm.campaigns.push(response);
                }
                utilCustom.toaster($filter('translate')('campaign.campaign') + ' ' + $filter('translate')('data.' + type));
            }
        }

        function deleteCampaign(campaignId) {
            utilCustom.toasterConfirm().then(function(response) {
                if (response == 'ok' || response) {
                    utilCustom.toasterLoading();
                    CampaignService.delete({ id: campaignId }).then(function(response) {
                        _.remove(vm.campaigns, function(campaign) {
                            return campaign.id == campaignId;
                        });
                        create();
                        utilCustom.toaster($filter('translate')('campaign.campaign') + ' ' + $filter('translate')('data.deleted'));
                    }, function(error) {
                        utilCustom.toaster($filter('translate')('data.deleteError') + ' ' + $filter('translate')('campaign.campaign'));
                    })
                } else {
                    utilCustom.toaster($filter('translate')('generic.noOptionSelected'));
                }
            });

        }

        function findCampaign(campaignId) {
            var indx = _.findIndex(vm.campaigns, { id: campaignId });
            return indx;
        }

        function changeCampaignType(type) {
            if (type == 1) {
                vm.dialerTypes = [{ name: 'PREDICTIVE', nameTrans: 'campaign.dialerType.PREDICTIVE' },
                    { name: 'PROGRESSIVE', nameTrans: 'campaign.dialerType.PROGRESSIVE' }
                ];
            } else {
                vm.dialerTypes = [{ name: 'DIRECT_PREVIEW', nameTrans: 'campaign.dialerType.DIRECT_PREVIEW' }, { name: 'PREDICTIVE', nameTrans: 'campaign.dialerType.PREDICTIVE' },
                    { name: 'PROGRESSIVE', nameTrans: 'campaign.dialerType.PROGRESSIVE' }
                ];
            }

            filterCampaign(type);
        }

        function filterCampaign(type) {
            var filterCampaign = angular.copy(vm.campaignDataList);
            vm.ciscoCampaign = vm.campaignDataList.filter(function(cam) {
                return cam.type == type;
            });

        }

        function csqQuerySearch(query) {
            return query ? vm.queues.filter(createFilterFor(query)) : [];
        }

        function filterCSQ(label) {
            if (!vm.csqSearchText || vm.csqSearchText === '') {
                return true;
            }

            return angular.lowercase(label.name).indexOf(angular.lowercase(vm.csqSearchText)) >= 0;
        }
    }

    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
            return angular.lowercase(item.name).indexOf(lowercaseQuery) >= 0;
        };
    }


})();
