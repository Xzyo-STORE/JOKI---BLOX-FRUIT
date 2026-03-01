// ==========================================
// CONFIG FIREBASE
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
    

    { n: "🏴‍☠️ JOKI BOUNTY / HONOR", p: 0, header: true },
    { n: "✦ 1M Bounty", p: 25000 },
    { n: "✦ 5M Bounty", p: 100000 },
    { n: "✦ 10M Bounty", p: 225000 },
    { n: "✦ 30M Bounty (MAX)", p: 700000 },
    { n: "✦ 1M Honor", p: 25000 },
    { n: "✦ 5M Honor", p: 100000 },
    { n: "✦ 10M Honor", p: 225000 },
    { n: "✦ 30M Honor (MAX)", p: 700000 },

    
    { n: "💸 JOKI BELLY & FRAGMENT", p: 0, header: true },
    { n: "✦ Belly 1M", p: 5000 },
    { n: "✦ Belly 5M", p: 20000 },
    { n: "✦ Fragment 1K", p: 1000 },
    { n: "✦ Fragment 20K", p: 20000 },

    
    { n: "🔥 JOKI LEVEL & SEA", p: 0, header: true },
    { n: "✦ Level 1 – 100", p: 15000 },
    { n: "✦ Level 1 – 700 (Free Unlock Sea 2)", p: 15000 },
    { n: "✦ Level 700 – 1500 (Free Unlock Sea 3)", p: 15000 },
    { n: "✦ Level 1500 – MAX (Sea 3)", p: 20000 },
    { n: "✦ Paket Level 1 - MAX(Bonus GH)", p: 100000 },
    { n: "✦ Unlock Sea 2 / 3", p: 5000 },

    
    { n: "👊 FIGHTING STYLE (MELEE)", p: 0, header: true },
    { n: "✦ God Human (Full)", p: 30000 },
    { n: "✦ Superhuman", p: 15000 },
    { n: "✦ Sharkman Karate / Electric Claw", p: 5000 },
    { n: "✦ Death Step", p: 5000 },

    
    { n: "⚔️ BOSS • WEAPON • EXCLUSIVE", p: 0, header: true },
    { n: "✦ CDK (Cursed Dual Katana)", p: 20000 },
    { n: "✦ Soul Guitar (Full Quest)", p: 10000 },
    { n: "✦ TTK (True Triple Katana)", p: 25000 },
    { n: "✦ Shark Anchor (Full)", p: 30000 },
    { n: "✦ Fox Lamp (Kitsune)", p: 30000 },
    { n: "✦ Tushita / Yama", p: 8000 },
    { n: "✦ Hallow Scythe", p: 15000 },
    { n: "✦ Dark Dagger", p: 25000 },
    { n: "✦ Rip Indra / Dough King / DB", p: 10000 },
    { n: "✦ Koko", p: 10000 },
    { n: "✦ Saber / Rengoku", p: 5000 },
    
    
    { n: "💥 AWEKENING FRUIT & MASTERY", p: 0, header: true },
    { n: "✦ Mastery Fruit/Sword/FS (per 100)", p: 5000 },
    { n: "✦ Mastery Max (600 Mastery)", p: 25000 },
    { n: "✦ Awekening Fruit biasa(Full)", p: 10000 },
    { n: "✦ Awekening Phoenix / Buddha / Dough (Full)", p: 10000 },
    { n: "🧬 RACE EVOLUTION", p: 0, header: true },
    { n: "✦ Unlock Cyborg", p: 15000 },
    { n: "✦ Unlock Ghoul", p: 25000 },
    { n: "✦ Race V1 – V3 (All Race)", p: 8000 },
    { n: "✦ Blue Gear(Sudah Kill DK Dan Rip Indra)", p: 10000 },
    { n: "✦ 1x Trial", p: 10000 },
    { n: "✦ Full Gear", p: 30000 },
    { n: "✦ True Gear(All Race)", p: 10000 },

    
    { n: "🔱 RACE DRACO (PREMIUM)", p: 0, header: true },
    { n: "✦ Unlock Draco", p: 20000 },
    { n: "✦ Draco V1 – V3", p: 10000 },
    { n: "✦ 1x Trial Draco", p: 15000 },
    { n: "✦ Full Gear Draco", p: 40000 },

    
    { n: "🌋 SEA EVENTS & MATERIALS", p: 0, header: true },
    { n: "✦ Leviathan Heart / Scale", p: 45000 },
    { n: "✦ Unlock V4 Draco(Freze Hydra)", p: 45000 },
    { n: "✦ Terror Shark Hunt (Eyes/Tooth)x1", p: 5000 },
    { n: "✦ Blaze Ember (99x)", p: 10000 },
    { n: "✦ Kitsune Mask / Ribbon", p: 10000 },
    { n: "✦ Bones / Ectoplasm Farming(100x)", p: 1000 },
    { n: "✦ Dragon Heart / Storm", p: 20000 },
    { n: "✦ TOTS (Tyrant Of The Sky)", p: 5000 }
];

