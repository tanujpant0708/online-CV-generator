document.getElementById('cvForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
  const education = document.getElementById('education').value;
  const Project = document.getElementById('project').value;
  const experience = document.getElementById('experience').value;
  const image = document.getElementById('profilePic').files[0];

  const reader = new FileReader();
  reader.onload = function () {
    const output = `
      <div id="cvContent">
        <img src="${reader.result}" alt="Profile Picture" style="width:100px; height:100px; border-radius:50%; object-fit:cover;" />
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Skills</h3>
        <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <button onclick="downloadPDF()">Download as PDF</button>
      </div>
    `;
    document.getElementById('cvOutput').innerHTML = output;
  };

  if (image) {
    reader.readAsDataURL(image);
  } else {
    reader.onload();
  }
});

function downloadPDF() {
  const printContent = document.getElementById('cvContent');
  const win = window.open('', '', 'height=700,width=700');
  win.document.write('<html><head><title>CV Download</title></head><body>');
  win.document.write(printContent.outerHTML);
  win.document.write('</body></html>');
  win.document.close();
  win.print();
}

function resetForm() {
  document.getElementById('cvForm').reset();
  document.getElementById('cvOutput').innerHTML = '';
}

document.getElementById('cvForm').insertAdjacentHTML('beforeend', '<button type="button" onclick="resetForm()" style="background-color:#6c757d; margin-top:5px;">Reset Form</button>');
document.getElementById('cvForm').insertAdjacentHTML('afterbegin', '<label>Profile Picture:</label><input type="file" id="profilePic" accept="image/*">');
