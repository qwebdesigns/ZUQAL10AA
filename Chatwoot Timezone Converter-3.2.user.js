// ==UserScript==
// @name         Chatwoot Timezone Converter
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Конвертирует время из UTC+0 в МСК, добавляет скобки и уменьшает шрифт
// @match        *://chatwoot.echelon.su/*
// @match        *://echelon.su/api/dashboard/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setInterval(() => {
        const spans = document.querySelectorAll('span.font-mono');

        for (const span of spans) {
            if (span.getAttribute('data-timezone-updated') === 'true') continue;

            const text = span.textContent.trim();
            const timeMatch = text.match(/^(\d{1,2}):(\d{2}):(\d{2})$/);

            if (timeMatch) {
                let hours = parseInt(timeMatch[1], 10);
                const minutes = timeMatch[2];
                const seconds = timeMatch[3];

                hours = (hours + 3) % 24;
                const formattedHours = hours.toString().padStart(2, '0');

                span.textContent = `[${formattedHours}:${minutes}:${seconds}]`;
                span.style.setProperty('font-size', '65%', 'important');
                span.setAttribute('data-timezone-updated', 'true');
            }
        }
    }, 500);
})();