let students = JSON.parse(localStorage.getItem("students")) || [];
        
        function addStudent() {
            let name = document.getElementById("name").value.trim();
            let id = document.getElementById("id").value.trim();
            let email = document.getElementById("email").value.trim();
            let contact = document.getElementById("contact").value.trim();
            
            if (!name || !id || !email || !contact) {
                alert("All fields are required");
                return;
            }
            if (contact.length !== 10) {
                alert("Contact number must be exactly 10 digits");
                return;
            }
            
            students.push({ name, id, email, contact });
            localStorage.setItem("students", JSON.stringify(students));
            renderStudents();
        }
        
        function validateContact(input) {
            input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
        }
        
        function renderStudents() {
            let studentList = document.getElementById("studentList");
            studentList.innerHTML = "";
            students.forEach((student, index) => {
                studentList.innerHTML += `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.id}</td>
                        <td>${student.email}</td>
                        <td>${student.contact}</td>
                        <td>
                            <span class="edit" onclick="editStudent(${index})">Edit</span>
                            <span class="delete" onclick="deleteStudent(${index})">Delete</span>
                        </td>
                    </tr>
                `;
            });
        }
        
        function deleteStudent(index) {
            students.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(students));
            renderStudents();
        }
        
        function editStudent(index) {
            let student = students[index];
            document.getElementById("name").value = student.name;
            document.getElementById("id").value = student.id;
            document.getElementById("email").value = student.email;
            document.getElementById("contact").value = student.contact;
            
            deleteStudent(index);
        }
        
        renderStudents();