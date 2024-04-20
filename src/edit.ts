const urlParams = new URLSearchParams(window.location.search);
const syllabusId: string | null = urlParams.get("id");

if (syllabusId) {
  fetch(`http://localhost:3000/syllabus/${syllabusId}`)
    .then((response) => response.json())
    .then((syllabusData) => {
      (document.getElementById("name") as HTMLInputElement).value =
        syllabusData.name;
      (document.getElementById("credits") as HTMLInputElement).value =
        syllabusData.credits;
      (document.getElementById("min_gpa") as HTMLInputElement).value =
        syllabusData.min_gpa;
      (document.getElementById("approved_date") as HTMLInputElement).value =
        syllabusData.approved_date;
    })
    .catch((error) => {
      console.error("Error fetching syllabus data:", error);
    });

  const submitButton = document.getElementById("submit");
  if (submitButton) {
    submitButton.addEventListener("click", async () => {
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const credits = (document.getElementById("credits") as HTMLInputElement)
        .value;
      const minGpa = (document.getElementById("min_gpa") as HTMLInputElement)
        .value;
      const approvedDate = (
        document.getElementById("approved_date") as HTMLInputElement
      ).value;

      try {
        const response = await fetch(
          `http://localhost:3000/syllabus/${syllabusId}`,
          {
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
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update syllabus");
        }

        window.location.href = "index.html";
      } catch (error) {
        console.error("Error updating syllabus:", error);
      }
    });
  } else {
    console.error("Submit button not found");
  }
} else {
  console.error("Syllabus ID not found in URL");
}
