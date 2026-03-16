const API_KEY = "AIzaSyBSTWG5jvE92Wn1kCQKEfLLg9zytqy1FwY"; 

// App UI ကို တည်ဆောက်ခြင်း
const rootElement = document.getElementById('root');
if (rootElement) {
    rootElement.innerHTML = `
        <div style="background-color: #fdfbf7; min-height: 100vh; font-family: sans-serif; padding: 15px;">
            <div style="text-align: center; margin-bottom: 25px; padding-top: 10px;">
                <h1 style="color: #c62828; margin: 0; font-size: 24px;">Myanmar Story Generator</h1>
                <p style="color: #795548; font-size: 14px;">နန်းတွင်းဟာသနှင့် ဦးပေါ်ဦး ဇာတ်လမ်းများ</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 6px solid #ff9800; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 22px; margin-right: 10px;">✨</span>
                    <h3 style="margin: 0; color: #5d4037;">Create New Story</h3>
                </div>
                <input type="text" id="storyTitle" placeholder="ဇာတ်လမ်းခေါင်းစဉ် ရိုက်ပါ..." 
                       style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #efebe9; margin-bottom: 15px; box-sizing: border-box; font-size: 16px;">
                <button id="genBtn" style="width: 100%; background: #ff9800; color: white; border: none; padding: 14px; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer;">Start Creating</button>
            </div>

            <div id="resultArea"></div>
        </div>
    `;

    document.getElementById('genBtn').addEventListener('click', generateStory);
}

async function generateStory() {
    const title = document.getElementById('storyTitle').value;
    const resultArea = document.getElementById('resultArea');
    
    if (!title) {
        alert("ကျေးဇူးပြု၍ ခေါင်းစဉ်တစ်ခု အရင်ရိုက်ပါ");
        return;
    }

    resultArea.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
            <div style="color: #ff9800; margin-bottom: 15px; font-weight: bold;">AI က ဇာတ်လမ်း ရေးသားနေပါသည်...</div>
            <div class="loader" style="border: 4px solid #f3f3f3; border-top: 4px solid #ff9800; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; margin: 0 auto;"></div>
            <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
        </div>
    `;

    const prompt = `ဦးပေါ်ဦးနှင့် မင်းကြီး အပြန်အလှန်ပြောဆိုသော ဟာသဇာတ်လမ်းတစ်ပုဒ်ကို မြန်မာလို ရေးပေးပါ။ ဗီဒီယိုအတွက် ၁ မိနစ်ခွဲစာ script ဖြစ်ရမည်။ အခန်း ၆ ခန်း တိတိ ခွဲပေးပါ။ ခေါင်းစဉ်မှာ - ${title} ဖြစ်သည်။ အခန်းတိုင်းအတွက် (၁) မြင်ကွင်းဖော်ပြချက် (၂) နောက်ခံစကားပြော နှင့် (၃) အပြန်အလှန်စကားပြောများ ပါဝင်ရမည်။`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        resultArea.innerHTML = `
            <div style="background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-top: 6px solid #c62828;">
                <h3 style="color: #c62828; margin-top: 0; border-bottom: 1px solid #eee; padding-bottom: 10px;">${title}</h3>
                <div style="white-space: pre-wrap; color: #3e2723; line-height: 1.8; font-size: 15px;">${text}</div>
                <button onclick="window.print()" style="margin-top: 20px; width: 100%; background: #795548; color: white; border: none; padding: 10px; border-radius: 8px; cursor: pointer;">PDF အနေနဲ့ သိမ်းမည်</button>
            </div>
        `;
    } catch (error) {
        resultArea.innerHTML = `<div style="background: white; padding: 20px; border-radius: 15px; color: red; text-align: center;">Error: အင်တာနက်ပြန်စစ်ပြီး ပြန်ကြိုးစားပေးပါ။</div>`;
    }
}
