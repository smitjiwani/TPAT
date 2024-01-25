import React, { useEffect } from 'react';

const GoogleTranslateWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    const onLoad = async () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        new window.google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
      } else {
        console.error('Google Translate script loaded, but TranslateElement is not available.');
      }
    };

    script.onload = onLoad;

    script.onerror = () => {
      console.error('Error loading Google Translate script.');
    };

    document.head.appendChild(script);

    // Use a timeout to wait for a short duration after the script has loaded
    const timeoutId = setTimeout(() => {
      onLoad();
    }, 1000);

    // onLoad()

    return () => {
      // Cleanup: remove the script and clear the timeout when the component is unmounted
      document.head.removeChild(script);
      clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array ensures that the effect runs only once (on mount)

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslateWidget;