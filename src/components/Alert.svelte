<script>
    export let message;
    export let type = 'info';
    export let duration = 3000;
    export let onClose;
    import { onDestroy } from "svelte";
  
    let timer;
  
    // Set up a timer to auto-close the alert
    timer = setTimeout(() => {
      onClose();
    }, duration);
  
    // Clear the timer when the component is destroyed
    onDestroy(() => {
      clearTimeout(timer);
    });
  
    const alertTypeClass = {
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info',
    };
  </script>
  
  <div class={`alert ${alertTypeClass[type]} shadow-lg`}>
    <div>
      <span>{message}</span>
    </div>
  </div>
  