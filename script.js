// ==========================================
// CONFIG FIREBASE (Gunakan gaya COMPAT)
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyAOU2RNedLbO5QpKm9gEHF7KQC9XFACMdc",
    authDomain: "xzyo-s.firebaseapp.com",
    databaseURL: "https://xzyo-s-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "xzyo-s", 
    storageBucket: "xzyo-s.firebasestorage.app",
    messagingSenderId: "949339875672", 
    appId: "1:949339875672:web:b5d751452bf5875a445d2d"
};

// Inisialisasi Firebase (Gaya Compat sesuai HTML-mu)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ==========================================
// DATA MENU JOKI
// ==========================================
const MENU_JOKI = [
    { n: "👁️ KEN HAKI (INSTINCT)", header: true },
    { n: "✦ 0 – 1.000", p: 5000 },
    { n: "✦ 1.000 – 2.000", p: 8000 },
    { n: "✦ 2.000 – 5.000 (MAX) + V2(Full)", p: 15000 },
    { n: "✦ 0 – 5.000 (MAX) + V2(Full)", p: 20000 },

    { n: "🏴‍☠️ JOKI BOUNTY / HONOR", header: true },
    { n: "✦ 1M Bounty", p: 25000 },
    { n: "✦ 5M Bounty", p: 100000 },
    { n: "✦ 10M Bounty", p: 225000 },
    { n: "✦ 30M Bounty (MAX)", p: 700000 },

    { n: "💸 JOKI BELLY & FRAGMENT", header: true },
    { n: "✦ Belly 1M", p: 5000 },
    { n: "✦ Fragment 1K", p: 1000 },

    { n: "🔥 JOKI LEVEL & SEA", header: true },
    { n: "✦ Level 1 – 700", p: 15000 },
    { n: "✦ Level 700 – 1500", p: 15000 },
    { n: "✦ Paket Level 1 - MAX", p: 100000 }
];

let cart = {}; 
let selectedPay = "", currentTid = "", discount = 0;

// 1. Fungsi Munculin List (Init)
function init() {
    console.log("Memulai inisialisasi menu...");
    const box = document.getElementById('joki-list');
    
    if (!box) {
        console.error("EROR: ID 'joki-list' tidak ditemukan di HTML!");
        return;
    }

    box.innerHTML = ""; 
    MENU_JOKI.forEach((item, index) => {
        if (item.header) {
            box.innerHTML += `<div class="item-header" style="background:#2c3e50; color:#fff; padding:10px; margin-top:10px; font-weight:bold; border-radius:12px; text-align:center; font-size:13px;">${item.n}</div>`;
        } else {
            box.innerHTML += `
            <div class="item-joki-cart" id="item-${index}" style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:rgba(255,255,255,0.05); margin-bottom:8px; border-radius:15px; border:1px solid #30363d;">
                <div style="flex:1">
                    <div style="font-weight:600; font-size:14px; color:white;">${item.n}</div>
                    <div style="color:#00d2ff; font-size:12px;">Rp ${item.p.toLocaleString()}</div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button onclick="updateCart(${index}, -1)" style="width:28px; height:28px; border-radius:8px; border:none; background:#30363d; color:white; cursor:pointer;">-</button>
                    <span id="qty-${index}" style="font-weight:800; min-width:15px; text-align:center; color:white;">0</span>
                    <button onclick="updateCart(${index}, 1)" style="width:28px; height:28px; border-radius:8px; border:none; background:#00d2ff; color:black; cursor:pointer; font-weight:800;">+</button>
                </div>
            </div>`;
        }
    });
    console.log("Menu berhasil dimuat!");
}

// 2. Fungsi Update Keranjang
function updateCart(index, delta) {
    if (!cart[index]) cart[index] = 0;
    cart[index] += delta;
    if (cart[index] < 0) cart[index] = 0;

    document.getElementById(`qty-${index}`).innerText = cart[index];
    const el = document.getElementById(`item-${index}`);
    if(el) {
        el.style.borderColor = cart[index] > 0 ? "#00d2ff" : "#30363d";
    }
    hitung();
}

