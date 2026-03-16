const API_KEY = "AIzaSyDK2LaRtSH13U0VyCo_hoK-lUNEvccWY-k"; 

// UI ကို တည်ဆောက်ခြင်း
document.getElementById('root').innerHTML = `
    <div style="font-family: sans-serif; max-width: 500px; margin: 20px auto; padding: 20px; background: #fff8e1; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); text-align: center;">
        <h2 style="color: #5d4037;">U Paw Oo Script Creator</h2>
        <input type="text" id="storyTitle" placeholder="ဇာတ်လမ်းခေါင်းစဉ် ရိုက်ပါ..." style="width: 80%; padding: 12px; border-radius: 8px; border: 1px solid #d7ccc8; margin-bottom: 15px;">
        <br>
        <button id="genBtn" style="background: #fb8c00; color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: bold;">Generate Script</button>
        <hr style="margin: 20px 0; border: 0; border-top: 1px solid #d7ccc8;">
        <div id="resultArea" style="text-align: left; min-height: 200px; white-space: pre-wrap; color: #3e2723; line-height: 1.6;"></div>
    </div>
`;

async function generateStory() {
    const title = document.getElementById('storyTitle').value;
    const resultArea = document.getElementById('resultArea');
    
    if (!title) {
        alert("ခေါင်းစဉ် ရိုက်ထည့်ပေးပါ ခင်ဗျာ");
        return;
    }

    resultArea.innerHTML = "<p style='color: orange; text-align: center;'>Gemini AI က ဇာတ်လမ်းရှာဖွေ ရေးသားနေပါသည်... ခေတ္တစောင့်ပါ...</p>";

    const prompt = `ဦးပေါ်ဦးနှင့် မင်းကြီး အပြန်အလှန်ပြောဆိုသော ဇာတ်လမ်းတိုတစ်ပုဒ်ကို မြန်မာလို ရေးပေးပါ။ ဗီဒီယိုအတွက် ၁ မိနစ်ခွဲစာ script ဖြစ်ရမည်။ အခန်း ၆ ခန်း ခွဲပေးပါ။ ခေါင်းစဉ်မှာ - ${title} ဖြစ်သည်။ အခန်းတိုင်းအတွက် Visual Description, Narrator, Dialogue ပါဝင်ရမည်။`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        resultArea.innerHTML = text;
    } catch (error) {
        resultArea.innerHTML = "<p style='color: red;'>အမှားအယွင်း ရှိသွားပါသည်။ ခေတ္တနေ၍ ပြန်စမ်းကြည့်ပါ။</p>";
    }
}

document.getElementById('genBtn').addEventListener('click', generateStory);
