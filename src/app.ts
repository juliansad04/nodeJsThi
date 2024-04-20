import "bootstrap/dist/css/bootstrap.min.css";
import { SyllabusInterface } from "./model/SyllabusInterface";
import {
  validate,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
  Min,
  Max,
} from "class-validator";

const url: string = "http://localhost:3000/syllabus";

class App implements SyllabusInterface {
  public id: string;

  @IsNotEmpty({
    message: "Tên môn học không được để trống",
  })
  public name: string;

  @IsNotEmpty({
    message: "Số tín chỉ không được để trống",
  })
  @Min(0, { message: "Số tín chỉ phải là số dương" })
  public credits: number;

  @IsNotEmpty({
    message: "Điểm tối thiểu để được qua môn không được để trống",
  })
  @Min(0, { message: "Điểm tối thiểu phải từ 0" })
  @Max(10, { message: "Điểm tối thiểu phải nhỏ hơn hoặc bằng 10" })
  public min_gpa: number;

  @IsNotEmpty({
    message: "Ngày duyệt không được để trống",
  })
  public approved_date: string;

  constructor() {
    const buttonSubmit: HTMLElement = document.getElementById("submit");
    buttonSubmit.addEventListener("click", () => {
      this.handleSubmit();
    });

    this.fetchAndDisplayUsers();
  }

  async fetchAndDisplayUsers() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch syllabus data");
      }
      const syllabusList: any[] = await response.json();
      this.displaySyllabus(syllabusList);
    } catch (error) {
      console.error("Error fetching syllabus data:", error);
    }
  }

  displaySyllabus(syllabusList: any[]) {
    const syllabusTable: HTMLTableElement = document.getElementById(
      "syllabus-table"
    ) as HTMLTableElement;
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

  async handleSubmit() {
    const nameInput: HTMLInputElement = document.getElementById(
      "name"
    ) as HTMLInputElement;
    const creditsInput: HTMLInputElement = document.getElementById(
      "credits"
    ) as HTMLInputElement;
    const minGpaInput: HTMLInputElement = document.getElementById(
      "min_gpa"
    ) as HTMLInputElement;
    const approvedDateInput: HTMLInputElement = document.getElementById(
      "approved_date"
    ) as HTMLInputElement;

    const name = nameInput.value;
    const credits = parseInt(creditsInput.value);
    const minGpa = parseFloat(minGpaInput.value);
    const approvedDate = approvedDateInput.value;

    const isValid = await this.validateInputs(
      name,
      credits,
      minGpa,
      approvedDate
    );

    if (isValid) {
      try {
        const response = await fetch(url, {
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
        await this.fetchAndDisplayUsers();
      } catch (error) {
        console.error("Error adding syllabus:", error);
      }
    } else {
      event.preventDefault();
    }
  }

  async deleteSyllabus(syllabusId: string) {
    try {
      const response = await fetch(`${url}/${syllabusId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete syllabus");
      }

      console.log("Syllabus deleted successfully");
      await this.fetchAndDisplayUsers();
    } catch (error) {
      console.error("Error deleting syllabus:", error);
    }
  }

  async validateInputs(
    name: string,
    credits: number,
    minGpa: number,
    approvedDate: string
  ): Promise<boolean> {
    try {
      const syllabusData = {
        name,
        credits,
        min_gpa: minGpa,
        approved_date: approvedDate,
      };

      const errors = await validate(syllabusData);

      if (errors.length === 0) {
        return true;
      }

      errors.forEach((element: any) => {
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
    } catch (error) {
      console.error("Lỗi trong quá trình kiểm tra:", error);
      return false;
    }
  }
}

new App();
