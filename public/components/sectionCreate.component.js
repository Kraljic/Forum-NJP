app.component('sectionCreate', {
    templateUrl: './components/sectionCreate.template.html',
    controller: function ($scope, SectionService) {
        SectionService.getSections().then(d => {
            this.sections = d.data;
        });

        this.selectedSectionChanged = function (section) {
            $scope.selectedSection = section;

            this.newModel = {
                title: section.title,
                description: section.description
            };
        }
        this.edit = function () {
            this.modifyFlag = 1;
            this.editFlag = 1;

            this.selectedSectionChanged(this.sections[0]);
        }
        this.create = function () {
            this.modifyFlag = 1;
            this.createFlag = 1;
        }
        this.submitForm = function () {
            if (!this.modifyFlag)
                return;

            if (this.editFlag) {
                SectionService.editSection($scope.selectedSection._id, this.newModel).then(d => {
                    let item = this.sections.find(i => i._id == d.data._id);
                    this.sections.splice(this.sections.indexOf(item), 1);
                    this.sections.push(d.data);
                    this.closeModify();
                }).catch(err => {
                    alert("Whoops something went wrong: " + err.data.error);
                });
            }
            else {
                SectionService.createSection(this.newModel).then(d => {
                    this.sections.push(d.data);
                    this.closeModify();
                }).catch(err => {
                    alert("Whoops something went wrong: " + err.data.error);
                });
            }
        }
        this.deleteSelected = function () {
            SectionService.deleteSection($scope.selectedSection._id).then(d => {
                let item = this.sections.find(i => i._id == d.data._id);
                this.sections.splice(this.sections.indexOf(item), 1);
                this.closeModify();
            }).catch(err => {
                alert("Whoops something went wrong: " + err.data.error);
            });
        }

        this.closeModify = function () {
            this.modifyFlag = 0;
            this.editFlag = 0;
            this.createFlag = 0;
            this.newModel = null;
        }
    },
    controllerAs: 'c'
});