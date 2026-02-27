// CONFIG FIREBASE
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

// CONFIG TELEGRAM
const TELE_TOKEN = "8583864388:AAFjsa4xFHym5s1s2FRDMS04DrCaUYHKMPk"; 
const TELE_CHAT_ID = "6076444140"; 

const MENU_JOKI = [
    // --- KEN HAKI ---
    { n: "👁️ KEN HAKI (INSTINCT)", header: true },
    { n: "✦ 0 – 1.000", p: 5000 },
    { n: "✦ 1.000 – 2.000", p: 8000 },
    { n: "✦ 2.000 – 5.000 (MAX) + V2(Full)", p: 15000 },
    { n: "✦ 0 – 5.000 (MAX) + V2(Full)", p: 20000 },

    // --- BOUNTY ---
    { n: "🏴‍☠️ JOKI BOUNTY / HONOR", p: 0, header: true },
    { n: "✦ 1M Bounty / Honor", p: 20000 },
    { n: "✦ 5M Bounty / Honor", p: 90000 },
    { n: "✦ 10M Bounty / Honor", p: 180000 },
    { n: "✦ 30M Bounty (MAX)", p: 0 },

    // --- CURRENCY ---
    { n: "💸 JOKI BELLY & FRAGMENT", p: 0, header: true },
    { n: "✦ Belly 1M - 10M", p: 5000 },
    { n: "✦ Belly 50M (Paket Sultan)", p: 0 },
    { n: "✦ Fragment 1K - 10K", p: 1000 },
    { n: "✦ Fragment 50K (Full Awakening Ready)", p: 0 },

    // --- LEVEL ---
    { n: "🔥 JOKI LEVEL & SEA", p: 0, header: true },
    { n: "✦ Level 1 – 700 (Sea 1)", p: 15000 },
    { n: "✦ Level 700 – 1500 (Sea 2)", p: 15000 },
    { n: "✦ Level 1500 – MAX (Sea 3)", p: 20000 },
    { n: "✦ Paket Level 1 - MAX", p: 0 },
    { n: "✦ Unlock Sea 2 / 3", p: 5000 },

    // --- FIGHTING STYLE ---
    { n: "👊 FIGHTING STYLE (MELEE)", p: 0, header: true },
    { n: "✦ Sanguine Art (Full)", p: 0 },
    { n: "✦ God Human (Full)", p: 30000 },
    { n: "✦ Superhuman / Death Step", p: 0 },
    { n: "✦ Sharkman Karate / Dragon Talon", p: 0 },
    { n: "✦ Electric Claw", p: 0 },

    // --- WEAPONS & BOSS ---
    { n: "⚔️ BOSS • WEAPON • EXCLUSIVE", p: 0, header: true },
    { n: "✦ CDK (Cursed Dual Katana)", p: 20000 },
    { n: "✦ Soul Guitar (Full Quest)", p: 10000 },
    { n: "✦ TTK (True Triple Katana)", p: 25000 },
    { n: "✦ Shark Anchor (Full)", p: 30000 },
    { n: "✦ Fox Lamp (Kitsune)", p: 30000 },
    { n: "✦ Tushita / Yama", p: 8000 },
    { n: "✦ Hallow Scythe / Dark Dagger", p: 15000 },
    { n: "✦ Shark Anchor (Full)", p: 30000 },
    { n: "✦ Rip Indra / Dough King / DB", p: 10000 },
    { n: "✦ Saber / Rengoku / Koko", p: 5000 },

    // --- RAID & MASTERY ---
    { n: "💥 RAID & MASTERY SERVICE", p: 0, header: true },
    { n: "✦ Mastery Fruit/Sword/FS (per 100)", p: 5000 },
    { n: "✦ Mastery Max (600 Mastery)", p: 0 },
    { n: "✦ Raid Biasa (Max Awakening)", p: 5000 },
    { n: "✦ Raid Buddha / Dough (Max)", p: 10000 },
    { n: "✦ Unlock Phoenix Raid Quest", p: 0 },

    // --- RACE & V4 ---
    { n: "🧬 RACE SERVICE (V1 - V4)", p: 0, header: true },
    { n: "✦ Unlock Ghoul / Cyborg", p: 15000 },
    { n: "✦ Race V1 – V3 (All Race)", p: 8000 },
    { n: "✦ Find Mirage Island (Blue Gear)", p: 10000 },
    { n: "✦ Race V4 Unlock (Tier 1)", p: 10000 },
    { n: "✦ Race V4 Full Tier (Tier 10)", p: 0 },

    // --- DRACO (PREMIUM) ---
    { n: "🔱 RACE DRACO (PREMIUM)", p: 0, header: true },
    { n: "✦ Draco (Full)", p: 20000 },
    { n: "✦ Draco V1 – V3", p: 10000 },
    { n: "✦ Draco V4 (Full Gear)", p: 15000 },

    // --- SEA EVENTS & MATERIALS ---
    { n: "🌋 SEA EVENTS & MATERIALS", p: 0, header: true },
    { n: "✦ Leviathan Heart / Scale", p: 45000 },
    { n: "✦ Terror Shark Hunt (Eyes/Tooth)", p: 0 },
    { n: "✦ Azure Ember Farming (Kitsune)", p: 0 },
    { n: "✦ Kitsune Mask / Ribbon", p: 0 },
    { n: "✦ Bones / Ectoplasm Farming", p: 0 },
    { n: "✦ Dragon Heart / Storm", p: 20000 },
    { n: "✦ TOTS (Tyrant Of The Sky)", p: 5000 }
];

