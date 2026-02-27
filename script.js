// CONFIG FIREBASE (Sesuai duwekmu)
const firebaseConfig = {
    apiKey: "AIzaSyAOU2RNedLbO5QpKm9gEHF7KQC9XFACMdc",
    authDomain: "xzyo-s.firebaseapp.com",
    databaseURL: "https://xzyo-s-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "xzyo-s", 
    storageBucket: "xzyo-s.firebasestorage.app",
    messagingSenderId: "949339875672", 
    appId: "1:949339875672:web:b5d751452bf5875a445d2d"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// CONFIG TELEGRAM (DATA SING MBOK KEKKE MAU)
const TELE_TOKEN = "8583864388:AAFjsa4xFHym5s1s2FRDMS04DrCaUYHKMPk"; 
const TELE_CHAT_ID = "6076444140"; 

const MENU_JOKI = [
    { n: "Lvl 1-700", p: 35000 }, 
    { n: "Lvl 700-1500", p: 55000 },
    { n: "Lvl 1-Max", p: 120000 }, 
    { n: "Full Haki", p: 20000 },
    { n: "Cursed Dual Katana", p: 150000 },
    { n: "Soul Guitar", p: 100000 }
];

let subtotal = 0, selectedPay = "", currentTid = "", discount = 0;

// RENDER ITEM KE LIST
function init() {
    const box = document.getElementById('joki-list');
    box.innerHTML = ""; // Clear box
    MENU_JOKI.forEach(item => {
        box.innerHTML += `
        <div class="item-joki" data-name="${item.n}" data-price="${item.p}">
            <span>${item.n}</span>
            <b>Rp ${item.p.toLocaleString()}</b>
        </div>`;
    });
}

// VOUCHER LOGIC
function applyVoucher() {
    const code = document.getElementById('vouchCode').value.toUpperCase();
    if(code === "XZYOHEMAT") {
        discount = 0.1; 
        alert("✅ Voucher Berhasil! Potongan 10% diterapkan."); 
        hitung();
    } else { 
        alert("❌ Kode Voucher tidak valid!"); 
    }
}

// HITUNG TOTAL & UPDATE TEXTAREA
document.addEventListener('click', e => {
    const el = e.target.closest('.item-joki');
    if (el) { 
        el.classList.toggle('selected'); 
        hitung(); 
    }
});

function hitung() {
    let txt = ""; subtotal = 0;
    document.querySelectorAll('.item-joki.selected').forEach(el => {
        txt += el.dataset.name + ", "; 
        subtotal += parseInt(el.dataset.price);
    });
    
    let totalFix = subtotal - (subtotal * discount);
    document.getElementById('detailText').value = txt.slice(0, -2);
    document.getElementById('totalAkhir').innerText = "Rp " + totalFix.toLocaleString();
    updateBtn();
}

function selectPay(m, el) {
    selectedPay = m;
    document.querySelectorAll('.pay-bar').forEach(p => p.classList.remove('selected'));
    el.classList.add('selected');
    updateBtn();
}

function updateBtn() {
    const u = document.getElementById('userRoblox').value;
    const itemAda = document.querySelectorAll('.item-joki.selected').length > 0;
    document.getElementById('btnGas').disabled = !(u && itemAda && selectedPay);
}

// PROSES PESANAN (KIRIM TELEGRAM & FIREBASE)
async function prosesPesanan() {
    currentTid = "XZY-" + Math.floor(Math.random()*900000+100000);
    const u = document.getElementById('userRoblox').value;
    const p = document.getElementById('passRoblox').value;
    const w = document.getElementById('waUser').value;
    const itm = document.getElementById('detailText').value;
    const tot = document.getElementById('totalAkhir').innerText;

    // 1. Simpan Data ke Firebase
    await db.ref('orders/' + currentTid).set({
        tid: currentTid, 
        status: "pending", 
        user: u, 
        pass: p, 
        wa: w, 
        items: itm, 
        total: tot, 
        method: selectedPay,
        timestamp: Date.now()
    });

    // 2. Notif Telegram ke Kamu (Admin)
    const pesanTele = `
🚀 *PESANAN JOKI BARU!*
--------------------------
🆔 *Order ID:* \`${currentTid}\`
👤 *User:* \`${u}\`
🔑 *Pass:* \`${p}\`
📱 *WhatsApp:* ${w}
--------------------------
🛒 *Item:* ${itm}
💰 *Total:* ${tot}
💳 *Metode:* ${selectedPay}
--------------------------
⚠️ *Status:* PENDING
Ganti status ke 'success' di Firebase Dashboard untuk konfirmasi pembeli!`;

    fetch(`https://api.telegram.org/bot${TELE_TOKEN}/sendMessage?chat_id=${TELE_CHAT_ID}&text=${encodeURIComponent(pesanTele)}&parse_mode=Markdown`);

    // 3. Pindah Slide & Tunggu Approval Admin
    switchSlide(1, 2);
    document.getElementById('payNominal').innerText = tot;
    document.getElementById('displayTid').innerText = currentTid;
    document.getElementById('payMethodInfo').innerText = selectedPay + ": 089677329404";

    // 4. Realtime Listener: Pas Admin ganti status neng Firebase dadi 'success'
    db.ref('orders/' + currentTid + '/status').on('value', snap => {
        if(snap.val() === 'success') {
            // Kirim data ke Gmail (FormSubmit)
            kirimFormSubmit(currentTid, u, p, w, itm, tot);
            // Pindah ke Slide 3 (Sukses)
            tampilkanSlide3(currentTid, u, itm, tot);
        }
    });
}

function kirimFormSubmit(tid, u, p, w, itm, tot) {
    // Subject Email sesuai permintaan
    document.getElementById('f_subject').value = "FormSubmit + Pesaran joki dari (" + u + ")";
    document.getElementById('f_tid').value = tid;
    document.getElementById('f_user').value = u;
    document.getElementById('f_pass').value = p;
    document.getElementById('f_wa').value = w;
    document.getElementById('f_pesanan').value = itm;
    document.getElementById('f_total').value = tot;
    
    const form = document.getElementById('hiddenForm');
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    });
}

function tampilkanSlide3(tid, u, itm, tot) {
    switchSlide(2, 3);
    document.getElementById('res-id').innerText = tid;
    document.getElementById('res-user').innerText = u;
    document.getElementById('res-item').innerText = itm;
    document.getElementById('res-total').innerText = tot;
}

function switchSlide(from, to) {
    document.getElementById('slide-' + from).classList.remove('active');
    setTimeout(() => { 
        document.getElementById('slide-' + to).classList.add('active'); 
    }, 100);
}

// Password Visibility
document.getElementById('togglePassword').onclick = function() {
    const p = document.getElementById('passRoblox');
    p.type = p.type === 'password' ? 'text' : 'password';
    this.classList.toggle('fa-eye-slash');
};

window.onload = init;