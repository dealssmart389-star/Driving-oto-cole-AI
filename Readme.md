# 🚗 Driving-AI 2026 | القمة في ذكاء تعليم السياقة

![Version](https://img.shields.io/badge/Version-2026.1.0-blueviolet)
![Status](https://img.shields.io/badge/Status-Ultra_Advanced-success)
![Platform](https://img.shields.io/badge/Platform-Web_%2F_Mobile-orange)

## 🌟 الرؤية المستقبلية
يعد **Driving-AI 2026** النظام الأول من نوعه الذي يدمج بين **الموسوعة الدولية لإشارات المرور** وبين **الذكاء الاصطناعي التفاعلي**. تم تصميم هذا التطبيق ليكون الرفيق الرقمي لكل مرشح لاجتياز رخصة السياقة، معتمداً على أدق المعايير العالمية والمحلية.

---

## 🚀 الخصائص "الخارقة" للتطبيق

### 🧠 المحرك العصبي الذكي (AI Core)
* **التحليل الفوري**: يقوم النظام بتحليل استجابات المستخدم وربطها مباشرة بمدونة السير القانونية.
* **المساعد الصوتي التفاعلي**: نطق آلي لأسماء العلامات والقواعد لتعزيز الذاكرة السمعية.

### 🌗 نظام الإضاءة التكيفي (Smart Display)
* محاكاة بيئة القيادة الليلية والنهارية بضغطة زر واحدة لحماية العين وتحسين التركيز.

### 📚 الموسوعة الدولية الشاملة
تم تبويب الإشارات بناءً على تصنيفات مدرسة **أبو حمزة لتعليم السياقة** وتشمل:
1. **الإشارات التحذيرية**: تنبيهات ذكية للمخاطر.
2. **الإشارات المانعة**: قواعد الامتثال الصارمة.
3. **الإشارات الإجبارية**: التوجيهات الملزمة للسائق.
4. **الإشارات الآمرة**: أولويات المرور في التقاطعات.

---

## 🛠 التكنولوجيا المستخدمة (Stack)
* **Frontend**: HTML5, CSS3 (Modern Grid & Variables).
* **Logic**: JavaScript (AI Engine & Speech Synthesis).
* **Deployment**: GitHub Pages (استضافة عالمية فائقة السرعة).

---

## 📥 كيفية البدء
1. قم بزيارة رابط المشروع المباشر (عبر GitHub Pages).
2. اختر وضع الإضاءة المفضل لديك.
3. اضغط على أي علامة مرورية لسماع شرحها الصوتي وقاعدتها القانونية.

---

## 📜 المصادر الموثقة
* **إشارات المرور الدولية**: مدرسة أبو حمزة لتعليم السياقة.
* **التشريع**: مدونة السير المغربية المحدثة لعام 2026.

---
📅 **تاريخ آخر تحديث**: 17 فبراير 2026
👤 **المطور**: dealssmart389-star
function welcomeVoice() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = "مرحباً بك في النواة العصبية لتعليم السياقة، نسخة ألفين وستة وعشرين. اضغط ابدأ للبدء في الاختبار.";
    msg.lang = 'ar-SA'; // لغة عربية احترافية
    msg.rate = 0.9;      // سرعة هادئة وفخمة
    window.speechSynthesis.speak(msg);
}

// تفعيل الصوت عند الضغط على زر "ابدأ"
document.querySelector('.option-btn').addEventListener('click', () => {
    welcomeVoice();
});
/**
 * 🛰️ DRIVING AI 2026 | THE NEURAL CORE (Final Integration)
 * محرك مدمج يعالج الصور والبيانات من المصادر الموثوقة
 */

const MasterSystem = {
    config: Object.freeze({
        passingScore: 32,
        totalQuestions: 40,
        initialPoints: 30,
        deduction: 2
    }),

    state: { score: 0, points: 30, index: 0, db: [] },

    async init() {
        try {
            const res = await fetch('questions.json');
            this.state.db = await res.json();
            this.renderQuestion();
        } catch (e) {
            console.error("فشل الاتصال بقاعدة البيانات السيادية");
        }
    },

    renderQuestion() {
        const q = this.state.db[this.state.index];
        const display = document.getElementById('app-display');
        
        // المسار الذكي للصور: يبحث في مجلد assets
        const imgPath = q.img ? q.img : 'assets/placeholder.jpg';

        display.innerHTML = `
            <div class="img-card fade-in">
                <img src="${imgPath}" id="question-image" alt="Driving Scenario" 
                     onerror="this.src='https://via.placeholder.com/400x200?text=جاري_تحميل_الصورة'">
            </div>
            <div class="question-box">
                <h2 id="question-text">${q.q}</h2>
            </div>
            <div class="options-grid">
                ${q.options.map((opt, i) => `
                    <button class="option-btn" onclick="MasterSystem.verify(${i})">
                        <span>${opt}</span>
                    </button>
                `).join('')}
            </div>
        `;
    },

    verify(choice) {
        const isCorrect = choice === this.state.db[this.state.index].answer;
        if (isCorrect) {
            this.state.score++;
        } else {
            this.state.points -= this.config.deduction;
            document.getElementById('score-counter').innerText = `النقاط: ${this.state.points}`;
        }

        this.proceed();
    },

    proceed() {
        this.state.index++;
        if (this.state.index < this.state.db.length && this.state.points > 0) {
            this.renderQuestion();
        } else {
            this.finish();
        }
    },

    finish() {
        // كود عرض النتيجة النهائية
        document.getElementById('app-display').innerHTML = `<h1>النتيجة: ${this.state.score}</h1>`;
    }
};

window.onload = () => MasterSystem.init();
