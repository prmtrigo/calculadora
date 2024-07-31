document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    const toggleThemeButton = document.getElementById('toggleTheme');
    const body = document.body;

    buttons.map(button => {
        button.addEventListener('click', (e) => {
            handleInput(button.getAttribute('data-type'), button.textContent);
        });
    });

    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if (isFinite(key)) {
            handleInput('number', key);
        } else if (key === '.') {
            handleInput('decimal', key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            handleInput('operator', key);
        } else if (key === 'Enter' || key === '=') {
            handleInput('equals');
        } else if (key === 'Backspace' || key === 'Escape') {
            handleInput('clear');
        }
    });

    toggleThemeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
        }
    });

    function handleInput(type, value = '') {
        switch (type) {
            case 'number':
                if (display.textContent === '0') {
                    display.textContent = value;
                } else {
                    display.textContent += value;
                }
                break;
            case 'operator':
                if (!['+', '-', '*', '/'].includes(display.textContent.slice(-1))) {
                    display.textContent += ` ${value} `;
                }
                break;
            case 'decimal':
                const lastNumber = display.textContent.split(/[\+\-\*\/\s]/).pop();
                if (!lastNumber.includes('.')) {
                    display.textContent += value;
                }
                break;
            case 'clear':
                display.textContent = '0';
                break;
            case 'equals':
                try {
                    display.textContent = eval(display.textContent.replace(/ /g, ''));
                } catch {
                    display.textContent = 'Erro';
                }
                break;
        }
    }
});
