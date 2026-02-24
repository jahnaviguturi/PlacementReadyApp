document.addEventListener('DOMContentLoaded', () => {
    console.log('KodNest Premium Build System initialized.');

    // Checklist interaction
    const checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            checkbox.classList.toggle('checked');
            if (checkbox.classList.contains('checked')) {
                checkbox.style.backgroundColor = '#8B0000';
                checkbox.style.borderColor = '#8B0000';
                checkbox.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            } else {
                checkbox.style.backgroundColor = 'transparent';
                checkbox.style.borderColor = '#E5E5E1';
                checkbox.innerHTML = '';
            }
        });
    });

    // Copy Prompt functionality
    const copyBtn = document.querySelector('button:contains("Copy Prompt")') || document.querySelector('.secondary-panel .btn--secondary');
    if (copyBtn && copyBtn.textContent.includes('Copy')) {
        copyBtn.addEventListener('click', () => {
            const promptContent = document.getElementById('prompt-box').textContent.trim();
            navigator.clipboard.writeText(promptContent).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            });
        });
    }
});

// Helper for finding button by text since nth-child is brittle
document.querySelectorAll('button').forEach(button => {
    if (button.textContent === 'Copy Prompt') {
        button.addEventListener('click', () => {
            const promptContent = document.getElementById('prompt-box').textContent.trim();
            navigator.clipboard.writeText(promptContent).then(() => {
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy Prompt';
                }, 2000);
            });
        });
    }
});
