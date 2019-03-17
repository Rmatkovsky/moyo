class Languages {
  constructor() {
    this.api = '/api/languages.json';

    return this.getLanguages();
  }

  async getLanguages() {
    const result = await fetch(this.api)
      .then(res => res.json())
      .then(res => res.texts);

    return result;
  }
}

export default Languages;
