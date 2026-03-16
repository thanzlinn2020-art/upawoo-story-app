const API_KEY = "AIzaSyDK2LaRtSH13U0VyCo_hoK-lUNEvccWY-k"; 

// UI ကို root div ထဲသို့ ထည့်ခြင်း
const rootElement = document.getElementById('root');
if (rootElement) {
    rootElement.innerHTML = `
        <div style="background: #fff8e1; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; border: 2px solid #d7ccc8;">
            <h2 style="color: #5d4037; margin-bottom: 20px;">ဦးပေါ်ဦး Script Creator</h2>
            <input type="text" id="storyTitle" placeholder="ဇာတ်လမ်းခေါင်းစဉ် ရိုက်ပါ..." 
                   style="width: 90%; padding: 12px; border-radius: 10px; border: 1px solid #d7ccc8; margin-bottom: 20px; font-size: 16px;">
            <br>
            <button id="genBtn" style="background: #fb8c00; color: white; border: none; padding: 14px 30px; border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 16px; width: 100%;">ဇာတ်လမ်းထုတ်မည်</button>
            <hr style="margin: 25px 0; border: 0; border-top: 2px solid #d7ccc8;">
            <div id="resultArea" style="text-align: left; min-height: 200px; white-space: pre-wrap; color: #3e2723; line-height: 1.8; font-size: 15px;"></div>
        </div>
    `;

    document.getElementById('genBtn').addEventListener('click', generateStory);
}

async function generateStory() {
    const title = document.getElementById('storyTitle').value;
    const resultArea = document.getElementById('resultArea');
    
    if (!title) {
        alert("ကျေးဇူးပြု၍ ခေါင်းစဉ်ရိုက်ထည့်ပါ ခင်ဗျာ");
        return;
    }

    resultArea.innerHTML = "<p style='text-align: center; color: #fb8c00;'>AI က ဇာတ်လမ်း ရေးသားနေပါသည်... ခေတ္တစောင့်ပါ...</p>";

    const prompt = `ဦးပေါ်ဦးနှင့် မင်းကြီး အပြန်အလှန်ပြောဆိုသော ဇာတ်လမ်းတိုတစ်ပုဒ်ကို မြန်မာလို ရေးပေးပါ။ ဗီဒီယိုအတွက် ၁ မိနစ်ခွဲစာ script ဖြစ်ရမည်။ အခန်း ၆ ခန်း ခွဲပေးပါ။ ခေါင်းစဉ်မှာ - ${title} ဖြစ်သည်။ အခန်းတိုင်းအတွက် မြင်ကွင်းဖော်ပြချက်၊ နောက်ခံစကားပြောနှင့် အပြန်အလှန်စကားပြောများ ပါဝင်ရမည်။`;

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
        resultArea.innerHTML = "<p style='color: red;'>အမှားအယွင်းရှိနေပါသည်။ အင်တာနက်ပြန်စစ်ပြီး ပြန်ကြိုးစားကြည့်ပါ။</p>";
    }
}
