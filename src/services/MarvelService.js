class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey ='apikey=a89ae7601a3e858e276ab1d5d52bdc69';
    getResources = async (url) => {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    getAllCharacters = async () => {
        const res = await this.getResources(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResources(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        if (char.description.length < 180) {
            return {
                name: char.name,
                description:char.description ? char.description.slice(0, 210) : 'Ooops! HYDRA has stolen description about this hero.',
                thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage:char.urls[0].url,
                wiki: char.urls[1].url
            }
        } 
    }
}

export default MarvelService;