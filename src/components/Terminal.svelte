<!-- XtermTerminal.svelte -->
<script>
  export let container_name;
  import { onMount, onDestroy } from 'svelte'; // Import the needed functions


  import io from 'socket.io-client';


  let terminal; // Create a variable to bind the DOM element

  let term; // Xterm instance
  let socket;



  onMount(async () => {
    // Import xterm.js and its addons when the DOM is ready
    const xterm = await import('xterm');
    const fitAddon = await import('xterm-addon-fit');

    term = new xterm.Terminal();
    term.open(terminal);
    term.write('Hello from xterm.js $ ');

    const fit = new fitAddon.FitAddon();
    term.loadAddon(fit);
    // term.loadAddon(new webLinksAddon.WebLinksAddon());
    // term.loadAddon(new SearchAddon.SearchAddon());

    fit.fit();

    
	term.onData((data) => {
        console.log("browser terminal received new data:", data);
        socket.emit("pty-input", { input: data });
    });

  });


    onMount(() => {
    // Create a WebSocket connection when the DOM is ready

	
    const url = `https://${container_name}.thelearningsetu.com/pty`;
    socket = io(url);

	socket.on('message', (data) => {
    //   message = data;
    });

    socket.on('connect', () => {
    //   isConnected = true;
	  socket.emit("pty-input", { input: "cd /src\n" });
	  console.log("connected to the socket haha")
    });

    socket.on('disconnect', () => {
    //   isConnected = false;
	  console.log("disconnected from the socket");
    });


  });


  onDestroy(() => {
    socket.disconnect();
  });



</script>

<svelte:head>

</svelte:head>

<span style="font-size: small" id="status">Connecting...</span>
<div id="terminal" bind:this={terminal} />


<style>
	
	/* Xterm.css */
	:global(.xterm) {
			cursor: text;
			position: relative;
			user-select: none;
			-ms-user-select: none;
			-webkit-user-select: none;
	}

	:global(.xterm.focus),
	:global(.xterm:focus) {
			outline: none;
	}

	:global(.xterm .xterm-helpers) {
			position: absolute;
			top: 0;
			/**
			 * The z-index of the helpers must be higher than the canvases in order for
			 * IMEs to appear on top.
			 */
			z-index: 5;
	}

	:global(.xterm .xterm-helper-textarea) {
			padding: 0;
			border: 0;
			margin: 0;
			/* Move textarea out of the screen to the far left, so that the cursor is not visible */
			position: absolute;
			opacity: 0;
			left: -9999em;
			top: 0;
			width: 0;
			height: 0;
			z-index: -5;
			/** Prevent wrapping so the IME appears against the textarea at the correct position */
			white-space: nowrap;
			overflow: hidden;
			resize: none;
	}

	:global(.xterm .composition-view) {
			/* TODO: Composition position got messed up somewhere */
			background: #000;
			color: #FFF;
			display: none;
			position: absolute;
			white-space: nowrap;
			z-index: 1;
	}

	:global(.xterm .composition-view.active) {
			display: block;
	}

	:global(.xterm .xterm-viewport) {
			/* On OS X this is required in order for the scroll bar to appear fully opaque */
			background-color: #000;
			overflow-y: scroll;
			cursor: default;
			position: absolute;
			right: 0;
			left: 0;
			top: 0;
			bottom: 0;
	}

	:global(.xterm .xterm-screen) {
			position: relative;
	}

	:global(.xterm .xterm-screen canvas) {
			position: absolute;
			left: 0;
			top: 0;
	}

	:global(.xterm .xterm-scroll-area) {
			visibility: hidden;
	}

	:global(.xterm-char-measure-element) {
			display: inline-block;
			visibility: hidden;
			position: absolute;
			top: 0;
			left: -9999em;
			line-height: normal;
	}

	:global(.xterm.enable-mouse-events) {
			/* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
			cursor: default;
	}

	:global(.xterm.xterm-cursor-pointer),
	:global(.xterm .xterm-cursor-pointer) {
			cursor: pointer;
	}

	:global(.xterm.column-select.focus) {
			/* Column selection mode */
			cursor: crosshair;
	}

	:global(.xterm .xterm-accessibility),
	:global(.xterm .xterm-message) {
			position: absolute;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			z-index: 10;
			color: transparent;
	}

	:global(.xterm .live-region) {
			position: absolute;
			left: -9999px;
			width: 1px;
			height: 1px;
			overflow: hidden;
	}

	:global(.xterm-dim) {
			opacity: 0.5;
	}

	:global(.xterm-underline) {
			text-decoration: underline;
	}

	:global(.xterm-strikethrough) {
			text-decoration: line-through;
	}

	:global(.xterm-screen .xterm-decoration-container .xterm-decoration) {
		z-index: 6;
		position: absolute;
	}

	:global(.xterm-decoration-overview-ruler) {
			z-index: 7;
			position: absolute;
			top: 0;
			right: 0;
			pointer-events: none;
	}

	:global(.xterm-decoration-top) {
			z-index: 2;
			position: relative;
	}

</style>