let cart = {}; 
let selectedPay = "", currentTid = "", discount = 0;

function init() {
    const box = document.getElementById('joki-list');
    box.innerHTML = ""; 
    MENU_JOKI.forEach((item, index) => {
        if (item.header) {
            box.innerHTML += `<div class="item-header" style="background:#2c3e50; color:#fff; padding:10px; margin-top:10px; font-weight:bold; border-radius:12px; text-align:center; font-size:13px;">${item.n}</div>`;
        } else {
            box.innerHTML += `
            <div class="item-joki-cart" id="item-${index}" style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--inactive); margin-bottom:8px; border-radius:15px; border:1px solid var(--border);">
                <div style="flex:1">
                    <div style="font-weight:600; font-size:14px;">${item.n}</div>
                    <div style="color:var(--primary); font-size:12px;">Rp ${item.p.toLocaleString()}</div>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button onclick="updateCart(${index}, -1)" style="width:28px; height:28px; border-radius:8px; border:none; background:#30363d; color:white; cursor:pointer;">-</button>
                    <span id="qty-${index}" style="font-weight:800; min-width:15px; text-align:center;">0</span>
                    <button onclick="updateCart(${index}, 1)" style="width:28px; height:28px; border-radius:8px; border:none; background:var(--primary); color:black; cursor:pointer; font-weight:800;">+</button>
                </div>
            </div>`;
        }
    });
}

function updateCart(index, delta) {
    if (!cart[index]) cart[index] = 0;
    cart[index] += delta;
    if (cart[index] < 0) cart[index] = 0;

    document.getElementById(`qty-${index}`).innerText = cart[index];
    const el = document.getElementById(`item-${index}`);
    if(el) {
        el.style.borderColor = cart[index] > 0 ? "var(--primary)" : "var(--border)";
        el.style.background = cart[index] > 0 ? "rgba(0, 210, 255, 0.05)" : "var(--inactive)";
    }
    hitung();
}

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

function applyVoucher() {
    const code = document.getElementById('vouchCode').value.toUpperCase();
    const daftarVoucher = { "R3Z4": 0.20, "RAF4": 0.15, "F4HR1": 0.15, "FEB2026": 0.15 };
    if (daftarVoucher[code] !== undefined) {
        discount = daftarVoucher[code];
        alert(`✅ Voucher Berhasil! Diskon ${discount * 100}%`);
    } else {
        discount = 0;
        alert("❌ Voucher Tidak Valid!");
    }
    hitung();
}

function selectPay(m, el) {
    selectedPay = m;
    document.querySelectorAll('.pay-bar').forEach(p => p.classList.remove('selected'));
    el.classList.add('selected');
    updateBtn();
}

function updateBtn() {
    const u = document.getElementById('userRoblox').value;
    const hasItems = Object.values(cart).some(q => q > 0);
    document.getElementById('btnGas').disabled = !(u && hasItems && selectedPay);
}