let subtotal = 0, selectedPay = "", currentTid = "", discount = 0;

// RENDER ITEM KE LIST
function init() {
    const box = document.getElementById('joki-list');
    box.innerHTML = ""; 
    
    MENU_JOKI.forEach(item => {
        if (item.header) {
            box.innerHTML += `<div class="item-header" style="background: #2c3e50; color: #fff; padding: 10px; margin-top: 10px; font-weight: bold; border-radius: 5px; text-align: center;">${item.n}</div>`;
        } else {
            box.innerHTML += `
            <div class="item-joki" data-name="${item.n}" data-price="${item.p}">
                <span>${item.n}</span>
                <b>Rp ${item.p.toLocaleString()}</b>
            </div>`;
        }
    });
}

function applyVoucher() {
    const code = document.getElementById('vouchCode').value.toUpperCase();
    const sekarang = new Date(); 
    const limitFeb = new Date(2026, 1, 28, 23, 59, 59); 

    const daftarVoucher = { "R3Z4": 0.20, "RAF4": 0.15, "F4HR1": 0.15, "FEB2026": 0.15 };

    if (daftarVoucher[code] !== undefined) {
        if (code === "FEB2026" && sekarang > limitFeb) {
            discount = 0;
            alert("⚠️ Voucher FEB2026 sudah kadaluarsa, Lek!");
        } else {
            discount = daftarVoucher[code];
            alert(`✅ Voucher Berhasil! Potongan ${discount * 100}% diterapkan.`);
        }
    } else {
        discount = 0;
        alert("❌ Kode Voucher tidak valid!");
    }
    hitung();
}

document.addEventListener('click', e => {
    const el = e.target.closest('.item-joki');
    if (el) { el.classList.toggle('selected'); hitung(); }
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

    // 1. Simpan ke Firebase
    await db.ref('orders/' + currentTid).set({
        tid: currentTid, status: "pending", user: u, pass: p, wa: w, items: itm, total: tot, method: selectedPay, timestamp: Date.now()
    });

    // 2. Notif Telegram
    const pesanTele = `🚀 *PESANAN JOKI BARU!*\n--------------------------\n🆔 *Order ID:* \`${currentTid}\` \n👤 *User:* \`${u}\` \n🔑 *Pass:* \`${p}\` \n📱 *WA:* ${w} \n🛒 *Item:* ${itm} \n💰 *Total:* ${tot} \n💳 *Metode:* ${selectedPay}\n--------------------------`;
    fetch(`https://api.telegram.org/bot${TELE_TOKEN}/sendMessage?chat_id=${TELE_CHAT_ID}&text=${encodeURIComponent(pesanTele)}&parse_mode=Markdown`);

    // 3. Pindah Slide & Logika Pembayaran
    switchSlide(1, 2);
    document.getElementById('payNominal').innerText = tot;
    document.getElementById('displayTid').innerText = currentTid;

    const qrisDisplay = document.getElementById('qris-display');
    const infoTeks = document.getElementById('payMethodInfo');
    const fotoQR = document.getElementById('gambar-qris');

    if (selectedPay === "DANA") {
        qrisDisplay.style.display = "none";
        infoTeks.innerText = "DANA: 089677323404 (A/N REZA)";
    } 
    else if (selectedPay === "OVO" || selectedPay === "GOPAY") {
        qrisDisplay.style.display = "none";
        infoTeks.innerText = selectedPay + ": 089517154561 (A/N REZA)";
    } 
    else if (selectedPay === "QRIS") {
        infoTeks.innerText = "SCAN QRIS DI BAWAH INI";
        fotoQR.src = "https://drive.google.com/uc?export=view&id=1LkkjYoIP_Iy_LQx4KEm8TtXiI5q57IfJ";
        qrisDisplay.style.display = "block";
    }

    // 4. Listener Status Sukses
    db.ref('orders/' + currentTid + '/status').on('value', snap => {
        if(snap.val() === 'success') {
            kirimFormSubmit(currentTid, u, p, w, itm, tot);
            tampilkanSlide3(currentTid, u, itm, tot);
        }
    });
}

function kirimFormSubmit(tid, u, p, w, itm, tot) {
    document.getElementById('f_subject').value = "Pesanan joki dari (" + u + ")";
    document.getElementById('f_user').value = u;
    document.getElementById('f_pass').value = p;
    document.getElementById('f_wa').value = w;
    document.getElementById('f_pesanan').value = itm;
    document.getElementById('f_total').value = tot;
    const form = document.getElementById('hiddenForm');
    fetch(form.action, { method: "POST", body: new FormData(form), headers: { 'Accept': 'application/json' } });
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
    setTimeout(() => { document.getElementById('slide-' + to).classList.add('active'); }, 100);
}

document.getElementById('togglePassword').onclick = function() {
    const p = document.getElementById('passRoblox');
    p.type = p.type === 'password' ? 'text' : 'password';
    this.classList.toggle('fa-eye-slash');
};

window.onload = init;
