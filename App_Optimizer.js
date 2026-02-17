/* DRIVER-AI DEBUGGER v1.0
   وظيفته: اكتشاف الأخطاء، تنظيف البيانات، وترتيب العرض
*/

const AppOptimizer = {
    // 1. مراقب الأخطاء الذكي
    initErrorHandler() {
        window.onerror = function(msg, url, line) {
            console.error(`❌ خطأ برمجي اكتشفته: ${msg} \n المكان: ${url} \n السطر: ${line}`);
            alert(`تنبيه من النظام: هناك خطأ في السطر ${line}. سأحاول استكمال التشغيل.`);
            return false;
        };
    },

    // 2. منظف البيانات (Data Sanitizer)
    // يضمن أن مصفوفة الأسئلة أو البانوات مرتبة وبدون قيم فارغة
    cleanData(rawData) {
        if (!Array.isArray(rawData)) return [];
        return rawData.filter(item => item.title && item.desc)
                      .map(item => ({
                          ...item,
                          title: item.title.trim(),
                          desc: item.desc.trim()
                      }));
    },

    // 3. مرتب الملفات (Logic Organizer)
    // يقوم بترتيب العلامات حسب النوع تلقائياً قبل عرضها
    sortSignsByCategory(signsArray) {
        const order = { 'danger': 1, 'prohibition': 2, 'mandatory': 3, 'info': 4 };
        return signsArray.sort((a, b) => (order[a.type] || 9) - (order[b.type] || 9));
    }
};

// تشغيل المراقب فوراً
AppOptimizer.initErrorHandler();
