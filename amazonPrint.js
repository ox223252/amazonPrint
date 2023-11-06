// ressources :
//
// https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension
//
(() => {
	//
	// Check and set a global guard variable.
	// If this content script is injected into the same page again,
	// it will do nothing next time.
	//
	if (window.hasRun) {
		return;
	}

	window.hasRun = true;


	// https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=
	// urlencode()
	// document.body.textContent = "🖶";

	let div = undefined;
	try{
		div = document.getElementById ( "b-page" );
		while ( div.firstChild )
		{
			div.removeChild ( div.lastChild );
		}
	}
	catch ( e )
	{
		div = document.createElement ( "div" );

		document.body.appendChild ( div );
		div.id = "b-page";
	}

	let msg = document.createElement ( "p" );
	div.appendChild ( msg );

	try{
		let title = document.createElement ( "h1" );
		div.appendChild ( title );
		title.innerHTML = document.getElementById ( "productTitle" ).innerHTML;
	}catch ( e ) {
		msg.innerHTML += document.createTextNode ( "h1 " + e );
	}

	let section = document.createElement ( "section" );
	div.appendChild ( section );

	try{
		let img = document.createElement ( "img" );
		section.appendChild ( img );
		img.src = document.getElementById ( "landingImage" ).src;
	}catch ( e ) {
		msg.innerHTML += document.createTextNode ( "img " + e );
	}

	try{
		let price = document.createElement ( "p" );
		section.appendChild ( price );
		price.innerHTML = document.getElementById ( "priceValue" ).value + "€";
	}catch ( e ) {
		msg.innerHTML += document.createTextNode ( "price " + e );
	}

	try{
		let qr = document.createElement ( "img" );
		section.appendChild ( qr );
		qr.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+encodeURI ( window.location.origin+window.location.pathname );
	}catch ( e ) {
		msg.innerHTML += document.createTextNode ( "qr " + e );
	}

	// console.log ( document.getElementById ( "nav-tools" ) );
	// document.getElementById ( "nav-tools" ).appendChild ( div );
})();


