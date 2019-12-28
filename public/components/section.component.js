app.component('section', {
    templateUrl: './components/section.template.html',    
    bindings:{
        section:'<'
    },
    controller: function(CategoryService) {
        this.$onInit = function() {
            CategoryService.getCategoriesFromSection(this.section._id).then(d => {
                this.categories = d.data;
            });   
        }                 
    },
    controllerAs: 'c'
});