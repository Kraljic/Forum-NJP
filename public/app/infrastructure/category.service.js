class CategoryService {

    constructor($http) {
        this.http = $http;
    }

    getCategory(categoryId) {
        return this.http.get('./api/category/' + categoryId);
    }

    getCategoriesFromSection(sectionId) {
        return this.http.get('./api/category/section/' + sectionId);
    }

    getAllCategories() {
        return this.http.get('./api/category/');
    }

    createCategory(category) {
        return this.http.post('./api/category/', category);
    }

    editCategory(categoryId, category) {
        return this.http.put('./api/category/' + categoryId, category);
    }

    deleteCategory(categoryId) {
        return this.http.delete('./api/category/' + categoryId);
    }
}

app.service('CategoryService', CategoryService);

