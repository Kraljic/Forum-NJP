app.component('categoryCreate', {
    templateUrl: './components/categoryCreate.template.html',
    controller: function ($scope, CategoryService, SectionService) {
        CategoryService.getAllCategories().then(d => {
            this.categories = d.data;
        });
        SectionService.getSections().then(d => {
            this.sections = d.data;
        });

        this.selectedCategoryChanged = function (category) {
            $scope.selectedCategory = category;
            $scope.selectedSection = this.sections.find(s => s._id == category.section);
            
            this.newModel = {
                title: category.title,
                description: category.description,
                section: $scope.selectedSection._id
            };
        }
        this.selectedSectionChanged = function (section) {
            if (!this.newModel)
                this.newModel = {};

            $scope.selectedSection = section;
            this.newModel.section = section._id;
        }
        this.edit = function () {
            this.modifyFlag = 1;
            this.editFlag = 1;

            this.selectedCategoryChanged(this.categories[0]);
        }
        this.create = function () {
            this.modifyFlag = 1;
            this.createFlag = 1;

            this.selectedSectionChanged(this.sections[0]);
        }
        this.submitForm = function () {
            if (!this.modifyFlag)
                return;

            if (this.editFlag) {                
                CategoryService.editCategory($scope.selectedCategory._id, this.newModel).then(d => {
                    let item = this.categories.find(i => i._id == d.data._id);
                    this.categories.splice(this.categories.indexOf(item), 1);
                    this.categories.push(d.data);
                    this.closeModify();
                }).catch(err => {
                    alert("Whoops something went wrong: " + err.data.error);
                });
            }
            else {
                CategoryService.createCategory(this.newModel).then(d => {
                    this.categories.push(d.data);
                    this.closeModify();
                }).catch(err => {
                    alert("Whoops something went wrong: " + err.data.error);
                });
            }
        }
        this.deleteSelected = function () {
            CategoryService.deleteCategory($scope.selectedCategory._id).then(d => {
                let item = this.categories.find(i => i._id == d.data._id);
                this.categories.splice(this.categories.indexOf(item), 1);
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