interface Syllabus {
  id: string;
  name: string;
  credits: number;
  min_gpa: number;
  approved_date: string;
}

async function fetchSyllabus(id: string): Promise<Syllabus | null> {
  try {
    const response = await fetch(`http://localhost:3000/syllabus/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch syllabus");
    }
    const syllabusData = await response.json();
    return syllabusData;
  } catch (error) {
    console.error("Error fetching syllabus:", error);
    return null;
  }
}

function renderSyllabus(syllabus: Syllabus) {
  const syllabusTable = document.getElementById("syllabus-table");
  if (!syllabusTable) return;

  const syllabusList = document.getElementById("syllabus-list");
  if (!syllabusList) return;

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

async function editSyllabus(syllabusId: string) {
  console.log(`Editing syllabus with ID ${syllabusId}`);
  // Redirect to edit.html with syllabusId as parameter
  window.location.href = `edit.html?id=${syllabusId}`;
}

async function init() {
  const syllabus = await fetchSyllabus("1"); // Fetching syllabus with ID "1"
  if (syllabus) {
    renderSyllabus(syllabus);
  } else {
    console.error("Syllabus not found");
  }
}

init();
