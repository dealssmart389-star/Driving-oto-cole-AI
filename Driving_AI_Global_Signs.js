/* Driving-AI 2026: Universal Signs Engine
   بناءً على مدونة السير المغربية واتفاقية فيينا الدولية
*/

const GlobalSignsDB = {
    // 1. علامات الخطر (Danger Signs - Triangle)
    danger: [
        { 
            id: "D_01", 
            title: "منعرج خطير", 
            img_url: "danger_turn.png", 
            morocco_law: "المادة 48", 
            intl_code: "A, 1a", 
            desc: "انتباه منعرج لليمين. خفف السرعة والتزم أقصى اليمين." 
        },
        { 
            id: "D_02", 
            title: "طريق تضيق من الجهتين", 
            img_url: "narrow_road.png", 
            morocco_law: "المادة 48", 
            intl_code: "A, 4a", 
            desc: "انتباه الطريق ستصبح ضيقة. الأولوية لمن دخل أولاً." 
        }
    ],

    // 2. علامات المنع (Prohibition - Circular Red)
    prohibition: [
        { 
            id: "P_01", 
            title: "ممنوع التجاوز", 
            img_url: "no_passing.png", 
            morocco_law: "المادة 52", 
            intl_code: "C, 13aa", 
            desc: "يمنع على جميع المركبات ذات محرك التجاوز." 
        },
        { 
            id: "P_02", 
            title: "ممنوع الوقوف والتوقف", 
            img_url: "no_parking.png", 
            morocco_law: "المادة 53", 
            intl_code: "C, 18", 
            desc: "يمنع كلياً وضع السيارة أو تركها في هذا الجانب." 
        }
    ],

    // 3. علامات الإجبار (Mandatory - Circular Blue)
    mandatory: [
        { 
            id: "M_01", 
            title: "مدار إجباري", 
            img_url: "roundabout.png", 
            morocco_law: "المادة 54", 
            intl_code: "D, 3", 
            desc: "اتجاه إجباري داخل المدار. الأولوية لليسار بالمغرب." 
        }
    ],

    // 4. علامات الأولوية (Priority Signs)
    priority: [
        { 
            id: "PR_01", 
            title: "قف - STOP", 
            img_url: "stop_sign.png", 
            morocco_law: "المادة 50", 
            intl_code: "B, 2", 
            desc: "إلزامية الوقوف التام وإعطاء حق الأسبقية لليمين واليسار." 
        }
    ]
};

// المحرك الذكي لمعالجة البيانات
const SignsEngine = {
    // البحث عن علامة بالاسم أو الكود الدولي
    findSign(query) {
        let results = [];
        Object.keys(GlobalSignsDB).forEach(cat => {
            let found = GlobalSignsDB[cat].filter(s => 
                s.title.includes(query) || s.intl_code.includes(query)
            );
            results.push(...found);
        });
        return results;
    },

    // توليد واجهة العرض العالمية
    generateUI() {
        let html = "";
        for (const [category, signs] of Object.entries(GlobalSignsDB)) {
            html += `<h2 class="cat-title">${category.toUpperCase()}</h2>`;
            html += `<div class="signs-grid">`;
            signs.forEach(sign => {
                html += `
                    <div class="sign-card" onclick="showDetails('${sign.id}')">
                        <div class="sign-header">
                            <span class="badge">MAR: ${sign.morocco_law}</span>
                            <span class="badge intl">INTL: ${sign.intl_code}</span>
                        </div>
                        <div class="sign-icon">🖼️</div>
                        <h3>${sign.title}</h3>
                        <p>${sign.desc}</p>
                    </div>`;
            });
            html += `</div>`;
        }
        return html;
    }
};
