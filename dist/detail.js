var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchSyllabus(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:3000/syllabus/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch syllabus");
            }
            const syllabusData = yield response.json();
            return syllabusData;
        }
        catch (error) {
            console.error("Error fetching syllabus:", error);
            return null;
        }
    });
}
function renderSyllabus(syllabus) {
    const syllabusTable = document.getElementById("syllabus-table");
    if (!syllabusTable)
        return;
    const syllabusList = document.getElementById("syllabus-list");
    if (!syllabusList)
        return;
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${syllabus.id}</td>
        <td>${syllabus.name}</td>
        <td>${syllabus.credits}</td>
        <td>${syllabus.min_gpa}</td>
        <td>${syllabus.approved_date}</td>
        <td><button class="btn btn-primary" onclick="editSyllabus('${syllabus.id}')">Edit</button></td>
    `;
    syllabusList.appendChild(row);
}
function editSyllabus(syllabusId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Editing syllabus with ID ${syllabusId}`);
        // Redirect to edit.html with syllabusId as parameter
        window.location.href = `edit.html?id=${syllabusId}`;
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const syllabus = yield fetchSyllabus("1"); // Fetching syllabus with ID "1"
        if (syllabus) {
            renderSyllabus(syllabus);
        }
        else {
            console.error("Syllabus not found");
        }
    });
}
init();
