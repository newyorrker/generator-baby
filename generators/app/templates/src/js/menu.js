export default class Menu {

	constructor(options = {}) {

		this.config = {};

		const getContentNode = () => {

			const elemsList = document.body.childNodes;
			const elemArray = Array.prototype.slice.call(elemsList);

			const isDIV = (element, index, array) => element.nodeName === 'DIV';

			return elemArray.find(isDIV);
		}

		this.config.content = getContentNode();
  	this.config.openBtn = options.openBtn || document.querySelector('.burger-btn');
  	this.config.closebtn = options.closeBtn || document.querySelector('.btn-close');
  	this.config.bodyEl = document.body;
  	this.config.isOpen = false;

  	this.events();

	}
  events() {

  	const { content, openBtn, closebtn } = this.config;

		//close button
  	document.addEventListener('click', e =>	{
  		if (e.target === closebtn) { this.toggleMenu() }
  	});

  	//content area
  	document.addEventListener('click', e =>	{
  		if (this.config.isOpen && e.target === content) { this.toggleMenu() }
  	});

		//open button
  	openBtn.addEventListener('click', e => this.toggleMenu());
  }

  toggleMenu() {
		this.config.bodyEl.classList.toggle('show-menu');
  	this.config.isOpen = !this.config.isOpen;
  }
}
