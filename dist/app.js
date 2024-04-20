var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "bootstrap/dist/css/bootstrap.min.css";
import { validate, IsNotEmpty, Min, Max, } from "class-validator";
const url = "http://localhost:3000/syllabus";
class App {
    constructor() {
        const buttonSubmit = document.getElementById("submit");
        buttonSubmit.addEventListener("click", () => {
            this.handleSubmit();
        });
        this.fetchAndDisplayUsers();
    }
    fetchAndDisplayUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch syllabus data");
                }
                const syllabusList = yield response.json();
                this.displaySyllabus(syllabusList);
            }
            catch (error) {
                console.error("Error fetching syllabus data:", error);
            }
        });
    }
    displaySyllabus(syllabusList) {
        const syllabusTable = document.getElementById("syllabus-table");
        syllabusTable.innerHTML = "";
        syllabusList.forEach((syllabus) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${syllabus.id}</td>
                <td>${syllabus.name}</td>
                <td>${syllabus.credits}</td>
                <td>${syllabus.min_gpa}</td>
                <td>${syllabus.approved_date}</td>
                <td>
                    <a class="btn btn-primary" href="edit.html?id=${syllabus.id}">Chỉnh sửa</a>
                    <button class="btn btn-danger btn-delete" data-syllabus-id="${syllabus.id}">Xóa</button>
                </td>
            `;
            const deleteButton = row.querySelector(".btn-delete");
            if (deleteButton) {
                deleteButton.addEventListener("click", () => {
                    const syllabusId = deleteButton.getAttribute("data-syllabus-id");
                    if (syllabusId) {
                        this.deleteSyllabus(syllabusId);
                    }
                });
            }
            syllabusTable.appendChild(row);
        });
    }
    handleSubmit() {
        return __awaiter(this, void 0, void 0, function* () {
            const nameInput = document.getElementById("name");
            const creditsInput = document.getElementById("credits");
            const minGpaInput = document.getElementById("min_gpa");
            const approvedDateInput = document.getElementById("approved_date");
            const name = nameInput.value;
            const credits = parseInt(creditsInput.value);
            const minGpa = parseFloat(minGpaInput.value);
            const approvedDate = approvedDateInput.value;
            const isValid = yield this.validateInputs(name, credits, minGpa, approvedDate);
            if (isValid) {
                try {
                    const response = yield fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name,
                            credits,
                            min_gpa: minGpa,
                            approved_date: approvedDate,
                        }),
                    });
                    if (!response.ok) {
                        throw new Error("Failed to add syllabus");
                    }
                    console.log("Syllabus added successfully:", {
                        name,
                        credits,
                        min_gpa: minGpa,
                        approved_date: approvedDate,
                    });
                    yield this.fetchAndDisplayUsers();
                }
                catch (error) {
                    console.error("Error adding syllabus:", error);
                }
            }
            else {
                event.preventDefault();
            }
        });
    }
    deleteSyllabus(syllabusId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${url}/${syllabusId}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error("Failed to delete syllabus");
                }
                console.log("Syllabus deleted successfully");
                yield this.fetchAndDisplayUsers();
            }
            catch (error) {
                console.error("Error deleting syllabus:", error);
            }
        });
    }
    validateInputs(name, credits, minGpa, approvedDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const syllabusData = {
                    name,
                    credits,
                    min_gpa: minGpa,
                    approved_date: approvedDate,
                };
                const errors = yield validate(syllabusData);
                if (errors.length === 0) {
                    return true;
                }
                errors.forEach((element) => {
                    const propertyName = element.property;
                    const errorConstraints = Object.values(element.constraints).join(". ");
                    const errorMessage = `${propertyName}: ${errorConstraints}`;
                    const errorElement = document.getElementById(propertyName);
                    if (errorElement) {
                        errorElement.classList.add("border-danger");
                        errorElement.nextElementSibling.textContent = errorMessage;
                    }
                });
                return true;
            }
            catch (error) {
                console.error("Lỗi trong quá trình kiểm tra:", error);
                return false;
            }
        });
    }
}
__decorate([
    IsNotEmpty({
        message: "Tên môn học không được để trống",
    })
], App.prototype, "name", void 0);
__decorate([
    IsNotEmpty({
        message: "Số tín chỉ không được để trống",
    }),
    Min(0, { message: "Số tín chỉ phải là số dương" })
], App.prototype, "credits", void 0);
__decorate([
    IsNotEmpty({
        message: "Điểm tối thiểu để được qua môn không được để trống",
    }),
    Min(0, { message: "Điểm tối thiểu phải từ 0" }),
    Max(10, { message: "Điểm tối thiểu phải nhỏ hơn hoặc bằng 10" })
], App.prototype, "min_gpa", void 0);
__decorate([
    IsNotEmpty({
        message: "Ngày duyệt không được để trống",
    })
], App.prototype, "approved_date", void 0);
new App();
