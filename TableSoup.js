export class TableSoup {
	constructor(element) {
		this.table = element;
		this.projectLinks = this.setTableProjectLinks(element);
		this.hyperLinks = this.setHyperLinks(element);
		this.imageLinks = this.setImageLinks(element);
		this.imageContainer = this.setImageContainer(element);
		this.images = Array();
		this.image = null;
		this.activateProjectLinks();
		this.activateHyperLinks();
		this.activateHover();
	}

	/**
	 * Set values to properties
	 */

	setTableProjectLinks(element) {
		return Array.from(element.querySelectorAll('tr[data-href]'));
	}

	setHyperLinks(element) {
		return Array.from(element.querySelectorAll('tr[data-url]'));
	}

	setImageLinks(element) {
		return Array.from(element.querySelectorAll('tr[data-src]'));
	}

	setImageContainer(element) {
		const imageContainer = document.createElement('div');
		const table = element.querySelector('table');
		imageContainer.classList.add('images-placeholder');
		element.insertBefore(imageContainer, table);
		return imageContainer;
	}

	getImageLinksUrl() {
		if (this.imageLinks.length) {
			return this.imageLinks.map((e) => e.dataset.src);
		} else {
			return Array();
		}
	}

	activateHover() {
		if (this.imageLinks.length) {
			for (const image of this.imageLinks) {
				this.addImageToDOM(image.dataset.src);
				image.addEventListener('mouseenter', this.onMouseEnter.bind(this));
				image.addEventListener('mouseleave', this.onMouseLeave.bind(this));
			}
		}
	}

	activateProjectLinks() {
		if (this.projectLinks.length) {
			for (const link of this.projectLinks) {
				link.addEventListener('click', this.onTableLinkClick);
			}
		}
	}

	activateHyperLinks() {
		if (this.hyperLinks.length) {
			for (const link of this.hyperLinks) {
				link.addEventListener('click', this.onTableHyperLinkClick);
			}
		}
	}

	addImageToDOM(src) {
		let image = new Image();
		image.src = src;
		image.classList.add('table-image');
		this.imageContainer.appendChild(image);
		this.images.push(image);
	}

	/**
	 * Event Listeners
	 */

	onMouseEnter(event) {
		this.image = this.images.find((image) => image.getAttribute('src') === event.currentTarget.dataset.src);
		if (this.image != undefined) {
			this.image.classList.add('active');
		}
	}

	onMouseLeave() {
		if (this.image) {
			this.image.classList.remove('active');
		}
	}

	onTableLinkClick(event) {
		window.location = event.currentTarget.dataset.href;
	}

	onTableHyperLinkClick(event) {
		window.open(event.currentTarget.dataset.url, '_blank');
	}
}
