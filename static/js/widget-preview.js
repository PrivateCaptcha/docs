(function() {
  'use strict';

  var TEST_SITEKEY = 'aaaaaaaabbbbccccddddeeeeeeeeeeee';
  var PUZZLE_ENDPOINT = window.PRIVATE_CAPTCHA_PUZZLE_ENDPOINT || 'https://api.privatecaptcha.com/puzzle';
  var currentWidget = null;

  function getWidgetOptions() {
    return {
      theme: document.getElementById('opt-theme').value,
      lang: document.getElementById('opt-lang').value,
      displayMode: document.getElementById('opt-display-mode').value,
      startMode: document.getElementById('opt-start-mode').value,
      eu: document.getElementById('opt-eu').checked,
      debug: document.getElementById('opt-debug').checked
    };
  }

  function renderWidget() {
    var container = document.getElementById('captcha-preview-element');
    var opts = getWidgetOptions();
    
    // Clear the container
    container.innerHTML = '';
    
    // For popup mode, create wrapper with anchor and button
    if (opts.displayMode === 'popup') {
      var wrapper = document.createElement('div');
      wrapper.className = 'private-captcha-anchor';
      wrapper.style.display = 'inline-block';
      
      var widgetEl = document.createElement('div');
      widgetEl.id = 'preview-widget';
      wrapper.appendChild(widgetEl);
      
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Submit';
      btn.onclick = function() {
        if (window.privateCaptcha && window.privateCaptcha.autoWidget) {
          window.privateCaptcha.autoWidget.execute();
        }
      };
      wrapper.appendChild(btn);
      
      container.appendChild(wrapper);
    } else {
      var widgetEl = document.createElement('div');
      widgetEl.id = 'preview-widget';
      container.appendChild(widgetEl);
    }

    // Build render options
    var renderOpts = {
      sitekey: TEST_SITEKEY,
      puzzleEndpoint: PUZZLE_ENDPOINT,
      theme: opts.theme,
      displayMode: opts.displayMode,
      startMode: opts.startMode
    };

    if (opts.lang !== 'auto') {
      renderOpts.lang = opts.lang;
    }

    if (opts.eu) {
      renderOpts.eu = true;
    }

    if (opts.debug) {
      renderOpts.debug = true;
    }

    // Check if privateCaptcha is available and render
    var targetEl = document.getElementById('preview-widget');
    if (window.privateCaptcha && typeof window.privateCaptcha.render === 'function') {
      try {
        currentWidget = window.privateCaptcha.render(targetEl, renderOpts);
      } catch (e) {
        console.error('Error rendering widget:', e);
        container.innerHTML = '<p style="color: red;">Error rendering widget. Please refresh the page.</p>';
      }
    } else {
      container.innerHTML = '<p style="color: #ca8a04;">Loading widget script...</p>';
      // Retry after a short delay
      setTimeout(renderWidget, 500);
    }
  }

  function generateCode() {
    var opts = getWidgetOptions();
    
    var dataAttrs = 'data-sitekey="YOUR_SITEKEY"';
    
    if (opts.theme !== 'light') {
      dataAttrs += '\n         data-theme="' + opts.theme + '"';
    }
    
    if (opts.lang !== 'auto') {
      dataAttrs += '\n         data-lang="' + opts.lang + '"';
    }
    
    if (opts.displayMode !== 'widget') {
      dataAttrs += '\n         data-display-mode="' + opts.displayMode + '"';
    }
    
    if (opts.startMode !== 'auto') {
      dataAttrs += '\n         data-start-mode="' + opts.startMode + '"';
    }
    
    if (opts.eu) {
      dataAttrs += '\n         data-eu="true"';
    }
    
    if (opts.debug) {
      dataAttrs += '\n         data-debug="true"';
    }

    var code;
    if (opts.displayMode === 'popup') {
      // For popup mode, include the anchor wrapper and button
      code = '<div class="private-captcha-anchor">\n';
      code += '    <div class="private-captcha"\n';
      code += '         ' + dataAttrs + '>\n';
      code += '    </div>\n';
      code += '    <button type="button" onclick="window.privateCaptcha.autoWidget.execute()">Submit</button>\n';
      code += '</div>';
    } else {
      // For normal widget mode, just the div
      code = '<div class="private-captcha"\n';
      code += '     ' + dataAttrs + '>\n';
      code += '</div>';
    }

    return code;
  }

  function updateGeneratedCode() {
    var codeEl = document.getElementById('generated-code');
    if (codeEl) {
      codeEl.textContent = generateCode();
    }
  }

  function showCopySuccess() {
    var btn = document.getElementById('copy-code-btn');
    if (!btn) return;
    var originalText = btn.textContent;
    btn.textContent = 'Copied!';
    setTimeout(function() {
      btn.textContent = originalText;
    }, 2000);
  }

  function fallbackCopy(text) {
    // Fallback using textarea and execCommand
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      var successful = document.execCommand('copy');
      if (successful) {
        showCopySuccess();
      } else {
        alert('Failed to copy code. Please select and copy manually.');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      alert('Failed to copy code. Please select and copy manually.');
    }
    
    document.body.removeChild(textarea);
  }

  window.widgetPreviewUpdateWidget = function() {
    renderWidget();
    updateGeneratedCode();
  };

  window.widgetPreviewShowTab = function(tab) {
    var widgetTab = document.getElementById('preview-tab-widget');
    var codeTab = document.getElementById('preview-tab-code');
    var widgetPanel = document.getElementById('preview-panel-widget');
    var codePanel = document.getElementById('preview-panel-code');

    var activeClasses = ['hx:border-primary-500', 'hx:text-primary-600', 'hx:dark:border-primary-500', 'hx:dark:text-primary-600'];
    var inactiveClasses = ['hx:border-transparent', 'hx:text-gray-600', 'hx:hover:border-gray-200', 'hx:hover:text-black', 'hx:dark:text-gray-200', 'hx:dark:hover:border-neutral-800', 'hx:dark:hover:text-white'];

    function setTabActive(tabEl, isActive) {
      if (isActive) {
        inactiveClasses.forEach(function(cls) { tabEl.classList.remove(cls); });
        activeClasses.forEach(function(cls) { tabEl.classList.add(cls); });
      } else {
        activeClasses.forEach(function(cls) { tabEl.classList.remove(cls); });
        inactiveClasses.forEach(function(cls) { tabEl.classList.add(cls); });
      }
    }

    if (tab === 'widget') {
      setTabActive(widgetTab, true);
      setTabActive(codeTab, false);
      widgetPanel.classList.remove('hx:hidden');
      codePanel.classList.add('hx:hidden');
    } else {
      setTabActive(widgetTab, false);
      setTabActive(codeTab, true);
      widgetPanel.classList.add('hx:hidden');
      codePanel.classList.remove('hx:hidden');
      updateGeneratedCode();
    }
  };

  window.widgetPreviewCopyCode = function() {
    var code = generateCode();
    
    // Feature detection for clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(code).then(function() {
        showCopySuccess();
      }).catch(function(err) {
        console.error('Clipboard API failed:', err);
        fallbackCopy(code);
      });
    } else {
      fallbackCopy(code);
    }
  };

  // Initialize on DOM ready
  function init() {
    if (document.getElementById('widget-preview-tool')) {
      renderWidget();
      updateGeneratedCode();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
