// Create an immediately invoked functional expression to wrap our code
(function() {

  // Define our constructor 
  this.Modal = function() {

    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;

    // Determine proper prefix
    this.transitionEnd = transitionSelect();

    // Default values which can be customized
    var defaults = {
      autoOpen: false,
      className: 'fade-and-drop',
      closeButton: true,
      content: "",
      maxWidth: 350,
      minWidth:100,
	  maxHeight:600,
	  minHeight:450,
      overlay: true
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

    if(this.options.autoOpen === true) this.open();

  }

  // Public Methods

  Modal.prototype.close = function() {
    var _ = this;
    this.modal.className = this.modal.className.replace(" scotch-open", "");
    this.overlay.className = this.overlay.className.replace(" scotch-open",
      "");
    this.modal.addEventListener(this.transitionEnd, function() {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function() {
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  Modal.prototype.open = function() {
    buildOut.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        " scotch-open scotch-anchored" : " scotch-open");
    this.overlay.className = this.overlay.className + " scotch-open";
  }

  // Private Methods

  function buildOut() {

    var content, contentHolder, docFrag;

    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */

    if (typeof this.options.content === "string") {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    // Create a DocumentFragment to build with
    docFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "scotch-modal " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";
	this.modal.style.minHeight = this.options.minHeight + "px";
    this.modal.style.maxHeight = this.options.maxHeight + "px";

	// header for popup
	this.header = document.createElement("div");
	this.header.className = "scotch-header";
	
	// footer for popup
	this.footer = document.createElement("div");
	this.footer.className = "scotch-footer";
	
	//image in header popup
	this.logo = document.createElement("IMG");
	this.logo.setAttribute("src", "rakenglish.png");
	this.logo.setAttribute("width", "50");
	this.logo.setAttribute("height", "30");
	this.logo.className = "scotch-header-logo";
	this.header.appendChild(this.logo);
	
	//div in footer
	 this.footerDiv = document.createElement("div");
	 this.footerDiv.className = "scotch-footerDiv";
	
	//input filed in footer
	this.textField = document.createElement("INPUT");
	this.textField.setAttribute("type", "text");
	this.textField.setAttribute("placeholder", "Type Here...");
	this.textField.className = "scotch-textField";
	this.footerDiv.appendChild(this.textField);
	
	//image in footer popup
	this.send = document.createElement("IMG");
	this.send.setAttribute("src", "send.png");
	this.send.setAttribute("width", "50");
	this.send.setAttribute("height", "20");
	this.send.className = "scotch-footer-image";
	this.footerDiv.appendChild(this.send);
	
	this.footer.appendChild(this.footerDiv);
	
	
	
	
    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "scotch-close close-button";
      this.closeButton.innerHTML = "&times;";
      this.header.appendChild(this.closeButton);
	  
	  this.modal.appendChild(this.header);
	  this.modal.appendChild(this.footer);
    }

    // If overlay is true, add one
    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "scotch-overlay " + this.options.className;
      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.className = "scotch-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }

  }

  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}());

var myContent = document.getElementById('content');

var myModal = new Modal({
  content: myContent
});

var triggerButton = document.getElementById('trigger');

triggerButton.addEventListener('click', function() {
  myModal.open();
});