// 3. Hitung Total
function hitung() {
    let txt = ""; let subtotal = 0;
    MENU_JOKI.forEach((item, index) => {
        if (cart[index] > 0) {
            txt += `${item.n} (${cart[index]}x), `;
            subtotal += (item.p * cart[index]);
        }
    });
    let finalTotal = subtotal - (subtotal * discount);
    document.getElementById('detailText').value = txt.slice(0, -2);
    document.getElementById('totalAkhir').innerText = "Rp " + finalTotal.toLocaleString();
    updateBtn();
}

// 4. Pilih Pembayaran
function selectPay(m, el) {
    selectedPay = m;
    document.querySelectorAll('.pay-bar').forEach(p => p.classList.remove('selected'));
    el.classList.add('selected');
    updateBtn();
}

// 5. Update Tombol Bayar
function updateBtn() {
    const u = document.getElementById('userRoblox').value.trim();
    const w = document.getElementById('waUser').value.trim();
    const hasItems = Object.values(cart).some(q => q > 0);
    document.getElementById('btnGas').disabled = !(u && w && hasItems && selectedPay);
}

// 6. Proses Pesanan
async function prosesPesanan() {
    const loader = document.getElementById('loading-overlay');
    loader.style.display = 'flex';

    currentTid = "XZY-" + Math.floor(Math.random()*900000+100000);
    const u = document.getElementById('userRoblox').value.trim();
    const p = document.getElementById('passRoblox').value.trim();
    const itm = document.getElementById('detailText').value;
    const tot = document.getElementById('totalAkhir').innerText;
    
    let w = document.getElementById('waUser').value.trim();
    if (w.startsWith('0')) w = '62' + w.substring(1);

    try {
        await db.ref('orders/' + currentTid).set({
            tid: currentTid,
            status: "pending",
            category: "JOKI",
            user: u,
            pass: p,
            wa: w,
            items: itm,
            total: tot,
            method: selectedPay,
            timestamp: Date.now()
        });

        kirimTelegram(currentTid, u, p, w, itm, tot);

        setTimeout(() => {
            loader.style.display = 'none';
            switchSlide(1, 2);
            document.getElementById('displayTid').innerText = currentTid;
            document.getElementById('payNominal').innerText = tot;
            document.getElementById('payMethodInfo').innerText = selectedPay;
            
            const qrisBox = document.getElementById('qris-display');
            const gbrQR = document.getElementById('gambar-qris');
            if (selectedPay === "QRIS") {
                gbrQR.src = "https://i.ibb.co.com/Y4bRyxjc/IMG-20260227-021950.png";
                qrisBox.style.display = "block";
            } else {
                qrisBox.style.display = "none";
            }
        }, 1500);

        // Tunggu Konfirmasi
        db.ref('orders/' + currentTid + '/status').on('value', snap => {
            if(snap.val() === 's') {
                switchSlide(2, 3);
                document.getElementById('res-id').innerText = currentTid;
                document.getElementById('res-user').innerText = u;
                document.getElementById('res-item').innerText = itm;
                document.getElementById('res-total').innerText = tot;
            }
        });

    } catch (e) {
        alert("Gagal koneksi!");
        loader.style.display = 'none';
    }
}

function kirimTelegram(tid, u, p, w, itm, tot) {
    const token = "8733004732:AAHB1f_BfXMOZt_EDWGNMNBDTSjcC5YzxMY";
    const chatid = "8262559652";
    const pesan = `🚀 *JOKI BARU*%0AID: ${tid}%0AUser: ${u}%0APass: ${p}%0AWA: ${w}%0AItem: ${itm}%0ATotal: ${tot}%0ABayar: ${selectedPay}`;
    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatid}&text=${pesan}&parse_mode=Markdown`);
}

function switchSlide(from, to) {
    document.getElementById('slide-' + from).classList.remove('active');
    setTimeout(() => { 
        document.getElementById('slide-' + to).classList.add('active'); 
    }, 150);
}

function applyVoucher() {
    const code = document.getElementById('vouchCode').value.toUpperCase();
    if(code === "R3Z4") {
        discount = 0.20;
        alert("Voucher Berhasil!");
    } else {
        alert("Voucher Gagal!");
    }
    hitung();
}

// Jalankan Init
window.onload = () => {
    init();
    // Setup mata password
    document.getElementById('togglePassword').onclick = function() {
        const pass = document.getElementById('passRoblox');
        pass.type = pass.type === 'password' ? 'text' : 'password';
        this.classList.toggle('fa-eye-slash');
    };
};
