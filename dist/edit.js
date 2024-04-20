var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlParams = new URLSearchParams(window.location.search);
const syllabusId = urlParams.get("id");
if (syllabusId) {
    fetch(`http://localhost:3000/syllabus/${syllabusId}`)
        .then((response) => response.json())
        .then((syllabusData) => {
        document.getElementById("name").value =
            syllabusData.name;
        document.getElementById("credits").value =
            syllabusData.credits;
        document.getElementById("min_gpa").value =
            syllabusData.min_gpa;
        document.getElementById("approved_date").value =
            syllabusData.approved_date;
    })
        .catch((error) => {
        console.error("Error fetching syllabus data:", error);
    });
    const submitButton = document.getElementById("submit");
    if (submitButton) {
        submitButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const name = document.getElementById("name").value;
            const credits = document.getElementById("credits")
                .value;
            const minGpa = document.getElementById("min_gpa")
                .value;
            const approvedDate = document.getElementById("approved_date").value;
            try {
                const response = yield fetch(`http://localhost:3000/syllabus/${syllabusId}`, {
                    method: "PUT",
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
                    throw new Error("Failed to update syllabus");
                }
                window.location.href = "index.html";
            }
            catch (error) {
                console.error("Error updating syllabus:", error);
            }
        }));
    }
    else {
        console.error("Submit button not found");
    }
}
else {
    console.error("Syllabus ID not found in URL");
}
