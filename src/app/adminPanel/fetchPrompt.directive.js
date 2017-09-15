(
    function() {
        'use strict';

        angular
            .module('app.utilsCustom')
            .directive('fetchFiles', ['$rootScope', fetchFiles])
            .controller('fecthFilesController', ['utilCustom', 'PromptService', 'ScriptService', '$filter', '$scope', fecthFilesController])


        function fetchFiles($rootScope) {

            return {
                restrict: 'EA',
                scope: {
                    addArray: '=addFile',
                    typeOfFile: '=typeOfFile',
                    format: '=formatFile',
                    maxFiles : '=maxFiles'
                },
                templateUrl: 'app/adminPanel/fetchFilesTempalte.html',
                controller: 'fecthFilesController as vm',
                transclude: false
            }

        }


        function fecthFilesController(utilCustom, PromptService, ScriptService, $filter, $scope) {
            var vm = this;

            vm.openFolder = openFolder;
            vm.openMenu = openMenu;
            vm.folderTriverseArray = [];
            vm.noOfFiles = 0;
            vm.backFolder = backFolder;
            vm.addFile = addFile;
            vm.addArray = $scope.addArray;
            vm.typeOfFile = $scope.typeOfFile ? $scope.typeOfFile : 'prompt';
            vm.format = Array.isArray($scope.addArray) ? 'multiple' : 'singel'

            function openMenu() {
                if (!vm.prompts)
                    vm.typeOfFile === 'prompt' ? fetchPrompt('first', 'yes') : fetchScript('first', 'yes');
            }

            function openFolder(folderName, insertPath) {
                var fldNm = JSON.stringify({ name: folderName });
                var splitPath = folderName.split('/');
                if (splitPath[splitPath.length - 1] != folderName) {
                    if (splitPath.length == 3 && setTeamName() != 'all') fldNm = JSON.stringify({ name: folderName });
                    vm.typeOfFile === 'prompt' ? fetchPrompt(fldNm, insertPath) : fetchScript(fldNm, insertPath);
                }

            }

            function setProperties(response, params) {

              vm.prompts = {Folder:'', File : '' , path : '' , data : ''};

                vm.prompts['data'] = (vm.typeOfFile === 'prompt') ? response.Prompt : response.Script;
                if (response.path == "") {
                    response.path = "/";
                }
                vm.prompts['path'] = response.path;
                vm.folderTriverseArray.push(vm.prompts);
              if(vm.prompts.data)
                if(vm.prompts.data.hasOwnProperty('Folder'))
                vm.folders = vm.prompts.data.Folder ? vm.prompts.data.Folder : [];
              if(vm.prompts.data)
                if(vm.prompts.data.hasOwnProperty('File'))
                vm.files = vm.prompts.data.File ? vm.prompts.data.File : [];
                params.path = vm.prompts.path;
                if (params.path == "") {
                    params.path = ""
                }
                var pa = params.path;

                if (vm.files != undefined) {
                    vm.selected = vm.files[0];
                    if (vm.selected)
                        vm.selected['type'] = 'file';
                    //vm.sound = ngAudio.load("../app/adminPanel/prompt/welcome.mp3");

                } else if (vm.folders) {
                    vm.selected = vm.folders[0];
                    if (vm.selected) {
                        vm.selected.FileName = vm.selected.FolderName;
                        var datee = vm.selected.Details.dateModified;
                        vm.selected['type'] = 'Folder';
                        vm.selected.languages = [];
                    }

                } else {
                    vm.selected.path = params.path;
                }
            }


            function backFolder() {
                var size = vm.folderTriverseArray.length - 1;
                vm.folderTriverseArray.pop();
                vm.prompts = vm.folderTriverseArray[vm.folderTriverseArray.length - 1];
                vm.selecte = { path: vm.prompts.path };
            }

            function fetchPrompt(req, insertPath, teamName) {
                var params;
                req == "first" ? params = { path: '', team: 'all' } : params = { path: JSON.parse(req).name, team: 'all' };
                vm.params = params;
                vm.selected = { languages: [] };
                vm.params.team = setTeamName(teamName);
                utilCustom.toasterLoading();
                PromptService.list(params).then(function(response) {
                    utilCustom.hideToaster();
                    setProperties(response, params);


                }, function(error) {
                    utilCustom.hideToaster();
                    console.log(error);
                })


            }

            function fetchScript(req, insertPath, teamName) {
                var params;
                req == "first" ? params = { path: '', team: 'all' } : params = { path: JSON.parse(req).name, team: 'all' };
                vm.params = params;
                vm.selected = { languages: [] };
                vm.params.team = setTeamName(teamName);
                utilCustom.toasterLoading();
                ScriptService.list(params).then(function(response) {
                    utilCustom.hideToaster();
                    setProperties(response, params);


                }, function(error) {
                    utilCustom.hideToaster();
                    console.log(error);
                })


            }

            function addFile(file) {
              utilCustom.hideToaster();
                var selectedPath = "";
                if (vm.typeOfFile == 'prompt') {
                  var path = file.path.split("/").reverse()
                  path.pop();
                  path.pop();
                  selectedPath = path.reverse().join("/")
                }
                if (Array.isArray($scope.addArray)) {
                  var index = $scope.addArray.indexOf(selectedPath + file.FileName);

                  if (index == -1) {
                    if($scope.addArray.length < $scope.maxFiles){
                    $scope.addArray.push(selectedPath + file.FileName);


                    }
                    else{
                      utilCustom.toaster($filter('translate')('generic.maxNoOfFilesSelected'));
                    }
                  }
                  else{
                    utilCustom.toaster($filter('translate')('generic.alreadySelected'));

                  }
                } else {
                  if (vm.typeOfFile === 'script' && file.path.substring(0, 1) == '/') {
                    selectedPath = file.path.substring(1, file.path.length)
                  }
                  $scope.addArray = selectedPath + file.FileName;

                }

                // if (vm.format === 'multiple') {
                //     var index = $scope.addArray.indexOf(file.path + file.FileName);
                //     if (index == -1)
                //         $scope.addArray.push(selectedPath+ file.FileName);
                // } else {

                //     if (vm.typeOfFile === 'script' && file.path.substring(0, 1) == '/') {
                //         selectedPath = file.path.substring(1, file.path.length)
                //     }
                //     $scope.addArray = selectedPath + file.FileName;
                // }


              //}
              //else{ if(!vm.already)
              //  utilCustom.toaster($filter('translate')('generic.maxNoOfFilesSelected'));
              //}


            }

            function setTeamName(teamName) {
                var name = "all";
                if (!teamName) {
                    var team = window.localStorage.getItem('currentTeam');
                    if (!team || team == "undefined") {
                        if (window.userRole != "admin") {
                            // name = undefined;
                            vm.easyAnnouncemens = [];
                        }
                    } else {
                        team = JSON.parse(team);
                        name = team.name;
                    }
                } else {
                    name = teamName;
                }
                return name
            }

        }

    }
)();
