const URL_CLOUD = 'https://cfw-takehome.developers.workers.dev/api/variants'

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

function handler(request) {
    const init = {
        headers: { 'content-type': 'application/json' },
    }
    const body = JSON.stringify({ some: 'json' })
    return new Response(body, init)
}
class TitleHandler {
    element(element) {
        element.replace(
            "<div align = 'center' <h1> Ankit's Internship Application</h1> </div>",
            { html: true }
        )
    }
}
class DescriptionHandler {
    element(element) {
        element.replace('I wonder what variant will I get next time...')
    }
}

class UrlHandler {
    element(element) {
        element.setAttribute('href', 'https://github.com/ankitpatro')
        element.setInnerContent('Check out my GitHub!')
    }
}

var hwriter = new HTMLRewriter()
hwriter

    .on('title', new TitleHandler())
    .on('p#description', new DescriptionHandler())
    .on('a#url', new UrlHandler())

async function handleRequest(request) {
    try {
        let response = await fetch(URL_CLOUD)
        let rand = Math.floor(Math.random() * 2)
        let data = await response.json()
        const RANDOM_INDEX = Math.floor(Math.random() * data.variants.length) // generate random index in array
        url = data.variants[RANDOM_INDEX]

        let urlResponse = await fetch(url).catch(err =>
            console.log(err.message)
        )
        let body = hwriter.transform(urlResponse)
        console.log(body)
        return body
    } catch (e) {
        console.log('Exception: ' + e)
    }
}