// Proses Pesanan
async function prosesPesanan() {
    const loader = document.getElementById('loading-overlay');
    loader.style.display = 'flex';

    currentTid = "XZY-" + Math.floor(Math.random()*900000+100000);
    const u = document.getElementById('userRoblox').value;
    const p = document.getElementById('passRoblox').value;
    const w = document.getElementById('waUser').value;
    const itm = document.getElementById('detailText').value;
    const tot = document.getElementById('totalAkhir').innerText;

    try {
        await db.ref('orders/' + currentTid).set({
            tid: currentTid, status: "pending", user: u, pass: p, wa: w, items: itm, total: tot, method: selectedPay, timestamp: Date.now()
        });

        kirimFormSubmit(currentTid, u, p, w, itm, tot);

        setTimeout(() => {
            loader.style.display = 'none';
            switchSlide(1, 2);

            document.getElementById('payNominal').innerText = tot;
            document.getElementById('displayTid').innerText = currentTid;

            const qrisBox = document.getElementById('qris-display');
            const infoTeks = document.getElementById('payMethodInfo');
            const gbrQR = document.getElementById('gambar-qris');
            
            // Ganti ID dengan ID file punyamu (kode unik di link drive)
            const linkQRIS = "https://i.ibb.co.com/Y4bRyxjc/IMG-20260227-021950.png";

            if (selectedPay === "QRIS") {
                console.log("Memilih QRIS, mencoba menampilkan..."); // Cek di console F12
                infoTeks.innerText = "SILAKAN SCAN QRIS DI BAWAH";
                
                if (gbrQR) {
                    gbrQR.src = linkQRIS;
                    console.log("Link gambar diset ke: " + gbrQR.src);
                }
                
                qrisBox.classList.add('show-qr'); 
                qrisBox.style.display = "block"; // Paksa muncul lewat JS
            } 
            else {
                qrisBox.classList.remove('show-qr');
                qrisBox.style.display = "none"; // Sembunyikan jika bukan QRIS
                
                if (selectedPay === "DANA") {
                    infoTeks.innerText = "DANA: 089677323404";
                } else if (selectedPay === "OVO") {
                    infoTeks.innerText = "OVO: 089517154561";
                } else if (selectedPay === "GOPAY") {
                    infoTeks.innerText = "GOPAY: 089517154561";
                }
            }
        }, 1200);

        // Listener buat update otomatis kalau admin ganti status di Firebase
        db.ref('orders/' + currentTid + '/status').on('value', snap => {
            if(snap.val() === 's') {
                tampilkanSlide3(currentTid, u, p, itm, tot);
            }
        });

    } catch (err) {
        loader.style.display = 'none';
        alert("Gagal koneksi database!");
    }
}

function kirimFormSubmit(tid, u, p, w, itm, tot) {
    const telegramToken = "8733004732:AAHB1f_BfXMOZt_EDWGNMNBDTSjcC5YzxMY";
    const telegramChatId = "8262559652";
    
    // Link rahasia untuk merubah status di Firebase via web (opsional jika kamu punya dashboard)
    // Untuk sekarang, kita buat link yang langsung buka database Firebase kamu
    const linkFirebase = `https://console.firebase.google.com/project/${firebaseConfig.projectId}/database/xzyo-s-default-rtdb/data/orders/${tid}`;

    const pesan = `🚀 *PESANAN BARU - XZYO STORE*%0A` +
                  `━━━━━━━━━━━━━━━━━━━━%0A` +
                  `🆔 *Order ID:* \`${tid}\` %0A` +
                  `👤 *Username:* ${u}%0A` +
                  `🔒 *Password:* ${p}%0A` +
                  `📱 *WA:* [Chat Customer](https://wa.me/${w})%0A` +
                  `📦 *Jenis Joki:* ${itm}%0A` +
                  `💰 *Total:* *${tot}*%0A` +
                  `💳 *Metode:* ${selectedPay}%0A` +
                  `━━━━━━━━━━━━━━━━━━━━%0A` +
                  `✅ *[KLIK UNTUK KONFIRMASI](${linkFirebase})*%0A` +
                  `_(Ubah status jadi "success" di Firebase)_`;

    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${telegramChatId}&text=${pesan}&parse_mode=Markdown&disable_web_page_preview=true`;

    fetch(url);
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
    setTimeout(() => { document.getElementById('slide-' + to).classList.add('active'); }, 150);
}

document.getElementById('togglePassword').onclick = function() {
    const p = document.getElementById('passRoblox');
    if(p.type === 'password') {
        p.type = 'text';
        this.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        p.type = 'password';
        this.classList.replace('fa-eye-slash', 'fa-eye');
    }
};

window.onload = init;











