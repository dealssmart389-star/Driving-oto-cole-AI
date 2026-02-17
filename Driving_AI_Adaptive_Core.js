/**
 * Driving-AI 2026: المحرك التكيفي ونظام الإضاءة الذكي
 * المسؤول عن: تبديل الأوضاع (ليلي/نهاري)، إدارة الأسئلة، وتحليل البيئة.
 */

const DrivingAI_Core = {
    // 1. الإعدادات الافتراضية
    settings: {
        isDarkMode: false,
        lastModeChange: new Date(),
        brightnessLevel: 100
    },

    // 2. نظام التحكم في الإضاءة (Day/Night Logic)
    toggleDisplayMode() {
        this.settings.isDarkMode = !this.settings.isDarkMode;
        this.updateTheme();
        this.logSystemStatus();
    },

    updateTheme() {
        const root = document.documentElement;
        const mode = this.settings.isDarkMode ? 'night' : 'day';
        
        // تطبيق لوحة ألوان متطورة باستخدام CSS Variables
        if (mode === 'night') {
            root.style.setProperty('--main-bg', '#0a0b10');
            root.style.setProperty('--card-bg', '#161b22');
            root.style.setProperty('--text-main', '#f0f6fc');
            root.style.setProperty('--accent-color', '#58a6ff');
            document.body.classList.add('night-vision');
        } else {
            root.style.setProperty('--main-bg', '#ffffff');
            root.style.setProperty('--card-bg', '#f6f8fa');
            root.style.setProperty('--text-main', '#1a1a2e');
            root.style.setProperty('--accent-color', '#0969da');
            document.body.classList.remove('night-vision');
        }
        
        // تحديث أيقونة التحكم في الواجهة
        const btn = document.getElementById('theme-toggle-btn');
        if(btn) btn.innerHTML = this.settings.isDarkMode ? '🌙 وضع الليل' : '☀️ وضع النهار';
    },

    // 3. دمج التطور مع الأسئلة (Context Awareness)
    getAppropriateQuestions() {
        // إذا كان الوضع ليلياً، الأولوية لأسئلة الأضواء والرؤية الضعيفة
        if (this.settings.isDarkMode) {
            console.log("🔍 تفعيل أسئلة السياقة الليلية وأضواء السيارة...");
            return "Night_Questions_Set_2026";
        }
        return "Standard_Day_Questions";
    },

    // 4. نظام المراقبة الذكي
    logSystemStatus() {
        const status = this.settings.isDarkMode ? "الوضع الليلي نشط" : "الوضع النهاري نشط";
        console.log(`[Driving-AI System]: ${status} - ${new Date().toLocaleTimeString()}`);
    }
};

// إنشاء واجهة التحكم في الإضاءة تلقائياً
function initDisplayControls() {
    const controlDiv = document.createElement('div');
    controlDiv.style.cssText = "position:fixed; bottom:20px; right:20px; z-index:1000;";
    
    const toggleBtn = document.createElement('button');
    toggleBtn.id = "theme-toggle-btn";
    toggleBtn.innerHTML = "🌗 تبديل الإضاءة";
    toggleBtn.style.cssText = `
        padding: 12px 20px;
        border-radius: 30px;
        border: none;
        background: var(--accent-color, #0969da);
        color: white;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: 0.3s;
    `;
    
    toggleBtn.onclick = () => DrivingAI_Core.toggleDisplayMode();
    controlDiv.appendChild(toggleBtn);
    document.body.appendChild(controlDiv);
}

// تشغيل النظام
window.addEventListener('DOMContentLoaded', () => {
    initDisplayControls();
    DrivingAI_Core.updateTheme(); // ضبط الثيم الأولي
});
