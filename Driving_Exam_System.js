// نظام الامتحان الاحترافي - Driving-AI 2026
const ExamSystem = {
    score: 0,
    currentQuestionIndex: 0,
    questions: [
        {
            q: "حسب المادة 1، هل يمكن سياقة مركبة بمحرك دون رخصة سياقة؟",
            options: ["نعم، في حالات خاصة", "لا، يمنع منعاً كلياً"],
            answer: 1,
            ref: "المادة 1",
            cat: "قواعد عامة"
        },
        {
            q: "ما هو السن الأدنى للحصول على رخصة من صنف (A1)؟",
            options: ["14 سنة", "16 سنة", "18 سنة"],
            answer: 1,
            ref: "المادة 11",
            cat: "الأصناف"
        },
        {
            q: "كم هي مدة الفترة الاختبارية لرخصة السياقة من صنف (B)؟",
            options: ["سنة واحدة", "سنتان", "ثلاث سنوات"],
            answer: 1,
            ref: "المادة 11",
            cat: "الأصناف"
        }
    ],

    start() {
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.showQuestion();
    },

    showQuestion() {
        const qData = this.questions[this.currentQuestionIndex];
        const display = document.getElementById('app-display');
        
        display.innerHTML = `
            <div class="exam-header">
                <span>السؤال ${this.currentQuestionIndex + 1} من ${this.questions.length}</span>
                <div class="progress-bar" style="width: ${(this.currentQuestionIndex / this.questions.length) * 100}%"></div>
            </div>
            <div class="question-box">
                <h2>${qData.q}</h2>
                <div class="options-grid">
                    ${qData.options.map((opt, i) => `
                        <button class="opt-btn" onclick="ExamSystem.checkAnswer(${i})">${opt}</button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    checkAnswer(choice) {
        const currentQ = this.questions[this.currentQuestionIndex];
        if (choice === currentQ.answer) {
            this.score++;
        } else {
            // تفعيل نظام المخالفات عند الخطأ
            DrivingLawAI.processInfraction(currentQ.cat);
        }
        this.next();
    },

    next() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResult();
        }
    },

    showResult() {
        const display = document.getElementById('app-display');
        const pass = this.score >= (this.questions.length * 0.8);
        display.innerHTML = `
            <div class="result-card ${pass ? 'pass' : 'fail'}">
                <h1>${pass ? '🎉 ناجح' : '❌ راسب'}</h1>
                <p>حصلت على: ${this.score} من ${this.questions.length}</p>
                <button onclick="ExamSystem.start()" class="retry-btn">إعادة الاختبار</button>
                <button onclick="showModernResult(${this.score})" class="report-btn">تقرير الذكاء الاصطناعي</button>
            </div>
        `;
    }
};

/* --- محرك التطور (خارج كائن ExamSystem) --- */

const DriverEngine = {
    state: { score: 0, mistakes: [], timer: 30 },
    validateAnswer(userChoice, correctAnswer, lawReference) {
        if (userChoice === correctAnswer) {
            this.state.score++;
        } else {
            this.state.mistakes.push(lawReference);
        }
    }
};

const DrivingLawAI = {
    pointsBalance: 30,
    processInfraction(category) {
        let penalty = 0;
        if(category === "الأصناف") penalty = 2;
        this.pointsBalance -= penalty;
        return { penalty };
    }
};

function showModernResult(score) {
    alert(`تحليل 2026:\nالنتيجة: ${score}\nرصيد النقاط الافتراضي المتبقي: ${DrivingLawAI.pointsBalance}`);
}
