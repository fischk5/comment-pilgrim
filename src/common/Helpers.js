module.exports.getSentimentScore = (score) => {
    try {
        const number = parseFloat(score)
        if (!isNaN(number) && number >= 0 && number <= 100) return number
        return false
    } catch (error) {
        return false
    }
}

module.exports.getEmailRegex = () => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

module.exports.isValidEmailAddress = (emailAddress) => {
    try {
        if (!emailAddress) return false
        const emailRegex = this.getEmailRegex();
        return String(emailAddress).toLowerCase().match(emailRegex);
    } catch (error) {
        return false
    }
}

module.exports.updateHeadTags = (title, metaTags) => {
    try {
        if (title) document.title = title
        let providedMetaTags = []
        if (metaTags) providedMetaTags = metaTags
        if (providedMetaTags.length === 0) {
            const keepMetaTags = ['charset', 'viewport', 'X-UA-Compatible', 'theme-color'];
            const existingMetaTags = document.querySelectorAll('meta');
            existingMetaTags.forEach(meta => {
                const name = meta.getAttribute('name') || meta.getAttribute('http-equiv');
                if (!keepMetaTags.includes(name)) meta.parentNode.removeChild(meta)
            });
            this.removeSchemaOrgJSONLD()
            return
        }
        const head = document.getElementsByTagName('head')[0];
        metaTags.forEach(tag => {
        let metaElement = document.querySelector(`meta[name="${tag.name}"]`);
        if (!metaElement) {
            metaElement = document.createElement('meta');
            metaElement.setAttribute('name', tag.name);
            head.insertBefore(metaElement, head.firstChild)
        }
        metaElement.setAttribute('content', tag.content);
        });
    } catch (error) {
        return
    }

}

module.exports.updateSchemaOrgJSONLD = (data) => {
    try {
        const scriptId = 'schema-org-json-ld'
        let script = document.getElementById(scriptId);
        if (!script) {
          script = document.createElement('script');
          script.type = 'application/ld+json';
          script.id = scriptId;
          document.getElementsByTagName('head')[0].appendChild(script);
        }
        script.textContent = JSON.stringify(data);
    } catch (error) {
        return
    }
}

module.exports.removeSchemaOrgJSONLD = () => {
    try {
        const scriptId = 'schema-org-json-ld'
        const script = document.getElementById(scriptId)
        if (script) script.parentNode.removeChild(script)
    } catch (error) {
        return
    }

  }