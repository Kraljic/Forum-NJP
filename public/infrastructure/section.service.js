class SectionService {

    constructor($http) {
        this.http = $http;
    }

    getSections() {
        return this.http.get('./api/section/');
    }

    getSection(sectionId) {
        return this.http.get('./api/section/' + sectionId);
    }

    createSection(section) {
        return this.http.post('./api/section/', section);
    }

    editSection(sectionId, section) {
        return this.http.put('./api/section/' + sectionId, section);
    }

    deleteSection(sectionId) {
        return this.http.delete('./api/section/' + sectionId);
    }
}

app.service('SectionService', SectionService);

