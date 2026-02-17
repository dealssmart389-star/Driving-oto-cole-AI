// المحرك الأساسي لتطبيق قانون السير المغربي 2026
// Driving_core_engine.js

const LawApp = {
    data: null,

    // 1. دالة جلب البيانات من ملف JSON
    async init() {
        try {
            const response = await fetch('law_data.json');
            this.data = await response.json();
            console.log("✅ تم ربط المحرك بقاعدة البيانات القانونية");
            this.renderDashboard();
        } catch (error) {
            console.error("❌ فشل المحرك في العثور على ملف law_data.json:", error);
        }
    },

    // 2. دالة عرض واجهة التحكم الرئيسية
    renderDashboard() {
        const lawData = this.data.moroccan_traffic_law_52_05;
        const container = document.getElementById('app-display');
        
        if (!container) return;

        // عرض إحصائيات سريعة
        container.innerHTML = `
            <div class="header">
                <h2>${lawData.title}</h2>
                <p>تحديث عام: 2026</p>
            </div>
            <div class="grid">
                <div class="card" onclick="LawApp.showCategories()">
                    <h3>أصناف الرخص</h3>
                    <p>${lawData.categories.length} أصناف محددة</p>
                </div>
                <div class="card" onclick="LawApp.showArticles()">
                    <h3>المواد الأساسية</h3>
                    <p>${lawData.essential_articles.length} مواد قانونية</p>
                </div>
            </div>
            <div id="content-detail"></div>
        `;
    },

    // 3. دالة عرض أصناف الرخص بناءً على المادة 7 و 11
    showCategories() {
        const categories = this.data.moroccan_traffic_law_52_05.categories;
        let html = '<h3>تفاصيل أصناف رخص السياقة:</h3>';
        categories.forEach(cat => {
            html += `
                <div class="law-item">
                    <strong>الصنف ${cat.id} (السن: ${cat.min_age} سنة)</strong>
                    <p>${cat.description}</p>
                    <small>المرجع: ${cat.law_ref}</small>
                </div>
            `;
        });
        document.getElementById('content-detail').innerHTML = html;
    }
};

// تشغيل المحرك عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => LawApp.init());
