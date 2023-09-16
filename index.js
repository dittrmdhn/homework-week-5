class Pendaftar {
  constructor(nama, umur, uangsangu) {
    this.nama = nama;
    this.umur = umur;
    this.uangsangu = uangsangu;
  }
}

const dataPendaftar = [];

const getDataInput = () => {
  const namaInput = document.getElementById("nama");
  const umurInput = document.getElementById("umur");
  const uangsanguInput = document.getElementById("uangsangu");

  const nama = namaInput.value;
  const umur = umurInput.value;
  const uangsangu = uangsanguInput.value;

  // validasi data
  if (nama.length < 10) {
    Swal.fire("Error", "Nama minimal 10 karakter", "error");
    namaInput.value = "";
    namaInput.focus();
    return;
  } else if (umur < 25) {
    Swal.fire("Error", "Umur minimal 25 tahun", "error");
    umurInput.value = "";
    umurInput.focus();
    return;
  } else if (uangsangu < 100000 || uangsangu > 1000000) {
    Swal.fire("Error", "Uang sangu minimal 100 rb dan maksimal 1 jt", "error");
    uangsanguInput.value = "";
    umurInput.focus();
    return;
  } else {
    Swal.fire("Sukses", "Data berhasil disimpan!", "success");
  }
  // simpan data pendaftar ke array
  const pendaftar = new Pendaftar(nama, umur, uangsangu);
  dataPendaftar.push(pendaftar);

  displayDataPendaftar();

  // reset form
  document.getElementById("registrationForm").reset();
};

// tampilkan data dalam table

const displayDataPendaftar = () => {
  const table = document.getElementById("dataPendaftar");
  table.innerHTML = ""; // Bersihkan tabel sebelum menambahkan data baru

  let totalUmur = 0;
  let averageUmur = 0;
  let totalUangSangu = 0;
  let averageUangSangu = 0;

  dataPendaftar.forEach((pendaftar) => {
    const newRow = table.insertRow(table.rows.length);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    cell1.innerHTML = table.rows.length;
    cell2.innerHTML = pendaftar.nama;
    cell3.innerHTML = pendaftar.umur;
    cell4.innerHTML = parseInt(pendaftar.uangsangu).toLocaleString("id-ID");

    totalUmur += parseInt(pendaftar.umur);
    averageUmur = totalUmur / dataPendaftar.length;
    const averageUmurFixed =
      averageUmur % 1 === 0 ? averageUmur.toFixed(0) : averageUmur.toFixed(1);

    totalUangSangu += parseInt(pendaftar.uangsangu);
    averageUangSangu = totalUangSangu / dataPendaftar.length;

    // document.getElementById("totalUmur").textContent = totalUmur;
    document.getElementById(
      "averageUmur"
    ).textContent = `${averageUmurFixed} tahun`;
    // document.getElementById("totalUangSangu").textContent = totalUangSangu;
    document.getElementById(
      "averageUangSangu"
    ).textContent = `Rp. ${averageUangSangu.toLocaleString("id-ID")}`;
  });
};

const openTab = (tabName) => {
  const tabs = document.getElementsByClassName("tab");
  const navbarLinks = document.getElementsByClassName("nav-link");

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
    navbarLinks[i].classList.remove(
      "fw-bold",
      "text-decoration-underline",
      "active"
    );
  }

  document.getElementById(tabName).style.display = "block";
  const activeTab = document.getElementById(`${tabName}-tab`);

  if (activeTab) {
    activeTab.classList.add("fw-bold", "text-decoration-underline", "active");
  }
};

window.onload = function () {
  openTab("registrasi");
};
