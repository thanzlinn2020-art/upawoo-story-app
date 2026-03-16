const API_KEY = "AIzaSyDK2LaRtSH13U0VyCo_hoK-lUNEvccWY-k"; 

async function generateStory() {
    const titleInput = document.querySelector('input[placeholder="ပညာရှိ ပေါ်ဦးနဲ့ မင်းကြီး"]');
    const displayArea = document.querySelector('.flex-1.overflow-y-auto'); // Script ပြမယ့်နေရာ
    
    if (!titleInput.value) {
        alert("ကျေးဇူးပြု၍ ခေါင်းစဉ်တစ်ခု ရိုက်ထည့်ပါ");
        return;
    }

    displayArea.innerHTML = "<p style='color: gold; text-align: center;'>AI က ဇာတ်လမ်းရှာဖွေနေပါသည်... ခေတ္တစောင့်ပါ...</p>";

    const prompt = `မင်းကြီးနှင့် ဦးပေါ်ဦး အပြန်အလှန်ပြောဆိုသော ဇာတ်လမ်းတစ်ပုဒ်ကို မြန်မာလို ရေးပေးပါ။ 
    ဗီဒီယိုအတွက် ၁ မိနစ်ခွဲစာ script ဖြစ်ရမည်။ အခန်း (Scene) ၆ ခန်း တိတိ ခွဲပေးပါ။ 
    အခန်းတိုင်းတွင် မြင်ကွင်းဖော်ပြချက် (Visual Description)၊ နောက်ခံစကားပြော (Narrator) နှင့် အပြန်အလှန်စကားပြော (Dialogue) ပါဝင်ရမည်။ 
    ခေါင်းစဉ်မှာ - ${titleInput.value} ဖြစ်သည်။`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        
        // ရလာတဲ့ Script ကို Screen ပေါ်မှာ ပြသခြင်း
        displayArea.innerHTML = `<div style='white-space: pre-wrap; padding: 15px; color: #5d4037;'>${generatedText}</div>`;
        
    } catch (error) {
        displayArea.innerHTML = "<p style='color: red;'>အမှားအယွင်းရှိနေပါသည်။ ခေတ္တနေ၍ ပြန်ကြိုးစားပါ။</p>";
        console.error("Error:", error);
    }
}

// ခလုတ်ကို အလုပ်လုပ်အောင် ချိတ်ဆက်ခြင်း
document.addEventListener('DOMContentLoaded', () => {
    const genBtn = document.querySelector('button'); 
    if (genBtn) {
        genBtn.onclick = generateStory;
    }
});

